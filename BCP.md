# Bounded Context Packs (BCP)
### 1  |  Why every MCP newcomer trips over “tool bloat”

When you first build a **Model Context Protocol (MCP)** server you follow the quick‑start: expose every endpoint as a “tool”, hand the manifest to your LLM client, and marvel as the model calls functions automatically. It works—until the surface area explodes.

Take an everyday platform like **GitHub**:

- Repos
- Issues
- Pull Requests
- Actions
- Discussions
- …plus hundreds of admin, billing, security, and GraphQL endpoints.

If you register each endpoint individually, your MCP server ships **200 + tools**. That creates two problems:

| Pain point                                                                                    | Why it happens                                                                                                                          |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Prompt bloat** – large manifests eat context tokens and blur the model’s judgment.          | MCP tools are listed verbatim in the prompt so the LLM can choose among them. Anthropic warns that excessive manifests degrade accuracy |
| **Maintenance drag** – adding or deprecating endpoints means editing one monolithic registry. | A single tools file violates the Single‑Responsibility Principle (SRP), making refactors risky.                                         |

Developers quickly realise they need a way to **scope** tools—but MCP itself is just a transport; it doesn’t dictate structure. Enter a pattern we call **Bounded Context Packs (BCPs).**

---

### 2  |  MCP in one minute (for total beginners)

- **What MCP is:** a JSON‑RPC‑based protocol that lets AI applications (hosts) call out to external “servers” for tools and contextual data. citeturn0search2
- **Why it matters:** integrate once, reuse everywhere; you can connect the Claude desktop app—or any open‑source client—to any compliant server. citeturn0search0
- **Dynamic discovery:** servers may add or remove tools during a session and tell the client via `notifications/tools/list_changed`. citeturn0search1
- **Security model:** every tool call still flows through the host, giving users final approval.

In short, MCP is the **universal adapter** for AI integrations—but you still decide _what_ to plug into it.

---

### 3  |  What is a Bounded Context Pack?

A **BCP** is a _self‑contained bundle of tools that map to a single bounded context_—a cohesive slice of business capability in Domain‑Driven Design (DDD). Think:

- **Repos BCP** – every repository‑related operation.
- **Issues BCP** – everything about issues and labels.
- **Pulls BCP** – open, merge, comment on PRs.

Each pack lives in its own folder, owns its own tool files, and exposes a tiny barrel (`index.ts`) that returns `{ domain, tools[] }`.

**Key rule:** the core MCP server never references individual tools. It only knows how to _load_ or _unload_ an entire BCP on demand.

---

### 4  |  How a BCP‑enabled server works—step by step

> We’ll stick with GitHub for concreteness, but the pattern applies to **any** large API.

|Phase|What happens|MCP primitives|
|---|---|---|
|**Boot**|Server registers two meta‑tools: `listBCPs` and `loadBCP(domain)`. Manifest = 2 tools.|`tools/list`|
|**Discovery**|User asks, “Create a repo.” Claude sees no repo tools, so it calls `loadBCP("Repos")`.|`tools/call`|
|**Dynamic load**|Server dynamically `import()`s `bcps/Repos/index.ts`, registers `Repos.create`, `Repos.list`, …|Server‑side `registerTool`|
|**Notify client**|Server emits `notifications/tools/list_changed`.|Spec § tools update citeturn0search1|
|**Refresh**|Client calls `tools/list`, updates its prompt, shows the new tools in the UI.|Host‑side|
|**Execution**|Claude calls `Repos.create` with arguments. Repo is created.|`tools/call`|

The manifest now contains maybe **5 repo tools**, not 200. If the user later mentions issues, Claude loads the Issues BCP. Packs the conversation never touches stay unloaded, saving tokens and mental bandwidth.

---

### 5  |  Folder structure that makes SRP and DRY effortless

```
src/
  core/
    server.ts       # JSON‑RPC plumbing, never edited again
    types.ts
  bcps/
    Repos/
      create.tool.ts
      list.tool.ts
      index.ts      # exports { domain:"Repos", tools:[…] }
    Issues/
      create.tool.ts
      search.tool.ts
      index.ts
```

- **One tool per file** keeps each action testable.
- **`import.meta.glob` or fast‑glob** in `index.ts` auto‑collects `*.tool.ts`, so you never update a manual array.
- Adding Pull Requests is literally `mkdir bcps/Pulls; touch open.tool.ts merge.tool.ts index.ts`.

---

### 6  |  Inside `server.ts` (abridged)

```ts
// register meta‑tools
registerTool("System.listBCPs", () => fs.readdirSync("./bcps"));
registerTool("System.loadBCP", ({ domain }) => {
  const { agent } = await import(`../bcps/${domain}/index.js`);
  agent.tools.forEach(t => registerTool(`${agent.domain}.${t.name}`, t.description, t.handler));
  notifyToolsListChanged();
});
```

Everything else—JSON‑RPC framing, stdin/stdout loops—is boilerplate you can lift from the MCP quick‑start.

---

### 7  |  Why it’s safe for beginners

- **No deep MCP tricks** – BCPs rely only on features explicitly documented in the spec: tool registration and `list_changed` notifications. citeturn0search2turn0search1
- **Fails soft** – if a domain typo occurs (`loadBCP("Typo")`) the server returns an ordinary tool error; the conversation continues.
- **User approval still applies** – Claude desktop prompts the user before every tool call, so dynamic loading doesn’t bypass consent.

---

### 8  |  Operational benefits

|Benefit|Explanation|
|---|---|
|**Token economy**|Fewer tool descriptions in the prompt → more room for user text and model reasoning.|
|**Faster cold‑start**|Two‑tool manifest serialises in milliseconds; large registries can add 200 ms+.|
|**Auditable boundaries**|Security reviewers can audit one BCP at a time; destructive actions can sit in a gated Admin BCP.|
|**Zero‑touch extensibility**|New GitHub API version? Just drop a new BCP folder; no edits to `server.ts`.|

Real‑world teams have started converging on the same idea—AWS Bedrock calls them _“action groups,”_ while the Cursor IDE community notes tool lists over ≈ 50 degrade accuracy. BCPs give the practice a clear, DDD‑inspired name.

---

### 9  |  Getting started checklist

1. **Clone the skeleton** (link at end).
2. **Pick a bounded context** you care about (e.g., GitHub Issues).
3. **Write one `*.tool.ts` per endpoint.** Export `tool`.
4. **Create `index.ts`** that globs the folder and exports `agent`.
5. **Run `npm start`**—Claude will see `listBCPs`. Type “load Issues BCP” and watch tools appear.
6. **Unit‑test packs** with plain function calls; integration‑test by chatting.

---

### 10  |  Conclusion

**Bounded Context Packs** turn an MCP server from a kitchen‑sink plugin into a **USB‑hub**: nothing plugged in until you need it, hot‑swappable, and clearly labelled. The pattern is trivial to implement—just folders and dynamic imports—but it solves prompt overload, upholds solid architecture principles (SRP, DRY, bounded contexts), and future‑proofs your integration.

So next time you wire an LLM into a sprawling API, resist the urge to register everything. Wrap each slice in a BCP, expose a loader tool, and let your model pull in capabilities only when the conversation genuinely calls for them. Your tokens—and your future self—will thank you.

---

# Pseudocode

## Typescript
### 1  Shared contracts (`core/types.ts`)

```ts
// ----------------- core/types.ts -----------------
export interface ToolHandler<P = any, R = any> {
  (params: P): R | Promise<R>;
}

export interface ToolDefinition<P = any, R = any> {
  /** snake_case action name (no domain prefix) */
  name: string;
  description: string;
  handler: ToolHandler<P, R>;
}

export interface BCP {               // bounded‑context pack barrel
  domain: string;                    // "Repos", "Issues", etc.
  tools: ToolDefinition[];
}
```

---

### 2  One tool file in a pack (`bcps/Repos/create.tool.ts`)

```ts
// -------- bcps/Repos/create.tool.ts --------
import type { ToolDefinition } from "../../core/types.js";

interface Params { name: string; private?: boolean }
interface Result { id: number; url: string }

export const tool: ToolDefinition<Params, Result> = {
  name: "create",
  description: "Create a GitHub repository. Params: {name, private?}",
  async handler({ name, private: isPrivate = false }) {
    // ▶️  Replace with real fetch("https://api.github.com/...").
    const repoId = Math.floor(Math.random() * 1e6);
    return { id: repoId, url: `https://github.com/me/${name}` };
  }
};
```

---

### 3  Pack barrel auto‑collecting tools (`bcps/Repos/index.ts`)

```ts
// -------- bcps/Repos/index.ts --------
import type { BCP, ToolDefinition } from "../../core/types.js";
import { globSync } from "fast-glob";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const files = globSync("*.tool.ts", { cwd: here });

const tools: ToolDefinition[] = [];
for (const f of files) {
  // dynamic import ESM style
  const mod: any = await import(resolve(here, f));
  if (mod.tool) tools.push(mod.tool);
}

export const bcp: BCP = { domain: "Repos", tools };
```

---

### 4  Core server (`core/server.ts`) — abridged but complete

```ts
// -------------- core/server.ts ----------------
import { createInterface } from "node:readline";
import { globSync } from "fast-glob";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { ToolDefinition, BCP } from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const toolRegistry = new Map<string, ToolDefinition>();

/* ---------- boilerplate helpers ---------- */
const rl = createInterface({ input: process.stdin });
function send(msg: any) { process.stdout.write(JSON.stringify(msg) + "\n"); }
function fq(domain: string, tool: ToolDefinition) { return `${domain}.${tool.name}`; }

function notifyChanged() {
  send({ jsonrpc: "2.0", method: "notifications/tools/list_changed", params: {} });
}

/* ---------- meta‑tool registration ---------- */
function registerTool(name: string, description: string, handler: any) {
  toolRegistry.set(name, { name, description, handler });
}

registerTool("System.listBCPs", "List available bounded‑context packs.", () => {
  const packs = globSync("../bcps/*/index.ts", { cwd: __dirname })
                .map(p => p.split("/").slice(-2)[0]);      // folder names
  return { packs };
});

registerTool("System.loadBCP", "Load a bounded‑context pack by domain name.", async ({ domain }) => {
  const path = globSync(`../bcps/${domain}/index.ts`, { cwd: __dirname })[0];
  if (!path) throw new Error(`No BCP named '${domain}'`);
  const { bcp }: { bcp: BCP } = await import(resolve(__dirname, path));
  bcp.tools.forEach(t => toolRegistry.set(fq(bcp.domain, t), t));
  notifyChanged();
  return { loaded: bcp.domain, count: bcp.tools.length };
});

/* ---------- JSON‑RPC LOOP ---------- */
rl.on("line", async line => {
  let req: any;
  try { req = JSON.parse(line); } catch { return; }

  if (req.method === "tools/list") {
    const list = [...toolRegistry.values()].map(t => ({ name: t.name, description: t.description }));
    return send({ jsonrpc: "2.0", id: req.id, result: list });
  }

  if (req.method === "tools/call") {
    const { name, arguments: args } = req.params;
    const tool = toolRegistry.get(name);
    if (!tool) return send({ jsonrpc: "2.0", id: req.id, error: { code: -32601, message: "tool not found" }});

    try {
      const res = await tool.handler(args);
      return send({ jsonrpc: "2.0", id: req.id, result: { content: [{ type:"json", text: JSON.stringify(res)}] }});
    } catch (e: any) {
      return send({ jsonrpc: "2.0", id: req.id, result: { isError: true, content:[{type:"text", text:e.message}] }});
    }
  }
});
```

---

### 5  Concrete conversation walk‑through (wire‑level)

|Step|JSON‑RPC from client|Server’s response / side‑effect|
|---|---|---|
|Boot|‑|server registers **only** System tools.|
|User: “What BCPs exist?”|`tools/call` → `System.listBCPs`|returns `{packs:["Repos","Issues"]}`|
|Claude decides to load repos|`tools/call` → `System.loadBCP` `{domain:"Repos"}`|imports Repos BCP, registers `Repos.create`, `Repos.list`, _sends `notifications/tools/list_changed`_|
|Client refreshes|`tools/list`|gets full manifest incl. Repos tools|
|Claude now creates repo|`tools/call` → `Repos.create` `{name:"analytics"}`|handler returns JSON; server wraps & sends result|

---

### 6  Adding a brand‑new BCP in three steps

```bash
# 1  scaffold
mkdir -p src/bcps/Pulls
echo "// todo" > src/bcps/Pulls/open.tool.ts
echo "// todo" > src/bcps/Pulls/index.ts

# 2  implement Pulls/open.tool.ts (mirror pattern of create.tool)
# 3  run server again – System.listBCPs now shows "Pulls"
```

**No edits** to `core/server.ts`.

---

### 7  Optional: unloading to shrink the manifest again

Add another meta‑tool:

```ts
registerTool("System.unloadBCP", "Remove a loaded pack", ({domain})=>{
  [...toolRegistry.keys()]
    .filter(name => name.startsWith(`${domain}.`))
    .forEach(name => toolRegistry.delete(name));
  notifyChanged();
  return { unloaded: domain };
});
```

Claude can call `System.unloadBCP("Repos")` when focus shifts away, keeping token use razor‑thin.

---

### 8  Unit‑testing a single tool (example with vitest)

```ts
import { tool as createRepo } from "../src/bcps/Repos/create.tool";

test("creates repo returns url", async () => {
  const res = await createRepo.handler({ name: "demo" });
  expect(res.url).toMatch(/github\.com/);
});
```

Because each tool is a pure function file, tests are straightforward—no server boot required.

---

### 9  Claude Desktop configuration snippet

```jsonc
{
  "mcpServers": {
    "github": {
      "command": "node",
      "args": ["./dist/core/server.js"]
    }
  }
}
```

Restart Claude Desktop; you’ll see a 🛠 icon with **System.listBCPs** and **System.loadBCP** ready for use.

---


### 1  Shared contracts (`core/types.py`)

```python
# ------------- core/types.py -----------------
from typing import Any, Callable, Dict, List, Protocol

class ToolHandler(Protocol):
    def __call__(self, params: Dict[str, Any]) -> Any: ...

class ToolDefinition(Dict[str, Any]):  # simple alias for clarity
    # expected keys: name:str, description:str, handler:ToolHandler
    ...

class BCP(Dict[str, Any]):
    # keys: domain:str, tools:List[ToolDefinition]
    ...
```

Python doesn’t need formal interfaces, but this shows expected keys for static checkers (mypy/pyright).

---

### 2  A single tool file (`bcps/repos/create_tool.py`)

```python
# ------- bcps/repos/create_tool.py ----------
from typing import Dict, Any
from core.types import ToolDefinition

def handler(params: Dict[str, Any]) -> Dict[str, Any]:
    name = params.get("name")
    if not name:
        raise ValueError("Param 'name' required")
    # Simulate GitHub REST call → fake repo id
    repo_id = hash(name) & 0xFFFF_FFFF
    return {"id": repo_id, "url": f"https://github.com/me/{name}"}

tool: ToolDefinition = {
    "name": "create",
    "description": "Create a GitHub repository. {name:str}",
    "handler": handler,
}
```

---

### 3  Pack barrel that auto‑collects tools (`bcps/repos/__init__.py`)

```python
# ------- bcps/repos/__init__.py -------------
import importlib
import pkgutil
from pathlib import Path
from core.types import BCP, ToolDefinition

_tools: list[ToolDefinition] = []

pkg_path = Path(__file__).parent            # this package directory
for mod_info in pkgutil.iter_modules([str(pkg_path)]):
    if mod_info.name.endswith("_tool"):
        mod = importlib.import_module(f"{__name__}.{mod_info.name}")
        if hasattr(mod, "tool"):
            _tools.append(mod.tool)

bcp: BCP = {"domain": "Repos", "tools": _tools}
```

Every `*_tool.py` file placed alongside this barrel is auto‑imported and its `tool` object collected—_no manual list_.

---

### 4  Core MCP server (`core/server.py`)

```python
# ------------- core/server.py ---------------
import asyncio, json, sys, importlib, glob
from pathlib import Path
from core.types import ToolDefinition, BCP

BASE_DIR = Path(__file__).resolve().parent.parent
BCP_DIR  = BASE_DIR / "bcps"

tools: dict[str, ToolDefinition] = {}

def fq(domain: str, t: ToolDefinition) -> str:
    return f"{domain}.{t['name']}"

def register_tool(name: str, description: str, handler):
    tools[name] = {"name": name, "description": description, "handler": handler}

def list_bcps():
    return [p.name for p in BCP_DIR.iterdir() if p.is_dir()]

async def load_bcp(domain: str):
    pkg_name = f"bcps.{domain.lower()}"
    try:
        mod: BCP = importlib.import_module(pkg_name)  # type: ignore
        bcp: BCP = getattr(mod, "bcp")
    except ModuleNotFoundError:
        raise ValueError(f"BCP '{domain}' not found")
    for t in bcp["tools"]:
        tools[fq(bcp['domain'], t)] = t
    notify_changed()
    return {"loaded": bcp["domain"], "count": len(bcp["tools"])}

def notify_changed():
    send({"jsonrpc": "2.0",
          "method": "notifications/tools/list_changed",
          "params": {}})

def send(obj): sys.stdout.write(json.dumps(obj) + "\n"); sys.stdout.flush()

# --- register meta tools at startup ---
register_tool(
    "System.listBCPs",
    "Return list of available bounded‑context packs.",
    lambda _p: {"packs": list_bcps()},
)

register_tool(
    "System.loadBCP",
    "Dynamically load a BCP: params {domain:str}",
    lambda p: asyncio.run(load_bcp(p.get("domain", ""))),
)

# --- minimal JSON‑RPC loop over stdin ----
async def main():
    for line in sys.stdin:
        if not line.strip(): continue
        req = json.loads(line)
        if req.get("method") == "tools/list":
            payload = [
                { "name": n, "description": t["description"] }
                for n, t in tools.items()
            ]
            send({"jsonrpc":"2.0","id":req["id"],"result":payload})

        elif req.get("method") == "tools/call":
            name = req["params"]["name"]
            args = req["params"].get("arguments", {})
            tool = tools.get(name)
            if not tool:
                send({"jsonrpc":"2.0","id":req["id"],
                      "error":{"code":-32601,"message":"tool not found"}})
                continue
            try:
                result = tool["handler"](args)
                send({"jsonrpc":"2.0","id":req["id"],
                      "result":{"content":[{"type":"json",
                                            "text":json.dumps(result)}]}})
            except Exception as e:
                send({"jsonrpc":"2.0","id":req["id"],
                      "result":{"isError":True,
                                "content":[{"type":"text", "text":str(e)}]}})
        # ignore others for brevity

if __name__ == "__main__":
    asyncio.run(main())
```

_Parse stdin line‑by‑line for simplicity; a production build would honour MCP’s Content‑Length framing._

---