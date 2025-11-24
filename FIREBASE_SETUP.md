# Firebase Setup Guide

## Prerequisites
- Node.js 18.x or higher
- Firebase CLI installed (`npm install -g firebase-tools`)
- A Firebase account

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name and follow the setup wizard
4. Enable Google Analytics (optional)

## Step 2: Enable Firebase Services

### Authentication
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Click Save

### Firestore Database
1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Production mode** (we'll deploy security rules later)
4. Select your preferred location
5. Click **Enable**

### Storage
1. Go to **Storage**
2. Click **Get started**
3. Use default security rules (we'll deploy custom rules later)
4. Select the same location as Firestore
5. Click **Done**

## Step 3: Configure Web App

1. In Project Settings → General, scroll to "Your apps"
2. Click the web icon `</>`
3. Register app with a nickname (e.g., "Scholarship Exam Site")
4. **Copy the Firebase configuration object**
5. Create a `.env` file in your project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 4: Create Admin User

1. In Firebase Console, go to **Authentication** → **Users**
2. Click **Add user**
3. Enter email and password for admin account
4. Click **Add user**
5. **Copy the User UID** (you'll need this for security rules)

## Step 5: Update Security Rules

1. Open `firestore.rules` and replace `ADMIN_UID_1`, `ADMIN_UID_2` with your actual admin UID(s)
2. Open `storage.rules` and do the same
3. You can add multiple admin UIDs as comma-separated values in the array

## Step 6: Initialize Firestore Data

1. In Firestore Database console, click **Start collection**
2. Collection ID: `config`
3. Document ID: `exam_status`
4. Add fields:

```
phase: number = 0
phaseLabel: string = "Not Started"
examDate: timestamp = (choose a future date)
announcement: string = "Welcome! Exam details will be announced soon."
questionPaperURL: string = ""
resultsURL: string = ""
updatedAt: timestamp = (current time)
updatedBy: string = ""
```

## Step 7: Deploy to Firebase

1. Login to Firebase CLI:
```bash
firebase login
```

2. Initialize Firebase in your project:
```bash
firebase init
```
- Select: Hosting, Firestore, Storage
- Use existing project: Select your project
- Firestore rules: `firestore.rules`
- Firestore indexes: `firestore.indexes.json`
- Storage rules: `storage.rules`
- Public directory: `dist`
- Single-page app: Yes
- GitHub deployments: No (optional)

3. Update `.firebaserc` with your project ID

4. Build the application:
```bash
npm run build
```

5. Deploy everything:
```bash
firebase deploy
```

This will deploy:
- Firestore security rules
- Storage security rules
- Hosting (your website)

## Step 8: Test the Application

1. Visit your deployed URL (shown after deployment)
2. Test public pages: Home, About, FAQ, Contact
3. Go to `/admin/login` and login with your admin credentials
4. Test admin features:
   - Update exam phase
   - Upload question paper PDF
   - Upload results PDF
   - Publish announcements
   - Update exam date

## Security Considerations

⚠️ **Important Security Notes:**

1. **Admin UIDs**: Never commit actual admin UIDs to version control. Keep them in the deployed rules only.

2. **Environment Variables**: The `.env` file should be in `.gitignore`. Never commit Firebase config to public repos.

3. **Email Verification**: Consider enabling email verification in Firebase Auth settings for production.

4. **Rate Limiting**: Enable Firebase App Check for DDoS protection in production.

5. **Monitoring**: Set up Firebase Performance Monitoring and Crashlytics.

## Updating the Application

To deploy updates:

```bash
# Build the latest version
npm run build

# Deploy hosting only (faster)
firebase deploy --only hosting

# Deploy rules only
firebase deploy --only firestore:rules,storage:rules

# Deploy everything
firebase deploy
```

## Troubleshooting

### Authentication Issues
- Check that Email/Password is enabled in Firebase Console
- Verify admin credentials are correct
- Check browser console for detailed error messages

### Firestore Permission Denied
- Verify security rules are deployed (`firebase deploy --only firestore:rules`)
- Confirm admin UID is correctly set in rules
- Check document path is exactly `config/exam_status`

### Storage Upload Fails
- Verify storage rules are deployed
- Check file size (default max is 10MB in the upload component)
- Ensure file type is PDF

### Hosting 404 Errors
- Verify `firebase.json` rewrites are configured
- Check that `dist` folder contains `index.html`
- Re-deploy hosting: `firebase deploy --only hosting`

## Support

For Firebase-specific issues, consult:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)

For application-specific issues, check the browser console and Firebase Console logs.
