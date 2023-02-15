import { API } from "aws-amplify";


module.exports.someFunction = function () {
    let users = [];
    API.get("userapi","email").then( res => {
      users = res;
    });
    // users.forEach (resUser => {
    //   API.post("")
    // })
  };