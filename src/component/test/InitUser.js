import { API } from "aws-amplify";
import { useEffect, useState } from "react";

function Init () {
   
    useEffect( ()=> {
        API.get("userapi","/email").then( res => {
            res.forEach( resUser => {
                console.log(resUser);
                API.post("useraccounts","/email/",{
                    body:{
                        email:resUser.email,
                        password:resUser.password
                    }
                });
                API.post("notificationapi","/sid/", {
                    body : {
                       sid : resUser.schoolID,
                       newitem : true,
                       newmember : true,
                       outofstock : true,
                       reservationrequest : true,
                       emailnotification : true       
                    }
                });
                
            });    
        });
       
        
    },[]);
}

export default Init;