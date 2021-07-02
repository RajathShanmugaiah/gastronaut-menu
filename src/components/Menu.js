import React, {useState, useEffect, useMemo} from "react";
import "../style/menu.css";
import MenuItems from "./MenuItems";
import MenuTabs from "./MenuTabs";

const Menu = ({id, path, restostyle, restoMenuTypes, restoCategories, language='de'}) => {
        /*food type*/
        const [menuType, setMenuType] = useState(restoMenuTypes[0])
        console.log(menuType)
        const categoriesUnderType = useMemo(() => restoCategories.filter(item => item.type === menuType), [menuType, restoCategories])
        console.log(categoriesUnderType)
        const [category, setCategory] = useState('')
        const [selectedCategory, setSelectedCategory] = useState('');

        const handleChange = (id) => {
            setCategory(id);
            let selCat = categoriesUnderType.find(c => c.id === id);
            setSelectedCategory(selCat)
          }

          const categories = useMemo(() => {

            return categoriesUnderType.map(item => {
                let label = '';
                let langs = Object.keys(item?.translations);            
                if (langs.includes(language)) {
                  label = item.translations[language].title
                } else if(langs.length !== 0)  {
                  label = item.translations[langs[0]].title;
                }
                return {
                    id: item.id,
                    label
                }
            })
            
        },[categoriesUnderType, language])
        console.log(categories)
        useEffect(() => {
            setCategory(categories[0]?.id || null)
            setSelectedCategory(categories[0])
            // eslint-disable-next-line
        },[categories[0].id, categories[0]])

        const colorVar =  restostyle.primaryColor;
        const underline = {
            '--background':colorVar ,
            '--font':restostyle.fontColor
          };
    return(<>
        <div className="menuSectionV2 center" style={Object.assign(underline)}>
      
            <div className="menuCategoryWrapperV2"> 
                {
                    restoMenuTypes.map((item, index) =>(
                        <h4 key={index} className="foodCategoryTitle  weight-regular" style={{fontWeight: item === menuType? "bold" : "lighter",color: restostyle.fontColor}} onClick={() => {setMenuType(item)}}>
                            {item}
                        </h4>
                    ))
                }
                <div className="OuterBorder OuterBorderPosition flex-column" style={{border: `2px solid ${colorVar}`}}>
                    <MenuTabs {...{categoriesUnderType, category, underline, restostyle, handleChange, categories}} />
                    <MenuItems {...{path, selectedCategory, categoriesUnderType, underline}} />
                    {
                        !path && 
                        <a target="_blank" style={{textDecoration:"none"}} rel="noopener noreferrer" href={`/menu/${id}`}>
                            <button className="button" style={Object.assign(underline)}>
                                    See All
                            </button>
                        </a>
                    }
                </div>
            </div>
        </div>
    </>)
}
export default Menu;