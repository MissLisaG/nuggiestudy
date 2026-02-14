# Assignment Submission System - Installation Guide

## ✅ What's Been Added to Your Site

Your existing study website now includes:
- **submit-assignment.html** - Student assignment submission page (replaces old index.html)
- **teacher-dashboard.html** - Teacher dashboard with class filtering
- **student.js** - JavaScript for student submissions
- **teacher.js** - JavaScript for teacher dashboard (not needed - code is inline)
- **Updated index.html** - Home page now links to assignment submission
- **Updated style.css** - Includes styling for submission forms

## 🔧 ONE IMPORTANT DATABASE UPDATE NEEDED

You need to add ONE more column to your Supabase database:

### Add "class_name" Column

1. Go to your Supabase project
2. Click **Table Editor** → Select **submissions** table
3. Click **"+ New Column"**
4. Fill in:
   - Column name: `class_name`
   - Type: `text`
   - Default value: leave blank
5. Click **"Save"**

That's it! This allows students to select their class when submitting.

## 📁 Files to Upload to GitHub

Upload ALL these files to your existing GitHub repository (replace old files):

**Required files:**
1. index.html (updated with assignment link)
2. submit-assignment.html (NEW - student submission)
3. teacher-dashboard.html (NEW - teacher view)
4. student.js (NEW)
5. style.css (updated)
6. styles.css (your existing stylesheet - keep it!)

**Keep your existing files:**
- class1.html, class2.html, class3.html
- videos.html
- downloads.html
- links.html

## 🌐 How It Works

**For Students:**
1. Go to your-site.github.io
2. Click "Submit Assignment" 
3. Select their class (Class 1, 2, or 3)
4. Fill in name, email, assignment title
5. Upload file
6. Click Submit

**For You (Teacher):**
1. Go to your-site.github.io/teacher-dashboard.html
2. See all submissions with stats
3. Filter by class if needed
4. Download files directly

## 🔗 Navigation Structure

```
index.html (Home)
├── Class 1, 2, 3 (password-protected)
├── Videos
├── Downloads
├── Links
└── Submit Assignment → submit-assignment.html
    └── Teacher Dashboard → teacher-dashboard.html
```

## 🎨 Customization

To change class names, edit:
- **submit-assignment.html** - Student dropdown options (lines ~13-17)
- **teacher-dashboard.html** - Teacher filter options (lines 205-207)
- **index.html** - Home page class cards

## ⚠️ Important Notes

- The assignment system uses the SAME Supabase credentials already in the files
- Students don't need passwords to submit (by design)
- Teacher dashboard has no password (you may want to add this later)
- All files are already configured and ready to use
- Just add the "class_name" column and upload to GitHub!

## 🚀 Quick Start Checklist

- [ ] Add "class_name" column to submissions table in Supabase
- [ ] Upload all files to GitHub repository
- [ ] Test student submission at your-site/submit-assignment.html
- [ ] Test teacher dashboard at your-site/teacher-dashboard.html
- [ ] Verify files download correctly

Done! Your integrated study site with assignment submission is ready! 🎉
