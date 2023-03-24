import { API } from "aws-amplify";

export const PostNotification = (data) => {
    API.post("notification","/notification", {
        body: {
            email : data.email,
            notificationid : data.notificationid,
            message: data.message,
            date : data.date
        }
    });
}