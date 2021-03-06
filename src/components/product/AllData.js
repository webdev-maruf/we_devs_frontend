import React, { useState, useEffect } from 'react'
import axios from 'axios'; 
import { getToken, getUser,removeUserSession, setUserSession } from '../../lib/Common';

export default function AllData(props){
  
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const token = getToken();
    console.log(token);
    const allData = async () => {
      const result = await axios(apiUrl+'/product',{
        headers: { 
          Accept:'application/json',
          Authorization: 'Bearer '+token
        } 
    }); 
      if(result.data.data !== undefined)
      props.allData(result.data.data);
    }; 
    allData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Image</th>        
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.products.length > 0 ? (
          props.products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td><img src={process.env.REACT_APP_API_ASSET_URL+'/'+product.image} class='pdt-img'/></td>            
              <td>
                <button onClick={() => {props.editRow(product.id)}} >Edit</button>
                <button onClick={() => props.deleteData(product.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>No Data</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
