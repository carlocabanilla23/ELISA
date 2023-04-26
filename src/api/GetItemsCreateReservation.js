import { useState,useEffect} from "react";
import { API } from "aws-amplify";

const GetItemsCreateReservation = () => {
    const [data,setData] = useState([]);

    useEffect(()=>{
        const LoadData = () => {
            API.get("items","/items/createreservation").then(res => setData(res));
        }
        LoadData();

    },[])
    // console.log({data})
    return data;
}

export default GetItemsCreateReservation;