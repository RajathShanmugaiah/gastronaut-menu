import React from 'react';
import useTranslations from "../hooks/useTranslations"
const SingleFoodItem = ({singleFood}) =>{
    const {translate} = useTranslations(singleFood.translations)
    return(
        <div className="FoodItemWrapper flex-column flex-start">
            <div>
                <h6 className="primary-text-color foodItemStyle caption-text">
                    {translate('tags')}
                </h6>
            </div>

            <div style={{display:"flex", flexDirection:"row", alignItems:"flex-start", justifyContent:"space-between", width:"100%"}}>
                <h6  className="FoodItemName  flex secondary-text-color weight-regular">
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

const MenuItems = ({path, selectedCategory, categoriesUnderType}) => {
    const categoryMatched = categoriesUnderType.find(item => item.id === selectedCategory.id)
    const smallMenu = categoryMatched?.meals.length === 1?
                        categoryMatched?.meals.slice(0,1)
                      :categoryMatched?.meals.length === 2?
                        categoryMatched?.meals.slice(0,2)
                      : categoryMatched?.meals.slice(0,3)
    return(<>
            {
                !path?
                <div className="flex flex-start FoodItemOuterWrapper">
                    {smallMenu?.map( (singleFood,index) => (
                            <SingleFoodItem key={index} {...{singleFood}} />
                        ))}
                </div>  
                :
                <div className="flex flex-start FoodItemOuterWrapper">
                    {categoryMatched?.meals.map( (singleFood,index) => (
                            <SingleFoodItem key={index} {...{singleFood}} />
                        ))}
                </div>  
            }      
    </>)
}
export default MenuItems;