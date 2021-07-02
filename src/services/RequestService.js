import RestfulProvider from "../utils/RestfulProvider";


  const register = (data) => {
    return RestfulProvider.post("api/register/", data);
  };
  const login = (data) => {
    return RestfulProvider.post("api/login/", data);
  };
  const getUserStore = (id) => {
    return RestfulProvider.get("api/store/getStoreByOwnerId/"+id);
  };
  const addStore = (data) => {
    return RestfulProvider.post("api/store/addStore/", data);
  };
  const verifyEmail = (token) => {
    return RestfulProvider.get("api/email-verify/?token="+token);
  };
const requestResetEmail = (data) =>{
  return RestfulProvider.post("api/request-reset-email/",data)
}
const passwordResetTokenCheck = (uidb,token) =>{
  return RestfulProvider.get("api/password-reset/"+uidb+"/"+token)
}
const passwordResetComplete = (data) =>{
  return RestfulProvider.patch("api/password-reset-complete/",data)
}
  export {
      register,
      login,
      getUserStore,
      addStore,
      verifyEmail,
      requestResetEmail,
      passwordResetTokenCheck,
      passwordResetComplete
  };