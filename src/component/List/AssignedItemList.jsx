import AssignedItemCard from "../card/AssignedItemCard";
import React, {useState} from "react";
import '../../assets/styles/List.css';

const AssignedItemList = ({items,updateList, ResortedList}) => {
    const [serial, setSerial] = useState(true);
    const [name, setName] = useState(true);
    const [type, setType] = useState(true);
    const [model, setModel] = useState(true);
    const [status, setStatus] = useState(true);
    const [assignedto, setAssignedTo] = useState(true);
    const [assignedate, setAssignedDate] = useState(true);

    const reset = (title) => {
        title === 'serialno' ? setSerial(!serial) : setSerial(true);
        title === 'name' ? setName(!name) : setName(true);
        title === 'type' ? setType(!type) : setType(true);
        title === 'model' ? setModel(!model) : setModel(true);
        title === 'status' ? setStatus(!status) : setStatus(true);
        title === 'assignedto' ? setAssignedTo(!assignedto) : setAssignedTo(true);
        title === 'assignedate' ? setAssignedDate(!assignedate) : setAssignedDate(true);
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
                            <div className="col" onClick={e => {ResortedList('status',status);reset('status')}} style={{'cursor': 'pointer'}}> Status </div>
                            <div className="col" onClick={e => {ResortedList('assignedto',assignedto);reset('assignedto')}} style={{'cursor': 'pointer'}}> Assigned To </div>
                            <div className="col" onClick={e => {ResortedList('assignedate',assignedate);reset('assignedate')}} style={{'cursor': 'pointer'}}> Date Assigned</div>
                    </div>
                </div>
            </div>

            <ul className="list-group">
                { items.map( (items,index) => (
                    <li key={index}>
                        <AssignedItemCard item={items} key={index} updateList={updateList} />
                    </li>
                ))}
                
            </ul>

        </>
       
    )
}
export default AssignedItemList;