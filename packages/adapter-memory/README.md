[![npm version](https://img.shields.io/npm/v/@siteping/adapter-memory)](https://www.npmjs.com/package/@siteping/adapter-memory)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)

# @siteping/adapter-memory

In-memory adapter for [Siteping](https://github.com/NeosiaNexus/SitePing) — zero dependencies, works everywhere.

Part of the [@siteping](https://github.com/NeosiaNexus/SitePing) monorepo.

## Install

```bash
npm install @siteping/adapter-memory
```

## Usage

### With the HTTP handler (server-side)

```ts
import { createSitepingHandler } from '@siteping/adapter-prisma'
import { MemoryStore } from '@siteping/adapter-memory'

const store = new MemoryStore()

export const { GET, POST, PATCH, DELETE, OPTIONS } = createSitepingHandler({ store })
```

### With the widget directly (client-side, no server)

```ts
import { initSiteping } from '@siteping/widget'
import { MemoryStore } from '@siteping/adapter-memory'

const store = new MemoryStore()

initSiteping({
  store,
  projectName: 'my-project',
})
```

## API

### `new MemoryStore()`

Creates a new in-memory store. Data lives in a plain array — lost on process restart.

### `store.clear()`

Remove all data and reset the ID counter.

## Use Cases

- **Testing** — fast, isolated store for unit and integration tests
- **Demos** — lightweight store that needs no database or localStorage
- **Prototyping** — get started without any infrastructure
- **Reference implementation** — simplest possible adapter for contributors

## Creating Your Own Adapter

`MemoryStore` is the simplest reference implementation of the `SitepingStore` interface. To create a new adapter (e.g. Drizzle, Supabase):

1. Implement the `SitepingStore` interface (6 methods)
2. Throw `StoreNotFoundError` on missing records in `updateFeedback` / `deleteFeedback`
3. Validate with the conformance test suite:

```ts
import { testSitepingStore } from '@siteping/core/testing'
import { MyStore } from '../src/index.js'

testSitepingStore(() => new MyStore())
```

## Related Packages

| Package | Description |
|---------|-------------|
| [`@siteping/widget`](https://www.npmjs.com/package/@siteping/widget) | Browser feedback widget |
| [`@siteping/adapter-prisma`](https://www.npmjs.com/package/@siteping/adapter-prisma) | Server-side Prisma adapter |
| [`@siteping/adapter-localstorage`](https://www.npmjs.com/package/@siteping/adapter-localstorage) | Client-side localStorage adapter |
| [`@siteping/cli`](https://www.npmjs.com/package/@siteping/cli) | CLI for project setup |

## License

[MIT](https://github.com/NeosiaNexus/SitePing/blob/main/LICENSE)
