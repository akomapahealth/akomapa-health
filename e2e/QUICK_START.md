# Quick Start Guide - Homepage E2E Tests

## Prerequisites
- Node.js installed
- Dependencies installed: `npm install`
- Playwright browsers installed: `npx playwright install`

## Quick Commands

### Start Development Server
```bash
npm run dev
```

### Run All Tests
```bash
npm run test:e2e
```

### Run Tests in UI Mode (Recommended)
```bash
npm run test:e2e:ui
```

### Run Tests on Specific Browser
```bash
# Chrome
npm run test:e2e:chrome

# Firefox
npm run test:e2e:firefox

# Safari/WebKit
npm run test:e2e:webkit

# Mobile
npm run test:e2e:mobile
```

### Run Specific Test Suite
```bash
# Responsive tests
npm run test:e2e:responsive

# Interactive features
npm run test:e2e:interactive

# Content verification
npm run test:e2e:content

# Cross-browser compatibility
npm run test:e2e:cross-browser

# Visual regression
npm run test:e2e:visual
```

### Debug Tests
```bash
# Run in debug mode
npm run test:e2e:debug

# Run in headed mode (see browser)
npm run test:e2e:headed
```

### Update Visual Snapshots
```bash
npm run test:e2e:update-snapshots
```

### View Test Report
```bash
npx playwright show-report
```

## Test Structure

```
e2e/
├── homepage-responsive.spec.ts          # Responsive layout tests
├── homepage-interactive-features.spec.ts # Interactive features tests
├── homepage-content-verification.spec.ts # Content verification tests
├── homepage-cross-browser.spec.ts       # Cross-browser compatibility tests
├── homepage-visual-regression.spec.ts   # Visual regression tests
├── helpers.ts                           # Test helper functions
├── README.md                            # Detailed documentation
├── TEST_SUMMARY.md                      # Test summary
└── QUICK_START.md                       # This file
```

## Test Coverage

- **390 total tests** across 5 test files
- **6 browser/device configurations**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari, Tablet
- **8 viewport sizes**: Mobile (3), Tablet (2), Desktop (3)
- **5 main test categories**: Responsive, Interactive, Content, Cross-Browser, Visual

## Common Issues

### Tests Fail to Start
- Ensure dev server is running: `npm run dev`
- Check port 3000 is available
- Verify Playwright browsers are installed: `npx playwright install`

### Flaky Tests
- Increase wait times in test files
- Check for race conditions
- Verify selectors are stable

### Visual Regression Failures
- Update snapshots if changes are intentional: `npm run test:e2e:update-snapshots`
- Check for browser-specific rendering differences

## Next Steps

1. Run tests: `npm run test:e2e:ui`
2. Review test results
3. Fix any failures
4. Update snapshots if needed
5. Integrate into CI/CD pipeline

## Support

For detailed information, see:
- `e2e/README.md` - Full documentation
- `e2e/TEST_SUMMARY.md` - Test summary
- Playwright docs: https://playwright.dev

