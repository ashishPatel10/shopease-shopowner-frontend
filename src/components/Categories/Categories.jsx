import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import TableContent from "./TableContent";


  const Categories = () => {
    return( 
    <div>
        <Button  type="primary" >
            ADD CATEGORY
        </Button>
        <TableContent />
    </div>
    ); 
  }
  export default Categories;
