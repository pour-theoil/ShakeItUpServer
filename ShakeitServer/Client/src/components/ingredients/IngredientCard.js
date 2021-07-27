import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import { getIngredientCocktails } from '../../modules/IngredientManager'

export const IngredientCard = ({colorArray, ingredient }) => {
    const [numDrinks, setNumDrinks] = useState()
    const history = useHistory()

    const numberOfDrinks = (iid) => {
        getIngredientCocktails(iid)
        .then(response => setNumDrinks(response.length))
    }

    useEffect(() => {
        numberOfDrinks(ingredient.id)
    },[ingredient])

    return(
        <>
            <Card onClick={() => history.push(`/ingredients/${ingredient.id}/edit`)} className="ingredient-card" bg={colorArray[ingredient.typeId-1]}>
                <Row>
                    <Col xs={8}>
                        <Card.Title>{ingredient.name}</Card.Title>
                        <Card.Subtitle>({ingredient.type?.name})</Card.Subtitle>
                    </Col>
                    <Col>
                        <Card.Text className="centeredtext"># Drinks: <br/> {numDrinks}</Card.Text>
                    </Col>
                </Row>
            </Card>
        </>
    )
}