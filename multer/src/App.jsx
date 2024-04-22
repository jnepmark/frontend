import React, { useState } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard';
import './App.css';

function App() {
  const [file, setFile] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const upload = () => {
    if (file.length === 0) {
      alert("No file to upload");
      return;
    }

    const formData = new FormData();
    Array.from(file).forEach((file) => {
      formData.append('cat_pics', file);
    });

    axios.post("http://localhost:4000/upload", formData)
      .then(res => {
        if (res.data.status === 'success') {
          setImageUrls(prevState => [...prevState, ...res.data.imageURLs]);
          alert("Uploaded successfully");
        } else {
          console.log("Upload failed");
          alert("Upload failed");
        }
      })
      .catch(err => console.log(err));
  }

  const handleDelete = (index) => { 
     let updatedImages = [...imageUrls];
     updatedImages.splice(index, 1);
     setImageUrls(updatedImages);
   }

   return (
     <div className='form'>
       <form action="/upload" accept="image/*" method="post" encType="multipart/form-data">
         <label>Select your cat pictures:</label>
         <input
           multiple
           name="cat_pics"
           type="file"
           accept=".jpg,.jpeg,.png,.gif,.tiff,.psd,.pdf,application/postscript,image/bmp,image/heif,image/svg+xml"
           onChange={(e) => setFile(e.target.files)} />
         {}
         <button type="button" onClick={upload}>Upload Cat Pics</button>
       </form>
       
       {imageUrls.map((url, index) =>
         (
           <div key={index}>
             <ImageCard imageUrl={`http://localhost:4000${url}`} />
             {/* Add a delete button with an onClick event */}
             <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          )
       )}
     </div> 
   );
}

export default App;