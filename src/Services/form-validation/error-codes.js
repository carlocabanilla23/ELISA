

const ERROR_MSG = {
    NONE: "",
    SN_ERR : "Serial Number already exists!",
    NO_LOC : "Please choose a Location!",
    NO_STATUS : "Please choose a Status!",
    UA_NO_ROOMNO : "Unassigned item has no room number!",
    RM_WRONG_LOC : "Room number is associated with different location type!",
    RFID_ERR : "RFID Code already exists!",
    RFID_No_MATCH : "Re-enter RFID Code doesn't match with RFID Code"
}

const Validate = (table,data,params) => {
    /*
            Validation check for the new item:
            1. Check if serialNumber already exists
            2 and 3. Check if user choose a location or a status for the item
            4. Check if user set a room for the unassigned item. Unassigned item will have no room
            5. Check if the room number is already exist as a different location type
            6. Check if RFID Code already exists
            7. Check if Re-enter RFID Code matches with RFID Code
        */
        // console.log(table)
        for(var i = 0; i < table.length; i++){
            if(table[i].serialno === data.serialno){
                return ERROR_MSG.SN_ERR;
            }
            else if(table[i].roomno === data.roomno && table[i].location !== data.location){
                return ERROR_MSG.RM_WRONG_LOC;
            }
            // if(table[i].rfidcode){
            //     if(table[i].rfidcode === data.RFIDCode){
            //         return ERROR_MSG.RFID_ERR;
            //     }
            // }
        }
        if(data.location === "Location"){
            return ERROR_MSG.NO_LOC;
        }else if(data.status === "Status"){
            return ERROR_MSG.NO_STATUS;
        }else if(data.location === "Unassigned" && data.roomNumber !== ''){
            return ERROR_MSG.UA_NO_ROOMNO;
        }else if(data.rfidcode !== params.RFIDCode2){
            return ERROR_MSG.RFID_No_MATCH;
        }

    return ERROR_MSG.NONE;
}

export default Validate;