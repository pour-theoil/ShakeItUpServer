import firebase from 'firebase/app'
import 'firebase/auth'

const _apiUrl = "/api/userprofile";

export const onLoginStatusChange = (onLoginStatusChangeHandler) => {
    firebase.auth().onAuthStateChanged((user) => {
        onLoginStatusChangeHandler(!!user);
    });
};
// Data for the log in and log out


// spinner based on state... not used yet


// based on documentation from firebase
// const provider = new firebase.auth.GoogleAuthProvider();


const _doesUserExist = (firebaseUserId) => {
    return getToken().then((token) =>
        fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.ok));
};

const _saveUser = (userProfile) => {
    return getToken().then((token) =>
        fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userProfile)
        }).then(resp => resp.json()));
};

const getToken = () => firebase.auth().currentUser.getIdToken();
// Log in based on doc

export const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((signInResponse) => _doesUserExist(signInResponse.user.uid))

        .then((doesUserExist) => {
            if (!doesUserExist) {

                // If we couldn't find the user in our app's database, we should logout of firebase
                logout();

                throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
            }
        }).catch(err => {
            console.error(err);
            throw err;
        });
}

// call firebase to sign out, set the local storage to false
export const logout = () => {
    firebase.auth().signOut()
};


export const register = (userProfile, password) => {
    return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
        .then((createResponse) => _saveUser({
            ...userProfile,
            firebaseUserId: createResponse.user.uid
        }));
}

    // const signInWithGoogle = () => {
    //     return firebase.auth().signInWithPopup(provider)
    //         .then(savedUserProfile => {
    //             sessionStorage.setItem('userProfile', JSON.stringify(savedUserProfile.user))
    //             checkUser(savedUserProfile.user.uid)
    //             setIsLoggedIn(true)
    //         })
    // }

    // const checkUser = (userId) => {
    //     console.log("checkUser", userId)
    //     fetch(`${firebase.auth()}/users.json/?orderby="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
    //         .then(result => result.json())
    //         .then(parsedResponse => {
    //             let resultArray = Object.keys(parsedResponse)
    //             if (resultArray.length > 0) {
    //                 console.log("its a user!!")
    //             } else {
    //                 console.log("false yo")
    //             }
    //         })
    // }



