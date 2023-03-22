import { API } from "aws-amplify";

export default function SendNotification (msg_type,id) {

    switch (msg_type) {

        case "NEW_RESERVATION":
            NEW_RESERVATION(id);
            break;
        
        case "VERIFIED_USER":
            VERIFIED_USER(id);
            break;
        case "OUT_OF_STOCK":
            OUT_OF_STOCK(id);
            break;    
        default:
                break;
    }

  
}
const OUT_OF_STOCK = (item) => {
    API.get("notificationapi","/sid/").then(res => {
        console.log(res)
        res.forEach( user => {
            if (user.emailnotification === true) {
                if (user.outofstock === true) {
                    API.post("emailsystem","/email/send", {
                          body : {
                          email : user.email,
                          message: item + " is currently out of stock",
                          subject : "Item Out of Stock!"
                      }
                  });
              }
            }
        });

    });
}

const NEW_RESERVATION = (rid) => {
    API.get("notificationapi","/sid/").then(res => {
        res.forEach( user => {
            if (user.emailnotification === true) {
                if (user.reservationrequest === true) {
                    API.post("emailsystem","/email/send", {
                            body : {
                            email : user.email,
                            message: "New reservation available. \n \n https://dev.djno0p84ctg6u.amplifyapp.com/Reservation/"+ rid,
                            subject : "New Reservation"
                        }
                    });
                }
            }
        });

    });
}

const VERIFIED_USER = (email) => {
    API.get("notificationapi","/sid/").then(res => {
        res.forEach( user => {
            if (user.emailnotification === true) {
                if (user.newmember === true) {
                    API.post("emailsystem","/email/send", {
                            body : {
                            email : user.email,
                            message: "New User is waiting for  approval\n \n https://dev.djno0p84ctg6u.amplifyapp.com/Reservation/"+ email,
                            subject : "New User"
                        }
                    });
                }
            }
        });

    });
}