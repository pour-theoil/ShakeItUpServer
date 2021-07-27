import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { EditIngredientForm } from './ingredients/IngredientEditForm'
import { IngredientList } from './ingredients/IngredientsList'
import { IngredientEntry } from './ingredients/IngredientsForm'
import { BuilderList } from './builder/BuilderList'
import { MenuList } from './menus/MenuList'
import { SingleCocktailEditForm } from './cocktials/CocktailEdit'
import { MenuEntry } from './menus/MenuForm'
import { MenuDetails } from './menus/MenuDetails'
import { CocktailAddForm } from './builder/CocktailForm' 
import { FirebaseContext } from './auth/FirebaseProvider'
import { CocktailEditForm } from './menus/CocktailEditForm'
import { CocktailList } from './cocktials/CocktailList'
import Login from './auth/Login'
import Register from './auth/Register'


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(FirebaseContext)
    
    return (
        <main>

        <Switch>
        <Route exact path="/">
                {isLoggedIn ? <BuilderList /> : <Redirect to="/login" />}
                
            </Route>
            
            <Route exact path="/home">
                {isLoggedIn ? <BuilderList /> : <Redirect to="/login" />}
                
            </Route>

            <Route exact path="/home/:selectIngredient(\d+)">
                {isLoggedIn ? <BuilderList /> : <Redirect to="/login" />}
                
            </Route>

            <Route path="/cocktails/:cocktailId(\d+)/add">
                {isLoggedIn ? <CocktailAddForm /> : <Redirect to="/login" />}
                
            </Route>

            <Route path="/menus/cocktail/:cocktailId(\d+)/edit">
                {isLoggedIn ? <CocktailEditForm /> : <Redirect to="/login" />}
                
            </Route>

            <Route path="/cocktails/:cocktailId(\d+)/edit">
                {isLoggedIn ? <SingleCocktailEditForm /> : <Redirect to="/login" />}
                
            </Route>

            <Route exact path="/ingredients">
                {isLoggedIn ? <IngredientList /> : <Redirect to="/login" />}
                
            </Route>

            <Route exact path="/cocktails">
                {isLoggedIn ? <CocktailList /> : <Redirect to="/login" />}
            </Route>

            <Route path="/ingredients/:ingredientId(\d+)/edit">
                {isLoggedIn ? <EditIngredientForm /> : <Redirect to="/login" />}
                
            </Route>

            <Route path='/ingredients/create'>
            {isLoggedIn ? <IngredientEntry /> : <Redirect to="/login" />}
               
            </Route>
            
            <Route exact path='/menus'>
            {isLoggedIn ?  <MenuList /> : <Redirect to="/login" />}
               
            </Route>

            <Route exact path="/menus/:menuId(\d+)">
            {isLoggedIn ? <MenuDetails /> : <Redirect to="/login" />}
                
            </Route>

            <Route path='/menus/create'>
            {isLoggedIn ? <MenuEntry /> : <Redirect to="/login" />}
                
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/register">
                <Register />
            </Route>

        </Switch>
        </main>
    )
}