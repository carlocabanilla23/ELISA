import { API } from 'aws-amplify';

function CreateTestUser (e) {

    for ( let i = 0 ; i < e; i++) {
        API.post("userapi","/email/", {
            body : {
            firstname : "Admin",
            lastname : "Test",
            role : "Admin",
            schoolID : "88800000"+i,
            email : "admin@spu.edu",
            phone : "00000000",
            password : "admin123",
            status: "active"
            }
        });

        API.post("userapi","/email/", {
            body : {
            firstname : "new inactive Student"+i,
            lastname : "proto"+i,
            role : "Student",
            schoolID : "88880000"+i,
            email : "newstudents"+i+"@spu.edu",
            phone : "00000000",
            password : "password"+1,
            status: "active"
            }
        });
    }
}

export default CreateTestUser;