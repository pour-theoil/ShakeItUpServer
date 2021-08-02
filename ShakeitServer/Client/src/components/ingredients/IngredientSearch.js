import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getSearchIngredients, getAllTypes } from '../../modules/IngredientManager'
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { IngredientSearchCard } from './IngredientSearchCard';

export const IngredientSearch = () => {
    const [ingredients, setIngredients] = useState([])
    const [search, setSearch] = useState({
        criterion: ""
    });
    const [saveIngredient, setSaveIngredient] = useState(false)
    const [types, setTypes] = useState([])
    const history = useHistory()

    const getIngredients = (save) => {
        getSearchIngredients(search.criterion)
            .then(ingredients => {
                ingredients.sort(function (a, b) {
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                })
                setIngredients(ingredients)
                if (save) {
                    setSaveIngredient(false)
                }
            })
    }
    const filterIngredients = (event) => {
        getSearchIngredients(search.criterion)
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
                console.log(allIngredients)
                let filterIngredients = []
                filterIngredients = allIngredients.filter(ingredient => parseInt(ingredient.ingredientTypeId) === parseInt(selectedValue))   
                setIngredients(filterIngredients)
            }

        })
    }


    const handleSearchChange = (event) => {
        const newSearch = { ...search }
        let selectedValue = event.target.value
        newSearch[event.target.id] = selectedValue
        setSearch(newSearch)
    }


    const searchIngredients = (click) => {
        click.preventDefault()
        getSearchIngredients(search.criterion)
            .then(ingredients => {
                ingredients.sort(function (a, b) {
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                })
                setIngredients(ingredients)
            })
    }

    const getTypes = () => {
        getAllTypes()
            .then(type => setTypes(type))
    }

    useEffect(() => {
        getTypes()
    }, [])

    useEffect(() => {
        getIngredients(saveIngredient)
    }, [saveIngredient])

    const colorArray = ['primary', 'secondary', 'warning', 'success', 'danger', 'info', 'light']

    return (
        <Container className="justified-content-center">
            <h2 className="cocktailform-name"> Search</h2>
            <Form>
                <Form.Group as={Row}>
                    <Col xs={9}>
                        <Form.Control type="text"
                            id="criterion"
                            onChange={handleSearchChange}
                            autoComplete="off"
                            className="form-control"
                            placeholder="search by name"
                            value={search.criterion} />
                    </Col>
                    <Button 
                        onClick={searchIngredients} column xs={6}>
                        Search
                    </Button>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col xs={9}>

                    <Form.Control as="select"  name="typeId" id="typeId" onChange={filterIngredients} >
                        <option value="0">All</option>
                        {types.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </Form.Control>
                    </Col>
                        <Form.Label column xs={3}>Filter</Form.Label>
                </Form.Group>
            </Form>
            <Container>

                {ingredients.map(ingredient => {


                    return (
                        <IngredientSearchCard ingredient={ingredient}
                            colorArray={colorArray}
                            key={ingredient.id}
                            setSaveIngredient={setSaveIngredient}
                        />)
                }

                )
                }
            </Container>
        </Container>
    )
}