import { API } from 'aws-amplify';

function CreateTestEquipment (e) {

    for ( let i = 0 ; i < e; i++) {
        API.post("inventory","/items", {
            body : {
            serialno : "snhpt01"+i,
            name : "HPdevice"+i,
            type : "tester",
            model : "HP",
            status : "new",
            location : "Room",
            roomno : "ECS201"
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snhpv01"+i,
            name : "HPdevice"+i,
            type : "voltmeter",
            model : "HP",
            status : "new",
            location : "Room",
            roomno : "ECS202"
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "sndt01"+i,
            name : "Delldevice"+i,
            type : "tester",
            model : "Dell",
            status : "new",
            location : "Storage",
            roomno : "ECS203"
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "sndv01"+i,
            name : "Delldevice"+i,
            type : "voltmeter",
            model : "Dell",
            status : "new",
            location : "Storage",
            roomno : "ECS204"
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snlt01"+i,
            name : "Lenovodevice"+i,
            type : "tester",
            model : "Lenovo",
            status : "new",
            location : "Room",
            roomno : "ECS205"
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snlv01"+i,
            name : "Lenovodevice"+i,
            type : "voltmeter",
            model : "Lenovo",
            status : "new",
            location : "Storage",
            roomno : "ECS206"
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snst01"+i,
            name : "samsungdevice"+i,
            type : "thermometer",
            model : "Samsung",
            status : "new",
            location : "Room",
            roomno : "ECS208"
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snso01"+i,
            name : "samsungdevice"+i,
            type : "ohmeter",
            model : "Samsung",
            status : "new",
            location : "Storage",
            roomno : "ECS209"
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snstt01"+i,
            name : "texasdevice"+i,
            type : "thermometer",
            model : "Texas",
            status : "new",
            location : "Room",
            roomno : "ECS210"
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snto01"+i,
            name : "texasdevice"+i,
            type : "ohmeter",
            model : "Texas",
            status : "new",
            location : "Storage",
            roomno : "ECS211"
            }
        });
    }
}

export default CreateTestEquipment;