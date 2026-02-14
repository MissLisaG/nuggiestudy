# Firebase Setup Guide - Student File Uploads

This guide will walk you through setting up Firebase to collect student assignment uploads on your website.

## Table of Contents

1. [What is Firebase?](#what-is-firebase)
2. [Why Use Firebase?](#why-use-firebase)
3. [Before You Begin](#before-you-begin)
4. [Step 1: Create a Firebase Project](#step-1-create-a-firebase-project)
5. [Step 2: Set Up Firebase Storage](#step-2-set-up-firebase-storage)
6. [Step 3: Set Up Firestore Database](#step-3-set-up-firestore-database)
7. [Step 4: Get Your Configuration](#step-4-get-your-configuration)
8. [Step 5: Add Firebase to Your Website](#step-5-add-firebase-to-your-website)
9. [Step 6: Configure Upload Code](#step-6-configure-upload-code)
10. [Step 7: View Submitted Files](#step-7-view-submitted-files)
11. [Troubleshooting](#troubleshooting)

---

## What is Firebase?

Firebase is a Google service that provides:
- **Storage** - Where student files are saved
- **Database** - Tracks who submitted what and when
- **Free tier** - Sufficient for most classroom use

---

## Why Use Firebase?

✅ **Pros:**
- Free for typical classroom usage
- Automatic file organization
- Track submission times
- View all submissions in one place
- Professional and reliable

❌ **Cons:**
- Requires some technical setup (this guide helps!)
- Students need internet connection
- Files are stored in Google's cloud (not on your computer)

**Alternatives:**
- Google Classroom (simpler but less customizable)
- Email submissions (simple but disorganized)
- Dropbox File Requests (middle ground)

---

## Before You Begin

### What You'll Need

1. **Google Account** - Free Gmail account
2. **Text Editor** - VS Code, Sublime Text, or similar
3. **30-45 minutes** - For initial setup
4. **Basic comfort with computers** - You don't need to be a programmer!

### Free Tier Limits

Firebase's free "Spark" plan includes:
- 1 GB storage
- 10 GB/month data transfer
- 50,000 database reads/day

**This is plenty for:**
- 3 classes
- ~100 total students
- Weekly assignments
- PDF/Word documents

---

## Step 1: Create a Firebase Project

### 1.1 Go to Firebase Console

Visit: https://console.firebase.google.com

Click **"Add project"** or **"Create a project"**

### 1.2 Name Your Project

```
Project name: study-hub-2026
```
Or use your school name, class name, etc.

Click **Continue**

### 1.3 Disable Google Analytics (Optional)

For a simple classroom setup, you don't need this.

Toggle **"Enable Google Analytics"** to OFF

Click **Continue**

### 1.4 Wait for Project Creation

This takes about 30 seconds. When done, click **Continue**.

---

## Step 2: Set Up Firebase Storage

Storage is where student files will be saved.

### 2.1 Open Storage

From your Firebase project:
1. Click **"Storage"** in the left sidebar (under "Build")
2. Click **"Get started"**

### 2.2 Set Security Rules

Choose **"Start in test mode"** for now (we'll secure it later)

Click **Next**

### 2.3 Choose Storage Location

Select a location close to your school:
- **us-central1** (United States)
- **europe-west1** (Europe)
- **asia-southeast1** (Asia)

Click **Done**

### 2.4 Update Security Rules

Click on the **"Rules"** tab

Replace the rules with this (prevents public access):

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Only allow uploads, not public downloads
      allow write: if request.auth == null 
                   && request.resource.size < 10 * 1024 * 1024  // 10MB limit
                   && request.resource.contentType.matches('application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      allow read: if false;  // Only you can read via Firebase Console
    }
  }
}
```

Click **Publish**

**What this does:**
- Allows anyone to upload (students don't need accounts)
- Limits file size to 10MB
- Only accepts PDF, DOC, and DOCX files
- Only you can view files (via Firebase Console)

---

## Step 3: Set Up Firestore Database

Firestore tracks submission metadata (who submitted what, when).

### 3.1 Create Database

1. Click **"Firestore Database"** in left sidebar
2. Click **"Create database"**

### 3.2 Choose Location

Select the **same location** you chose for Storage

Click **Next**

### 3.3 Security Rules

Choose **"Start in test mode"**

Click **Enable**

### 3.4 Update Security Rules

Click on the **"Rules"** tab

Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /submissions/{document} {
      // Allow anyone to create (submit)
      allow create: if request.resource.data.timestamp is timestamp
                    && request.resource.data.studentName is string
                    && request.resource.data.class is string;
      
      // Only authenticated users can read (that's you)
      allow read: if false;
    }
  }
}
```

Click **Publish**

---

## Step 4: Get Your Configuration

### 4.1 Go to Project Settings

1. Click the gear icon ⚙️ next to "Project Overview"
2. Click **"Project settings"**

### 4.2 Scroll to "Your apps"

Click the **web icon** `</>`

### 4.3 Register Your App

```
App nickname: Study Hub Website
```

**Don't** check "Set up Firebase Hosting"

Click **Register app**

### 4.4 Copy Configuration

You'll see code like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "study-hub-2026.firebaseapp.com",
  projectId: "study-hub-2026",
  storageBucket: "study-hub-2026.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

**Copy this entire block** - you'll need it in the next step!

Click **Continue to console**

---

## Step 5: Add Firebase to Your Website

Now we'll add Firebase to your class pages.

### 5.1 Open a Class File

Open `class1.html` in your text editor.

### 5.2 Add Firebase Scripts

Find the `</head>` closing tag and add these lines BEFORE it:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
```

### 5.3 Add Your Configuration

Find the opening `<script>` tag at the bottom of the file.

Add this code RIGHT AFTER the opening `<script>` tag:

```javascript
// Firebase Configuration
const firebaseConfig = {
  // PASTE YOUR CONFIG HERE (from Step 4.4)
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-PROJECT.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-PROJECT.appspot.com",
  messagingSenderId: "YOUR-SENDER-ID",
  appId: "YOUR-APP-ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();
```

**Replace the values with your actual config from Step 4.4**

---

## Step 6: Configure Upload Code

### 6.1 Replace Placeholder Code

In the same `class1.html` file, find this section:

```javascript
// Simulate upload (REPLACE THIS)
setTimeout(() => {
    statusDiv.style.backgroundColor = '#d1fae5';
    statusDiv.style.color = '#065f46';
    statusDiv.textContent = '✓ Upload successful!';
    document.getElementById('uploadForm').reset();
    setTimeout(() => { statusDiv.style.display = 'none'; }, 5000);
}, 1500);
```

### 6.2 Replace with Real Firebase Code

Delete the placeholder code above and replace it with:

```javascript
try {
    // Create unique filename
    const timestamp = new Date().toISOString();
    const sanitizedName = studentName.replace(/[^a-z0-9]/gi, '_');
    const fileName = `class1/${assignment}/${sanitizedName}_${timestamp}_${file.name}`;
    
    // Upload to Firebase Storage
    const storageRef = storage.ref(fileName);
    await storageRef.put(file);
    const downloadURL = await storageRef.getDownloadURL();
    
    // Save metadata to Firestore
    await db.collection('submissions').add({
        studentName: studentName,
        assignment: assignment,
        fileName: file.name,
        fileURL: downloadURL,
        class: 'class1',
        fileSize: file.size,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // Show success message
    statusDiv.style.backgroundColor = '#d1fae5';
    statusDiv.style.color = '#065f46';
    statusDiv.textContent = '✓ Upload successful! Your assignment has been submitted.';
    document.getElementById('uploadForm').reset();
    
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 5000);
    
} catch (error) {
    // Show error message
    statusDiv.style.backgroundColor = '#fee2e2';
    statusDiv.style.color = '#991b1b';
    statusDiv.textContent = '✗ Upload failed. Please try again or contact your teacher.';
    console.error('Upload error:', error);
}
```

### 6.3 Repeat for Other Classes

Do the exact same steps for `class2.html` and `class3.html`, but change:
- `class1` → `class2` or `class3` in the fileName path
- `'class1'` → `'class2'` or `'class3'` in the class field

---

## Step 7: View Submitted Files

### Option 1: Via Firebase Console (Recommended)

**View Files:**
1. Go to Firebase Console
2. Click **Storage** in sidebar
3. Navigate through folders: `class1/assignment1/`
4. Click a file to download it

**View Submission Details:**
1. Click **Firestore Database** in sidebar
2. Click **submissions** collection
3. See all submissions with student names, timestamps, etc.

### Option 2: Download All Files

1. Go to Storage in Firebase Console
2. Select multiple files (checkbox)
3. Click the three dots (⋮) menu
4. Click **Download**

### Option 3: Create an Admin Page (Advanced)

If you want a custom page to view submissions, you can create an admin dashboard. This requires:
- Firebase Authentication
- Protected admin page
- Custom code to list submissions

(This is beyond the scope of this guide, but search "Firebase admin dashboard" for tutorials)

---

## Troubleshooting

### Problem: "Permission Denied" Error

**Solution:**
1. Check your Storage rules are correct (Step 2.4)
2. Check your Firestore rules are correct (Step 3.4)
3. Make sure you published the rules

### Problem: Upload Succeeds but File Not Showing

**Solution:**
1. Wait 10-30 seconds, then refresh Firebase Console
2. Check you're looking in the right folder
3. Check browser console for errors (F12 → Console tab)

### Problem: "Firebase is not defined"

**Solution:**
1. Verify you added the Firebase scripts in `<head>` (Step 5.2)
2. Check for typos in script URLs
3. Make sure scripts load before your code

### Problem: File Size Too Large

**Solution:**
1. Check Storage rules allow large enough files
2. Current limit is 10MB - increase if needed:
```javascript
request.resource.size < 50 * 1024 * 1024  // 50MB limit
```

### Problem: Wrong File Type Accepted

**Solution:**
Modify Storage rules to accept different file types:
```javascript
// For images too:
request.resource.contentType.matches('application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document|image/jpeg|image/png')
```

### Problem: Can't Find Submitted Files

**Solution:**
1. Go to Storage in Firebase Console
2. Check folder structure: `class1/assignment1/`
3. Files are organized by class and assignment
4. Use the search function if needed

---

## Security Best Practices

### Current Setup Security

✅ **What's Secure:**
- Students can't view other students' files
- Students can't delete files
- File types are restricted
- File size is limited
- Only you (via Firebase Console) can view submissions

⚠️ **What's Not Perfect:**
- Anyone with the website URL can upload
- No student authentication

### To Make More Secure

**Add Password to Upload Form:**

Add this before the upload code:
```javascript
const uploadPassword = 'YourSecretPassword';
const enteredPassword = prompt('Enter upload password:');
if (enteredPassword !== uploadPassword) {
    alert('Incorrect password');
    return;
}
```

**Block Duplicate Submissions:**

Prevent students from submitting same assignment twice:
```javascript
// Check if already submitted
const existingSubmission = await db.collection('submissions')
    .where('studentName', '==', studentName)
    .where('assignment', '==', assignment)
    .where('class', '==', 'class1')
    .get();

if (!existingSubmission.empty) {
    alert('You have already submitted this assignment.');
    return;
}
```

---

## Cost and Usage Monitoring

### Check Usage

1. Go to Firebase Console
2. Click **Usage and billing** in left sidebar
3. Monitor:
   - Storage used
   - Downloads (transfer)
   - Database operations

### Typical Classroom Usage

**Example: 30 students, 10 assignments**
- Storage: ~300 MB (10 files per student × 1MB average)
- Transfer: ~3 GB/month (students downloading assignments)
- Database: ~1,000 operations/month

**This is well within the free tier!**

### If You Exceed Free Tier

Options:
1. Delete old files from previous years
2. Ask students to keep file sizes smaller
3. Upgrade to paid "Blaze" plan (pay only for what you use)
   - Storage: $0.026/GB/month
   - Transfer: $0.12/GB

---

## Organizing Submissions

### Folder Structure

Files are automatically organized:
```
Storage/
├── class1/
│   ├── assignment1/
│   │   ├── John_Smith_2026-02-14_essay.pdf
│   │   ├── Jane_Doe_2026-02-14_essay.pdf
│   │   └── ...
│   ├── assignment2/
│   └── ...
├── class2/
└── class3/
```

### Downloading All Submissions

**For One Assignment:**
1. Navigate to folder (e.g., `class1/assignment1/`)
2. Select all files (checkbox at top)
3. Download as ZIP

**For Entire Class:**
1. Go to that class folder
2. Download entire folder

### Grading Workflow Suggestion

1. Download all submissions for an assignment
2. Grade offline using your usual method
3. Upload feedback/grades to Google Classroom or email
4. Delete from Firebase after grading to save space (optional)

---

## Advanced Features (Optional)

### Email Notifications

Get email when students submit:

1. Go to Firebase Console → **Functions**
2. Use Cloud Functions to send email on new submission
3. Requires "Blaze" plan (paid tier)

### Automatic File Naming

Enforce consistent file naming:
```javascript
// In upload code, before upload:
const newFileName = `${assignment}_${studentName}_${new Date().toISOString().split('T')[0]}.pdf`;
```

### Submission Deadlines

Prevent late submissions:
```javascript
const dueDate = new Date('2026-02-28T23:59:59');
if (new Date() > dueDate) {
    alert('This assignment is past the due date. Contact your teacher to submit late work.');
    return;
}
```

---

## Complete Code Example

Here's what your final `class1.html` upload script should look like:

```html
<!-- Add before </head> -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>

<!-- In bottom <script> tag -->
<script>
// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR-API-KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();

// Password code (existing)
const CLASS_PASSWORD = 'class1pass';
// ... (rest of password code)

// Upload handler
document.getElementById('uploadForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const statusDiv = document.getElementById('uploadStatus');
    statusDiv.style.display = 'block';
    statusDiv.style.backgroundColor = '#dbeafe';
    statusDiv.style.color = '#1e40af';
    statusDiv.textContent = 'Uploading...';
    
    const studentName = document.getElementById('studentName').value;
    const assignment = document.getElementById('assignmentSelect').value;
    const file = document.getElementById('fileUpload').files[0];
    
    try {
        const timestamp = new Date().toISOString();
        const sanitizedName = studentName.replace(/[^a-z0-9]/gi, '_');
        const fileName = `class1/${assignment}/${sanitizedName}_${timestamp}_${file.name}`;
        
        const storageRef = storage.ref(fileName);
        await storageRef.put(file);
        const downloadURL = await storageRef.getDownloadURL();
        
        await db.collection('submissions').add({
            studentName: studentName,
            assignment: assignment,
            fileName: file.name,
            fileURL: downloadURL,
            class: 'class1',
            fileSize: file.size,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        statusDiv.style.backgroundColor = '#d1fae5';
        statusDiv.style.color = '#065f46';
        statusDiv.textContent = '✓ Upload successful!';
        document.getElementById('uploadForm').reset();
        
        setTimeout(() => { statusDiv.style.display = 'none'; }, 5000);
        
    } catch (error) {
        statusDiv.style.backgroundColor = '#fee2e2';
        statusDiv.style.color = '#991b1b';
        statusDiv.textContent = '✗ Upload failed. Please try again.';
        console.error('Upload error:', error);
    }
});
</script>
```

---

## Next Steps

After setup:
1. Test with a dummy file upload
2. Check Firebase Console to verify file appears
3. Add real assignment names to the dropdown
4. Update assignment download links
5. Share website with students

---

## Getting Help

**Firebase Documentation:**
- https://firebase.google.com/docs/storage
- https://firebase.google.com/docs/firestore

**Common Questions:**
- Search "Firebase storage upload" + your specific question
- Check Stack Overflow for Firebase questions

**Still Stuck?**
Check browser console (F12) for specific error messages - they usually tell you exactly what's wrong!

---

Remember: The first time setup is the hardest part. After this, collecting submissions is automatic!
