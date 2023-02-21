import { API } from "aws-amplify";

export default function SendNotification (protocol,id) {
    if (protocol === "NEW_RESERVATION")

    API.get("notificationapi","/sid/").then(res => {
        res.forEach( user => {
            if (user.reservationrequest === true) {
                  API.post("emailsystem","/email/send", {
                        body : {
                        email : user.email,
                        message: "New reservation available. \n \n https://dev.djno0p84ctg6u.amplifyapp.com/Reservation/"+ id,
                        subject : "New Reservation"
                    }
                });
            }
        });

    });
  
}