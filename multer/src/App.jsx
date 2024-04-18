import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const[file, setFile] = useState();
  const[imageUrl, setImageUrl] = useState();

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
          setImageUrl(res.data.imageUrl);
          alert("Uploaded successfully"); // Alert on successful upload
        } else {
          console.log("Upload failed");
          alert("Upload failed"); // Alert on failed upload
        }
      })
      .catch(err => console.log(err));
  }

  return (
     <div>
       <form action="/upload" method="post" encType="multipart/form-data">
         <div>
           <label>Select your cat pictures:</label>
           <input multiple="multiple" name="cat_pics" type="file" onChange={(e) => setFile(e.target.files)} />
           {/* Call `upload` function on button click */}
           <button type="button" onClick={upload}>Upload Cat Pics</button>
         </div>
       </form>

       {}
       {imageUrl &&
        	<img src={imageUrl} alt="uploaded"/>}
     </div>
   );
}

export default App;