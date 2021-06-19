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

  export {
      register,
      login,
      getUserStore,
      addStore,
  };