import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { addUserIngredient } from '../../modules/IngredientManager'

export const IngredientSearchCard = ({ colorArray, ingredient }) => {

    const history = useHistory()

    const handleSaveUserIngredient = (click) => {
        click.preventDefault();
        
        addUserIngredient(ingredient.id)
            .then(() => history.push('/ingredients'));
    }
    console.log(ingredient)
    return (
        <>
            <Card className="ingredient-card" bg={colorArray[ingredient.ingredientTypeId - 1]}>
                <Row>
                    <Col xs={8}>
                        <Card.Title>{ingredient.name}</Card.Title>
                        <Card.Subtitle>({ingredient.ingredientType?.name})</Card.Subtitle>
                    </Col>
                </Row>
                <Button className="article-btn"
                    onClick={handleSaveUserIngredient}>
                    Save Entry
                </Button>
            </Card>
        </>
    )
}