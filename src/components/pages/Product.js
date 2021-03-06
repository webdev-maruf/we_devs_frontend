import React, { useState,useEffect } from 'react'
import axios from 'axios'; 
import { getToken, getUser,removeUserSession, setUserSession } from '../../lib/Common';

import AllData from '../product/AllData'
import AddForm from '../product/AddForm'
import EditForm from '../product/EditForm'

export default function Product(){
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, title: '', price: '', description:'', image:null }

  const [currentData, setEditData] = useState(initialFormState)
  const token = getToken();
  const [error, setError] = useState(null);

  const addProduct = (product) => {
    let temp= [product]
    setProducts([...temp, ...products])
  }

  const apiUrl = process.env.REACT_APP_API_URL;

  const editRow = (product) => {
    setEditing(true)
    axios(apiUrl+"/product/"+product+"/edit",{
      headers: { 
        Accept:'application/json',
        Authorization: 'Bearer '+token
      } 
    })
    .then((response)=>{
        if(response.data.data !== undefined){
          setEditData(response.data.data);
        }
    }); 
  }

  const updateData = (id, updateProduct) => {
    let data = new FormData();
    Object.entries(updateProduct).map(([k,v])=>{
      if(k=='image'){
        if (typeof v != 'string' || !v instanceof String)
        data.set(k, v);
      } else{
        data.set(k, v);
      }
    })
    data.set('_method','PATCH');

    axios.post(apiUrl+'/product/'+id, data,{
      headers: { 
        Accept:'application/json',
        Authorization: 'Bearer '+token
      } 
    })
    .then((response) => {
      if(response.data.done !== undefined && response.data.done){
        setEditing(false)
        setEditData(initialFormState)
        setProducts(products.map((product) => (product.id === id ? response.data.data : product)))
      }
    })
    .catch((error)=>{        
        if(error.response !== undefined){
         setError(Object.values(error.response.data.errors).join(' # '))
         setTimeout(function(){
            setError(null)
          },5000)
        } else {
          setError("Something went wrong. Please try again.!");
        }
    });
  }

  const deleteData = (id) => {
    axios.delete(apiUrl+'/product/' + id,{
      headers: { 
        Accept:'application/json',
        Authorization: 'Bearer '+token
      } 
    })
    .then((response) => { 
      if(response.data.done !== undefined && response.data.done){
        setProducts(products.filter((item) => item.id !== id))
      }
    });  
  }

  const allData = (data) => {
    setProducts(data)
  }

  return (
    <div className="container">      
      <div className="flex-row">
        <div className="flex-large">
		  {editing ? (
		    <div>
		      <h2>Edit product</h2>
          <div>
            <small style={{ color: 'red' }}>{error}</small>
          </div>
		      <EditForm
		        setEditing={setEditing}
		        currentData={currentData}
		        updateData={updateData}
		      />
		    </div>
		  ) : (
		    <div>
		      <h2>Add product</h2>
		      <AddForm addProduct={addProduct} />
		    </div>
		  )}
      
		</div>
        <div className="flex-large">
          <h2>View products</h2>
          <AllData products={products} allData={allData} editRow={editRow} deleteData={deleteData} />
        </div>
      </div>
    </div>
  )
}

