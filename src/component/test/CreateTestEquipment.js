import { API } from 'aws-amplify';

function CreateTestEquipment (e) {

    for ( let i = 0 ; i < e; i++) {
        API.post("inventory","/items", {
            body : {
            serialno : "sn1101"+i,
            name : "delldevice"+i,
            type : "tester",
            model : "Dell"+i,
            status : "new",
            location : "Room",
            roomno : "ECS301"
            }
        });
    }
}

export default CreateTestEquipment;