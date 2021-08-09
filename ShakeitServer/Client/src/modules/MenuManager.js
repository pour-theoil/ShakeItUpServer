import { urlHelper } from "./ServerHelper";
import firebase from 'firebase/app'
import 'firebase/auth'

const url = urlHelper()
const getToken = () => firebase.auth().currentUser.getIdToken();

export const getAllMenus = () => {
    return getToken().then((token) => {
        return fetch(`${url}/menu`, {
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

export const deleteMenu = (menuId) => {
    return getToken().then((token) => {
        return fetch(`${url}/menu/${menuId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        })
    });
};

export const getMenuById = (id) => {
    return getToken().then((token) => {
        return fetch(`${url}/menu/${id}`, {
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

export const updateMenu = (obj) => {
    return getToken().then((token) => {
        return fetch(`${url}/menu/${obj.id}`, {
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

export const addMenu = (obj) => {
    return getToken().then((token) => {
        return fetch(`${url}/menu`, {
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

export const getCocktails = (id) => {
    return getToken().then((token) => {
        return fetch(`${url}/cocktail/numCocktails/${id}`, {
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

export const getAllSeasons = () => {
    return getToken().then((token) => {
        return fetch(`${url}/menu/seasons`, {
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

export const deleteMenuCocktail = (id) => {
    return getToken().then((token) => {
        return fetch(`${url}/cocktailmenu/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        })
    });
};