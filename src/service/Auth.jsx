import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    user.getIdToken(true).then((idToken) => {
      // Store the idToken in local storage or wherever you want
      localStorage.setItem('idToken', idToken);
    });
  } else {
    // User is signed out, remove the idToken from storage
    localStorage.removeItem('idToken');
  }
});