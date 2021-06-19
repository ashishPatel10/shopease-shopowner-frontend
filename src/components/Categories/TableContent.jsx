import React,{useState} from 'react';
import { Table, Badge, Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';



const TableContent = props => {
  
  const { data, onDelete } = props;




  
    const columns = [
      
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Rack No.', dataIndex: 'rackNo', key: 'rackNo' },
        { title: 'From Date', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'To Date', dataIndex: 'expiredAt', key: 'expiredAt' },
        { title: 'Creator', dataIndex: 'creator', key: 'creator' },
        { title: 'Action', key: 'operation', render: () => <a>Edit</a> },
        { title: 'Action', key: 'delete', render: category => (
          <button
            onClick={() => onDelete(category)}
            className="btn btn-danger btn-sm">
            Delete
          </button> )},
      ];

       

    return (
      <Table
        className="components-table-demo-nested"
        columns={columns}
       
        dataSource={data}
      />
    );
}

export default TableContent;