# Test Suite Documentation

## Overview

This test suite validates the MDX rendering and route handling logic for the Nextra-based documentation site.

## Test Files

### 1. `navbar.test.tsx`

Tests the navbar component's route prefixing and rendering logic.

**Coverage:**

- ✅ Route prefixing for content without leading slash (`Algorithms` → `/docs/Algorithms`)
- ✅ Route prefixing for routes starting with `/` but not `/docs` or `/blog`
- ✅ Preserving routes already starting with `/docs`
- ✅ Preserving `/blog` routes unchanged
- ✅ Preserving root route `/`
- ✅ Handling empty routes gracefully
- ✅ Active state detection
- ✅ Nested children rendering
- ✅ Main navigation links
- ✅ Title/name fallback logic

### 2. `sidebar.test.tsx`

Tests the sidebar component's route prefixing and rendering logic.

**Coverage:**

- ✅ Same route prefixing logic as navbar
- ✅ Active state detection including child routes
- ✅ Details element auto-expansion for active paths
- ✅ Nested children rendering (multi-level)
- ✅ Docs section filtering
- ✅ CSS class application
- ✅ href vs route property handling

### 3. `mdx-rendering.test.ts`

Integration tests for MDX page rendering and route validation.

**Coverage:**

- ✅ Content directory route mapping
- ✅ URL path generation for MDX files
- ✅ Static params generation validation
- ✅ Route format validation rules
- ✅ MDX metadata/frontMatter structure validation

### 4. `test-utils.ts`

Shared testing utilities and mock factories.

**Utilities:**

- `createMockPageMap()` - Factory for creating test page maps
- `mockNextraComponents()` - Mock Nextra component implementations
- `mockNextNavigation()` - Helper for mocking Next.js navigation hooks

## Running Tests

### Install Dependencies

```bash
pnpm install
```

### Run All Tests

```bash
pnpm test
```

### Watch Mode (for development)

```bash
pnpm test:watch
```

### Coverage Report

```bash
pnpm test:coverage
```

## Key Validation Rules

### Route Prefixing Logic

The navbar and sidebar components apply the following transformations:

```typescript
// Rule 1: Routes without leading slash → prepend /docs/
"Algorithms" → "/docs/Algorithms"
"Algorithms/sorting" → "/docs/Algorithms/sorting"

// Rule 2: Routes with / but not /docs or /blog → prepend /docs
"/Algorithms" → "/docs/Algorithms"
"/System-Design" → "/docs/System-Design"

// Rule 3: Preserve routes already starting with /docs
"/docs/Algorithms" → "/docs/Algorithms" (unchanged)

// Rule 4: Preserve /blog routes
"/blog/my-post" → "/blog/my-post" (unchanged)

// Rule 5: Preserve root route
"/" → "/" (unchanged)
```

### Route Validation

All routes must:

1. Start with `/`
2. Not have trailing slashes (except root `/`)
3. Not contain double slashes (`//`)
4. Map correctly from content paths to URL paths

## Test Structure

```yaml
app/_components/
├── __tests__/
│   ├── navbar.test.tsx          # Navbar component tests
│   ├── sidebar.test.tsx         # Sidebar component tests
│   ├── mdx-rendering.test.ts    # MDX integration tests
│   └── test-utils.ts            # Shared test utilities
├── navbar.tsx
└── sidebar.tsx
```

## CI/CD Integration

Add to your CI pipeline:

```yaml
# .github/workflows/test.yml
- name: Run tests
  run: pnpm test

- name: Check coverage
  run: pnpm test:coverage
```

## Mocking Strategy

### Next.js Navigation

```typescript
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));
```

### Nextra Components

```typescript
jest.mock('nextra/components', () => ({
  Anchor: ({ href, children }: any) => <a href={href}>{children}</a>,
}));
```

### Nextra normalize-pages

```typescript
jest.mock('nextra/normalize-pages', () => ({
  normalizePages: ({ list }) => ({ topLevelNavbarItems: list }),
}));
```

## Coverage Goals

- **Statements:** > 80%
- **Branches:** > 75%
- **Functions:** > 80%
- **Lines:** > 80%

## Common Test Patterns

### Testing Route Transformation

```typescript
it('should transform route correctly', () => {
  mockUsePathname.mockReturnValue('/docs');
  const pageMap = [{ name: 'Test', route: 'Test' }];
  
  render(<Navbar pageMap={pageMap} />);
  
  const link = screen.getByText('Test');
  expect(link.closest('a')).toHaveAttribute('href', '/docs/Test');
});
```

### Testing Active State

```typescript
it('should mark active route', () => {
  mockUsePathname.mockReturnValue('/docs/Algorithms');
  const pageMap = [{ name: 'Algorithms', route: '/docs/Algorithms' }];
  
  render(<Sidebar pageMap={pageMap} />);
  
  expect(screen.getByText('Algorithms').closest('li')).toHaveClass('active');
});
```

## Troubleshooting

### Tests Not Finding Components

Ensure mocks are declared before imports:

```typescript
jest.mock('next/navigation');
// Then import component
import { Navbar } from '../navbar';
```

### TypeScript Errors

If you get type errors, ensure `@types/jest` is installed and tsconfig includes:

```json
{
  "compilerOptions": {
    "types": ["jest", "@testing-library/jest-dom"]
  }
}
```

## Future Enhancements

- [ ] Add E2E tests with Playwright
- [ ] Add visual regression tests
- [ ] Add accessibility tests with jest-axe
- [ ] Add performance tests
- [ ] Add snapshot testing for rendered components
