import { API } from 'aws-amplify';

function CreateTestEquipment (e) {

    for ( let i = 0 ; i < e; i++) {
        API.post("inventory","/items", {
            body : {
            serialno : "sn0001"+i,
            name : "device"+i,
            type : "tester",
            model : "model"+i,
            status : "new",
            location : "room",
            roomno : "ECS201"
            }
        });
    }
}

export default CreateTestEquipment;