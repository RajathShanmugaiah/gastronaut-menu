import React, {useState, useEffect} from "react";
import axios from 'axios';
import Menu from "./Menu";
import CircularProgress from '@material-ui/core/CircularProgress';



import {
    useParams,
    useLocation 
  } from "react-router-dom";

const IndexMenu = () => {
    const { id } = useParams();
    const location = useLocation();
    // eslint-disable-next-line
    const [ path, setPath ] = useState(location.pathname.includes('menu'))
    const[data, setData] = useState(null);
    const params = new URLSearchParams(location.search.substring(1));
    let primaryNewColor = params.get("primaryColor");
    let fontNewColor = params.get("fontColor");
    let backgroundNewColor = params.get("backgroundColor");
    let newFontFamily = params.get("fontFamily");
    let newBorderRadius = params.get("borderRadius");
    useEffect(() => {
        axios
          .get(`https://api.gastronaut.ai/v02/menues/${id}/website`,{
          })
          .then(result =>{setData({ categories: result.data.categories, types: result.data.types, styles: primaryNewColor && fontNewColor? { primaryColor: primaryNewColor, fontColor: fontNewColor, backgroundColor: backgroundNewColor, fontFamily: newFontFamily, borderRadius: newBorderRadius} : result.data.styles  }) });
      }, [id, primaryNewColor, fontNewColor, backgroundNewColor, newFontFamily, newBorderRadius]);
      if(!data) return (
      <div className="circularCenter">
          <CircularProgress />
      </div>)
      document.title= id.toUpperCase();

    return(<>
        <Menu {...{id, path}} restostyle={data.styles} restoMenuTypes={data.types} restoCategories={data.categories}/>
    </>)
}
export default IndexMenu;