import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { addUserIngredient } from '../../modules/IngredientManager'

export const IngredientSearchCard = ({ colorArray, ingredient, setSaveIngredient }) => {

    const history = useHistory()

    const handleSaveUserIngredient = (click) => {
        click.preventDefault();

        addUserIngredient(ingredient.id)
            .then(() => setSaveIngredient(true));
    }
    return (
        <>
            <Card className="ingredient-card " bg={colorArray[ingredient.ingredientTypeId - 1]}>
                <Row>
                    <Col xs={7}>
                        <Card.Title>{ingredient.name}</Card.Title>
                        <Card.Subtitle>({ingredient.ingredientType?.name})</Card.Subtitle>
                    </Col>
                    <Col xs={5}>
                        <Button variant="dark" className="article-btn"
                            onClick={handleSaveUserIngredient}>
                           + Pantry                        </Button>
                    </Col>
                </Row>
            </Card>
        </>
    )
}