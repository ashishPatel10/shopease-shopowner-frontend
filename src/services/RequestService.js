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
  const getCategoryByStoreId = (id) =>{
    return RestfulProvider.get("api/category/getCategoryByStoreId/"+id);
  };

 const deleteCategory = (id) =>{
    return RestfulProvider.delete("api/category/deleteCategory/"+id);
 };
 const getCategory = () =>{
  return RestfulProvider.get("api/category/getCategory");
};

 

  const addProduct = (data) => {
    return RestfulProvider.post("api/product/addProduct/", data);
  }; 
  const updateProduct = (data) => {
    return RestfulProvider.put("api/product/updateProduct", data);
  }; 
  const getProduct = (id) =>{
    return RestfulProvider.get("api/product/getProduct"+id);
  };
 const deleteProduct = (data) =>{
    return RestfulProvider.delete("api/product/deleteProduct");
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

      addCategory,
      getCategory,
      updateCategory,
      getCategoryByStoreId,
      deleteCategory,
  
      addProduct,
      updateProduct,
      getProduct,
      deleteProduct,


      verifyEmail,
      requestResetEmail,
      passwordResetTokenCheck,
      passwordResetComplete
  };

