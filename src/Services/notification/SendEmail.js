import { API } from "aws-amplify";

export const SendEmail = (data) => {
    API.post("emailsystem","/email/send", {
        body : {
        email : data.email,
        message: data.message,
        subject : data.subject
    }});
}