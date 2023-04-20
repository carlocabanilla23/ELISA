import { useEffect, useState } from "react";
import { API } from "aws-amplify";

const useItems = () => {
    const [items,setItems] = useState([]);

    useEffect(() => {
        const LoadItems = async () => {
            const data =  await API.get("items", "/items");
            setItems(data);
            // console.log(data);
        }
        LoadItems();
    }, []);

    return { items }
}

export default useItems;