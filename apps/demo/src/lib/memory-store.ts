import { MemoryStore } from "@siteping/adapter-memory";

const RESET_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

// Singleton — survives Next.js hot reloads in dev
const g = globalThis as typeof globalThis & { __sitepingStore?: MemoryStore };
if (!g.__sitepingStore) {
  g.__sitepingStore = new MemoryStore();
  setInterval(() => g.__sitepingStore?.clear(), RESET_INTERVAL_MS);
}

export const memoryStore = g.__sitepingStore;
