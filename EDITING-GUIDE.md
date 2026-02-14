# How to Edit Your Study Website - Complete Guide

This guide will teach you how to make common changes to your study website. You don't need advanced coding skills - just follow these step-by-step instructions!

## Table of Contents

1. [Getting Started](#getting-started)
2. [Changing Passwords](#changing-passwords)
3. [Adding/Editing Announcements](#addingediting-announcements)
4. [Adding/Editing Assignments](#addingediting-assignments)
5. [Adding/Editing Resources](#addingediting-resources)
6. [Adding External Links](#adding-external-links)
7. [Changing Colors and Styling](#changing-colors-and-styling)
8. [Adding Videos](#adding-videos)
9. [Updating Download Links](#updating-download-links)
10. [Common Issues and Solutions](#common-issues-and-solutions)

---

## Getting Started

### Tools You'll Need

1. **Text Editor** - Choose one:
   - VS Code (recommended) - Download free from https://code.visualstudio.com
   - Sublime Text
   - Notepad++ (Windows)
   - TextEdit (Mac - set to plain text mode)

2. **Web Browser** - Any modern browser (Chrome, Firefox, Safari, Edge)

3. **GitHub Account** - For hosting files and website

### Understanding File Structure

Your website has these main files:
```
study-website/
├── index.html           ← Landing page
├── class1.html          ← Class 1 page
├── class2.html          ← Class 2 page  
├── class3.html          ← Class 3 page
├── videos.html          ← Video library
├── downloads.html       ← Download center
├── links.html           ← External links
└── styles.css           ← All styling/colors
```

---

## Changing Passwords

Each class has its own password. Here's how to change them:

### Step 1: Open the Class File

Open the class file you want to edit (e.g., `class1.html`) in your text editor.

### Step 2: Find the Password Line

Search for this line (usually near the bottom of the file):
```javascript
const CLASS_PASSWORD = 'class1pass';
```

### Step 3: Change the Password

Replace the text between the quotes:
```javascript
const CLASS_PASSWORD = 'MyNewPassword123';  // Your new password
```

### Step 4: Save and Test

1. Save the file (Ctrl+S or Cmd+S)
2. Open the file in your browser
3. Test that the new password works

**⚠️ Important Notes:**
- Keep the single quotes `' '` around the password
- Don't use special characters like `'` or `"` in your password
- Make sure to update each class file separately

---

## Adding/Editing Announcements

Announcements appear at the top of each class page.

### To Add a New Announcement

1. Open the class file (e.g., `class1.html`)

2. Find the Announcements section:
```html
<!-- 2. ANNOUNCEMENTS -->
<div class="content-section">
    <h2>📢 Announcements</h2>
```

3. Add a new announcement by copying this template:
```html
<div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; margin-bottom: 1rem; border-radius: 0.25rem;">
    <p style="margin: 0;"><strong>Your Title (Date):</strong> Your announcement text goes here.</p>
</div>
```

### Example - Adding a Test Announcement

```html
<div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; margin-bottom: 1rem; border-radius: 0.25rem;">
    <p style="margin: 0;"><strong>Test Next Week (Feb 20, 2026):</strong> Remember to revise chapters 1-5 for the upcoming test on Friday.</p>
</div>
```

### Announcement Colors

Change the background color for different types of announcements:

- **Yellow (warning/reminder):** `background-color: #fef3c7; border-left: 4px solid #f59e0b;`
- **Blue (information):** `background-color: #dbeafe; border-left: 4px solid #3b82f6;`
- **Green (success/positive):** `background-color: #d1fae5; border-left: 4px solid #10b981;`
- **Red (urgent/important):** `background-color: #fee2e2; border-left: 4px solid #ef4444;`

---

## Adding/Editing Assignments

### To Add a New Assignment

1. Find the Assignments section in your class file:
```html
<!-- 3. ASSIGNMENTS -->
<div class="content-section">
    <h2>📝 Current Assignments</h2>
```

2. Copy this template and paste it in the download-list:
```html
<div class="download-item">
    <div class="download-info">
        <h4>Assignment Title Here</h4>
        <p><strong>Due: February 28, 2026</strong> • Format: PDF or DOCX • Subject: English</p>
    </div>
    <a href="LINK-TO-YOUR-FILE" class="download-btn">Download</a>
</div>
```

### To Edit Due Dates

Simply change the date in the `<strong>Due:</strong>` section:
```html
<p><strong>Due: March 15, 2026</strong> • Format: PDF or DOCX • Subject: Maths</p>
```

### To Remove an Old Assignment

Delete the entire `<div class="download-item">...</div>` block for that assignment.

---

## Adding/Editing Resources

Resources follow the same structure as assignments.

### To Add a New Resource

1. Find the Resources section:
```html
<!-- 4. RESOURCES -->
<div class="content-section">
    <h2>📚 Class Resources</h2>
```

2. Add a new resource item:
```html
<div class="download-item">
    <div class="download-info">
        <h4>Your Resource Title</h4>
        <p>Brief description of the resource • Format: PDF</p>
    </div>
    <a href="YOUR-GITHUB-LINK-HERE" class="download-btn">Download</a>
</div>
```

### Example - Adding a Vocabulary List

```html
<div class="download-item">
    <div class="download-info">
        <h4>Year 9 Vocabulary List</h4>
        <p>Essential words for IGCSE English • Format: PDF</p>
    </div>
    <a href="https://github.com/username/repo/raw/main/vocab-list.pdf" class="download-btn">Download</a>
</div>
```

---

## Adding External Links

External links appear in the "Practice & Learning Tools" section.

### To Add a New Link

1. Find the links section in your class file:
```html
<!-- QUICK LINKS TO EXTERNAL PLATFORMS -->
<div class="content-section">
    <h2>🔗 Practice & Learning Tools</h2>
```

2. Add a new link using this template:
```html
<li class="link-item">
    <a href="https://www.website-url-here.com" target="_blank">
        <div class="link-info">
            <h4>Website Name</h4>
            <p>Brief description of what students will find</p>
        </div>
        <span class="link-arrow">→</span>
    </a>
</li>
```

### Example - Adding BBC Bitesize

```html
<li class="link-item">
    <a href="https://www.bbc.co.uk/bitesize" target="_blank">
        <div class="link-info">
            <h4>BBC Bitesize</h4>
            <p>Revision materials for English and Maths</p>
        </div>
        <span class="link-arrow">→</span>
    </a>
</li>
```

### Example - Adding Specific NoRedInk Class

If you have a specific class code for NoRedInk:
```html
<li class="link-item">
    <a href="https://www.noredink.com/classes/YOUR-CLASS-CODE" target="_blank">
        <div class="link-info">
            <h4>NoRedInk - Our Class</h4>
            <p>Complete this week's grammar assignment</p>
        </div>
        <span class="link-arrow">→</span>
    </a>
</li>
```

---

## Changing Colors and Styling

All colors are controlled in the `styles.css` file.

### To Change Main Colors

1. Open `styles.css` in your text editor

2. Find the color variables at the top:
```css
:root {
    --primary-color: #2563eb;      /* Main blue */
    --secondary-color: #1e40af;    /* Darker blue */
    --accent-color: #3b82f6;       /* Light blue */
    --text-dark: #1f2937;          /* Dark text */
    --text-light: #6b7280;         /* Light text */
    --bg-light: #f9fafb;           /* Light background */
}
```

3. Replace the color codes with new ones:

**Popular Color Schemes:**

**Professional Blue (default):**
```css
--primary-color: #2563eb;
--secondary-color: #1e40af;
```

**Warm Orange:**
```css
--primary-color: #ea580c;
--secondary-color: #c2410c;
```

**Fresh Green:**
```css
--primary-color: #059669;
--secondary-color: #047857;
```

**Deep Purple:**
```css
--primary-color: #7c3aed;
--secondary-color: #6d28d9;
```

**Find More Colors:**
Visit https://tailwindcss.com/docs/customizing-colors to browse color options.

---

## Adding Videos

Videos are stored in `videos.html`.

### To Add a YouTube Video

1. Get your YouTube video ID:
   - Go to your video on YouTube
   - The ID is the part after `v=` in the URL
   - Example: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Video ID is: `dQw4w9WgXcQ`

2. Open `videos.html` and find a video section

3. Copy this template:
```html
<div class="video-card">
    <h4>Video Title Here</h4>
    <p>Brief description of the video</p>
    <div class="video-wrapper">
        <iframe 
            src="https://www.youtube.com/embed/YOUR-VIDEO-ID-HERE" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    </div>
</div>
```

4. Replace `YOUR-VIDEO-ID-HERE` with your actual video ID

### Example - Adding a Grammar Tutorial

```html
<div class="video-card">
    <h4>Understanding Sentence Structure</h4>
    <p>Learn about simple, compound, and complex sentences</p>
    <div class="video-wrapper">
        <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    </div>
</div>
```

---

## Updating Download Links

All download links should point to files in your GitHub repository.

### GitHub File Link Format

```
https://github.com/YOUR-USERNAME/YOUR-REPO-NAME/raw/main/path/to/file.pdf
```

### Step-by-Step: Creating a Download Link

1. **Upload file to GitHub:**
   - Go to your repository
   - Navigate to the folder (e.g., `assignments/`)
   - Click "Add file" → "Upload files"
   - Upload your PDF/DOCX file

2. **Get the file link:**
   - Click on the file you just uploaded
   - Click the "Raw" button
   - Copy the URL from your browser

3. **Add link to your HTML:**
```html
<a href="https://github.com/username/repo/raw/main/assignments/assignment1.pdf" 
   class="download-btn">Download</a>
```

### Organizing Files in GitHub

Recommended folder structure:
```
your-repo/
├── assignments/
│   ├── class1-assignment1.pdf
│   ├── class2-assignment1.pdf
│   └── class3-assignment1.pdf
├── resources/
│   ├── english-guide.pdf
│   ├── maths-worksheets.pdf
│   └── grammar-guide.pdf
└── templates/
    └── essay-template.docx
```

---

## Common Issues and Solutions

### Issue: Password Not Working

**Solution:**
1. Check for typos in the password
2. Make sure quotes are correct: `'password'` not `"password"`
3. Clear your browser cache (Ctrl+Shift+Del)
4. Try in a private/incognito window

### Issue: Download Link Not Working

**Solution:**
1. Verify the GitHub URL includes `/raw/` not `/blob/`
2. Check file is public in GitHub repository
3. Test link in new browser tab

### Issue: Video Not Showing

**Solution:**
1. Verify video ID is correct
2. Check video is not private on YouTube
3. Ensure you're using embed URL: `youtube.com/embed/ID`

### Issue: Changes Not Showing on Website

**Solution:**
1. Clear browser cache
2. Do a "hard refresh": Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Wait a few minutes for GitHub Pages to update
4. Check you uploaded the correct file

### Issue: Styling Looks Broken

**Solution:**
1. Verify `styles.css` is in the same folder as HTML files
2. Check for typos in color codes (must start with `#`)
3. Make sure you didn't accidentally delete a closing `}`

---

## Quick Reference - Most Common Tasks

### Add an Announcement
```html
<div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; margin-bottom: 1rem; border-radius: 0.25rem;">
    <p style="margin: 0;"><strong>Title:</strong> Your message here.</p>
</div>
```

### Add an Assignment
```html
<div class="download-item">
    <div class="download-info">
        <h4>Assignment Name</h4>
        <p><strong>Due: DATE</strong> • Format: PDF • Subject: English</p>
    </div>
    <a href="YOUR-LINK" class="download-btn">Download</a>
</div>
```

### Add a Link
```html
<li class="link-item">
    <a href="URL" target="_blank">
        <div class="link-info">
            <h4>Site Name</h4>
            <p>Description</p>
        </div>
        <span class="link-arrow">→</span>
    </a>
</li>
```

### Change Password
```javascript
const CLASS_PASSWORD = 'NewPassword';
```

---

## Getting Help

If you're stuck:

1. **Read error messages carefully** - they often tell you exactly what's wrong
2. **Check the original files** - compare your edited version to the original
3. **Test in stages** - make one change at a time, then test
4. **Use browser developer tools** - Right-click → Inspect to see errors
5. **Search online** - Copy error messages into Google

---

## Tips for Success

✅ **DO:**
- Make one change at a time and test
- Keep a backup copy of working files
- Use descriptive file names
- Test in multiple browsers
- Save frequently (Ctrl+S / Cmd+S)

❌ **DON'T:**
- Delete lines you don't understand
- Change file names without updating links
- Edit files directly on GitHub (download, edit locally, then upload)
- Forget to save before testing

---

## Next Steps

Once you're comfortable with basic editing:
1. Set up Firebase for student file uploads (see FIREBASE-SETUP.md)
2. Customize the color scheme to match your school
3. Add your class-specific content
4. Create a backup system for important files

Remember: It's almost impossible to break things permanently - you can always re-download the original files and start again!
