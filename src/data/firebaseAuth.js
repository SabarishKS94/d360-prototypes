import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged as firebaseOnAuthStateChanged,
    signOut as firebaseSignOut,
} from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ hd: 'salesforce.com' });

/**
 * Subscribe to auth state changes.
 * @param {(user: import('firebase/auth').User | null) => void} callback
 * @returns {() => void} unsubscribe function
 */
export function onAuthStateChanged(callback) {
    return firebaseOnAuthStateChanged(auth, callback);
}

/**
 * Open Google sign-in popup. Throws if the signed-in email is not @salesforce.com.
 * @returns {Promise<import('firebase/auth').User>}
 */
export async function signInWithGoogle() {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (!user.email.endsWith('@salesforce.com')) {
        await firebaseSignOut(auth);
        throw new Error('Only @salesforce.com accounts are permitted.');
    }
    return user;
}

/**
 * Sign the current user out.
 * @returns {Promise<void>}
 */
export function signOut() {
    return firebaseSignOut(auth);
}
