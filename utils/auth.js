export const isUserLoggedIn = ()=>{
    return localStorage.getItem('user'); //can be token or user data
}