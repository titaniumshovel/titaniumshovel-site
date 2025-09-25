# Email Setup Guide for TitaniumShovel.com

## Overview
This guide outlines the most cost-efficient way to set up custom email hosting for the TitaniumShovel portfolio website, enabling professional email addresses like `chris@titaniumshovel.com`.

## Cost Comparison of Email Hosting Providers (2025)

| Provider | Monthly Cost | Annual Cost | Storage | Best For |
|----------|-------------|-------------|---------|----------|
| **Zoho Mail** (Free) | $0 | $0 | 5GB x 5 users | Starting out, testing |
| Zoho Mail (Paid) | $1.00 | $12 | 10GB per user | Scaling up |
| Namecheap Private Email | $0.91 | $10.88 | 2GB | Simple, reliable |
| Openprovider Email | $0.70 | $8.40 | Variable | Absolute lowest cost |
| Mailbox.org | $1.10 | $13.20 | 2GB | Privacy-focused |

## Recommended Solution: Zoho Mail (Free Tier)

### Why Zoho Mail?
- **Cost**: Free for up to 5 users
- **Professional**: Industry-standard email service
- **Features**: Web interface, mobile apps, IMAP/POP3 support
- **Scalability**: Easy upgrade path to paid plans
- **Reliability**: Established provider with good uptime

## Setup Instructions

### Step 1: Create Zoho Mail Account
1. Go to [zoho.com/mail](https://zoho.com/mail)
2. Click "Sign Up for Free"
3. Choose "Free Plan" (up to 5 users)
4. Create your Zoho account

### Step 2: Add Your Domain
1. In Zoho Mail admin panel, click "Add Domain"
2. Enter `titaniumshovel.com`
3. Choose verification method (TXT record recommended)
4. Zoho will provide DNS records to add

### Step 3: Update DNS Records
You'll need to add these records to your domain's DNS settings:

#### MX Records (for receiving email):
```
Priority: 10, Host: @, Value: mx.zoho.com
Priority: 20, Host: @, Value: mx2.zoho.com
Priority: 50, Host: @, Value: mx3.zoho.com
```

#### TXT Record (for verification):
```
Host: @, Value: [Zoho-provided verification string]
```

#### SPF Record (for email authentication):
```
Host: @, Value: v=spf1 include:zoho.com ~all
```

#### DKIM Record (for email security):
```
Host: [zoho-provided-selector]._domainkey
Value: [Zoho-provided DKIM string]
```

### Step 4: Create Email Accounts
1. After domain verification, create mailboxes:
   - `chris@titaniumshovel.com` (primary)
   - `info@titaniumshovel.com` (optional)
   - `contact@titaniumshovel.com` (optional)

### Step 5: Configure Email Clients

#### Web Access:
- URL: `mail.zoho.com`
- Login with your email and password

#### Mobile/Desktop Setup:
- **IMAP Server**: `imap.zoho.com` (Port: 993, SSL)
- **SMTP Server**: `smtp.zoho.com` (Port: 465, SSL)

## Website Integration

### Update Contact Information
Replace current email addresses in the following files:

#### index.html (Line ~418-420):
```html
<a href="mailto:chris@titaniumshovel.com" class="contact-method">
    <span class="contact-icon">📧</span>
    <span>chris@titaniumshovel.com</span>
</a>
```

#### projects.js (Line ~579):
```javascript
<a href="mailto:chris@titaniumshovel.com?subject=Collaborator Request: ${projectTitle}...
```

### Test Contact Form
1. Submit a test through the website contact form
2. Verify email delivery to new address
3. Test reply functionality

## Advanced Configuration

### Email Forwarding Setup
If you want to forward emails to an existing address:
1. Go to Zoho Mail Settings
2. Navigate to "Mail Forwarding"
3. Add your existing email as a forward destination

### Custom Email Signatures
Create professional signatures with:
- Name and title
- Company information
- Website and social links
- Professional headshot (optional)

### Mobile App Setup
Download Zoho Mail mobile app:
- iOS: Search "Zoho Mail" in App Store
- Android: Search "Zoho Mail" in Play Store
- Login with your titaniumshovel.com email

## Security Best Practices

### Enable Two-Factor Authentication
1. Go to Zoho Account Security settings
2. Enable 2FA with authenticator app
3. Save backup codes securely

### Regular Password Updates
- Use strong, unique passwords
- Consider password manager integration
- Enable account activity monitoring

## Troubleshooting

### Common Issues and Solutions

#### DNS Propagation Delays
- **Problem**: MX records not working immediately
- **Solution**: Wait 24-48 hours for global DNS propagation
- **Check**: Use `nslookup -type=MX titaniumshovel.com`

#### Email Not Receiving
1. Verify MX records are correctly set
2. Check spam/junk folders
3. Confirm SPF record is properly configured
4. Test with external email tester tools

#### Email Not Sending
1. Verify SMTP settings in email client
2. Check if ISP blocks port 25 (use 587 instead)
3. Ensure authentication is enabled
4. Verify DKIM record is set up

### Verification Commands
Test your email setup with these commands:

```bash
# Check MX records
nslookup -type=MX titaniumshovel.com

# Check SPF record
nslookup -type=TXT titaniumshovel.com

# Test email delivery
echo "Test email" | mail -s "Test Subject" chris@titaniumshovel.com
```

## Upgrade Path

### When to Upgrade to Paid Plan
Consider upgrading when you need:
- More than 5GB storage per user
- Additional users beyond the 5 free accounts
- Advanced features (calendar integration, etc.)
- Priority support

### Alternative Providers
If Zoho doesn't meet your needs:
1. **Namecheap Private Email**: Better support, slightly higher cost
2. **Google Workspace**: Full productivity suite, $6/user/month
3. **Microsoft 365**: Office integration, $4/user/month

## Maintenance

### Regular Tasks
- Monitor email storage usage
- Review and update DNS records if needed
- Keep Zoho account information current
- Test email delivery monthly

### Annual Review
- Evaluate if free plan still meets needs
- Consider upgrading for additional features
- Review security settings and passwords
- Check for new email hosting options

## Support Resources

### Zoho Mail Support
- Knowledge Base: [help.zoho.com/portal/en/kb/mail](https://help.zoho.com/portal/en/kb/mail)
- Community Forum: Zoho Mail Community
- Email Support: Available for paid plans

### DNS Management
- Contact your domain registrar for DNS help
- Many registrars provide step-by-step guides
- Consider using Cloudflare for advanced DNS management

---

**Implementation Timeline**: 30-60 minutes setup + 24-48 hours DNS propagation
**Total Cost**: $0/month with free Zoho plan
**Maintenance**: Minimal ongoing requirements