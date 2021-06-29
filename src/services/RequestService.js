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
  // ************************************
  const addCategory = (data) => {
    return RestfulProvider.post("api/category/addCategory/", data);
  }; 
  const updateCategory = (data) => {
    return RestfulProvider.put("api/category/updateCategory", data);
  }; 
  const getCategory = (id) =>{
    return RestfulProvider.get("api/category/getCategory"+id);
  };
 const deleteCategory = (data) =>{
    return RestfulProvider.delete("api/category/deleteCategory");
 };
 
 
  export {
      register,
      login,
      getUserStore,
      addStore,
      addCategory,
      updateCategory,
      getCategory,
      deleteCategory
  };
