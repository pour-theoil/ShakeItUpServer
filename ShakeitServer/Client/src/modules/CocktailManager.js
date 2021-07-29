import { urlHelper } from "./ServerHelper";
import firebase from 'firebase/app'
import 'firebase/auth'

const getToken = () => firebase.auth().currentUser.getIdToken();
const url = urlHelper()

export const getAllCocktail = () => {
    return getToken().then((token) => {
        return fetch(`${url}/cocktail`, {
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


export const getCocktialById = (id) => {
    return getToken().then((token) => {
        return fetch(`${url}/cocktailmenus/${id}`, {
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


export const deleteCocktail = (id) => {
    return getToken().then((token) => {
        return fetch(`${url}/cocktail/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        })
    });
};

export const addCocktail = (obj) => {
    return getToken().then((token) => {
        return fetch(`${url}/cocktail`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new ingredient.");
            }
        });
    });
};

export const updateCocktail = (obj) => {
    return getToken().then((token) => {
        return fetch(`${url}/cocktail/${obj.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(resp => {
            if (resp.ok) {
                return;
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to update ingredient.");
            }
        });
    });
};

export const getSingleCocktail = (id) => {
    return fetch(`${url}/cocktails/${id}`)
        .then(response => response.json())
}