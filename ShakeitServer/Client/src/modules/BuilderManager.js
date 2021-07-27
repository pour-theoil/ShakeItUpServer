import  { urlHelper }  from "./ServerHelper";
const url = urlHelper()

export const getRandomId = (typeId) => {
    return fetch(`${url}/ingredients?typeId=${typeId}&_expand=type`)
      .then(result => result.json())
      .then(array => {
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomingredient = array[randomIndex];
        return randomingredient;
    });
  } 

export const addCocktailIngredient = (obj) => {
    return fetch(`${url}/cocktailingredients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
}

export const updateCocktail = (obj) => {
    return fetch(`${url}/cocktails/${obj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
}

export const getAllIngredients = (id) => {
    return fetch(`${url}/cocktailingredients?cocktailId=${id}&_expand=ingredient`)
    .then(response => response.json())
}

export const updateCocktailIngredients = (obj) => {
    return fetch(`${url}/cocktailingredients/${obj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
}

export const addCocktailMenu = (obj) => {
    return fetch(`${url}/cocktailmenus`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
}

export const updateCocktailMenu = (obj) => {
    return fetch(`${url}/cocktailmenus/${obj.id}`, {
        method: "Put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
}
