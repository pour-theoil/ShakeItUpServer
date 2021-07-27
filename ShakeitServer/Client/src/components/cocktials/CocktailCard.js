import React, { useEffect, useState } from 'react'
import { getAllIngredients } from '../../modules/BuilderManager'
import { Card, Button, Row, Col, Accordion } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export const CocktailCard = ({ cocktail, deleteSetCocktail, colorArray }) => {
    const history = useHistory()
    //create a state variable for the ingredients associated with the specific cocktail. Then join them into a string.
    const [ingredients, setIngredients] = useState([])
    const getIngredients = () =>{
        getAllIngredients(cocktail.id)
        .then(ingredients => {
            let ingredientsObj = ingredients.map(ingredient => ingredient.ingredient.name)
            ingredientsObj.reverse()
            setIngredients(ingredientsObj)
        }
        )
    }
    useEffect(()=>{
        getIngredients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

 
    return(
        <>
        <Accordion>
                <Card bg={colorArray[ingredients.length-1]} className="ingredient-card">
                    <Accordion.Toggle as={Card.Title} eventKey="0">{cocktail?.name}</Accordion.Toggle>
                    <Accordion.Toggle as={Card.Subtitle} eventKey="0">{ingredients.join(", ")}</Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Row fluid="true">
                        <Col xs={5}></Col>
                        <Col xs={2}>
                            <Button variant="outline-primary" className="article-btn" onClick={() => history.push(`/cocktails/${cocktail.id}/edit`)}>Edit</Button>
                        </Col>
                        <Col xs={2}>
                            <Button variant="outline-warning" className="article-btn" onClick={()=> deleteSetCocktail(cocktail.id)}>Delete</Button>
                        </Col>
                    </Row>
                    </Accordion.Collapse>
                </Card>
        </Accordion>
        </>
    )
}