import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { addIngredient, getAllTypes } from '../../modules/IngredientManager'
import { Form, Button,  Container } from "react-bootstrap";

export const IngredientEntry = () => {
    const [ingredient, setIngredient] = useState({
        name: "",
        typeId: 0,
        alcoholic: false,
        abv: ""
    })
    const [types, setTypes] = useState([])

    const getTypes = () => {
        getAllTypes()
            .then(type => setTypes(type))
    }

    const history = useHistory()

    const handleInputChange = (event) => {
        const newIngredient = { ...ingredient }
        let selectedValue = event.target.value
        // if (event.target.id.includes("Id")) {
        // 	selectedValue = parseInt(selectedValue)
        // }
        newIngredient[event.target.id] = selectedValue
        setIngredient(newIngredient)
    }

    const handleSaveEvent = (click) => {
        click.preventDefault()
        if (ingredient.name === "" || ingredient.typeId === 0) {
            window.alert("Please fill in all fields")
        } else {
            addIngredient(ingredient)
                .then(() => history.push('/ingredients'))
        }

    }



    const handleCancelSave = (click) => {
        click.preventDefault()
        history.push('/ingredients')
    }

    useEffect(() => {
        getTypes()
    }, [])

    return (
        <Container className="justified-content-center">
            <h2 className="cocktailform-name"> New Ingredient</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Ingredient Name</Form.Label>
                    <Form.Control type="text"
                        id="name"
                        onChange={handleInputChange}
                        autoFocus
                        required
                        autoComplete="off"
                        className="form-control"
                        placeholder="Name"
                        value={ingredient.name} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ingredient Type</Form.Label>
                    <Form.Control as="select" value={ingredient.typeId} name="typeId" id="typeId" onChange={handleInputChange} className="form-control" >
                        <option value="0">Type</option>
                        {types.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>ABV of Ingredient</Form.Label>
                    <Form.Control type="text"
                        id="abv"
                        required
                        autoComplete="off"
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="abv"
                        value={ingredient.abv} />
                </Form.Group>
            </Form>
            <Button className="article-btn"
                onClick={handleSaveEvent}>
                Save Entry
            </Button>
            <Button className="article-btn"
                variant="warning"
                onClick={handleCancelSave}>
                Cancel
            </Button>
        </Container>
    )
}