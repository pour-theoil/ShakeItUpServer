import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { getCocktails} from '../../modules/MenuManager'



export const MenuEntry = ({colorArray, menu, timeconverter}) => {
    const history = useHistory()
    const [menulength, setMenuLength] = useState()
  

    const getMenuCocktails = (id) => {
        getCocktails(id).then(response => setMenuLength(response.length))
        
    }

    useEffect(()=> {
        getMenuCocktails(menu.id)
    },[menu])
    return(
        <Card className="ingredient-card" bg={colorArray[parseInt(menu.seasonId)-1]} onClick={()=>{history.push(`/menus/${menu.id}`)}}>        
                <Card.Title>{menu.name}</Card.Title>
                
                <Card.Subtitle>Started on: {timeconverter(menu.date)}</Card.Subtitle>
                <Card.Subtitle>Drinks: {menulength}</Card.Subtitle>
                

        </Card>
    )
}