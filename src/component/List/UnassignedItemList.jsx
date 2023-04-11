import UnassignedItemCard from "../card/UnassignedItemCard";
import React, {useState} from "react";
import '../../assets/styles/List.css';

const UnassignedItemList = ({items,updateList,ViewInformation,CreateQRCode,CreateBarcode,changeStatus,changeLocation,ResortedList}) => {
    const [serial, setSerial] = useState(true);
    const [name, setName] = useState(true);
    const [type, setType] = useState(true);
    const [model, setModel] = useState(true);

    const reset = (title) => {
        title === 'serialno' ? setSerial(!serial) : setSerial(true);
        title === 'name' ? setName(!name) : setName(true);
        title === 'type' ? setType(!type) : setType(true);
        title === 'model' ? setModel(!model) : setModel(true);
    }

    return (
        <>
            <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">
                            <div className="col" onClick={e => {ResortedList('serialno',serial);reset('serialno')}} style={{'cursor': 'pointer'}}> Serial No </div>
                            <div className="col" onClick={e => {ResortedList('name',name);reset('name')}} style={{'cursor': 'pointer'}}> Name </div>
                            <div className="col" onClick={e => {ResortedList('type',type);reset('type')}} style={{'cursor': 'pointer'}}> Type </div>
                            <div className="col" onClick={e => {ResortedList('model',model);reset('model')}} style={{'cursor': 'pointer'}}> Model </div>
                            {/* <div className="col"> Assigned To </div>
                            <div className="col"> Order Number</div>  */}
                            <div className="col"> Actions</div>        
                    </div>
                </div>
            </div>

            <ul className="list-group">
                { items.map( (items,index) => (
                    <li key={index}>
                        <UnassignedItemCard
                            item={items}
                            key={index}
                            updateList={updateList}
                            ViewInformation={ViewInformation}
                            CreateQRCode={CreateQRCode}
                            CreateBarcode={CreateBarcode}
                            changeStatus={changeStatus}
                            changeLocation={changeLocation} />
                    </li>
                ))}
                
            </ul>

        </>
       
    )
}
export default UnassignedItemList;