import { initializeApp, getApp, FirebaseApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, AuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAulq0wNPnUHsCQy7D5JJMQo3wXv2_646g",
  authDomain: "jokio-398019.firebaseapp.com",
  projectId: "jokio-398019",
  storageBucket: "jokio-398019.appspot.com",
  messagingSenderId: "143876319562",
  appId: "1:143876319562:web:f357fe99eb5cf7ae3bb9b3",
  measurementId: "G-T39T15L64G",
};
let app: FirebaseApp;
let analytics: Analytics;
let auth: Auth;
let provider: AuthProvider;

// Initialize Firebase
if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
}
export { app, analytics, auth, provider };
