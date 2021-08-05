import React, { useState } from 'react'
import { Form, Row, Col, InputGroup  } from 'react-bootstrap'


export const IngredientCard = ({ ingredient, cocktail, setCocktail, i }) => {
    const [manyToMany, setManyToMany] = useState({
        id: ingredient.id,
        cocktailId: ingredient.cocktailId,
        ingredientId: ingredient.ingredientId,
        pour: ingredient.pour
    })
    //Handle changes for the cocktail state

    const handleInputChange = (event) => {
        const newPour = { ...ingredient }
        let selectedValue = event.target.value
        console.log(event.target.id)
        // if (event.target.id.includes("pour")) {
        // 	selectedValue = parseInt(selectedValue)
        // }
    
        newPour[event.target.id] = selectedValue
        cocktail.ingredients[i].pour = selectedValue
        setCocktail(cocktail)
    }

    
    
    return (
        <Form.Group as={Row}>
            <Form.Label column xs={6} className="justify-content-end">{ingredient.name}:</Form.Label>
            <Col xs={5}>
                <InputGroup className="mb-3">
                <Form.Control type="number" step={.25}
                    id="pour"
                    className="pour"
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