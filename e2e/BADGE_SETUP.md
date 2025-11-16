# Test Status Badge Setup Guide

This guide will help you add a test status badge to your README file.

## What is a Test Status Badge?

A test status badge is a visual indicator that shows the current status of your E2E tests. It displays whether tests are passing or failing and provides a quick way to check test status.

## Badge Format

The badge uses the following format:

```markdown
![E2E Tests](https://github.com/akomapahealth/akomapa-health/workflows/E2E%20Tests/badge.svg)
```

## Setup Steps

### 1. Get Your GitHub Username and Repository Name

1. **Go to your GitHub repository**
   - Navigate to your repository on GitHub
   - Repository URL: https://github.com/akomapahealth/akomapa-health
   - Repository: `akomapahealth/akomapa-health`

### 2. Verify the Badge URL

1. **Open README.md**
   - Locate the test status badge in the README
   - The badge URL should be: `![E2E Tests](https://github.com/akomapahealth/akomapa-health/workflows/E2E%20Tests/badge.svg)`

2. **Badge is Already Configured**
   - The badge URL is already set up with the correct repository
   - No changes needed unless you want to customize the badge
   - The workflow name `E2E%20Tests` is URL-encoded (E2E Tests)

### 3. Verify the Badge

1. **Push to GitHub**
   - Commit and push your changes to GitHub
   - The badge will appear in your README

2. **Check the Badge**
   - View your README on GitHub
   - The badge should display the current test status
   - The badge will update automatically when tests run

## Badge Examples

### Basic Badge

```markdown
![E2E Tests](https://github.com/akomapahealth/akomapa-health/workflows/E2E%20Tests/badge.svg)
```

### Badge with Branch

```markdown
![E2E Tests](https://github.com/akomapahealth/akomapa-health/workflows/E2E%20Tests/badge.svg?branch=main)
```

### Badge with Event

```markdown
![E2E Tests](https://github.com/akomapahealth/akomapa-health/workflows/E2E%20Tests/badge.svg?event=push)
```

## Badge Status

The badge will display different statuses:

- **Passing**: Green badge with "passing" text
- **Failing**: Red badge with "failing" text
- **No status**: Gray badge with "no status" text (if workflow hasn't run yet)

## Troubleshooting

### Badge Not Appearing

1. **Check Workflow Name**
   - Ensure the workflow name matches exactly: "E2E Tests"
   - Check for typos in the workflow name
   - Verify the workflow file is in `.github/workflows/e2e-tests.yml`

2. **Check Repository Name**
   - Verify the repository name is correct
   - Check for case sensitivity issues
   - Ensure the repository is public (badges work for private repos too, but may have limitations)

3. **Check Workflow Runs**
   - Ensure the workflow has run at least once
   - Check the Actions tab to verify workflows are running
   - Wait a few minutes for the badge to update

### Badge Shows "No Status"

1. **Workflow Not Run**
   - The badge will show "no status" if the workflow hasn't run yet
   - Push a change to trigger the workflow
   - Wait for the workflow to complete

2. **Workflow Name Mismatch**
   - Ensure the workflow name in the badge matches the workflow name in the YAML file
   - Check for spelling errors or extra spaces

### Badge Not Updating

1. **Cache Issues**
   - GitHub badges are cached for a few minutes
   - Wait a few minutes for the badge to update
   - Clear your browser cache if needed

2. **Workflow Not Running**
   - Check that the workflow is configured to run on the correct events
   - Verify the workflow file is in the correct location
   - Check workflow logs for errors

## Alternative Badge Styles

### Shields.io Badge

You can also use Shields.io for more customization:

```markdown
![E2E Tests](https://img.shields.io/github/workflow/status/akomapahealth/akomapa-health/E2E%20Tests?label=E2E%20Tests)
```

### Custom Badge

You can customize the badge with additional parameters:

```markdown
![E2E Tests](https://github.com/akomapahealth/akomapa-health/workflows/E2E%20Tests/badge.svg?branch=main&event=push)
```

## Best Practices

1. **Place Badge at Top**: Place the badge near the top of your README for visibility
2. **Use Consistent Naming**: Use consistent naming for workflows and badges
3. **Update Regularly**: Keep the badge URL updated if you change repository names
4. **Monitor Status**: Regularly check the badge status to ensure tests are passing

## Additional Resources

- GitHub Actions Badge Documentation: https://docs.github.com/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge
- Shields.io Badge Documentation: https://shields.io/
- GitHub Workflows Documentation: https://docs.github.com/actions

## Next Steps

1. Update the badge URL in your README
2. Push your changes to GitHub
3. Verify the badge appears and displays correctly
4. Monitor the badge status regularly
5. Update the badge if you change repository names

## Support

If you need help with the badge:
- Check GitHub Actions documentation
- Review workflow logs for errors
- Verify workflow configuration
- Check repository settings

