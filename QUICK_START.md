# ⚡ Quick Start - Deploy in 15 Minutes

## 🎯 Goal
Deploy your form for FREE and save all responses to Google Sheets

---

## ✅ Step-by-Step Checklist

### Part 1: Set Up Google Sheets (5 minutes)

- [ ] 1. Go to https://script.google.com
- [ ] 2. Click "New Project"
- [ ] 3. Copy ALL code from `google-apps-script.js`
- [ ] 4. Paste it into the script editor
- [ ] 5. Click "Deploy" → "New deployment"
- [ ] 6. Click ⚙️ (gear icon) → Select "Web app"
- [ ] 7. Settings:
  - Description: "Activity Form Backend"
  - Execute as: **Me**
  - Who has access: **Anyone**
- [ ] 8. Click "Deploy"
- [ ] 9. Click "Authorize access" → Choose your Google account
- [ ] 10. Click "Advanced" → "Go to [project name] (unsafe)" → "Allow"
- [ ] 11. **COPY THE WEB APP URL** (looks like: https://script.google.com/macros/s/ABC.../exec)

### Part 2: Update Your Form (2 minutes)

- [ ] 1. Open `script_with_sheets.js`
- [ ] 2. Find line 5: `const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE';`
- [ ] 3. Replace `'PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE'` with your URL from Part 1, step 11
- [ ] 4. Save the file
- [ ] 5. Rename `script_with_sheets.js` to `script.js` (replace the old one)

### Part 3: Deploy to GitHub Pages (8 minutes)

- [ ] 1. Go to https://github.com
- [ ] 2. Sign up / Log in
- [ ] 3. Click "+" → "New repository"
- [ ] 4. Repository name: `activity-rating-form`
- [ ] 5. Make it **Public**
- [ ] 6. Click "Create repository"
- [ ] 7. Click "uploading an existing file"
- [ ] 8. Drag and drop these files:
  - `index.html`
  - `script.js` (the updated one!)
  - `admin.html`
  - `README.md`
- [ ] 9. Click "Commit changes"
- [ ] 10. Go to "Settings" → "Pages"
- [ ] 11. Source: **Deploy from a branch**
- [ ] 12. Branch: **main** → **/ (root)**
- [ ] 13. Click "Save"
- [ ] 14. Wait 1-2 minutes
- [ ] 15. Refresh the page - you'll see: "Your site is live at https://YOUR-USERNAME.github.io/activity-rating-form/"

---

## 🎉 You're Done!

### Your Form URL:
```
https://YOUR-USERNAME.github.io/activity-rating-form/
```

### View Responses:
1. Go to https://script.google.com
2. Click on your project
3. Click "Executions" to see logs
4. Or go to https://drive.google.com → Find "Activity Rating Responses" spreadsheet

---

## 🧪 Test It

1. Open your form URL
2. Enter a test name
3. Rate a few activities
4. Submit
5. Check your Google Sheet - the response should appear!

---

## 🔧 Troubleshooting

### "Responses not appearing in Google Sheets"
- Check browser console (F12) for errors
- Make sure you copied the FULL URL (ends with `/exec`)
- Verify the script is deployed as "Anyone" can access
- Check "Executions" tab in Apps Script for errors

### "Form not loading on GitHub Pages"
- Wait 2-3 minutes after deployment
- Check Settings → Pages shows "Your site is published"
- Try clearing browser cache
- Make sure all files are in the root folder (not in a subfolder)

### "Authorization required" error
- Re-deploy the script
- Make sure you authorized with the correct Google account
- Check that "Who has access" is set to "Anyone"

---

## 📊 View Your Data

### Option 1: Google Sheets
- Go to Google Drive
- Find "Activity Rating Responses" spreadsheet
- All responses appear in real-time!

### Option 2: Admin Panel
- Open: `https://YOUR-USERNAME.github.io/activity-rating-form/admin.html`
- View responses saved in localStorage (backup)

---

## 🎨 Customize

### Change form title:
Edit `index.html` line 80-81

### Add/remove activities:
Edit `script.js` - the `activities` object

### Change colors:
Edit `index.html` - search for `#667eea` and `#764ba2`

---

## 📱 Share Your Form

Send this link to anyone:
```
https://YOUR-USERNAME.github.io/activity-rating-form/
```

Works on:
- ✅ Desktop computers
- ✅ Phones (iOS & Android)
- ✅ Tablets
- ✅ Any modern browser

---

## 💡 Pro Tips

1. **Custom Domain**: In GitHub Settings → Pages, you can add a custom domain
2. **Download Data**: In Google Sheets, File → Download → CSV
3. **Analytics**: Add Google Analytics to track visitors
4. **Backup**: Responses are saved to BOTH Google Sheets AND localStorage

---

## 🆘 Need Help?

- GitHub Pages: https://docs.github.com/pages
- Google Apps Script: https://developers.google.com/apps-script
- Issues? Check browser console (F12) for errors

---

**Total Time: ~15 minutes**
**Cost: $0.00 (100% Free Forever)**

🎉 **Enjoy your form!**
