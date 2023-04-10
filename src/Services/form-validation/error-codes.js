

const ERROR_MSG = {
    NONE: "",
    SN_ERR : "Serial Number is already exist!",
    NO_LOC : "Please choose a Location!",
    NO_STATUS : "Please choose a Status!",
    UA_NO_ROOMNO : "Unassigned item has no room number!",
    RM_WRONG_LOC : "Room number is associated with different location type!",
    RFID_No_Match : "Re-enter RFID Code doesn't match with RFID Code"
}

const Validate = (table,data) => {
    /*
            Validation check for the new item:
            1. Check if serialNumber is already exist
            2 and 3. Check if user choose a location or a status for the item
            4. Check if user set a room for the unassigned item. Unassigned item will have no room
            5. Check if the room number is already exist as a different location type
        */
        console.log(table)
        for(var i = 0; i < table.length; i++){
            if(table[i].serialno === data.serialNumber){
                return ERROR_MSG.SN_ERR;
            }
            else if(table[i].roomno === data.roomNumber && table[i].location !== data.location){
                return ERROR_MSG.RM_WRONG_LOC;
            }
        }
        if(data.location === "Location"){
            return ERROR_MSG.NO_LOC;
        }else if(data.status === "Status"){
            return ERROR_MSG.NO_STATUS;
        }else if(data.location === "Unassigned" && data.roomNumber !== ''){
            return ERROR_MSG.UA_NO_ROOMNO;
        }else if(data.RFIDCode !== data.RFIDCode2){
            return ERROR_MSG.RFID_No_Match;
        }

    return ERROR_MSG.NONE;
}

export default Validate;