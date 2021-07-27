import React, { useEffect, useState } from 'react'
import { getAllIngredients, getAllTypes } from '../../modules/IngredientManager'
import { useHistory } from 'react-router-dom'
import { IngredientCard } from './IngredientCard'
import { Container, Button, Row, Form, Col } from 'react-bootstrap'
import './ingredients.css'
import "../../scss/_variables.scss"

export const IngredientList = () => {
    const [ ingredients, setIngredients ] = useState([])
    const [types, setTypes] = useState([])
    const history = useHistory()

    
    const getTypes = () => {
        getAllTypes()
            .then(type => setTypes(type))
    }

    const getIngredients = () => {
        getAllIngredients()
        .then(ingredients => {
            ingredients.sort(function(a, b){
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
              })
            setIngredients(ingredients)})
    } 

    const filterIngredients = (event) => {
        getAllIngredients()
        .then(response =>{
            const allIngredients = [ ...response]
            allIngredients.sort(function(a, b){
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
              })
           
            let selectedValue = event.target.value
            console.log(selectedValue)
            if (parseInt(selectedValue) === 0) {
                setIngredients(allIngredients)
            } else {
                let filterIngredients = []
                filterIngredients = allIngredients.filter(ingredient => parseInt(ingredient.typeId) === parseInt(selectedValue))   
                setIngredients(filterIngredients)
            }

        })
    }


    const colorArray = ['primary', 'secondary', 'warning', 'success', 'danger', 'info']

    useEffect(() => {
        getIngredients()
    }, [])

    useEffect(() => {
        getTypes()
    }, [])

    
    return (
        <>
            <Container className="justified-content-center">
            <h2 className="cocktailform-name">Ingredients List</h2>
                <Form.Group as={Row}>
                    <Form.Label column xs={6}>Filter by Type</Form.Label>
                    <Col xs={6}>

                    <Form.Control as="select"  name="typeId" id="typeId" onChange={filterIngredients} >
                        <option value="0">All</option>
                        {types.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </Form.Control>
                    </Col>
                </Form.Group>
                <Container>

                    {ingredients.map( ingredient => {
                                               
                                
                                                return (
                                                    <IngredientCard ingredient={ingredient}
                                                                    colorArray={colorArray}
                                                                    key={ingredient.id}
                                                                
                                                                     />)}

                                                )
                    }
                </Container>
                <Row className="create-event">
                    <Button 
                            variant="primary"
                            className="fixed-button"
                            onClick={() => {history.push('/ingredients/create')}}>+ Ingredient</Button>
                </Row>
            </Container>
        </>
    )
}