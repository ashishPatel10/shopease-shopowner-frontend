import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  message,
  Button,
  Input,
  Form,
  Switch,
} from "antd";
import {
  CloseOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Link,  } from "react-router-dom";
import {
  register,
} from "./../../services/RequestService";
import { inject } from "mobx-react";
import "./Register.scss";

import Background from "../Background/Background";
import StoreProfile from "../StoreProfile/StoreProfile";

const Register = ({history}) => {
    const [formRegister] = Form.useForm();
    const [formStoreProfile] = Form.useForm();
    const [termsAndConditions, setTermsAndConditions] = useState(false);
    let [showLoader, showLoaderChange] = useState(0);
    let [showStoreForm, setShowStoreForm] = useState(0);
    const registerUser = () => {
        formRegister
        .validateFields()
        .then((values) => {
            console.log(values);
          register({
            email: values["email"],
            username: values["username"],

            password: values["password"],
          })
            .then((data) => {
               console.log(data);
              if (data.type !== "error") {
                // auth.setUserInfo({
                //   token: data.data.token,
                //   user: values["email"],
                // });
              }
              formRegister.resetFields();
              history.push("/login");

            })
            .catch((error) => {
              if (error && error.response && error.response.data) {
                message.error(error.response.data.error);
              }
            });
        })
       
      };
      const submitStoreDetails = () =>{
        formStoreProfile.validateFields()
        .then((values) => {
            console.log(values);
       
        })
        
    }
    return (  <Background>
        {/* {showStoreForm == 0 ?   */}
         <div className="registerPanel">
        
        <div
          style={{
            marginBottom: "20px",
            fontWeight: "700",
            color: "#6170f7",
           textAlign:"center"
          }}
        >
          CREATE ACCOUNT
        </div>
        <Form form={formRegister} initialValues={{ size: "small" }}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Name" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid email!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Email" prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Switch
              className="left"
              style={{ display: "inline-block" }}
              size="small"
              checked={termsAndConditions}
              onChange={() => {
                setTermsAndConditions(!termsAndConditions);
              }}
            />{" "}
            &nbsp;{" "}
            <span style={{ fontSize: "12px", color: "#000" }}>
              I agree with the terms & conditions
            </span>
          </Form.Item>
          <Form.Item>
            <Button
              loading={showLoader}
              shape="round"
              type="primary"
              style={{ width: "100%" }}
              disabled={!termsAndConditions}
              onClick={registerUser}
            >
              Register
            </Button>
            <br />
            <br />
            <p className="fontSmall">
              Have an account ?&nbsp;
              <span>
                <Link to="/login">Login</Link>
              </span>
            </p>
          </Form.Item>
        </Form>
      </div> 
      {/* :  */}
       {/* <div className="registerPanel">
        
       <div
         style={{
           marginBottom: "20px",
           fontWeight: "700",
           color: "#6170f7",
          textAlign:"center"
         }}
       >
        Add Store Details
       </div>
      <StoreProfile submitStoreDetails={submitStoreDetails} formStoreProfile={formStoreProfile}/>
     </div> */}
      {/* } */}
        
        
      </Background> );
}
 
export default Register;