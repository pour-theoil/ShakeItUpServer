import React, { useEffect, useState } from 'react'
import { Form, Row, Col, InputGroup  } from 'react-bootstrap'
import { updateCocktailIngredients } from '../../modules/BuilderManager'

export const IngredientCard = ({ ingredient, saveIngredients }) => {
    const [manyToMany, setManyToMany] = useState({
        id: ingredient.id,
        cocktailId: ingredient.cocktailId,
        ingredientId: ingredient.ingredientId,
        pour: ingredient.pour
    })
    //Handle changes for the cocktail state

    const handleInputChange = (event) => {
        const newPour = { ...manyToMany }
        let selectedValue = event.target.value
        // if (event.target.id.includes("Id")) {
        // 	selectedValue = parseInt(selectedValue)
        // }

        newPour[event.target.id] = selectedValue
        setManyToMany(newPour)
    }

    const addPourValues = () => {
        updateCocktailIngredients(manyToMany)
    }

    useEffect(() => {
        if (saveIngredients) {
            addPourValues()
        }
    })
    return (
        <Form.Group as={Row}>
            <Form.Label column xs={6} className="justify-content-end">{ingredient.ingredient.name}:</Form.Label>
            <Col xs={5}>
                <InputGroup className="mb-3">
                <Form.Control type="number" step={.25}
                    id="pour"
                    className="pourvalue"
                    onChange={handleInputChange}
                    required
                    placeholder="pour"
                    defaultValue={ingredient.pour}
                />
                <InputGroup.Append>
                    <InputGroup.Text>oz</InputGroup.Text>
                </InputGroup.Append>
                </InputGroup>
            </Col>
        </Form.Group>
    )
}