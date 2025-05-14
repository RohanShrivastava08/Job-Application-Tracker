import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import { auth } from "./firebase"; // import the initialized Firebase auth instance

// Google Sign-In
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token
    const user = result.user;
    console.log("Google Sign-In successful", user);
    return user;
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }
};

// GitHub Sign-In
export const signInWithGitHub = async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a GitHub Access Token
    const user = result.user;
    console.log("GitHub Sign-In successful", user);
    return user;
  } catch (error) {
    console.error("Error during GitHub sign-in:", error);
  }
};

// Sign out function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("Sign-out successful");
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};
