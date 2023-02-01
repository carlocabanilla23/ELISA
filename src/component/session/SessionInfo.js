function StartSession (user) {
    localStorage.setItem('user',true);
    localStorage.setItem('name',user.firstname);
    localStorage.setItem('sessionID',user.sessionID);
    localStorage.setItem('access',user.role);
    localStorage.getItem('access');
}


export default StartSession;
