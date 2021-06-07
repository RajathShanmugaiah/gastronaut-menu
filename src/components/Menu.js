import React, {useState, useEffect, useMemo} from "react";
import "../style/menu.css";
import MenuItems from "./MenuItems";
import MenuTabs from "./MenuTabs";
// import NewMenuItem from "./newMenuItem";
// import NewMenuTabs from "./newMenuTabs";

const Menu = ({restostyle, restoMenuTypes, restoCategories, language='de'}) => {
        /*food type*/
        const [menuType, setMenuType] = useState(restoMenuTypes[0])
        const categoriesUnderType = useMemo(() => restoCategories.filter(item => item.type === menuType), [menuType, restoCategories])
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

        useEffect(() => {
            setCategory(categories[0].id || null)
            setSelectedCategory(categories[0])
            // eslint-disable-next-line
        },[categories[0].id, categories[0]])

        const colorVar =  restostyle.primaryColor;
        const underline = {
            '--background':colorVar 
          };
    return(<>
        <div className="menuSectionV2 center">
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
                    <MenuItems {...{selectedCategory, categoriesUnderType, underline}} />
                </div>
            </div>
        </div>
    </>)
}
export default Menu;