import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getSearchIngredients } from '../../modules/IngredientManager'
import { Form, Button,  Container } from "react-bootstrap";
import { IngredientSearchCard } from './IngredientSearchCard';

export const IngredientSearch = () => {
    const [ ingredients, setIngredients ] = useState([])
    const [ search, setSearch] = useState({
        criterion: ""
    });

    const history = useHistory()

    const handleSearchChange = (event) => {
        const newSearch = {...search}
        let selectedValue = event.target.value
        newSearch[event.target.id] = selectedValue
        setSearch(newSearch)
    }

    const getIngredients = (click) => {
        click.preventDefault()
        getSearchIngredients(search.criterion)
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


    const colorArray = ['primary', 'secondary', 'warning', 'success', 'danger', 'info']

    return (
        <Container className="justified-content-center">
            <h2 className="cocktailform-name"> Search</h2>
            <Form>
                <Form.Group>     
                    <Form.Control type="text"
                        id="criterion"
                        onChange={handleSearchChange} 
                        autoComplete="off"
                        className="form-control"
                        placeholder="search by name"
                        value={search.criterion} />
                </Form.Group>
                <Button className="article-btn" 
                onClick={getIngredients}>
                Search
            </Button>
            </Form>
            <Container>

{ingredients.map( ingredient => {
                           
            
                            return (
                                <IngredientSearchCard ingredient={ingredient}
                                                colorArray={colorArray}
                                                key={ingredient.id}
                                                 />)}

                            )
}
</Container>
        </Container>
    )
}