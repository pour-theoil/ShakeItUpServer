import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom'
import { BuilderCard } from "./BuilderCard";
import { addCocktail } from '../../modules/CocktailManager'
import { addCocktailIngredient } from '../../modules/BuilderManager'
import { getAllTypes, getIngredientById } from '../../modules/IngredientManager'
import { Container, Form, Button, Image, Row } from 'react-bootstrap'
import shaker from './emptyshaker.png'


export const BuilderList = () => {
    const { selectIngredient } = useParams()
    const [reload, setReload] = useState(false);
    const [numIngredients, setNumIngredients] = useState(0)
    const [cocktail, setCocktail] = useState({
        name: ""
    })
    const history = useHistory()
    //relate to the tpes of ingredients
    const [array, setArray] = useState([])
    const [ingredientArray, setIngredientArray] = useState([])
    const [shake, setShake] = useState(false)
    const [selectedIngredient, setSelectedIngredient] = useState({})

    
    const handleSetIngredient = (IID) => {
        if(IID !== undefined) {
            getIngredientById(parseInt(IID))
            .then(response => {
                setSelectedIngredient(response)
                let array = [...ingredientArray]
                let arrayObj = {type: response.typeId,
                                selected: true}
                array.push(arrayObj)
                setArray(array)
               
            })
        }
    }

    //When a new type is chosen it is added to the list
    const handleInputChange = (event) => {
        let newNumIngredients = numIngredients
        newNumIngredients++
        setNumIngredients(newNumIngredients)
        const newArray = [...array]
        let selectedValue = event.target.value
        let arrayObj = {type: selectedValue,
                        selected: false}
        newArray.push(arrayObj)
        newArray.sort(function (a, b){ return a.type - b.type})
        newArray.reverse()
        setArray(newArray)
        event.target.value = 0
    }

    const [types, setTypes] = useState([])

    const getTypes = () => {
        getAllTypes()
            .then(type => setTypes(type))
    }


    // save the cocktail first, then create the many to many relationships with the drink
    const handleSaveCocktail = () => {
        addCocktail(cocktail)
            .then(cocktailobj => {
                
                Promise.all(ingredientArray.map(ingredient => {
                    const cocktailingredients = {
                        cocktailId: cocktailobj.id,
                        ingredientId: ingredient.id
                    }
                    return addCocktailIngredient(cocktailingredients)

                })).then(() => setCocktail(cocktailobj))


            })
    }


    const handleToggle = () => {
        setShake(true)
    };

    // array to add specific colors to individual cards
    const colorArray = ['primary', 'secondary', 'warning', 'success', 'danger', 'info']

    useEffect(() => {
        if (cocktail.id) {
            history.push(`/cocktails/${cocktail.id}/add`)
        }
    }, [cocktail, history])

    useEffect(() => {
        getTypes()
    }, [])

    useEffect(() => {
        setReload(true)
    }, [array])

    useEffect(() => {
        handleSetIngredient(selectIngredient)
    },[selectIngredient])

    useEffect(() => {
        setReload(false)
    }, [reload])
    return (
        <Container className="justified-content-center">
            <h2 className="cocktailform-name">Cocktail Builder</h2>
       
            <div className={`shakerbox${shake ? '-active' : ""}`} onAnimationEnd={() => setShake(false)}>
                
                <Image
                    src={shaker}
                    // fluid
                    className="imagetop"
                    alt="React"
                />
                <div className="cocktail-shaker">
                    <div className="messageBottom shake">
                    

                        <Form.Group className="add-ingredient">
                            <Form.Control id={`${numIngredients > 4 ? "disabledSelect" : ""}`} as="select" onChange={handleInputChange} className="form-control" >
                            <option value="0">Add</option>
                            {types.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                            </Form.Control>
                        </Form.Group>
                    
                        {array.map((arrayObj, index) => <BuilderCard
                            colorArray={colorArray}
                            ingredientArray={ingredientArray} 
                            key={index}
                            index={index}
                            array={array}
                            setIngredientArray={setIngredientArray}
                            arrayObj={arrayObj}
                            selectedIngredient={selectedIngredient}
                            reload={reload}
                        />)}
                    </div>
                </div>
            </div>
            <Row className="justify-content-center">
            <Button variant="warning" className="shakebuttons" onClick={() => {
                handleToggle()
                setReload(true)
            }}>Shake &#x27f3;</Button>
        
            <Button variant="primary" className="builderbuttons" onClick={handleSaveCocktail}>Save</Button>
       
            </Row>
        </Container>
    )
}