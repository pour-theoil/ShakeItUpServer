import React from 'react'
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
import { CocktailEditForm } from './menus/CocktailEditForm'
import { CocktailList } from './cocktials/CocktailList'
import { IngredientDetails } from './ingredients/IngredientDetails'
import Login from './auth/Login'
import Register from './auth/Register'


export default function ApplicationViews({ isLoggedIn }) {


    return (
        <main>

            <Switch>
                <Route exact path="/">
                    {isLoggedIn ? <BuilderList /> : <Redirect to="/login" />}

                </Route>

                <Route exact path="/home">
                    {isLoggedIn ? <BuilderList /> : <Redirect to="/login" />}

                </Route>

                <Route exact path="/home/:selectIngredient">
                    {isLoggedIn ? <BuilderList /> : <Redirect to="/login" />}

                </Route>

                <Route path="/cocktails/:cocktailId/add">
                    {isLoggedIn ? <CocktailAddForm /> : <Redirect to="/login" />}

                </Route>

                <Route path="/menus/cocktail/:cocktailId/edit">
                    {isLoggedIn ? <CocktailEditForm /> : <Redirect to="/login" />}

                </Route>

                <Route path="/cocktails/:cocktailId/edit">
                    {isLoggedIn ? <SingleCocktailEditForm /> : <Redirect to="/login" />}

                </Route>

                <Route exact path="/ingredients">
                    {isLoggedIn ? <IngredientList /> : <Redirect to="/login" />}

                </Route>

                <Route exact path="/cocktails">
                    {isLoggedIn ? <CocktailList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/ingredients/edit/:ingredientId" exact>
                    {isLoggedIn ? <EditIngredientForm /> : <Redirect to="/login" />}

                </Route>

                <Route path="/ingredients/details/:ingredientId" exact>
                    {isLoggedIn ? <IngredientDetails /> : <Redirect to="/login" />}

                </Route>

                <Route path='/ingredients/create'>
                    {isLoggedIn ? <IngredientEntry /> : <Redirect to="/login" />}

                </Route>

                <Route exact path='/menus'>
                    {isLoggedIn ? <MenuList /> : <Redirect to="/login" />}

                </Route>

                <Route exact path="/menus/:menuId">
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