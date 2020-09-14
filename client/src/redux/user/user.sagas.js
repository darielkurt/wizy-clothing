import { put, takeLatest, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    // yield console.log(userSnapshot.id);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({
  payload: { displayName, email, password },
}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName }}));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignup({
  payload: { user, additionalData},
}) {
  yield getSnapshotFromUserAuth(user, additionalData)
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignInAfterSignup() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignup);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(isUserAuthenticated),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignInAfterSignup),
  ]);
}

// import {
//   firestore,
//   convertCollectionsSnapshotToMap,
//   signInWithGoogle,
// } from "../../firebase/firebase.utils";

// import {
//   fetchCollectionsSuccess,
//   fetchCollectionsFailure,
// } from "./shop.actions";

// import ShopActionTypes from "./shop.types";

// export function* fetchCollectionAsync() {
//   yield console.log("i am fired");

//   try {
//     const collectionRef = firestore.collection("collections");
//     const snapshot = yield collectionRef.get();
//     const collectionsMap = yield call(
//       convertCollectionsSnapshotToMap,
//       snapshot
//     );
//     yield put(fetchCollectionsSuccess(collectionsMap));
//   } catch (error) {
//     yield put(fetchCollectionsFailure(error.message));
//   }
// }

// export function* fetchCollectionsStart() {
//   yield takeLatest(
//     ShopActionTypes.FETCH_COLLECTIONS_START,
//     fetchCollectionAsync
//   );
// }
