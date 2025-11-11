# E2E Testing for Homepage

This directory contains comprehensive end-to-end tests for the Akomapa Health homepage using Playwright.

## Test Coverage

### 1. Responsive Layout Tests (`homepage-responsive.spec.ts`)
- Tests homepage across multiple viewport sizes (mobile, tablet, desktop)
- Verifies layouts don't break on different screen sizes
- Checks for horizontal overflow issues
- Validates responsive grid layouts
- Tests mobile navigation menu

### 2. Interactive Features Tests (`homepage-interactive-features.spec.ts`)
- **Hero Section**: Slideshow, CTA buttons, scroll indicator
- **Impact Metrics**: Animated counters that trigger on scroll
- **Testimonials**: Carousel navigation (next/previous buttons, indicator dots)
- **Gallery**: Category filters, lightbox, show more/less functionality
- **Location Section**: Photo carousel navigation
- **Program Cards**: Modal opening, links
- **Header Navigation**: Desktop and mobile menu

### 3. Content Verification Tests (`homepage-content-verification.spec.ts`)
- Verifies all main sections are present
- Checks content text matches expected values
- Validates impact metrics display
- Tests testimonials content
- Verifies program information
- Checks location information
- Validates page metadata
- Tests accessibility (headings hierarchy, alt text)

### 4. Cross-Browser Compatibility Tests (`homepage-cross-browser.spec.ts`)
- Tests homepage on Chrome, Firefox, and Safari/WebKit
- Verifies consistent behavior across browsers
- Tests animations, carousels, and interactive features
- Validates responsive layouts on all browsers
- Checks image handling
- Tests form inputs
- Verifies scroll behavior

### 5. Visual Regression Tests (`homepage-visual-regression.spec.ts`)
- Takes screenshots of key sections
- Compares visual appearance across browsers
- Tests on desktop, tablet, and mobile viewports
- Screenshots of hero, programs, testimonials, gallery, and metrics sections

## Running Tests

### Run All Tests
```bash
npm run test:e2e
```

### Run Tests in UI Mode (Recommended for Development)
```bash
npm run test:e2e:ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:e2e:headed
```

### Run Tests in Debug Mode
```bash
npm run test:e2e:debug
```

### Run Specific Test Suites

#### Responsive Tests
```bash
npm run test:e2e:responsive
```

#### Interactive Features Tests
```bash
npm run test:e2e:interactive
```

#### Content Verification Tests
```bash
npm run test:e2e:content
```

#### Cross-Browser Tests
```bash
npm run test:e2e:cross-browser
```

#### Visual Regression Tests
```bash
npm run test:e2e:visual
```

### Run Tests on Specific Browsers

#### Chrome
```bash
npm run test:e2e:chrome
```

#### Firefox
```bash
npm run test:e2e:firefox
```

#### Safari/WebKit
```bash
npm run test:e2e:webkit
```

#### Mobile Browsers
```bash
npm run test:e2e:mobile
```

### Update Visual Snapshots
```bash
npm run test:e2e:update-snapshots
```

## Test Configuration

Tests are configured in `playwright.config.ts` with the following browsers and devices:

- **Desktop**: Chrome, Firefox, Safari/WebKit
- **Mobile**: Chrome (Pixel 5), Safari (iPhone 12)
- **Tablet**: iPad Pro

## Viewport Sizes Tested

- Mobile Small: 375x667 (iPhone SE)
- Mobile Medium: 390x844 (iPhone 12/13)
- Mobile Large: 428x926 (iPhone Pro Max)
- Tablet Portrait: 768x1024 (iPad)
- Tablet Landscape: 1024x768 (iPad Landscape)
- Desktop Small: 1280x720 (HD)
- Desktop Medium: 1440x900 (MacBook)
- Desktop Large: 1920x1080 (Full HD)

## Test Results

Test results are saved in:
- `test-results/` - Test execution results and screenshots
- `playwright-report/` - HTML test report (generated after test run)

View the HTML report:
```bash
npx playwright show-report
```

## CI/CD Integration

The tests are configured to run in CI environments with:
- Automatic retries (2 retries in CI)
- Screenshot on failure
- Video recording on failure
- Trace on first retry

Set the `CI` environment variable to enable CI mode:
```bash
CI=true npm run test:e2e
```

## Troubleshooting

### Tests Fail to Start
- Ensure the dev server is running: `npm run dev`
- Check that port 3000 is available
- Verify Playwright browsers are installed: `npx playwright install`

### Visual Regression Tests Fail
- Update snapshots if UI changes are intentional: `npm run test:e2e:update-snapshots`
- Check for browser-specific rendering differences
- Verify viewport sizes match expected dimensions

### Interactive Features Not Working
- Ensure JavaScript is enabled
- Check for console errors in the browser
- Verify animations have completed before assertions
- Increase wait times if needed

## Best Practices

1. **Wait for Elements**: Always wait for elements to be visible before interacting
2. **Use Specific Selectors**: Prefer role-based selectors (`getByRole`) over CSS selectors
3. **Handle Async Operations**: Wait for animations and API calls to complete
4. **Test Responsive**: Always test on multiple viewport sizes
5. **Cross-Browser Testing**: Verify functionality works on all supported browsers
6. **Visual Regression**: Update snapshots when UI changes are intentional

## Notes

- Tests are designed to be non-destructive (QA-focused)
- Tests verify responsiveness without changing button behavior or styles
- Tests check that layouts don't break on mobile devices
- Tests verify interactive features function correctly
- Tests validate content matches expected text

