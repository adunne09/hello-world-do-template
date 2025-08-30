# Wrangler to Alchemy Migration Guide

This document outlines the migration from Wrangler configuration to Alchemy Infrastructure-as-Code.

## What was migrated

### Wrangler Configuration
- **Worker**: `hello-world-do-template` with entry point `src/index.ts`  
- **Durable Object**: `MyDurableObject` with SQLite storage migrations
- **Compatibility Date**: `2025-04-01`
- **Observability**: Enabled

### Alchemy Configuration
- **Worker**: Configured with `url: true` for workers.dev deployment
- **Durable Object**: Configured with `sqlite: true` for automatic migration handling
- **Bindings**: `MY_DURABLE_OBJECT` binding maintained

## Key Changes

### Automatic Features
- ✅ **Migrations**: Alchemy automatically handles Durable Object migrations with `sqlite: true`
- ✅ **Observability**: Built into Alchemy, no explicit configuration needed  
- ✅ **Source Maps**: Handled automatically by Alchemy build process

### Configuration Mapping
| Wrangler | Alchemy | Notes |
|----------|---------|--------|
| `name` | `Worker.name` | Direct mapping |
| `main` | `Worker.entrypoint` | Direct mapping |
| `durable_objects.bindings` | `Worker.bindings` | Uses `DurableObjectNamespace` |
| `compatibility_date` | `Worker.compatibilityDate` | Direct mapping |
| `migrations.new_sqlite_classes` | `sqlite: true` | Automatic handling |

### Unsupported/Changed Features
- **Routes**: Use `url: true` for workers.dev URLs or `domains` for custom routing
- **Crons**: Configure separately in Cloudflare dashboard
- **Upload Source Maps**: Automatic in Alchemy

## Usage

### New Scripts
```bash
npm run alchemy:dev     # Development mode
npm run alchemy:deploy  # Deploy to Cloudflare  
npm run alchemy:run     # Read-only validation
```

### Authentication
Run `alchemy login` or set environment variables:
- `CLOUDFLARE_API_TOKEN` (recommended)
- `CLOUDFLARE_API_KEY` + `CLOUDFLARE_EMAIL`

### Development Workflow
1. **Development**: `npm run alchemy:dev`
2. **Deploy**: `npm run alchemy:deploy`  
3. **Validate**: `npm run alchemy:run`

## Manual Steps Required

1. **Authentication**: Run `alchemy login` to authenticate with Cloudflare
2. **Environment Variables**: Set up any required environment variables  
3. **Testing**: Verify the deployment works as expected
4. **Cleanup**: Remove `wrangler.json` after verifying the migration

## Files Created

- `alchemy.run.ts` - Main Alchemy configuration
- `resources-report.json` - Migration analysis report  
- `alchemy-plan.json` - Alchemy patterns and mapping plan
- `MIGRATION.md` - This documentation

## Support

For issues with the migration:
- [Alchemy Documentation](https://alchemy.run/)
- [Alchemy GitHub](https://github.com/sam-goodwin/alchemy)