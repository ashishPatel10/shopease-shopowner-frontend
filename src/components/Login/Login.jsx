import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Form, Input, Button, message, } from 'antd';
import {
    LockOutlined,
    MailOutlined,
  } from "@ant-design/icons";
  import {
    login,
  } from "./../../services/RequestService";
  import Background from "../Background/Background";
  import "./Login.scss"

const Login = () => {
    const [formLogin] = Form.useForm();
    let [showLoader, showLoaderChange] = useState(0);

    const loginUser = () => {
        formLogin
        .validateFields()
        .then((values) => {
            console.log(values);
        //   login({
        //     email: values["email"],
        //     password: values["password"],
        //   })
        //     .then((data) => {
        //        console.log(data);
        //       if (data.type !== "error") {
        //         // auth.setUserInfo({
        //         //   token: data.data.token,
        //         //   user: values["email"],
        //         // });
        //       }
        //       formLogin.resetFields();
        //     })
        //     .catch((error) => {
        //       if (error && error.response && error.response.data) {
        //         message.error(error.response.data.error);
        //       }
        //     });
        })
       
      };
    return ( 
        <Background>
        <div className="loginPanel">
          <div
            style={{
              marginBottom: "20px",
              fontWeight: "700",
              color: "#6170f7",
             textAlign:"center"
            }}
          >
            LOGIN
          </div>
          <Form form={formLogin} initialValues={{ size: "small" }}>
           
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
           
            <Form.Item>
              <Button
                loading={showLoader}
                shape="round"
                type="primary"
                style={{ width: "100%" }}
                
                onClick={loginUser}
              >
                Login
              </Button>
              <br />
              <br />
              <p className="fontSmall">
                Dont't have an account ?&nbsp;
                <span>
                  <Link to="/register">Register</Link>
                </span>
              </p>
            </Form.Item>
          </Form>
        </div>
        
      </Background>  );
}
 
export default Login;