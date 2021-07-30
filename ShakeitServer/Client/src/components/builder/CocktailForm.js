import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { updateCocktail, deleteCocktail } from '../../modules/CocktailManager'
import { getAllMenus } from '../../modules/MenuManager'
import { getAllIngredients, addCocktailMenu } from '../../modules/BuilderManager'
import { IngredientCard} from './IngredientCard'
import { Form, Button, Container, Row, Col } from "react-bootstrap";
 

export const CocktailAddForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [menus, setMenus] = useState([])
    const [saveIngredients, setSaveIngredients] = useState(false)
    const {cocktailId} = useParams()

    const history  = useHistory()
    
    //set state of the cocktail object
    const [cocktail, setCocktail] = useState({
        id: cocktailId
    })

    //set state for the menu relationship
    const [cocktailmenu, setCocktailMenu] = useState({
        cocktailId: cocktailId,
        menuId: 0
    }
    )
    
    //Get menus to populate the drop down of the app
    const getMenus = () => {
        getAllMenus()
        .then(menus => setMenus(menus))
    }

    //Handle changes for the cocktail state
    const handleCocktailChange = (event) => {
        const newCocktail = {...cocktail}
        let selectedValue = event.target.value
        newCocktail[event.target.id] = selectedValue
        setCocktail(newCocktail)
    }

    //Handle changes for the menu state
    const handleMenuChange = (event) => {
        const newCocktailMenu = {...cocktailmenu}
        let selectedValue = event.target.value
        newCocktailMenu[event.target.id] = selectedValue
        setCocktailMenu(newCocktailMenu)
    }

    
    
    //save the menu and the cocktail states after they have been updated
    const handleSaveEvent = (click) => {
        click.preventDefault()
        setIsLoading(true)
        if (cocktail.name === undefined || cocktail.name === "") {
            window.alert("Please fill in a Name for the cocktail")
            setIsLoading(false)
        } else {
            setSaveIngredients(true)
            updateCocktail(cocktail)
            .then(()=> {
                return  (cocktailmenu)})
            .then(() => {
                history.push(`/menus/${cocktailmenu.menuId}`)})
        }

    }
    
    //Delete the cocktail object
    const handleCancelSave = (click) => {
        click.preventDefault()
        deleteCocktail(cocktailId)
        .then(()=> history.push('/home'))
    }

    //Get available menus
    useEffect(()=>{
        getMenus()
    },[])

    return(
        
        <Container className="justified-content-center">
        <h3 className="cocktailform-name"> New Cocktail</h3>
            <Form>

            <Form.Group as={Row}>
                <Form.Label column xs={5}>Cocktail Name:</Form.Label>
                <Col xs={7}>
                <Form.Control  type="text" 
                        id="name" 
                        autoComplete="off"
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

                <Form.Control as="select" value={cocktailmenu.menuId} name="menuId" id="menuId" onChange={handleMenuChange} className="form-control" >
                    <option value="0">Menu</option>
                    {menus?.map(t => (
                        <option key={t.id} value={t.id}>
                            {t.name}
                        </option>
                    ))}
                </Form.Control>
                    </Col>
            </Form.Group>
                {cocktail.ingredients.map( ingredient => <IngredientCard  key={ingredient.id}
                                                                ingredient={ingredient}
                                                                saveIngredients={saveIngredients} />)}
            
            
    
            </Form>
            <Button className="article-btn" disabled={isLoading}
                onClick={handleSaveEvent}>
                Save Entry
            </Button>
            <Button className="article-btn cancelsave"
                variant="warning"
                onClick={handleCancelSave}>
                Cancel
            </Button>
                
    </Container>

    )

}