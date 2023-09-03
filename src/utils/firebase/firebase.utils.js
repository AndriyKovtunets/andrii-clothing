import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDPbeBT3jYM_K5qbzDJBtISmpRsegge9KY',
	authDomain: 'andrii-clothing-db.firebaseapp.com',
	projectId: 'andrii-clothing-db',
	storageBucket: 'andrii-clothing-db.appspot.com',
	messagingSenderId: '517958365612',
	appId: '1:517958365612:web:ac15b42799c31f23a98a09',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
	const batch = writeBatch(db);
	const collectionRef = collection(db, collectionKey);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});
	await batch.commit();
	//	console.log('done');
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	//if user data does not exist
	//create /set the document with the data from userAuth in my collection
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const { password } = additionalInformation;
		const createdAt = new Date();
		console.log(`password: ${password}`);

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				password,
				...additionalInformation,
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	//if user data exist
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);
