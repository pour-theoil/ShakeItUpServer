import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import { getIngredientCocktails } from '../../modules/IngredientManager'

export const IngredientCard = ({colorArray, ingredient }) => {
    const [numDrinks, setNumDrinks] = useState()
    const history = useHistory()

    const numberOfDrinks = (id) => {
        getIngredientCocktails(id)
        .then(response => setNumDrinks(response))
    }
    console.log(ingredient)
    useEffect(() => {
        numberOfDrinks(ingredient.id)
    },[ingredient])

    return(
        <>
            <Card onClick={() => history.push(`/ingredients/edit/${ingredient.id}`)} className="ingredient-card" bg={colorArray[ingredient.ingredientTypeId-1]}>
                <Row>
                    <Col xs={8}>
                        <Card.Title>{ingredient.name}</Card.Title>
                        <Card.Subtitle>({ingredient.ingredientType?.name})</Card.Subtitle>
                    </Col>
                    <Col>
                        <Card.Text className="centeredtext"># Drinks: <br/> {numDrinks}</Card.Text>
                    </Col>
                </Row>
            </Card>
        </>
    )
}