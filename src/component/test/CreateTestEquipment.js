import { API } from 'aws-amplify';

function CreateTestEquipment (e) {

    for ( let i = 0 ; i < e; i++) {
        API.post("inventory","/items", {
            body : {
            serialno : "snhp01"+i,
            name : "HPdevice"+i,
            type : "tester",
            model : "HP"+i,
            status : "new",
            location : "Room",
            roomno : "ECS207"
            }
        });
    }
}

export default CreateTestEquipment;