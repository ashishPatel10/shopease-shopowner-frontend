import React, { useState, useReact } from "react";
import { Tabs } from "antd";
import { Card, Modal, Button } from "antd";
import { Row, Col, Form, Input, message, Popover } from "antd";

const { TabPane } = Tabs;

const Profiles = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const [formStoreProfile] = Form.useForm();
  const [formUserProfile] = Form.useForm();
  const submitUserDetails = () => {};
  const submitStoreDetails = () => {};
  //const dummyData = [{ storeName: "My store" }];
  const showModal = () => {
    setIsModalVisible(true);

    //  formStoreProfile.setFieldsValue({
    //    storeName: dummyData[0].storeName,
    //  });
  };
  const showUserModal = () => {
    setIsUserModalVisible(true);

    //  formStoreProfile.setFieldsValue({
    //    storeName: dummyData[0].storeName,
    //  });
  };
  const handleOk = () => {
    setIsModalVisible(false);
    setIsUserModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsUserModalVisible(false);
  };

  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="User Profile" key="1">
          <p>
            <>
              <Card
                title="Sam Smith"
                extra={
                  <Button type="primary" onClick={showUserModal}>
                    Edit
                  </Button>
                }
                style={{ width: 300 }}
              >
                <p>User Name : sam14 </p>
                <p> First Name : Sam </p>
                <p> Last Name : Smith </p>
                <p> Email ID : sam1421@gmail.com </p>
                <p> Phone Number: (604) 555-5555 </p>
              </Card>

              <Modal
                title="Personal Information"
                visible={isUserModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>
                  <Form
                    form={formUserProfile}
                    initialValues={{ size: "small" }}
                  >
                    <Form.Item
                      name="userName"
                      rules={[
                        {
                          required: true,
                          message: "Please input user name!",
                        },
                      ]}
                    >
                      <Input placeholder="User Name" />
                    </Form.Item>
                    <Form.Item
                      name="fname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your first name!",
                        },
                      ]}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item
                      name="lname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your last name!",
                        },
                      ]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email ID!",
                        },
                      ]}
                    >
                      <Input placeholder="Email ID" />
                    </Form.Item>
                    <Form.Item
                      name="userNum"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number!",
                        },
                      ]}
                    >
                      <Input placeholder="Phone Number" />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        shape="round"
                        type="primary"
                        style={{ width: "100%" }}
                        onClick={submitUserDetails}
                      >
                        Update
                      </Button>
                      <br />
                      <br />
                    </Form.Item>
                  </Form>
                </p>
              </Modal>
            </>
          </p>
        </TabPane>
        <TabPane tab="Store Information" key="2">
          <p>
            <>
              <Card
                title="Daily Essentials Store"
                extra={
                  <Button type="primary" onClick={showModal}>
                    Edit
                  </Button>
                }
                style={{ width: 300 }}
              >
                <p>Store Name: Daily Essentials Store</p>
                <p>Street Name: 7654 Tecumseh Road East </p>
                <p>Postal Code: N8T 1E9 </p>
                <p>City : Windsor</p>
                <p>Province: Ontario (ON)</p>
                <p>Primary Contact(Owner): (604) 555-5555 </p>
                <p>Secondary Contact : (604) 432-786 </p>
              </Card>

              <Modal
                title="Store Information"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>
                  <Form
                    form={formStoreProfile}
                    initialValues={{ size: "small" }}
                  >
                    <Form.Item
                      name="storeName"
                      rules={[
                        {
                          required: true,
                          message: "Please input store name!",
                        },
                      ]}
                    >
                      <Input placeholder="Store Name" />
                    </Form.Item>
                    <Form.Item
                      name="streetName"
                      rules={[
                        {
                          required: true,
                          message: "Please input street name!",
                        },
                      ]}
                    >
                      <Input placeholder="Street Name" />
                    </Form.Item>
                    <Form.Item
                      name="postalCode"
                      rules={[
                        {
                          required: true,
                          message: "Please input postalCode!",
                        },
                      ]}
                    >
                      <Input placeholder="Postal Code" />
                    </Form.Item>
                    <Form.Item
                      name="city"
                      rules={[
                        {
                          required: true,
                          message: "Please input city!",
                        },
                      ]}
                    >
                      <Input placeholder="City" />
                    </Form.Item>
                    <Form.Item
                      name="province"
                      rules={[
                        {
                          required: true,
                          message: "Please input city!",
                        },
                      ]}
                    >
                      <Input placeholder="Province" />
                    </Form.Item>
                    <Form.Item
                      name="primaryContact"
                      rules={[
                        {
                          required: true,
                          message: "Please input primary contact!",
                          length: 10,
                        },
                      ]}
                    >
                      <Input placeholder="Primary Contact" />
                    </Form.Item>
                    <Form.Item
                      name="secondaryContact"
                      rules={[
                        {
                          required: true,
                          message: "Please input secondary contact!",
                          length: 10,
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Secondary Contact" />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        shape="round"
                        type="primary"
                        style={{ width: "100%" }}
                        onClick={submitStoreDetails}
                      >
                        Update
                      </Button>
                      <br />
                      <br />
                    </Form.Item>
                  </Form>
                </p>
              </Modal>
            </>
          </p>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profiles;
