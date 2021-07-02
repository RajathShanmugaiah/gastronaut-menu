import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'

const MenuTabsTitle = ({item, category, handleChange = () => {}, restostyle, language}) => {
    return(
        <div className="center mobileCenter">
            <h6 className={[`FoodSubCategoryName center weight-regular`, category === item.id && "categoryTab"].join(' ')} style={Object.assign( {fontWeight:  category === item.id ? "bold" : "lighter", color: restostyle.fontColor})} onClick={() => handleChange(item.id)}>
                {item.label}
            </h6>
        </div>
    )
}

const ChooseMenuItem = ({category, handleChange = () => {}, categories,  restostyle, language}) => {
    return(<>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" style={{color: restostyle.fontColor}}>Food</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          onChange={(event) => handleChange(event.target.value)}
        >
            {
                categories.map((item, index) => {
                    return <MenuItem key={item.id} value={item.id} style={{color: restostyle.fontColor}}>{item.label}</MenuItem>
                })
            }
        </Select>
      </FormControl>

    </>)
}

const MenuTabs = ({categoriesUnderType, category,handleCategory = () => {}, 
 restostyle, handleChange = () => {}, language = 'de', categories}) => {

    const fontColor =  {
        '--fontColor':restostyle.fontColor 
      };
    return(<>
        <div className="showInDesktop">
            <div className="SubCategoryTabs center">
                {
                    categories.map((item, index) => (
                        <MenuTabsTitle key={index} {...{item, handleChange, category, 
                             restostyle, language}} />
                    ))
                } 
            </div>
        </div>
        <div className="showInMobile" style={Object.assign(fontColor)}>
            <ChooseMenuItem {...{handleChange, categories, category, restostyle, language}}/>
        </div>
    </>)
}

export default MenuTabs