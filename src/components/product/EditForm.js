import React, { useState, useEffect } from 'react'

export default function EditForm(props){
  const [product, setProducts] = useState(props.currentData)
  const [imgUrl, setImgUrl] = useState({previewImage:''})
  const apiAssetUrl = process.env.REACT_APP_API_ASSET_URL+'/';

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProducts({...product, [e.target.name]:e.target.files[0]});

      let reader = new FileReader();
      reader.onload = (ev) => {
        setImgUrl({...imgUrl, previewImage: ev.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);

    } else {
      setProducts({...product, [e.target.name]: e.target.value}); 
    }
  }
  useEffect(() => {
    setProducts(props.currentData)
  }, [props])
  function updateData(event){
      event.preventDefault()
      props.updateData(product.id, product)

  }
  return (
    <form onSubmit={updateData}>
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
              <img src={imgUrl.previewImage?imgUrl.previewImage:(product.image?apiAssetUrl+product.image:'')} className='preview-img'/>
            </div>
            <input type="file" id='image' name="image" onChange={handleInputChange} className='inputfile'/>            
            <label for="image">Upload Image</label>            
          </div>
        </div>
        <button>Update</button>
        <button onClick={() => props.setEditing(false)} className="cancel-button">Cancel</button>
    </form>
  )
}

