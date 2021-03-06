import React, { useState } from 'react'
import axios from 'axios'; 
import { getToken, getUser,removeUserSession, setUserSession } from '../../lib/Common';

export default function AddForm(props){
  const initialFormState = { id: null, title: '', price: '', description:'', image:'' }
  const [product, setProduct] = useState(initialFormState)
  const [imgUrl, setImgUrl] = useState({previewImage:''})
  const [error, setError] = useState(null);  
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiAssetUrl = process.env.REACT_APP_API_ASSET_URL+'/';

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProduct({...product, [e.target.name]:e.target.files[0]});

      let reader = new FileReader();
      reader.onload = (ev) => {
        setImgUrl({...imgUrl, previewImage: ev.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);

    } else {
      setProduct({...product, [e.target.name]: e.target.value}); 
    }
  }


  function storeData(event){
      event.preventDefault()
      const token = getToken();
      let data = new FormData();
        Object.entries(product).map(([k,v])=>{
        data.set(k, v);
      }) 
      axios.post(apiUrl+"/product", data,{
        headers: { 
          Accept:'application/json',
          Authorization: 'Bearer '+token
        } 
      })
      .then((result) => {
        if(result.data.done !== undefined && result.data.done){
          setProduct(initialFormState)
          setImgUrl({...imgUrl, previewImage: '' });
          let storedData = result.data.data;
          props.addProduct(storedData)
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

  return (
      <>
      <div>
        <small style={{ color: 'red' }}>{error}</small>
      </div>
      <form onSubmit={storeData}>
        <div className='field'>
          <label>Title</label>
          <input type="text" name="title" value={product.title} onChange={handleInputChange}/>
        </div>
        <div className='field'>
          <label>Price</label>
          <input type="text" name="price" value={product.price} onChange={handleInputChange}/>
        </div>
        <div className='field'>
          <label>Description</label>
          <textarea name="description" value={product.description} onChange={handleInputChange}></textarea>
        </div>
        <div className='field'>
          <label>Image</label>
          <div className='image-box'>
            <div className='image-display'>
             <img src={imgUrl.previewImage?imgUrl.previewImage:''} className='preview-img'/>
            </div>
            <input type="file" id='image' name="image" onChange={handleInputChange} className='inputfile'/>            
            <label for="image">Upload Image</label>
          </div>
        </div>
        <button>Store</button>
      </form>
      </>
  )
}

