import React,{useState,useReact, useEffect} from 'react';
import { Card,Modal, Button,Form,Input,InputNumber,Table, Tag, Space,Popconfirm, DatePicker, Typography } from 'antd';
import { Link } from "react-router-dom";
import {
  DownloadOutlined,
    DeleteColumnOutlined,
  DeleteOutlined,
  EditOutlined
  } from '@ant-design/icons';


const Categories = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editCategoryVisible, setEditCategoryVisible] = useState(false);
    const [AddCategoryVisible, setAddCategoryVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formStore] = Form.useForm();
    const [sortedInfo, setSortedInfo] = useState({});  
    const [categoryInfo, setCategoryInfo] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [expiredAt, setExpiredAt] = useState("");
    const [tableData, setTableData] = useState([
        {
          key: '1',
          category:"category1",
          description:"des 1",
          rackNo: 1,
        dateCreated : "12/06/2021"
        },
        {
          key: '2',
          category:"category2",
          description:"des 1",
          rackNo: 4,
        dateCreated: "01/05/2021"
        },
        {
          key: '3',
          category:"category3",
          description:"des 3",
          rackNo: 2,
        dateCreated: "01/05/2021"
        },
      ])  ;
    const dummyData = [{"storeName":"My store",}]
    // const showModal = () => {
    //     setIsModalVisible(true);
    //     formStore.setFieldsValue({
    //         storeName : dummyData[0].storeName,
    //       });
    //   };

    
    const onFinish = (values) => {
      console.log(values);
    };

    const showAddCategoryModal = () => {
      setAddCategoryVisible(true);
  };

      const showEditCategoryModal = () => {
        setEditCategoryVisible(true);
        {/*formStore.setFieldsValue({
            storeName : dummyData[0].storeName,
          }); */}
      };
      const handleOk = () => {
        // setIsModalVisible(false);
        setEditCategoryVisible(false);
      };
    
      const handleCancel = () => {
        // setIsModalVisible(false);
        setEditCategoryVisible(false);
      };
      const handleCancel1 = () => {
        setAddCategoryVisible(false);
      };
     
      const handleOk1 = () => {
        
        /*removed time out function with loading
        if(createdAt.getTime() > expiredAt.getTime())
        {
          setErrorMessage("Expire date should be later")

        }*/
          setAddCategoryVisible(false);
      };
    
     const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setSortedInfo(sorter)
      };
    
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
          title: 'Rack No.',
          dataIndex: 'rackNo',
          key: 'rackNo',
          
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
       let newFilteredData = tableData.filter((record) => record.key != key);
       
      setTableData(newFilteredData);
      };
    return ( 
        <>

<Button  type="primary" onClick={showAddCategoryModal} >
            ADD CATEGORY
        </Button>

        <Modal title="Add New Category"
        visible={AddCategoryVisible}
          onCancel={handleCancel1}
          footer={
            [
            <Button key="back" onClick={handleCancel1}>
              Cancel
            </Button>,
            
            <Button key="submit" type="primary submit" onClick={handleOk1}>
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

           <Form.Item name={['user', 'createdAt']} type="date" label="Created At">
            <DatePicker 
            // selected={ this.state.createdAt }
              onChange={ handleChange }
              name="createdAt"
              dateFormat="MM/dd/yyyy" />
            </Form.Item>
            <Form.Item name={['user', 'expiredAt']} type="date" label="Expired At">
            <DatePicker 
            //selected={ this.state.expiredAt }
              /*onChange={ this.handleChange }
              dataIndex= "expiredAt"
              key = "expiredAt"
              name="expiredAt"
            dateFormat="MM/dd/yyyy" */
             />
            </Form.Item>
            <Form.Item name={['user', 'creator']} label="Creator">
              <Input />
            </Form.Item>
            
          </Form>
      </Modal>

        {/* <Card title="Default size card" extra={<EditOutlined onClick={showModal}/> } style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
         </Card> */}
         // give use state in place of tableData in datasource
         <Table columns={columns} dataSource={tableData} onChange={handleChange}/>
         <Modal title="Edit Category" visible={editCategoryVisible}  onCancel={handleCancel} footer={[
           
            <Button key="submit" type="primary" onClick={handleOk}>
              Submit
            </Button>,
            
          ]}>
      <Form form={formStore} initialValues={{ size: "small" }}>
                    <Form.Item
              // how will the value get mapped ? should not there be uneditabel fields like date created?
                     //   dataIndex="category"
                     name="Category" 
                     rules={[
                        {
                            required: true,
                            message: "Please input category name!",
                        },
                        ]}
                    >
                        <Input placeholder="Category Name"  />
                    </Form.Item>
                    <Form.Item
                        name="Description"
                        rules={[
                        {
                            required: true,
                            message: "Please input description!",
                        },
                        ]}
                    >
                        <Input placeholder="Description"  />
                    </Form.Item>
                    <Form.Item
                        name="Rack no."
                        rules={[
                        {
                            required: true,
                            message: "Please input Rack no.!",
                        },
                        ]}
                    >
                        <Input placeholder="Rack No."  />
                    </Form.Item>
                    
                    <Form.Item
                        name="FromDate"
                        rules={[
                        {
                            required: true,
                            message: "Please input From Date!",
                        },
                        ]}
                    >
                        <Input placeholder=" From Date(DD/MM/YYYY)"  />
                        </Form.Item>
                  
                    <Form.Item
                        name="To Date"
                        rules={[
                        {
                            required: true,
                            message: "Please input To Date!",
                        },
                        ]}
                    >
                        <Input placeholder="To Date (DD/MM/YYYY)"  />
                    </Form.Item>
                    <Form.Item
                        name="Creator"
                        rules={[
                        {
                            required: true,
                            message: "Please input Creator's name!",
                        },
                        ]}
                    >
                        <Input placeholder="CreatorName"  />
                    </Form.Item>
                    <Form.Item
                        name="CreatedDate"
                        rules={[
                        {
                            required: true,
                            message: "Please input Creation Date!",
                        },
                        ]}
                    >
                        <Input placeholder="Creation Date (DD/MM/YYYY)"  />
                        </Form.Item>
                        <Form.Item
                        name="Modifier"
                        rules={[
                        {
                            required: true,
                            message: "Please input Modifier's name!",
                        },
                        ]}
                    >
                        <Input placeholder="ModifierName"  />
                    </Form.Item>
                    <Form.Item
                        name="ModifiededDate"
                        rules={[
                        {
                            required: true,
                            message: "Please input date when modified!",
                        },
                        ]}
                    >
                        <Input placeholder="Modified Date (DD/MM/YYYY)"  />
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