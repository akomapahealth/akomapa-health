# Email Notifications Setup Guide

This guide will help you set up email notifications for E2E test failures in GitHub Actions.

## Automatic Email Notifications (Default)

GitHub Actions automatically sends email notifications when workflows fail. However, you need to configure your GitHub notification settings to receive them.

## Step-by-Step Setup

### 1. Configure GitHub Notification Settings

1. **Go to GitHub Settings**
   - Click on your profile picture in the top right corner
   - Click on "Settings"

2. **Navigate to Notifications**
   - Click on "Notifications" in the left sidebar
   - Scroll down to "Actions" section

3. **Enable Email Notifications**
   - Check "Email" under "Actions"
   - Select your preferred notification frequency:
     - **All workflow runs**: Get notified for every workflow run
     - **Failed workflow runs only**: Get notified only when tests fail (recommended)
     - **Workflow runs on my watched repositories**: Get notified for repositories you're watching

4. **Configure Email Preferences**
   - Scroll to "Email notification preferences"
   - Ensure your email address is verified
   - Choose when to receive emails:
     - **On GitHub**: Only receive emails for activities on GitHub
     - **Email**: Receive emails for all activities
     - **Web and Email**: Receive notifications both on GitHub and via email

5. **Save Changes**
   - Click "Save" at the bottom of the page

### 2. Configure Repository-Level Notifications

1. **Go to Repository Settings**
   - Navigate to your repository on GitHub: https://github.com/akomapahealth/akomapa-health
   - Click on "Settings" tab
   - Click on "Notifications" in the left sidebar
   - Or go directly to: https://github.com/akomapahealth/akomapa-health/settings/notifications

2. **Enable Workflow Notifications**
   - Check "Workflows" under "Events"
   - Select notification preferences:
     - **Email**: Receive email notifications
     - **Web**: Receive notifications on GitHub
     - **Both**: Receive notifications via email and web

3. **Configure Workflow Notifications**
   - Under "Workflow notifications", select:
     - **All workflow runs**: Get notified for every workflow run
     - **Failed workflow runs only**: Get notified only when tests fail (recommended)

4. **Save Changes**
   - Click "Save" at the bottom of the page

### 3. Verify Email Address

1. **Check Email Verification**
   - Go to GitHub Settings > Emails
   - Verify that your email address is verified (green checkmark)
   - If not verified, click "Verify" and check your email

2. **Add Additional Email Addresses**
   - Click "Add email address"
   - Enter your email address
   - Verify the email address
   - Set as primary if desired

### 4. Test Notifications

1. **Trigger a Test Failure**
   - Make a small change to cause a test to fail
   - Push the change to GitHub
   - Wait for the workflow to run and fail

2. **Check Email**
   - Check your email inbox
   - You should receive an email notification about the failed workflow
   - The email will include:
     - Workflow name
     - Repository name
     - Link to the workflow run
     - Summary of the failure

### 5. Customize Notification Frequency

1. **GitHub Settings > Notifications**
   - Scroll to "Notification delivery"
   - Choose your preferred delivery method:
     - **Immediate**: Receive notifications immediately
     - **Daily digest**: Receive a daily summary of notifications
     - **Weekly digest**: Receive a weekly summary of notifications

2. **Repository Settings > Notifications**
   - Configure repository-specific notification preferences
   - Set up custom notification rules if needed
   - Repository notification settings: https://github.com/akomapahealth/akomapa-health/settings/notifications

## Enhanced Notification Workflow

The GitHub Actions workflow has been enhanced to provide better failure notifications:

### Features

- **Detailed Failure Reports**: Includes test failure details in notifications
- **Artifact Links**: Provides links to download test artifacts (screenshots, videos, traces)
- **Pull Request Comments**: Automatically comments on pull requests with test results
- **Test Summary**: Generates a summary of test results

### Workflow Configuration

The workflow is configured to:
- Send notifications on test failures
- Include test failure details in notifications
- Provide links to test artifacts
- Comment on pull requests with test results

## Notification Types

### Email Notifications

You will receive email notifications for:
- **Workflow failures**: When tests fail
- **Workflow successes**: When tests pass (if configured)
- **Workflow cancellations**: When workflows are cancelled
- **Workflow approvals**: When workflows require approval

### Web Notifications

You will receive web notifications on GitHub for:
- **Workflow runs**: All workflow runs
- **Test failures**: When tests fail
- **Pull request comments**: When workflows comment on pull requests

### Slack Notifications (Optional)

You can also set up Slack notifications:

1. **Install GitHub App for Slack**
   - Go to https://github.com/integrations/slack
   - Click "Install"
   - Follow the installation instructions

2. **Configure Slack Notifications**
   - Connect your GitHub account to Slack
   - Select the repositories you want to receive notifications for
   - Configure notification preferences

3. **Set Up Workflow Notifications**
   - The workflow will automatically send notifications to Slack
   - You can customize notification messages in the workflow file

## Troubleshooting

### Not Receiving Email Notifications

1. **Check Email Settings**
   - Verify your email address is verified in GitHub Settings
   - Check that email notifications are enabled for Actions
   - Ensure your email provider is not blocking GitHub emails

2. **Check Spam Folder**
   - GitHub emails may be in your spam folder
   - Add GitHub to your email whitelist
   - Check your email provider's spam settings

3. **Check Notification Preferences**
   - Verify that workflow notifications are enabled
   - Check that you're subscribed to the repository
   - Ensure notification frequency is set correctly

### Too Many Notifications

1. **Adjust Notification Frequency**
   - Set notifications to "Failed workflow runs only"
   - Use daily or weekly digest instead of immediate notifications
   - Unsubscribe from repositories you don't need notifications for

2. **Configure Repository Notifications**
   - Set repository-specific notification preferences
   - Unwatch repositories you don't need notifications for
   - Use notification filters to reduce noise

### Notifications Not Working

1. **Check Workflow Status**
   - Verify that workflows are running
   - Check that workflows are configured correctly
   - Ensure workflow files are in the correct location

2. **Check GitHub Status**
   - Check GitHub status page for any outages
   - Verify that GitHub Actions is working
   - Check for any service disruptions

## Best Practices

1. **Use Failed Workflow Runs Only**: Reduce notification noise by only receiving emails for failures
2. **Verify Email Address**: Ensure your email address is verified and up to date
3. **Check Spam Folder**: Regularly check your spam folder for GitHub notifications
4. **Set Up Filters**: Use email filters to organize GitHub notifications
5. **Monitor Regularly**: Check workflow runs regularly to catch issues early

## Additional Resources

- GitHub Notifications Documentation: https://docs.github.com/account-and-profile/managing-subscriptions-and-notifications-on-github
- GitHub Actions Documentation: https://docs.github.com/actions
- GitHub Email Settings: https://github.com/settings/emails
- GitHub Notification Settings: https://github.com/settings/notifications

## Next Steps

1. Configure your GitHub notification settings
2. Verify your email address
3. Test notifications by triggering a test failure
4. Set up additional notification channels (Slack, etc.) if needed
5. Monitor test results regularly

## Support

If you need help setting up email notifications:
- Check GitHub documentation
- Contact GitHub support
- Review workflow logs for errors
- Check email provider settings

