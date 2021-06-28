import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import { Button, Modal, Form, Input, InputNumber, DatePicker, Table, Tag, Space, Popconfirm } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';






  const Categories = () => {


    const columns = [
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      { title: 'Rack No.', dataIndex: 'rackNo', key: 'rackNo' },
      { title: 'From Date', dataIndex: 'createdAt', key: 'createdAt' },
      { title: 'To Date', dataIndex: 'expiredAt', key: 'expiredAt' },
      { title: 'Creator', dataIndex: 'creator', key: 'creator' },
        {
          title: '',
          key: 'action',
          render: (text, record) => (
              <Popconfirm title="Sure to delete?"  onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ),
        },
     
    ];


    const [tableData, setTableData] = useState([
      {
        key: '1',
        category:"Health Care",
        description:"It includes personal care , hair care, etc.",
        rackNo: "1",
        createdAt:'2020-12-24 23:12:00',
        expiredAt:'2021-10-12 23:12:00',
        creator:"Jack"
      },
      {
        key: '2',
        category:"Grocery",
        description:"It includes rice, flour, etc.",
        rackNo: "2",
        createdAt:'2020-10-24 23:12:00',
        expiredAt:'2021-09-12 23:12:00',
        creator:"Liza"
      },
      {
        key: '3',
        category:"Food & Drink",
        description:"It includes snack foods, candy, etc.",
        rackNo: "3",
        createdAt:'2020-06-06 23:12:00',
        expiredAt:'2021-11-12 23:12:00',
        creator:"Harry"
      },
    ])  ;
  

    

    const onFinish = (values) => {
      console.log(values);
    };
    
    const [visible, setVisible, setLoading, loading] = useState(false);
    
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setVisible(false);
        setLoading(false);
      }, 3000);
    };
    const handleCancel = () => {
      setVisible( false);
    };

    
    const handleDelete = (key) => {
      console.log(key);
      let newFilteredData = tableData.filter((record) => record.key !== key);
      
     setTableData(newFilteredData);
     };

     
  

     const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    /* eslint-disable no-template-curly-in-string */
    
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    
    
    return( 
    <div>
        <Button  type="primary" onClick={showModal} >
            ADD CATEGORY
        </Button>



        <Modal visible={visible}
          title="Title"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            [
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            
            <Button key="submit" type="primary submit" loading={loading} onClick={handleOk}>
              Submit
            </Button>
            ]
          }
          >
        


          <Form  name="nest-messages" onFinish={onFinish}  validateMessages={validateMessages}>
            <Form.Item
              name='category'
              id='category'
              
              label="Category"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name='description'id='description' label="Description" >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={['user', 'rackNo']} label="Rack No" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
            </Form.Item>

           <Form.Item name={['user', 'createdAt']} label="Created At">
            <DatePicker />
            </Form.Item>
            <Form.Item name={['user', 'expiredAt']} label="Expired At">
            <DatePicker />
            </Form.Item>
            <Form.Item name={['user', 'creator']} label="Creator">
              <Input />
            </Form.Item>
            
          </Form>



      </Modal>

      <Table columns={columns} dataSource={tableData} />
    </div>
    ); 
  }
  export default Categories;
