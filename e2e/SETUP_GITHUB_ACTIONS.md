# GitHub Actions Setup Guide

This guide will help you set up GitHub Actions to automatically run your E2E tests online for free.

## Prerequisites

- GitHub account
- Repository on GitHub: https://github.com/akomapahealth/akomapa-health
- Code pushed to GitHub

## Setup Steps

### 1. Push Code to GitHub

The GitHub Actions workflow file is already created at `.github/workflows/e2e-tests.yml`. You just need to push your code to GitHub:

```bash
git add .
git commit -m "Add E2E tests with GitHub Actions"
git push origin main
```

### 2. Enable GitHub Actions

1. Go to your GitHub repository: https://github.com/akomapahealth/akomapa-health
2. Click on the "Actions" tab
3. GitHub Actions should be enabled by default
4. If prompted, click "Enable GitHub Actions"
5. View workflow runs: https://github.com/akomapahealth/akomapa-health/actions

### 3. View Test Results

Once you push your code, GitHub Actions will automatically:
- Run tests on every push to `main` or `develop` branches
- Run tests on every pull request to `main` or `develop` branches
- Run tests daily at 2 AM UTC (scheduled)
- Run tests manually using "workflow_dispatch" (if needed)

### 4. Access Test Results

1. Go to the "Actions" tab: https://github.com/akomapahealth/akomapa-health/actions
2. Click on any workflow run to see test results
3. Click on a specific job to see detailed test output
4. Download test artifacts (screenshots, videos, traces) from the workflow run
5. View workflow runs: https://github.com/akomapahealth/akomapa-health/actions/workflows/e2e-tests.yml

## Workflow Configuration

The workflow is configured to:
- Run tests on multiple operating systems (Ubuntu, Windows, macOS)
- Run tests on multiple browsers (Chrome, Firefox, Safari)
- Build the application before running tests
- Upload test results and reports as artifacts
- Comment on pull requests with test results
- Generate test summaries

## Test Matrix

The workflow runs tests on:
- **Operating Systems**: Ubuntu, Windows, macOS
- **Browsers**: Chrome, Firefox, Safari (WebKit)
- **Total Jobs**: 7 test jobs (reduced from 9 for faster feedback)

## Artifacts

Test artifacts are automatically uploaded and include:
- Test results (screenshots, videos, traces)
- HTML test reports
- Test execution logs

Artifacts are retained for:
- Test results: 30 days
- Test reports: 7 days

## Notifications

### Email Notifications

GitHub automatically sends email notifications when:
- Tests fail
- Tests are fixed
- Workflow runs complete

Configure notifications in:
- Repository Settings > Notifications: https://github.com/akomapahealth/akomapa-health/settings/notifications
- Your GitHub account settings: https://github.com/settings/notifications

### Pull Request Comments

The workflow automatically comments on pull requests with:
- Test execution status
- Link to detailed test results
- Instructions to download test artifacts

## Scheduled Tests

Tests run automatically every day at 2 AM UTC. You can modify the schedule in `.github/workflows/e2e-tests.yml`:

```yaml
schedule:
  - cron: '0 2 * * *'  # Daily at 2 AM UTC
```

## Manual Test Execution

You can manually trigger tests by:
1. Going to the "Actions" tab: https://github.com/akomapahealth/akomapa-health/actions
2. Selecting "E2E Tests" workflow
3. Clicking "Run workflow"
4. Selecting the branch to test
5. Clicking "Run workflow"
6. Or go directly to: https://github.com/akomapahealth/akomapa-health/actions/workflows/e2e-tests.yml

## Cost

### Public Repositories
- **Free**: Unlimited minutes
- **No cost**: Completely free

### Private Repositories
- **Free**: 2,000 minutes per month
- **Additional**: $0.008 per minute after free tier
- **Estimated**: ~33 hours of test execution per month free

## Troubleshooting

### Tests Fail to Start

1. Check that the workflow file exists at `.github/workflows/e2e-tests.yml`
2. Verify that GitHub Actions is enabled for your repository: https://github.com/akomapahealth/akomapa-health/settings/actions
3. Check the workflow logs for errors: https://github.com/akomapahealth/akomapa-health/actions

### Tests Timeout

1. Increase timeout in workflow file:
   ```yaml
   timeout-minutes: 60
   ```

2. Reduce test matrix size:
   ```yaml
   matrix:
     os: [ubuntu-latest]
     browser: [chromium]
   ```

### Build Fails

1. Check that all dependencies are in `package.json`
2. Verify that the build command works locally
3. Check workflow logs for build errors

### Tests Fail in CI but Pass Locally

1. Check for environment differences
2. Verify that test dependencies are installed
3. Check for timing issues
4. Review CI logs for errors

## Monitoring

### View Test History

1. Go to "Actions" tab: https://github.com/akomapahealth/akomapa-health/actions
2. View all workflow runs
3. Filter by status (success, failure, cancelled)
4. View test trends over time
5. View workflow details: https://github.com/akomapahealth/akomapa-health/actions/workflows/e2e-tests.yml

### Test Status Badge

The test status badge is already configured in README.md:

```markdown
![E2E Tests](https://github.com/akomapahealth/akomapa-health/workflows/E2E%20Tests/badge.svg)
```

- **Repository**: `akomapahealth/akomapa-health`
- **Repository URL**: https://github.com/akomapahealth/akomapa-health
- **Badge URL**: https://github.com/akomapahealth/akomapa-health/workflows/E2E%20Tests/badge.svg
- **View Badge**: The badge appears in the README at the top of the Testing section

## Best Practices

1. **Run Tests on Every Push**: Catch issues early
2. **Run Tests on Pull Requests**: Verify changes before merging
3. **Monitor Test Results**: Check test results regularly
4. **Fix Failing Tests**: Address test failures promptly
5. **Optimize Test Performance**: Reduce test execution time
6. **Update Test Snapshots**: Keep visual regression tests up to date

## Next Steps

1. Push your code to GitHub: https://github.com/akomapahealth/akomapa-health
2. Verify that tests run automatically: https://github.com/akomapahealth/akomapa-health/actions
3. Check test results in the Actions tab
4. Set up email notifications (see `e2e/EMAIL_NOTIFICATIONS_SETUP.md`)
5. Test status badge is already configured in README.md
6. Monitor test results over time: https://github.com/akomapahealth/akomapa-health/actions/workflows/e2e-tests.yml

## Repository Links

- **Repository**: https://github.com/akomapahealth/akomapa-health
- **Actions**: https://github.com/akomapahealth/akomapa-health/actions
- **Workflow**: https://github.com/akomapahealth/akomapa-health/actions/workflows/e2e-tests.yml
- **Badge**: https://github.com/akomapahealth/akomapa-health/workflows/E2E%20Tests/badge.svg
- **Settings**: https://github.com/akomapahealth/akomapa-health/settings
- **Notifications**: https://github.com/akomapahealth/akomapa-health/settings/notifications

## Additional Resources

- GitHub Actions Documentation: https://docs.github.com/actions
- Playwright CI/CD Guide: https://playwright.dev/docs/ci
- GitHub Actions Marketplace: https://github.com/marketplace?type=actions

