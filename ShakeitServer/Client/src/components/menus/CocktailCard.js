import React, { useEffect, useState } from 'react'
import { getAllIngredients } from '../../modules/BuilderManager'
import { Card, Button, Accordion, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export const CocktailCard = ({ cocktail, removeCocktailFromMenu }) => {
    const history = useHistory()
    //create a state variable for the ingredients associated with the specific cocktail. Then join them into a string.
    const [ingredients, setIngredients] = useState([])
    const getIngredients = () =>{
        getAllIngredients(cocktail.cocktailId)
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
                <Card bg="info" className="ingredient-card">
                    <Accordion.Toggle as={Card.Title} eventKey="0">{cocktail.cocktail?.name}</Accordion.Toggle>
                    <Accordion.Toggle as={Card.Subtitle} eventKey="0">{ingredients.join(", ")}</Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Row fluid="true">
                       
                        <Col xs={2}>
                            <Button variant="outline-primary" className="article-btn" onClick={() => history.push(`/menus/cocktail/${cocktail.cocktail.id}/edit/`)}>Edit</Button>
                        </Col>
                        <Col xs={10}>
                            <Button variant="outline-warning" className="article-btn" onClick={()=> removeCocktailFromMenu(cocktail.id)}>Remove from Menu</Button>
                        </Col>
                    </Row>
                    </Accordion.Collapse>
                </Card>
        </Accordion>
        </>



        // <>
        //         <Card bg="info" className="ingredient-card">
        //             <Card.Title>{cocktail.cocktail?.name}</Card.Title>
        //             <Card.Subtitle>{ingredients.join(", ")}</Card.Subtitle>
                    
        //             <Button variant="outline-primary" className="article-btn" onClick={() => history.push(`/cocktails/${cocktail.cocktail.id}/edit`)}>Edit</Button>
        //         </Card>
        // </>
    )
}