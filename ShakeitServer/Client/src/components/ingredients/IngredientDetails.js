import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getIngredientById, deleteUserIngredient } from '../../modules/IngredientManager'
import { Card, Button, Container, Row } from "react-bootstrap";

export const IngredientDetails = () => {
    const [ingredient, setIngredient] = useState({})
    const { ingredientId } = useParams()
    const history = useHistory()

    console.log(ingredient)
    const handleBacktolist = (click) => {
        click.preventDefault()
        history.push('/ingredients')
    }

    const deleteSetIngredient = (id) => {
        deleteUserIngredient(id)
        .then(() => history.push('/ingredients'))
    }

    const makeCocktailWithIngredient = () => {
        history.push(`/home/${ingredientId}`)
    }
    
    useEffect(() => {
        getIngredientById(ingredientId)
            .then(ingredient => {
                
                setIngredient(ingredient)
            })
    }, [ingredientId])
    

    return (
        <Container className="justified-content-center">
            <h2 className="cocktailform-name">{ingredient.name}</h2>
            <p>Type: {ingredient.ingredientType?.name}</p>
            <p>Abv: {ingredient.abv}</p>
            
            <Button variant="dark" className="article-btn" onClick={() => deleteSetIngredient(ingredientId)} >Remove from Pantry</Button>
            <Button className="article-btn"
                variant="warning"
                onClick={handleBacktolist}>
                Back to list
            </Button>
            <Button className="article-btn"
                variant="secondary"
                onClick={makeCocktailWithIngredient}>
                Make Cocktail 
            </Button>
                
        </Container>
    )
}