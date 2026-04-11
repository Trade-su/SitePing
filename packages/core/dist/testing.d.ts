/**
 * Shared conformance test suite for `SitepingStore` implementations.
 *
 * Adapters import this and run it with their store factory to verify they
 * satisfy the full store contract — no need to write the same 20+ tests
 * from scratch.
 *
 * @example
 * ```ts
 * import { testSitepingStore } from '@siteping/core/testing'
 * import { DrizzleStore } from '../src/index.js'
 *
 * testSitepingStore(() => new DrizzleStore(mockDb))
 * ```
 */
import type { SitepingStore } from "./types.js";
/**
 * Run the full `SitepingStore` conformance test suite.
 *
 * @param factory — called before each test to create a fresh, empty store instance.
 */
export declare function testSitepingStore(factory: () => SitepingStore): void;
