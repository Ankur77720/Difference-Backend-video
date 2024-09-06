# Google Authentication with Passport.js in Node.js

This guide will walk you through setting up Google Authentication in a Node.js application using Passport.js.

## Prerequisites

- Node.js installed on your machine.
- A Google account to create OAuth credentials.

## Getting Started

### 1. Create a New Node.js Project

1. Open your terminal.
2. Navigate to the directory where you want to create your project.
3. Run the following commands to create a new Node.js project:

```bash
mkdir google-auth-passport
cd google-auth-passport
npm init -y
```

### 2. Install Required Dependencies

Install the necessary packages for your Node.js application:

```bash
npm install express passport passport-google-oauth20 express-session dotenv
```

### 3. Set Up Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Navigate to **APIs & Services**
4. Configure the OAuth consent screen (if not already done).
5. Navigate to **Credentials**.
6. Click on **Create Credentials** and select **OAuth 2.0 Client IDs**.
7. Set the **Authorized redirect URIs** to:

   ```
   http://localhost:3000/auth/google/callback
   ```

7. After creating your credentials, note down the **Client ID** and **Client Secret**.

### 4. Create a `.env` File

In the root of your project, create a `.env` file and add your Google Client ID and Client Secret:

```plaintext
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 5. Set Up the Express Application

#### 5.1. Create the `app.js` File

First, you need to create a file named `app.js` in the root of your project. This file will contain all the necessary code for setting up your Express application.

#### 5.2. Load Environment Variables

In order to securely manage your credentials, load the environment variables from the `.env` file you created earlier:

```javascript
require('dotenv').config();
```

This line will load your Google Client ID and Client Secret from the `.env` file.

#### 5.3. Import Required Packages

Next, you need to import the required packages, including `express`, `express-session`, `passport`, and `passport-google-oauth20`:

```javascript
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
```

These packages are essential for setting up your Express server, managing sessions, and handling Google OAuth with Passport.js.

#### 5.4. Initialize Express

Create an instance of an Express application:

```javascript
const app = express();
```

This `app` will serve as your main application object, where you’ll define routes and middleware.

#### 5.5. Set Up Express Session Middleware

To handle user sessions, you need to set up session management:

```javascript
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));
```

Here:
- `secret` is used to sign the session ID cookie.
- `resave: false` prevents the session from being saved back to the session store if it wasn't modified.
- `saveUninitialized: true` forces a session that is "uninitialized" (new but not modified) to be saved to the store.

#### 5.6. Initialize Passport Middleware

Next, you need to initialize Passport and its session handling:

```javascript
app.use(passport.initialize());
app.use(passport.session());
```

These lines ensure that Passport is initialized and can manage sessions for logged-in users.

#### 5.7. Configure Google OAuth Strategy

Set up Passport to use the Google OAuth strategy:

```javascript
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
function(accessToken, refreshToken, profile, done) {
  // Here you can save the user profile to your database
  return done(null, profile);
}));
```

- The `clientID` and `clientSecret` are fetched from environment variables.
- `callbackURL` is the URL where Google will redirect users after they authenticate.
- The callback function receives the user's profile and tokens, where you can handle user data (e.g., saving it to your database).

#### 5.8. Set Up Serialize and Deserialize Functions

To manage user sessions, Passport needs to serialize the user’s data into the session and deserialize it on subsequent requests:

```javascript
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
```

- `serializeUser`: Determines what data should be stored in the session.
- `deserializeUser`: Retrieves the user’s data from the session.

#### 5.9. Define Routes

Now, set up the routes for your application:

```javascript
app.get('/', (req, res) => {
  res.send('<h1>Home</h1><a href="/auth/google">Login with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

app.get('/profile', (req, res) => {
  res.send(`<h1>Profile</h1><pre>${JSON.stringify(req.user, null, 2)}</pre>`);
});
```

- The home route (`/`) displays a link to log in with Google.
- The `/auth/google` route initiates the Google OAuth flow.
- The `/auth/google/callback` route handles the response from Google, authenticates the user, and redirects to the profile page.
- The `/profile` route displays the authenticated user's profile information.

#### 5.10. Start the Server

Finally, start your Express server to listen for incoming requests:

```javascript
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

This starts the server on port 3000, and you can access it at `http://localhost:3000`.


### 6. Run the Application

Start your Node.js application:

```bash
node app.js
```

Visit `http://localhost:3000` in your browser, and you should see a link to log in with Google.

### 7. Test the Authentication

1. Click on "Login with Google."
2. You will be redirected to Google to authorize the application.
3. After successful authentication, you will be redirected to the `/profile` route, where you can see the user's profile information.

---

This setup should get you started with Google Authentication in your Node.js application using Passport.js. If you have any specific requirements or need further customization, feel free to ask!