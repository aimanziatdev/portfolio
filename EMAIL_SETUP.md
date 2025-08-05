# Email Setup Guide

## Option 1: EmailJS (Recommended)

### Step 1: Sign up for EmailJS
1. Go to [emailjs.com](https://emailjs.com)
2. Create a free account
3. Verify your email

### Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Note your **Template ID**

### Step 4: Update Your Code
1. Replace `YOUR_USER_ID` in script.js with your EmailJS User ID
2. Replace `YOUR_SERVICE_ID` with your Service ID
3. Replace `YOUR_TEMPLATE_ID` with your Template ID

### Step 5: Find Messages
- **Location**: EmailJS Dashboard → "Email Logs"
- **Email**: Messages will be sent to your connected email
- **Real-time**: You'll receive emails instantly

## Option 2: Formspree (Easier)

### Step 1: Sign up for Formspree
1. Go to [formspree.io](https://formspree.io)
2. Create a free account
3. Verify your email

### Step 2: Create Form
1. Click "New Form"
2. Give it a name (e.g., "Portfolio Contact")
3. Note your **Form ID**

### Step 3: Update HTML
Add this to your form tag:
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Step 4: Find Messages
- **Location**: Formspree Dashboard → "Submissions"
- **Email**: Messages sent to your verified email
- **Real-time**: Instant notifications

## Option 3: Netlify Forms (If hosting on Netlify)

### Step 1: Add netlify attribute
```html
<form id="contactForm" netlify>
```

### Step 2: Find Messages
- **Location**: Netlify Dashboard → "Forms"
- **Email**: Can be forwarded to your email
- **Real-time**: Instant notifications

## Testing Your Setup

1. Fill out the contact form
2. Submit the form
3. Check your email service dashboard
4. Verify you received the message

## Troubleshooting

- **No emails received**: Check spam folder
- **Form not working**: Check browser console for errors
- **Service not found**: Verify your IDs are correct
- **Template issues**: Check EmailJS template syntax

## Security Notes

- Never expose API keys in client-side code
- Use environment variables for production
- Consider rate limiting for spam protection
- Validate all inputs server-side 