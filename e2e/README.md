# E2E Testing

Simple end-to-end tests for Akomapa Health using Playwright. Tests verify that all main pages render correctly without errors.

## Test Coverage

The test suite (`pages-render.spec.ts`) performs basic smoke tests on all main pages:
- Verifies pages load without errors
- Checks page titles
- Validates header and main content are visible
- Ensures no critical console errors

### Pages Tested

- `/` (Home)
- `/about`
- `/about/team`
- `/programs`
- `/clinics`
- `/research`
- `/contact`
- `/donate`
- `/join`
- `/partner`
- `/roadmap`
- `/resources`

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

## Test Configuration

Tests are configured in `playwright.config.ts`:
- **Browser**: Chromium only
- **Reporter**: HTML and list
- **Retries**: 2 retries in CI, 0 locally
- **Screenshots**: On failure only

## Test Results

### Local Testing

After running tests locally, view the HTML report:
```bash
npx playwright show-report
```

Test results are saved in:
- `test-results/` - Test execution results and screenshots
- `playwright-report/` - HTML test report (generated after test run)

### GitHub Actions

Test results are automatically generated when tests run in GitHub Actions.

#### Viewing Test Results on GitHub

1. **Navigate to Actions**: Go to the "Actions" tab in your GitHub repository
2. **Select Workflow Run**: Click on the latest "E2E Tests" workflow run
3. **Download Artifacts**: 
   - Scroll down to the "Artifacts" section
   - Download `playwright-report` to view the HTML test report
   - Download `test-results` for screenshots and detailed results

#### Viewing the HTML Test Report

After downloading the `playwright-report` artifact:

1. Extract the zip file
2. Open `index.html` in your web browser
3. View detailed test results including:
   - Test execution timeline
   - Pass/fail status for each test
   - Screenshots (on failures)
   - Test traces (on retries)

#### Test Results in Pull Requests

When tests run on pull requests, a comment is automatically posted with:
- Test status (PASSED/FAILED)
- Link to the workflow run
- Instructions for viewing test artifacts

## CI/CD Integration

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Manual workflow dispatch

### CI Configuration

- **Browser**: Chromium only
- **OS**: Ubuntu Latest
- **Retries**: 2 automatic retries on failure
- **Screenshots**: Captured on test failures
- **Artifacts**: Test reports retained for 30 days

## Troubleshooting

### Tests Fail to Start
- Ensure the dev server is running: `npm run dev`
- Check that port 3000 is available
- Verify Playwright browsers are installed: `npx playwright install chromium`

### Tests Fail Locally
- Check that the application builds successfully: `npm run build`
- Verify environment variables are set correctly
- Review console errors in the test output

### Viewing Test Results
- Use `npx playwright show-report` to view local test results
- Download artifacts from GitHub Actions to view CI test results
- Check the workflow run logs for detailed error messages

## Notes

- Tests are minimal smoke tests focused on page rendering
- No image testing is performed (to avoid unnecessary API calls)
- Tests verify basic page structure and no critical errors
- Focus is on "does the page render without errors" rather than detailed feature testing
