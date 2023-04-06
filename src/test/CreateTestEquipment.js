import { API } from 'aws-amplify';

function CreateTestEquipment (e) {
    //Get the current time the item is added
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();

    var today = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
    if(hour >= 12){
        today += 'PM';
    }else{
        today += 'AM';
    }

    for ( let i = 0 ; i < e; i++) {
        API.post("inventory","/items", {
            body : {
            serialno : "snhpt01"+i,
            name : "HPdevice"+i,
            type : "tester",
            model : "HP",
            manufacturer: "Fluke",
            status : "new",
            location : "Room",
            roomno : "ECS201",
            cost: "20",
            createdate: today,
            lastupdated: today,
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snhpv01"+i,
            name : "HPdevice"+i,
            type : "voltmeter",
            model : "HP",
            manufacturer: "Express",
            status : "new",
            location : "Room",
            roomno : "ECS202",
            cost: "40",
            createdate: today,
            lastupdated: today,
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "sndt01"+i,
            name : "Delldevice"+i,
            type : "tester",
            model : "Dell",
            manufacturer: "Smart Sensor",
            status : "new",
            location : "Storage",
            roomno : "ECS203",
            cost: "30",
            createdate: today,
            lastupdated: today,
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "sndv01"+i,
            name : "Delldevice"+i,
            type : "voltmeter",
            model : "Dell",
            manufacturer: "Mechanic",
            status : "new",
            location : "Storage",
            roomno : "ECS204",
            cost: "75",
            createdate: today,
            lastupdated: today,
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snlt01"+i,
            name : "Lenovodevice"+i,
            type : "tester",
            model : "Lenovo",
            manufacturer: "Leeve",
            status : "new",
            location : "Room",
            roomno : "ECS205",
            cost: "35",
            createdate: today,
            lastupdated: today,
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snlv01"+i,
            name : "Lenovodevice"+i,
            type : "voltmeter",
            model : "Lenovo",
            manufacturer: "TechDevice",
            status : "new",
            location : "Storage",
            roomno : "ECS206",
            cost: "40",
            createdate: today,
            lastupdated: today,
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snst01"+i,
            name : "samsungdevice"+i,
            type : "thermometer",
            model : "Samsung",
            manufacturer: "SamsungFactory",
            status : "new",
            location : "Room",
            roomno : "ECS208",
            cost: "80",
            createdate: today,
            lastupdated: today,
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snso01"+i,
            name : "samsungdevice"+i,
            type : "ohmeter",
            model : "Samsung",
            manufacturer: "SmartTech",
            status : "new",
            location : "Storage",
            roomno : "ECS209",
            cost: "90",
            createdate: today,
            lastupdated: today,
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snstt01"+i,
            name : "texasdevice"+i,
            type : "thermometer",
            model : "Texas",
            manufacturer: "MetalFactory",
            status : "new",
            location : "Room",
            roomno : "ECS210",
            cost: "60",
            createdate: today,
            lastupdated: today,
            }
        });

        API.post("inventory","/items", {
            body : {
            serialno : "snto01"+i,
            name : "texasdevice"+i,
            type : "ohmeter",
            model : "Texas",
            manufacturer: "Melter",
            status : "new",
            location : "Storage",
            roomno : "ECS211",
            cost: "55",
            createdate: today,
            lastupdated: today,
            }
        });
    }
}

export default CreateTestEquipment;