import  { urlHelper }  from "./ServerHelper";
const url = urlHelper()

export const getAllMenus = () => {
    return fetch(`${url}/menus`)
    .then(response => response.json())
}

export const deleteMenu = (menuId) => {
    return fetch(`${url}/menus/${menuId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}

export const getMenuById = (id) => {
    return fetch(`${url}/menus?id=${id}&_expand=season`)
    .then(response => response.json())
}

export const updateMenu = (obj) => {
    return fetch(`${url}/menus/${obj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
}

export const addMenu = (obj) => {
    return fetch(`${url}/menus`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
}

export const getCocktails = (id) => {
    return fetch(`${url}/cocktailmenus?menuId=${id}&_expand=cocktail`)
    .then(response => response.json())
}

export const getAllSeasons = () => {
    return fetch(`${url}/seasons`)
    .then(response => response.json())
}

export const deleteMenuCocktail = (id) => {
    return fetch(`${url}/cocktailmenus/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}