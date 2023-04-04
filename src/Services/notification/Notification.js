import { API } from "aws-amplify";
import { GetDateToday } from "../etc/GetDateToday";
import { PostNotification } from "./PostNotification";
import { SendEmail } from "./SendEmail";

export default function SendNotification (msg_type,data) {

    switch (msg_type) {

        case "NEW_RESERVATION":
            NEW_RESERVATION(data);
            break;      
        case "VERIFIED_USER":
            VERIFIED_USER(data);
            break;
        case "OUT_OF_STOCK":
            OUT_OF_STOCK(data);
            break;    
        case "NEW_ITEM":
            NEW_ITEM(data);
            break;
        case "ITEM_MOVE":
            ITEM_MOVE(data);
            break; 
        default:
            break;
    }

}

const ITEM_MOVE = (item) => {
    API.get("notificationapi","/sid/").then(res => {
        const subscribeUser = res.filter(user => user.emailnotification === true && user.itemmovement === true);

        subscribeUser.forEach( user => {
            let data = {
                email : user.email,
                message: item.name + " is found in room " + item.roomno,
                notificationid : crypto.randomUUID(),
                date : GetDateToday(),
                subject : "Item Movement Detected!"
            }
            
            SendEmail(data);
            PostNotification(data);
        })

    });

}
const OUT_OF_STOCK = (item) => {
    API.get("notificationapi","/sid/").then(res => {
        const subscribeUser = res.filter(user => user.emailnotification === true && user.outofstock === true);

        subscribeUser.forEach( user => {
            let data = {
                email : user.email,
                message: item + " is currently out of stock",
                notificationid : crypto.randomUUID(),
                date : GetDateToday(),
                subject : "Item Out of Stock!"
            }
            
            SendEmail(data);
            PostNotification(data);
        })

    });
}
const NEW_RESERVATION = (rid) => {
    API.get("notificationapi","/sid/").then(res => {
        const subscribeUser = res.filter(user => user.emailnotification === true && user.reservationrequest === true);

        subscribeUser.forEach( user => {
            let data = {
                email : user.email,
                message: "New reservation available. \n \n https://dev.djno0p84ctg6u.amplifyapp.com/Reservation/"+ rid,
                notificationid : crypto.randomUUID(),
                date : GetDateToday(),
                subject : "New Reservation"
            }

            SendEmail(data);
            PostNotification(data);
        })

    });
}
const VERIFIED_USER = (email) => {
    API.get("notificationapi","/sid/").then(res => {
        const subscribeUser = res.filter(user => user.emailnotification === true && user.newmember === true);

        subscribeUser.forEach( user => {
            let data = {
                email : user.email,
                message: "New User is waiting for  approval\n \n https://dev.djno0p84ctg6u.amplifyapp.com/Reservation/"+ email,
                notificationid : crypto.randomUUID(),
                date : GetDateToday(),
                subject : "New User"
            }

            SendEmail(data);
            PostNotification(data);
        })  

    });
}
const NEW_ITEM = (item) => {
    API.get("notificationapi","/sid/").then(res => {
       
        const subscribeUser = res.filter(user => user.emailnotification === true && user.newitem === true);

        subscribeUser.forEach( user => {
            console.log(user.email)
            let data = {
                email : user.email,
                message: item + " is added to inventory",
                notificationid : crypto.randomUUID(),
                date : GetDateToday(),
                subject : "New Item Added"
            }

            SendEmail(data);
            PostNotification(data);
        })  
    });
}