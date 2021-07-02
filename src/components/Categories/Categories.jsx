import React,{useState,useReact, useEffect} from 'react';
import { Card,Modal, Button,Form,Input,InputNumber,Table, Tag, Space,Popconfirm, DatePicker, Typography, message } from 'antd';
import { Link } from "react-router-dom";
import {
  DownloadOutlined,
    DeleteColumnOutlined,
  DeleteOutlined,
  EditOutlined
  } from '@ant-design/icons';
  import {
    addCategory,
    updateCategory,
    getCategoryByStoreId,
    getCategory,
    deleteCategory
  } from "./../../services/RequestService";
import { values } from 'mobx';
  

const Categories = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editCategoryVisible, setEditCategoryVisible] = useState(false);
    const [AddCategoryVisible, setAddCategoryVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formEditCategory] = Form.useForm();
    const [sortedInfo, setSortedInfo] = useState({});  
    const [categoryInfo, setCategoryInfo] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [expiredAt, setExpiredAt] = useState("");
    const [formAddCategory] = Form.useForm();
    const [category,setCategory] = useState([]);
    const [tableData, setTableData] = useState([ {
      key: '',
      category:"",
      description:"",
      rackNo: 1,
    dateCreated : ""
    }]);
    /* const [tableData, setTableData] = useState([
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
    */
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
      const handleEditCategorySubmit = () => {
        // setIsModalVisible(false);
        setEditCategoryVisible(false);
      };
    
      const handleEditCategoryCancel = () => {
        // setIsModalVisible(false);
        setEditCategoryVisible(false);
      };
      const handleAddCategoryCancel = () => {
        setAddCategoryVisible(false);
      };
     
      const handleAddCategorySubmit = () => {
 /*removed time out function with loading     if(createdAt.getTime() > expiredAt.getTime()){  setErrorMessage("Expire date should be later")  }*/
        formAddCategory
        .validateFields()  
        .then((values) =>{
            addCategory({
            storeId: +localStorage.getItem("storeIdCount"),
            // storeRefId: "1",             not sure if this is needed
            category: values["category"],
            description: values["description"],
            createdAt: values["createdAt"],    
            expiredAt: values["expiredAt"],
            creator: values["creator"]
            })
            .then((data) => {
              console.log(data);
              setAddCategoryVisible(1)
              if (data.type !== "error")  {
               // error(unexeceted use of history) history.push("/categories")
                message.success("Category added successfully!!")
                setAddCategoryVisible(false);
              }
              formAddCategory.resetFields();
            })
            .catch((error) => {
              //loaderchange not implemented, check if required
              console.log(error.response)
              if (error) {
                message.error(error.response.data.detail);
              }
            })
        })
        
        

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
            dataIndex: 'category_name',
            key: 'category_name',
            
            sorter: (a, b) => a.category_name.localeCompare(b.category_name),
            sortOrder: sortedInfo.columnKey === 'category_name' && sortedInfo.order,
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
          dataIndex: 'rackNumber',
          key: 'rackNumber',
          
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
                <Popconfirm title="Sure to delete?"  onConfirm={() => handleDelete(record.categoryId)}>
                <DeleteOutlined style={{color:"red"}}/>
              </Popconfirm>
            ),
          },
       
      ];
    
      const handleDelete = (key) => {
       console.log(key);
        deleteCategory(key);
        

       let newFilteredData = tableData.filter((record) => record.key != key);
       
      setTableData(newFilteredData);
      };
      useEffect(() => {
    
        getCategory()
        .then((data) => {
          console.log(data);
          setCategory(
            data
          )
          })
        .catch((error) => {
          console.log(error.response)
          if (error) {
            message.error(error.response.data.email);
          }
        });
      
    }, []); 
    return ( 
        <>

<Button  type="primary" onClick={showAddCategoryModal} >
            ADD CATEGORY 
        </Button>

        <Modal title="Add New Category"
        visible={AddCategoryVisible}
          onCancel={handleAddCategoryCancel}
          footer={
            [
            <Button key="back" onClick={handleAddCategoryCancel}>
              Cancel
            </Button>,
             <Button key="submit" type="primary submit" onClick={handleAddCategorySubmit}>
              Submit
            </Button>
            ]
          }
          >
          <Form  name="formAddCategory" onFinish={onFinish}  validateMessages={validateMessages}>
            <Form.Item
              name="category" label="Category"
              rules={[
                {
                  required: true,
                  message: "Please input Category name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description"  label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="RackNo" label="Rack No" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
            </Form.Item>

          {/* <Form.Item name= "createdAt" type="date" label="Created At">
            <DatePicker 
            // selected={ this.state.createdAt }
              onChange={ handleChange }
              name="createdAt"
              dateFormat="MM/dd/yyyy" />
            </Form.Item>
            */ }
            <Form.Item name="expiredAt" type="date" label="Expired At">
            <DatePicker 
            //selected={ this.state.expiredAt }
              /*onChange={ this.handleChange }
              dataIndex= "expiredAt"
              key = "expiredAt"
              name="expiredAt"
            dateFormat="MM/dd/yyyy" */
             />
            </Form.Item>
            <Form.Item name="creator" label="Creator">
              <Input />
            </Form.Item>
            
          </Form>
      </Modal>

        {/* <Card title="Default size card" extra={<EditOutlined onClick={showModal}/> } style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
         </Card>  
          give use state in place of tableData in datasource */}
         <Table columns={columns} dataSource={category} onChange={handleChange}/>
         <Modal title="Edit Category" visible={editCategoryVisible}  onCancel={handleEditCategoryCancel} footer={[

            <Button key="submit" type="primary" onClick={handleEditCategorySubmit}>
              Submit
            </Button>,
            
          ]}>
      <Form form={formEditCategory} initialValues={{ size: "small" }}>
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