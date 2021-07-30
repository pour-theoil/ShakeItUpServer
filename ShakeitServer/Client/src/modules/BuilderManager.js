import { urlHelper } from "./ServerHelper";
import firebase from 'firebase/app'
import 'firebase/auth'

const url = urlHelper()
const getToken = () => firebase.auth().currentUser.getIdToken();


export const getRandomId = (typeId) => {
    return getToken().then((token) => {
        return fetch(`${url}/Ingredient/RandomIngredient/${typeId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
               return resp.json()
            } else {
                throw new Error("An unknown error occurred while trying to get ingredients.");
            }
        });
    });
};





export const getAllIngredients = (id) => {
    return getToken().then((token) => {
    return fetch(`${url}/Cocktail/ingredients/${id}`, {
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
