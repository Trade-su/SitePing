# Changelog

## 0.4.2 (2026-04-04)

### Features

- Initial release
- `LocalStorageStore` implementing `SitepingStore` interface
- Data persists across page reloads via `localStorage`
- JSON date serialization/deserialization
- Graceful handling of corrupted data and storage limits
- `clear()` method for removing all persisted data
