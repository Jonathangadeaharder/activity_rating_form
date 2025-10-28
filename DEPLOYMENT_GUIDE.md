# 🚀 Deployment Guide - Free Options

## Option 1: GitHub Pages + Google Sheets (RECOMMENDED) ⭐

### Why this is best:
- ✅ 100% Free
- ✅ Easy to set up
- ✅ Responses saved to Google Sheets
- ✅ No server needed
- ✅ Custom domain support

### Setup Steps:

#### Part A: Deploy to GitHub Pages

1. **Create a GitHub account** (if you don't have one)
   - Go to https://github.com
   - Sign up for free

2. **Create a new repository**
   - Click "New repository"
   - Name it: `activity-rating-form`
   - Make it Public
   - Click "Create repository"

3. **Upload your files**
   - Click "uploading an existing file"
   - Drag and drop all files from `activity_rating_form` folder
   - Click "Commit changes"

4. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main → / (root)
   - Click Save

5. **Your form is live!**
   - URL: `https://YOUR-USERNAME.github.io/activity-rating-form/`

#### Part B: Save Responses to Google Sheets

1. **Create a Google Apps Script**
   - Go to https://script.google.com
   - Click "New Project"
   - Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Create header row if needed
    if (sheet.getLastRow() === 0) {
      const headers = ['Timestamp', 'Name', ...Object.keys(data.ratings)];
      sheet.appendRow(headers);
    }
    
    // Add response
    const row = [
      new Date().toLocaleString(),
      data.name,
      ...Object.values(data.ratings)
    ];
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Form submission endpoint is working!');
}
```

2. **Create a Google Sheet**
   - Click "Extensions" → "Apps Script" → "Project Settings"
   - Or create new sheet at https://sheets.google.com

3. **Deploy the script**
   - Click "Deploy" → "New deployment"
   - Type: Web app
   - Execute as: Me
   - Who has access: Anyone
   - Click "Deploy"
   - Copy the Web App URL

4. **Update your form**
   - Edit `script.js` in your form
   - Replace the `saveResponse()` function:

```javascript
// Save response to Google Sheets
async function saveResponse(response) {
    const SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE'; // Paste your URL here
    
    try {
        const result = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response)
        });
        console.log('Response saved to Google Sheets');
    } catch (error) {
        console.error('Error saving to Google Sheets:', error);
        // Fallback to localStorage
        const responses = JSON.parse(localStorage.getItem('activityResponses') || '[]');
        response.timestamp = new Date().toISOString();
        responses.push(response);
        localStorage.setItem('activityResponses', JSON.stringify(responses));
    }
}
```

---

## Option 2: Netlify + Netlify Forms 🌐

### Setup:

1. **Create Netlify account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Deploy your site**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository
   - Click "Deploy"

3. **Enable Netlify Forms**
   - Add this to your `index.html` form tag:
   ```html
   <form id="ratingForm" netlify>
   ```

4. **View responses**
   - Go to your site dashboard → Forms
   - Download as CSV

---

## Option 3: Vercel + Supabase 🔥

### Why Vercel + Supabase:
- ✅ Free hosting
- ✅ Real-time database
- ✅ API included
- ✅ More powerful than localStorage

### Setup:

1. **Deploy to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Click Deploy

2. **Create Supabase account**
   - Go to https://supabase.com
   - Create new project (free tier)

3. **Create a table**
   ```sql
   CREATE TABLE responses (
     id SERIAL PRIMARY KEY,
     name TEXT,
     timestamp TIMESTAMP DEFAULT NOW(),
     ratings JSONB
   );
   ```

4. **Update your JavaScript**
   - Install Supabase client
   - Add to your `script.js`:

```javascript
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
)

async function saveResponse(response) {
  const { data, error } = await supabase
    .from('responses')
    .insert([response])
  
  if (error) console.error('Error:', error)
  else console.log('Saved:', data)
}
```

---

## Option 4: Simple - Just GitHub Pages 📄

### If you want the simplest solution:

1. Deploy to GitHub Pages (see Option 1, Part A)
2. Keep using localStorage
3. Users can export their own data as CSV
4. You manually collect CSV files from users

**Pros:** Super simple, no backend needed
**Cons:** Data stays in browser, not centralized

---

## 📊 Comparison Table

| Option | Difficulty | Centralized Data | Real-time | Best For |
|--------|-----------|------------------|-----------|----------|
| GitHub Pages + Sheets | ⭐⭐ | ✅ | ❌ | Most users |
| Netlify Forms | ⭐ | ✅ | ❌ | Quick setup |
| Vercel + Supabase | ⭐⭐⭐ | ✅ | ✅ | Advanced users |
| GitHub Pages only | ⭐ | ❌ | ❌ | Testing |

---

## 🎯 My Recommendation

**For you:** Use **GitHub Pages + Google Sheets**

Why?
1. Completely free forever
2. Easy to set up (15 minutes)
3. All responses in one Google Sheet
4. Can share sheet with others
5. Export to Excel/CSV anytime
6. No coding knowledge needed for data analysis

---

## 🔒 Security Notes

- Google Sheets: Anyone with the form can submit, but only you can view responses
- Netlify: Built-in spam protection
- Supabase: Row-level security policies available
- GitHub Pages: Static files only, very secure

---

## 📞 Need Help?

1. GitHub Pages: https://pages.github.com
2. Google Apps Script: https://developers.google.com/apps-script
3. Netlify: https://docs.netlify.com
4. Supabase: https://supabase.com/docs

---

**Ready to deploy?** Start with Option 1 (GitHub Pages + Google Sheets) - it's the easiest and most reliable!
