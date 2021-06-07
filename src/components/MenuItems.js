import React from 'react';
import useTranslations from "../hooks/useTranslations"
const SingleFoodItem = ({singleFood, underline}) =>{
    const {translate} = useTranslations(singleFood.translations)
    return(
        <div className="FoodItemWrapper flex-column flex-start">
            <div>
                <h6 className="primary-text-color foodItemStyle caption-text">
                    {translate('tags')}
                </h6>
            </div>

            <div style={{display:"flex", flexDirection:"row", alignItems:"flex-start", justifyContent:"space-between", width:"100%"}}>
                <h6  className="FoodItemName  flex secondary-text-color weight-regular" style={underline}>
                    {translate('title')}
                </h6>
                <h6 className="FoodItemPrice secondary-text-color weight-regular">
                {( singleFood.price !== null ? (singleFood.price ).toFixed(2).replace('.',',')+` €` : ''  ) }
                </h6>
            </div>
            <div className="FoodItemDescription secondary-text-color" dangerouslySetInnerHTML={{__html: translate('description')}} />
        </div>
    )
}

const MenuItems = ({selectedCategory, categoriesUnderType, underline}) => {
    const categoryMatched = categoriesUnderType.find(item => item.id === selectedCategory.id)
    return(
        <div className="flex flex-start FoodItemOuterWrapper">
            {
                categoryMatched?.meals.map( (singleFood,index) => (
                    <SingleFoodItem key={index} {...{singleFood, underline}} />
                ))
            }
        </div>
    )
}
export default MenuItems;