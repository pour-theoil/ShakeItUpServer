import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { getAllCocktails, deleteCocktail } from '../../modules/CocktailManager'
import { CocktailCard } from './CocktailCard'
import { Container, Button, Row } from 'react-bootstrap'

export const CocktailList = () => {
    const [cocktails, setCocktails] = useState([])
    const history = useHistory()

    const getCocktails = () => {
        getAllCocktails()
        .then(cocktails => {
            cocktails.sort(function(a, b){
                var x = a.name?.toLowerCase();
                var y = b.name?.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
              })
            setCocktails(cocktails)})
    } 
    

    const deleteSetCocktail = (id) => {
        if (window.confirm("Are you sure you want to delete?")){
            deleteCocktail(id)
            .then(() => getCocktails())

        }
    }

    const colorArray = ['primary', 'light', 'dark', 'success', 'danger', 'info', 'light']

    useEffect(() => {
        getCocktails()
    }, [])
    
    return (
        <>
            <Container className="justified-content-center">
            <h2 className="cocktailform-name">Cocktail List</h2>
                <Container className="cocktails-card">
                    {cocktails.map(cocktail => <CocktailCard    deleteSetCocktail={deleteSetCocktail}
                                                                cocktail={cocktail}
                                                                key={cocktail.id}
                                                                colorArray={colorArray}
                                                                />)}
                </Container>
                <Row className="create-event">
                    <Button 
                            variant="primary"
                            className="fixed-button"
                            onClick={() => {history.push('/home')}}>+ Cocktail</Button>
                </Row>
            </Container>
        </>
    )
}