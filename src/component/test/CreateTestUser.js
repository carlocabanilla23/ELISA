import { API } from 'aws-amplify';

function CreateTestUser (e) {

    for ( let i = 0 ; i < e; i++) {
        API.post("userapi","/email/", {
            body : {
            firstname : "user"+i,
            lastname : "lastname"+i,
            role : "Student",
            schoolID : "00000000"+i,
            email : "user"+i+"@spu.edu",
            phone : "00000000",
            password : "password"+1
            }
        });
    }
}

export default CreateTestUser;