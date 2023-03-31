function StartSession (user) {
    localStorage.setItem('user',true);
    localStorage.setItem('name',user.firstname);
    localStorage.setItem('access',user.role);

    let e = window.btoa(unescape(encodeURIComponent(user.email)));

    localStorage.setItem('email',e);
    // console.log( "decoded" + decodeURIComponent(escape(window.atob(e))) );
}


export default StartSession;
