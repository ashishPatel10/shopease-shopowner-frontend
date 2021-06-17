import { observable } from "mobx";
import axios from "axios";

class AuthStore {
  @observable isLoggedIn = false;
  @observable loading = false;
  @observable collapsed = false;
  @observable userInfo = {};

  constructor() {
    let userInfoLS = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfoLS) {
      this.isLoggedIn = true;
      this.userInfo = userInfoLS;
    //   this.setCommonHeaders();
    }
  }

  setUserInfo = (userInfo) => {
    this.userInfo = userInfo;
    this.isLoggedIn = true;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    // this.setCommonHeaders();
  };

  removeUserInfo = () => {
    this.userInfo = {};
    this.isLoggedIn = false;
    localStorage.removeItem("userInfo");
  };
//   setCommonHeaders = () => {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${
//       JSON.parse(localStorage.getItem("userInfo")).token
//     }`;
//   };
}

export default AuthStore;
