import React, {useState, useEffect} from "react";
import axios from 'axios';
import Menu from "./Menu";
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    useParams
  } from "react-router-dom";

const IndexMenu = () => {
    const {id} = useParams();
    const[data, setData] = useState(null);
    useEffect(() => {
        axios
          .get(`https://api.gastronaut.ai/v02/menues/${id}/website`)
          .then(result =>{ setData(result.data)});
      }, [id]);

      if(!data) return (
      <div className="circularCenter">
          <CircularProgress />
      </div>)

    return(
      <Menu restostyle={data.styles} restoMenuTypes={data.types} restoCategories={data.categories}/>
    )
}
export default IndexMenu;