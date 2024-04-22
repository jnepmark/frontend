import React, { useState } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard';

function App() {
  const[file, setFile] = useState();
  const [imageUrls, setImageUrls] = useState([]);

  const upload = () => {
    if (!file || file.length === 0) {
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

   return (
     <div>
       <form action="/upload" accept="image/*" method="post" encType="multipart/form-data">
         <div>
           <label>Select your cat pictures:</label>
           <input multiple="multiple" name="cat_pics" type="file"
                  onChange={(e) => setFile(e.target.files)} />
           {}
           <button type="button" onClick={upload}>Upload Cat Pics</button>
         </div>
       </form>

       {imageUrls.map((url, index) =>
         <ImageCard key={index} imageUrl={`http://localhost:4000${url}`} />
       )}
     </div>
   );
}

export default App;