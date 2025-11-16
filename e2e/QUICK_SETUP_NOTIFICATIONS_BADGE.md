# Quick Setup: Email Notifications & Test Badge

This is a quick reference guide for setting up email notifications and the test status badge.

## Email Notifications Setup (5 minutes)

### Step 1: Configure GitHub Notification Settings

1. Go to: **https://github.com/settings/notifications**
2. Scroll down to **"Actions"** section
3. Check **"Email"** checkbox
4. Select **"Failed workflow runs only"** (recommended)
5. Click **"Save"**

### Step 2: Configure Repository Notifications

1. Go to your repository on GitHub: https://github.com/akomapahealth/akomapa-health
2. Click **"Settings"** tab
3. Click **"Notifications"** in the left sidebar
4. Or go directly to: https://github.com/akomapahealth/akomapa-health/settings/notifications
5. Check **"Workflows"** under **"Events"**
6. Select **"Failed workflow runs only"**
7. Click **"Save"**

### Step 3: Verify Email Address

1. Go to: **https://github.com/settings/emails**
2. Verify your email address has a green checkmark
3. If not verified, click **"Verify"** and check your email

### Step 4: Test Notifications

1. Push a change that causes a test to fail (or wait for a real failure)
2. Check your email inbox
3. You should receive an email notification about the failed workflow

**That's it!** You will now receive email notifications when tests fail.

## Test Status Badge Setup (Already Done)

### Step 1: Verify Repository Information

1. Go to your repository on GitHub: https://github.com/akomapahealth/akomapa-health
2. Repository: `akomapahealth/akomapa-health`
3. The badge is already configured with the correct repository information

### Step 2: Verify the Badge in README.md

1. Open `README.md` in your project
2. Find the line with the test badge:
   ```markdown
   ![E2E Tests](https://github.com/akomapahealth/akomapa-health/workflows/E2E%20Tests/badge.svg)
   ```
3. The badge URL is already configured with the repository: `akomapahealth/akomapa-health`
4. Save the file if you made any changes

### Step 3: Push to GitHub

1. Commit and push your changes:
   ```bash
   git add README.md
   git commit -m "Update test badge URL"
   git push origin main
   ```

### Step 4: Verify the Badge

1. View your README on GitHub: https://github.com/akomapahealth/akomapa-health
2. The badge should appear and show the test status
3. The badge will update automatically when tests run
4. View Actions: https://github.com/akomapahealth/akomapa-health/actions

**That's it!** The badge is already configured and will display your test status.

## Quick Links

### Email Notifications
- GitHub Notification Settings: https://github.com/settings/notifications
- Repository Notification Settings: https://github.com/akomapahealth/akomapa-health/settings/notifications
- Email Settings: https://github.com/settings/emails

### Test Badge
- Badge URL: https://github.com/akomapahealth/akomapa-health/workflows/E2E%20Tests/badge.svg
- Repository: https://github.com/akomapahealth/akomapa-health
- GitHub Actions Badge Docs: https://docs.github.com/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge

## Troubleshooting

### Not Receiving Email Notifications

1. Check your spam folder
2. Verify your email address is verified in GitHub Settings
3. Ensure "Failed workflow runs only" is selected
4. Check that workflows are actually running (go to Actions tab)

### Badge Not Appearing

1. Ensure the workflow has run at least once
2. Check that the workflow name matches: "E2E Tests"
3. Verify the repository name and username are correct
4. Wait a few minutes for the badge to update

### Badge Shows "No Status"

1. Push a change to trigger the workflow
2. Wait for the workflow to complete
3. The badge should update within a few minutes

## Detailed Documentation

For more detailed information, see:
- **Email Notifications**: `e2e/EMAIL_NOTIFICATIONS_SETUP.md`
- **Test Badge**: `e2e/BADGE_SETUP.md`
- **GitHub Actions Setup**: `e2e/SETUP_GITHUB_ACTIONS.md`

## Next Steps

1. Set up email notifications (5 minutes)
2. Update the test badge in README.md (2 minutes)
3. Push your changes to GitHub
4. Verify everything is working
5. Monitor test results regularly

That's all you need to get started!

