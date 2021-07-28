import { urlHelper } from "./ServerHelper";
import firebase from 'firebase/app'
import 'firebase/auth'

const getToken = () => firebase.auth().currentUser.getIdToken();
const url = urlHelper()



export const getAllIngredients = () => {
    return getToken().then((token) => {
        return fetch(`${url}/ingredient`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get ingredients.");
            }
        });
    });
};

export const deleteIngredient = (ingredientId) => {
    return fetch(`${url}/ingredient/${ingredientId}`, {
        method: "DELETE"
    })
        .then(response => response.json())
}

export const getIngredientById = (id) => {
    return getToken().then((token) => {
        return fetch(`${url}/ingredient/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get ingredients.");
            }
        });
    });
};

export const updateIngredient = (obj) => {
    return fetch(`${url}/ingredient/${obj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
}

export const addIngredient = (obj) => {
    return fetch(`${url}/ingredient`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
}

export const getAllTypes = () => {
    return getToken().then((token) => {
        return fetch(`${url}/ingredient/types`
            , {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error("An unknown error occurred while trying to get ingredients.");
                }
            });
    });
};

export const getIngredientCocktails = (id) => {
    return fetch(`${url}/cocktailingredients?ingredientId=${id}`)
        .then(response => response.json())
}

// Possible coding for firebase...
// // // import firebase from 'firebase/app';
// import { firebaseConfig } from '../components/auth/firebaseConfig'


// const url = firebaseConfig.databaseURL;
// // const url = "http://localhost:8088"


// export const getAllIngredients = () => {
//     return fetch(`${url}/ingredients.json/`)
//     .then(response => response.json())
// }

// export const deleteIngredient = (ingredientId) => {
//     return fetch(`${url}/ingredients/${ingredientId}`, {
//         method: "DELETE"
//     })
//     .then(response => response.json())
// }

// export const getIngredientById = (fbid) => {
//     return fetch(`${url}/ingredients/${fbid}.json`)
//     .then(response => response.json())
// }

// export const updateIngredient = (obj) => {
//     const fbid = obj.fbid;
// 	delete obj.fbid;

//     return fetch(`${url}/ingredients/${fbid}.json`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(obj)
//     }).then(response => response.json())
// }

// export const addIngredient = (obj) => {
//     return fetch(`${url}/ingredients.json`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(obj)
//     }).then(response => response.json())
// }

// export const getAllTypes = () => {
//     return fetch(`${url}/types.json`)
//     .then(response => response.json())
// }