# Module Resolution Fix for @payroll-pro/data

## Issue
Next.js cannot resolve `@payroll-pro/data` module when importing Prisma client.

## Solution Applied

### 1. Updated `apps/web/tsconfig.json`
Added path aliases to include monorepo libraries:
```json
"paths": {
  "@/*": ["./src/*"],
  "@payroll-pro/ui": ["../../libs/ui/src/index.ts"],
  "@payroll-pro/utils": ["../../libs/utils/src/index.ts"],
  "@payroll-pro/data": ["../../libs/data/src/index.ts"]
}
```

### 2. Updated `apps/web/next.config.js`
Added webpack configuration to resolve path aliases:
```javascript
webpack: (config, { isServer }) => {
  const rootPath = path.resolve(__dirname, '../..');
  config.resolve.alias = {
    ...config.resolve.alias,
    '@payroll-pro/ui': path.resolve(rootPath, 'libs/ui/src/index.ts'),
    '@payroll-pro/utils': path.resolve(rootPath, 'libs/utils/src/index.ts'),
    '@payroll-pro/data': path.resolve(rootPath, 'libs/data/src/index.ts'),
  };
  
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve(rootPath, 'node_modules'),
  ];
  
  return config;
}
```

## Next Steps

1. **Install Dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Generate Prisma Client**:
   ```bash
   # Option 1: Using Prisma directly
   npx prisma generate --schema=libs/data/prisma/schema.prisma
   
   # Option 2: After installing dependencies, use npm script
   npm run db:generate
   ```

3. **Restart Next.js Dev Server**:
   ```bash
   npm run dev:web
   ```

## Troubleshooting

If you still see module resolution errors:

1. **Clear Next.js cache**:
   ```bash
   rm -rf apps/web/.next
   ```

2. **Verify Prisma Client is generated**:
   Check that `node_modules/.prisma/client` exists

3. **Check file paths**:
   Ensure the paths in `next.config.js` are correct relative to your workspace root

4. **Verify dependencies**:
   Make sure `@prisma/client` is installed in root `node_modules`

## Alternative: Direct Import (Temporary Workaround)

If the alias still doesn't work, you can temporarily use relative imports:

```typescript
// Instead of:
import { prisma } from '@payroll-pro/data';

// Use:
import { prisma } from '../../../../libs/data/src/index';
```

However, the webpack config should resolve this issue properly.


