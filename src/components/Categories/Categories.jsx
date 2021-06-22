import React,{useState,useReact} from 'react';
import { Card,Modal, Button,Form,Input,Table, Tag, Space,Popconfirm } from 'antd';
import {
    DeleteColumnOutlined,
  DeleteOutlined,
  EditOutlined
  } from '@ant-design/icons';

  
const Categories = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editCategoryVisible, setEditCategoryVisible] = useState(false);
    const [formStore] = Form.useForm();
    const [sortedInfo, setSortedInfo] = useState({});
    const [tableData, setTableData] = useState([
        {
          key: '1',
          category:"category1",
          description:"des 1"
        },
        {
          key: '2',
          category:"category2",
          description:"des 1"
        },
        {
          key: '3',
          category:"category3",
          description:"des 3"
        },
      ])  ;
    const dummyData = [{"storeName":"My store",}]
    // const showModal = () => {
    //     setIsModalVisible(true);
    //     formStore.setFieldsValue({
    //         storeName : dummyData[0].storeName,
    //       });
    //   };
      const showEditCategoryModal = () => {
        setEditCategoryVisible(true);
        formStore.setFieldsValue({
            storeName : dummyData[0].storeName,
          });
      };
      const handleOk = () => {
        // setIsModalVisible(false);
        setEditCategoryVisible(false);
      };
    
      const handleCancel = () => {
        // setIsModalVisible(false);
        setEditCategoryVisible(false);
      };
     const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setSortedInfo(sorter)
      };
      const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            
            sorter: (a, b) => a.category.localeCompare(b.category),
            sortOrder: sortedInfo.columnKey === 'category' && sortedInfo.order,
            ellipsis: true,
          },
         
        // {
        //   title: 'Category',
        //   dataIndex: 'category',
        //   key: 'category',
        //   sorter: (a, b) => a.category.length - b.category.length,
        //   sortOrder: sortedInfo.columnKey === 'category' && sortedInfo.category,
        //   ellipsis: true,
        // },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
      
        {
          title: '',
          key: 'action',
          width:80,
          render: (text, record) => (
              
              <EditOutlined style={{color:"blue"}} onClick={showEditCategoryModal}/>
           
          ),
        },
      
          {
            title: '',
            key: 'action',
           width:80,
            render: (text, record) => (
                <Popconfirm title="Sure to delete?"  onConfirm={() => handleDelete(record.key)}>
                <DeleteOutlined style={{color:"red"}}/>
              </Popconfirm>
            ),
          },
       
      ];
    
      const handleDelete = (key) => {
       console.log(key);
       let newFilteredData = tableData.filter((record) => record.key == key);
       
      setTableData(newFilteredData);
      };
    return ( 
        <>
        {/* <Card title="Default size card" extra={<EditOutlined onClick={showModal}/> } style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
         </Card> */}
         <Table columns={columns} dataSource={tableData} onChange={handleChange}/>
         <Modal title="Edit Category" visible={editCategoryVisible}  onCancel={handleCancel} footer={[
           
            <Button key="submit" type="primary" onClick={handleOk}>
              Submit
            </Button>,
            
          ]}>
      <Form form={formStore} initialValues={{ size: "small" }}>
                    <Form.Item
                        name="storeName"
                        rules={[
                        {
                            required: true,
                            message: "Please input store name!",
                        },
                        ]}
                    >
                        <Input placeholder="Store Name"  />
                    </Form.Item>
                </Form>
      </Modal>
      {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form form={formStore} initialValues={{ size: "small" }}>
                    <Form.Item
                        name="storeName"
                        rules={[
                        {
                            required: true,
                            message: "Please input store name!",
                        },
                        ]}
                    >
                        <Input placeholder="Store Name"  />
                    </Form.Item>
                </Form>
      </Modal> */}
    </>
     );
}
 
export default Categories;