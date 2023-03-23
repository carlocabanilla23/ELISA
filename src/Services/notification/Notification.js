import { API } from "aws-amplify";
import { GetDateToday } from "../etc/GetDateToday";

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

                  API.post("notification","/notification/", {
                        body: {
                            email : user.email,
                            notificationid : crypto.randomUUID(),
                            message: item + " is currently out of stock",
                            date : GetDateToday()
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

                    API.post("notification","/notification/", {
                        body: {
                            email : user.email,
                            notificationid : crypto.randomUUID(),
                            message: "New reservation available. \n \n https://dev.djno0p84ctg6u.amplifyapp.com/Reservation/"+ rid,
                            date : GetDateToday()

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

                    API.post("notification","/notification/", {
                        body: {
                            email : user.email,
                            notificationid : crypto.randomUUID(),
                            message: "New User is waiting for  approval\n \n https://dev.djno0p84ctg6u.amplifyapp.com/Reservation/"+ email,
                            date : GetDateToday()

                        }
                    });
                }
            }
        });

    });
}
const NEW_ITEM = (item) => {
    API.get("notificationapi","/sid/").then(res => {
        res.forEach( user => {
            if (user.emailnotification === true) {
                if (user.newitem === true) {
                    API.post("emailsystem","/email/send", {
                          body : {
                          email : user.email,
                          message: item + " is added to inventory",
                          subject : "New Item Added"
                      }
                    });
                    
                    API.post("notification","/notification/", {
                        body: {
                            email : user.email,
                            notificationid : crypto.randomUUID(),
                            message: item + " is added to inventory",
                            date : GetDateToday()

                        }
                    });

              }
            }
        });

    });
}