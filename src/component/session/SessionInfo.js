function StartSession (user) {
    localStorage.setItem('user',true);
    localStorage.setItem('name',user.firstname);
    localStorage.setItem('sessionID',user.sessionID);
}


export default StartSession;
