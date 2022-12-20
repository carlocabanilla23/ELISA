import { API } from 'aws-amplify';

function CreateTestUser (e) {

    for ( let i = 0 ; i < e; i++) {
        API.post("userapi","/email/", {
            body : {
            firstname : "clone"+i,
            lastname : "proto"+i,
            role : "Professor",
            schoolID : "00000000"+i,
            email : "clone"+i+"@spu.edu",
            phone : "00000000",
            password : "password"+1
            }
        });
    }
}

export default CreateTestUser;