import React, { useEffect, useState } from "react";
import { getRandomId } from '../../modules/BuilderManager'
import './IngredientCard.css'
import '../../scss/_variables.scss'
import { Card, Col, Button } from 'react-bootstrap'



export const BuilderCard = ({selectedIngredient, arrayObj, reload, setIngredientArray, ingredientArray, index, colorArray, array}) => {
    const [ingredient, setIngredient] = useState({})
    const [locked, setLocked] = useState(true)
    
    //Generate a random ingredient based on the type chosen
    const newIngredient = () => {
        if (arrayObj.selected === true) {
                setIngredient(selectedIngredient)
                
        }
        
        else if (locked) {
            getRandomId(arrayObj.type).then(setIngredient)
        }
    }
    
    //Array of ingredients to be saved.
    const updateIngredientArray = () => {
        let arraytemp = [...ingredientArray]
        arraytemp[index] = ingredient
        setIngredientArray(arraytemp)
    }

    
    const handleInputChange = () => {
        let newlocked = locked
        if (newlocked) {
            newlocked = false
        } else newlocked = true
        setLocked(newlocked)
    }
    
    useEffect(() => {
        if(ingredient.id) {
            updateIngredientArray()
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ingredient, reload])

    useEffect(() => {
        if (reload) {
            newIngredient()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[reload])



    return (
        <>
            <Card  className="card-margin">
                    <Button variant={colorArray[arrayObj.type -1]} onClick={handleInputChange}>

                    <Col>
                        <Card.Title>{ingredient?.name}</Card.Title>
                        <Card.Subtitle className="type-shaker">({ingredient.type?.name})</Card.Subtitle>
                    </Col> 
                    </Button>
                    
            </Card>
        </>
        )
} 