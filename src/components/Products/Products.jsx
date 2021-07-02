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
    addProduct,
    updateProduct,
    getProduct,
    deleteProduct
  } from "./../../services/RequestService";

  import { values } from 'mobx';

  const Products = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editProductVisible, setEditProductVisible] = useState(false);
    const [AddProductVisible, setAddProductVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formEditProduct] = Form.useForm();
    const [sortedInfo, setSortedInfo] = useState({});  
    const [categoryInfo, setCategoryInfo] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [expiredAt, setExpiredAt] = useState("");
    const [formAddProduct] = Form.useForm();
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
    const dummyData = [{"storeName":"My store",}]
    // const showModal = () => {
    //     setIsModalVisible(true);
    //     formStore.setFieldsValue({
    //         storeName : dummyData[0].storeName,
    //       });
    //   };

    */

    const onFinish = (values) => {
        console.log(values);
      };
  
      const showAddProductModal = () => {
        setAddProductVisible(true);
    };

    const showEditProductModal = () => {

        setEditProductVisible(true);
        {/*formStore.setFieldsValue({
            storeName : dummyData[0].storeName,
          }); */}
      };
      const handleEditProductSubmit = () => {
        // setIsModalVisible(false);
        setEditProductVisible(false);
      };
    
      const handleEditProductCancel = () => {
        // setIsModalVisible(false);
        setEditProductVisible(false);
      };
      const handleAddProductCancel = () => {
        setAddProductVisible(false);
      };
     
      const handleAddProductSubmit = () => {
        /*removed time out function with loading     if(createdAt.getTime() > expiredAt.getTime()){  setErrorMessage("Expire date should be later")  }*/
               formAddProduct
               .validateFields()  
               .then((values) =>{
                   addProduct({
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
                     setAddProductVisible(1)
                     if (data.type !== "error")  {
                      // error(unexeceted use of history) history.push("/categories")
                       message.success("Product added successfully!!")
                       setAddProductVisible(false);
                     }
                     formAddProduct.resetFields();
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
                    title: 'Product',
                    dataIndex: 'product',
                    key: 'product',
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
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          
        },  
      {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          
        }, 
        {
          title: 'Discount',
          dataIndex: 'discount',
          key: 'discount',
          
        },  
       
        {
          title: 'Company',
          dataIndex: 'company',
          key: 'company',
          
        }, 
        {
          title: 'Ingredients',
          dataIndex: 'ingredients',
          key: 'ingredients',
          
        }, 
       
        {
          title: 'Thru Date',
          dataIndex: 'thruDate',
          key: 'thruDate',
          
        }, 
          
        {
            title: '',
            key: 'action',
            width:80,
            render: (text, record) => (
                
                <EditOutlined style={{color:"blue"}} onClick={showEditProductModal}/>
             
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

<Button  type="primary" onClick={showAddProductModal} >
            ADD PRODUCT 
        </Button>

        <Modal title="Add New Product"
        visible={AddProductVisible}
          onCancel={handleAddProductCancel}
          footer={
            [
            <Button key="back" onClick={handleAddProductCancel}>
              Cancel
            </Button>,
             <Button key="submit" type="primary submit" onClick={handleAddProductSubmit}>
              Submit
            </Button>
            ]
          }
          >
              <Form  name="formAddProduct" onFinish={onFinish}  validateMessages={validateMessages}>
            <Form.Item
              name="product" label="Product"
              rules={[
                {
                  required: true,
                  message: "Please input Product name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description"  label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="quantity" label="Quantity" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
            </Form.Item>

            <Form.Item name="discount" label="Discount" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
            </Form.Item>

           
             <Form.Item name="company" label="Company">
               <Input />
             </Form.Item>

             <Form.Item name="ingredients"  label="Ingredients">
              <Input.TextArea />
            </Form.Item>

          {/* <Form.Item name= "createdAt" type="date" label="Created At">
            <DatePicker 
            // selected={ this.state.createdAt }
              onChange={ handleChange }
              name="createdAt"
              dateFormat="MM/dd/yyyy" />
            </Form.Item>
            */ }
            <Form.Item name="thruDate" type="date" label="Thru Date">
            <DatePicker 
            //selected={ this.state.expiredAt }
              /*onChange={ this.handleChange }
              dataIndex= "expiredAt"
              key = "expiredAt"
              name="expiredAt"
            dateFormat="MM/dd/yyyy" */
             />
             </Form.Item>
             
           </Form>
       </Modal>
 
         {/* <Card title="Default size card" extra={<EditOutlined onClick={showModal}/> } style={{ width: 300 }}>
             <p>Card content</p>
             <p>Card content</p>
             <p>Card content</p>
          </Card>  
           give use state in place of tableData in datasource */}
          <Table columns={columns} dataSource={tableData} onChange={handleChange}/>
          <Modal title="Edit Product" visible={editProductVisible}  onCancel={handleEditProductCancel} footer={[
            
             <Button key="submit" type="primary" onClick={handleEditProductSubmit}>
               Submit
             </Button>,
             
           ]}>

<Form form={formEditProduct} initialValues={{ size: "small" }}>
                    <Form.Item
              // how will the value get mapped ? should not there be uneditabel fields like date created?
                     //   dataIndex="category"
                     name="product" 
                     rules={[
                        {
                            required: true,
                            message: "Please input product name!",
                        },
                        ]}
                    >
                        <Input placeholder="Product Name"  />
                    </Form.Item>
                    <Form.Item
                        name="description"
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
                        name="quantity"
                        rules={[
                        {
                            required: true,
                            message: "Please input Quantity no.!",
                        },
                        ]}
                    >
                        <Input placeholder="Quantity"  />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        rules={[
                        {
                            required: true,
                            message: "Please input Price",
                        },
                        ]}
                    >
                        <Input placeholder="Price"  />
                    </Form.Item>

                    <Form.Item
                        name="discount"
                        rules={[
                        {
                            required: true,
                            message: "Please input Discount",
                        },
                        ]}
                    >
                        <Input placeholder="Discount"  />
                    </Form.Item>

                    <Form.Item
                        name="company"
                        rules={[
                        {
                            required: true,
                            message: "Please input Company name!",
                        },
                        ]}
                    >
                        <Input placeholder="Company"  />
                    </Form.Item>
                    
                    <Form.Item
                        name="ingredients"
                        rules={[
                        {
                            required: true,
                            message: "Please input ingredients!",
                        },
                        ]}
                    >
                        <Input placeholder="Ingredients"  />
                    </Form.Item>
                    <Form.Item
                        name="thruDate"
                        rules={[
                        {
                            required: true,
                            message: "Please input Thru Date!",
                        },
                        ]}
                    >
                        <Input placeholder=" Thru Date(DD/MM/YYYY)"  />
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
 
export default Products;
  