import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { updateCocktail, getCocktialById, getCocktail } from '../../modules/CocktailManager'
import { getAllMenus } from '../../modules/MenuManager'
import { addCocktailMenu, updateCocktailMenu } from '../../modules/BuilderManager'
import { IngredientCard } from './IngredientCard'
import { Form, Button, Container, Row, Col } from "react-bootstrap";


export const SingleCocktailEditForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [menus, setMenus] = useState([])
    const { cocktailId } = useParams()
    const history = useHistory()
    const [saveIngredients, setSaveIngredients] = useState(false)

    //set state of the cocktail object
    const [cocktail, setCocktail] = useState({
        id: cocktailId,
    })

    const getCocktailById = () => {
        getCocktail(cocktailId)
            .then(response => {
                setCocktail(response)
            })

    }


    //Get menus to populate the drop down of the app
    const getMenus = () => {
        getAllMenus()
            .then(menus => setMenus(menus))
    }

    //Handle changes for the cocktail state
    const handleCocktailChange = (event) => {
        const newCocktail = { ...cocktail }
        let selectedValue = event.target.value
        newCocktail[event.target.id] = selectedValue
        setCocktail(newCocktail)
    }



    //save the menu and the cocktail states after they have been updated
    const handleSaveEvent = (click) => {
        click.preventDefault()
        setIsLoading(true)
        setSaveIngredients(true)
        updateCocktail(cocktail)
            .then(() => history.push(`/cocktails`))
    }

    //Delete the cocktail object
    const handleCancelSave = (click) => {
        click.preventDefault()
        history.push(`/cocktails`)
    }

    //Get available menus
    useEffect(() => {
        getMenus()
    }, [])

    useEffect(() => {
        getCocktailById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

        <Container className="justified-content-center">
            <h3 className="cocktailform-name"> Edit Cocktail</h3>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column xs={5}>Cocktail Name:</Form.Label>
                    <Col xs={7}>
                        <Form.Control type="text"
                            id="name"
                            onChange={handleCocktailChange}
                            autoFocus
                            required
                            className="form-control"
                            placeholder="Name"
                            defaultValue={cocktail.name} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column xs={5}>Select Menu:</Form.Label>
                    <Col xs={7}>

                        <Form.Control as="select" value={cocktail.menuId} name="menuId" id="menuId" onChange={handleCocktailChange} className="form-control" >
                            <option value="0">No Menu</option>
                            {menus.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>
                {cocktail.ingredients?.map(ingredient => <IngredientCard key={ingredient?.id}
                    ingredient={ingredient}
                    saveIngredients={saveIngredients} />)}



            </Form>
            <Button className="article-btn" disabled={isLoading}
                onClick={handleSaveEvent}>
                Update Cocktail
            </Button>
            <Button className="article-btn"
                variant="warning"
                onClick={handleCancelSave}>
                Cancel
            </Button>

        </Container>

    )

}