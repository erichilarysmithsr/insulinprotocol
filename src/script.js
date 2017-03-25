var checkLogin=new Promise((resolve,reject)=>{
    loginDone=resolve;loginFailed=reject;
}),loginDone,loginFailed,googleAuth2Init=function(){
    gapi.load('auth2',()=>{
        gapi.auth2.init({client_id:'715165700315-9mhd65j4m68it586c6sph0vl30a7n0a1.apps.googleusercontent.com',ux_mode:'redirect'}).then((ga)=>{
            ga.currentUser.listen((guser)=>{
                googleAuthSetCookie(guser);
            });
            if(ga.isSignedIn.get()){
                var guser = ga.currentUser.get();                
                googleAuthSetCookie(guser);
                loginDone();
            }else loginFailed(new Error('not logged in'));
        },e=>console.log(e));
    });
};
var googleAuthSetCookie = function(guser){    
    setCookie('id_token',guser.getAuthResponse().id_token,guser.getAuthResponse().expires_at);
};
var googleAuthDelCookie = function(){
    setCookie('id_token','','Thu, 01 Jan 1970 00:00:01 GMT;');
};
var googleAuth2Reload=function(){
    return new Promise((resolve,reject)=>{
        gapi.auth2.getAuthInstance().currentUser.get().reloadAuthResponse().then(ar=>{setCookie('id_token',ar.id_token,ar.expires_at);resolve();},reject);
    });           
};
var googleAuth2SignIn=function(){
    return new Promise((resolve,reject)=>{
        gapi.auth2.getAuthInstance().signIn();
    });
};
var googleAuth2SignOut=function(){
    return new Promise((resolve,reject)=>{
        gapi.auth2.getAuthInstance().signOut().then(()=>resolve(),(e)=>reject(e));
    });
};
var autoReloadAuth2=function(t){
    setTimeout(()=>{
        googleAuth2Reload().then(()=>autoReloadAuth2(t));
    },t);
};

var setCookie=function(cname, cvalue, expires) {
    document.cookie = cname + "=" + cvalue + ";" + "expires="+expires + ";path=/data";
};
var getCookie=function(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};