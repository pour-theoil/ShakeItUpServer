import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { updateIngredient, getIngredientById, deleteIngredient } from '../../modules/IngredientManager'
import { getAllTypes } from '../../modules/IngredientManager'
import { Form, Button, Col, Container, Row } from "react-bootstrap";

export const EditIngredientForm = () => {
    const [ingredient, setIngredient] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [types, setTypes] = useState([])

    const { ingredientId } = useParams()
    const history = useHistory()

    const getTypes = () => {
        getAllTypes()
        .then(type => setTypes(type))
    }

    const handleFieldChange = evt => {
        const stateToChange = { ...ingredient}
        let selectedValue = evt.target.value
        stateToChange[evt.target.id] = selectedValue;
        setIngredient(stateToChange)
    }

    const updateExistingIngredient = evt => {
        evt.preventDefault()
        setIsLoading(true)
        const editedIngredient = {
            id: ingredientId,
            name: ingredient.name,
            typeId: ingredient.typeId,
            abv: ingredient.abv,
            alcoholic: ingredient.alcoholic
        }
        
        updateIngredient(editedIngredient)
            .then(() => history.push('/ingredients'))
    }

    const handleCancelSave = (click) => {
        click.preventDefault()
        history.push('/ingredients')
    }

    const deleteSetIngredient = (id) => {
        deleteIngredient(id)
        .then(() => history.push('/ingredients'))
    }

    const makeCocktailWithIngredient = () => {
        history.push(`/home/${ingredientId}`)
    }

    useEffect(() => {
        getTypes()
    },[])

    useEffect(() => {
        getIngredientById(ingredientId)
            .then(ingredient => {
                setIngredient(ingredient)
                setIsLoading(false)
            })
    }, [ingredientId])
    

    return (
        <Container className="justified-content-center">
            <h2 className="cocktailform-name">Edit Ingredient</h2>

            <Form>
                    <Form.Group as={Row}>
                        <Form.Label column xs={6}>Ingredient Name:</Form.Label>
                        <Col xs={6}>
                        <Form.Control type="text"
                            id="name"
                            onChange={handleFieldChange}
                            autoFocus
                            required
                            className="form-control"
                            placeholder="Name"
                            defaultValue={ingredient.name} />
                            </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column xs={6}>Ingredient Type:</Form.Label>
                        <Col xs={6}>
                        <Form.Control as="select" value={ingredient.typeId} id='typeId' name="typeId" onChange={handleFieldChange} className="form-control" >
                            {types.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </Form.Control>
                        </Col>
                    </Form.Group>
                
                    <Form.Group as={Row}>
                        <Form.Label column xs={6}>ABV of Ingredient:</Form.Label>
                        <Col xs={6}>
                        <Form.Control type="text"
                            id="abv"
                            required
                            onChange={handleFieldChange}
                            className="form-control"
                            placeholder="abv"
                            defaultValue={ingredient.abv}>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Form>
                <Button className="article-btn" disabled={isLoading}
                onClick={updateExistingIngredient}>
                Update Ingredient
            </Button>
            <Button variant="dark" className="article-btn" onClick={() => deleteSetIngredient(ingredient.id)} >Delete</Button>
            <Button className="article-btn"
                variant="warning"
                onClick={handleCancelSave}>
                Cancel
            </Button>
            <Button className="article-btn"
                variant="secondary"
                onClick={makeCocktailWithIngredient}>
                Make Cocktail 
            </Button>
                
        </Container>
    )
}