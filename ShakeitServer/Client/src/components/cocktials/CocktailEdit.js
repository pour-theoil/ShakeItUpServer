import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { updateCocktail, getCocktialById, getSingleCocktail } from '../../modules/CocktailManager'
import { getAllMenus } from '../../modules/MenuManager'
import { addCocktailMenu, getAllIngredients, updateCocktailMenu } from '../../modules/BuilderManager'
import { IngredientCard} from '../builder/IngredientCard'
import { Form, Button, Container, Row, Col} from "react-bootstrap";
 

export const SingleCocktailEditForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [menus, setMenus] = useState([])
    const [ingredients, setIngredients] = useState([])
    const { cocktailId } = useParams()
    const history  = useHistory()
    const [saveIngredients, setSaveIngredients] = useState(false)
    const [newCocktailMenu, setNewCocktailMenu] = useState({
        cocktailId: cocktailId,
    })
    const [menuStatus, setMenuStatus] = useState(false)

    //set state of the cocktail object
    const [cocktail, setCocktail] = useState({
        id: cocktailId,
    })

    //set state for the menu relationship
    const getCocktail = () => {
        getCocktialById(cocktailId)
        .then(response => {
            
            
            if (response.length === 0) {
                
                getSingleCocktail(cocktailId)
                .then(response => {
                    const menuobj = {
                        menuId: 0,
                        cocktailId: cocktailId,
                    }
                    setNewCocktailMenu(menuobj)
                    setCocktail(response)

                    console.log("no Menu")

                })
            } else {    
                const tempMenu = {...newCocktailMenu}
                tempMenu.id = response[0]?.id
                tempMenu.menuId = response[0]?.menuId
                setNewCocktailMenu(tempMenu)
                const tempCocktail = {...cocktail}
                tempCocktail.name = response[0]?.cocktail.name
                setCocktail(tempCocktail)
                console.log("menu")
                setMenuStatus(true)
            }
            })
    }
   
    
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
        const selectCocktailMenu = {...newCocktailMenu}
        let selectedValue = event.target.value
        selectCocktailMenu[event.target.id] = selectedValue
        setNewCocktailMenu(selectCocktailMenu)
    }


    //query for the ingredients from the cocktailingredients table
    const getIngredients = () =>{
        getAllIngredients(cocktailId)
        .then(ingredients => {
            ingredients.reverse()
            setIngredients(ingredients)
        })
        
    }

    

    //save the menu and the cocktail states after they have been updated
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
                if(menuStatus) {
                    return updateCocktailMenu(newCocktailMenu)
                } else {
                    return addCocktailMenu(newCocktailMenu)

                }}
            )
            .then(()=> history.push(`/menus/${newCocktailMenu.menuId}`))
        }

    }
    
    //Delete the cocktail object
    const handleCancelSave = (click) => {
        click.preventDefault()
        history.push(`/cocktails`)
    }

    //Get available menus
    useEffect(()=>{
        getMenus()
    },[])

    useEffect(()=> {
        getCocktail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Get ingredients for the cocktail
    useEffect(()=>{
        getIngredients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    

    return(
        
        <Container className="justified-content-center">
        <h3 className="cocktailform-name"> Edit Cocktail</h3>
            <Form>
            <Form.Group as={Row}>
                <Form.Label column xs={5}>Cocktail Name:</Form.Label>
                <Col xs={7}>
                <Form.Control  type="text" 
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

                <Form.Control as="select" value={newCocktailMenu?.menuId} name="menuId" id="menuId" onChange={handleMenuChange} className="form-control" >
                    <option value="0">No Menu</option>
                    {menus.map(t => (
                        <option key={t.id} value={t.id}>
                            {t.name}
                        </option>
                    ))}
                </Form.Control>
                    </Col>
            </Form.Group>
                {ingredients.map(ingredient => <IngredientCard  key={ingredient?.id}
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