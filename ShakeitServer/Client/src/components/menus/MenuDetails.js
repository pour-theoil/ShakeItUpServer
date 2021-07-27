import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getCocktails, getMenuById, deleteMenuCocktail, deleteMenu } from '../../modules/MenuManager'
import { CocktailCard } from './CocktailCard'
import { Container, Button } from 'react-bootstrap'

export const MenuDetails = () => {
    const [cocktails, setCocktails] = useState([])
    const [menu, setMenu] = useState([])
    const history = useHistory()
    const {menuId} = useParams()

    // get menu details season/notes
    const getSetMenu = () => {
        getMenuById(menuId)
        .then(menuObj => setMenu(menuObj))
    }

    const removeCocktailFromMenu = (id) => {
        if (window.confirm("Are you sure you want to remove this cocktial?")){
            deleteMenuCocktail(id)
            .then(() => getMenuCocktails())
        }
    }
    
    //get cocktails associated with that menu
    const getMenuCocktails = () => {
        getCocktails(menuId)
        .then(cocktail => setCocktails(cocktail))
    }
    
    const deleteSetMenu = (id) => {
        if (window.confirm("Are you sure you want to delete this menu?")){
            deleteMenu(id)
            .then(() => history.push('/menus'))

        }
    }


    useEffect(() => {
            getSetMenu()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cocktails])

    useEffect(() => {
        getMenuCocktails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
    return (
        <>
              <Container className="justified-content-center">
                
                    <h2 className="menu-title">{menu[0]?.name}</h2>
                    <h5>Season: {menu[0]?.season.name}</h5>
                <Container>
                    {cocktails.map(cocktail => <CocktailCard   cocktail={cocktail}
                                                                key={cocktail.id}
                                                                removeCocktailFromMenu={removeCocktailFromMenu}/>)}
                </Container>
                <Button variant="outline-warning" className="article-btn" onClick={()=> deleteSetMenu(menuId)}>Delete Menu</Button>     
                <Button type="Button"
                            variant="primary"
                            className="fixed-button"
                            onClick={() => {history.push('/')}}> + Cocktail</Button>
                
            </Container>
        </>
    )
}