import{ useState } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard';
import './App.css';

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
     <div className='form'>
       <form action="/upload" accept="image/*" method="post" encType="multipart/form-data">
         <div>
           <h1 className=''>Select your cat pictures:</h1>
           <input multiple="multiple" name="cat_pics" type="file"
                  onChange={(e) => setFile(e.target.files)} />
           {}
           <button type="button" onClick={upload}>Upload Cat Pics</button>
         </div>
       </form>
      <div className='images'>
      {imageUrls.map((url, index) =>
              <ImageCard key={index} imageUrl={`http://localhost:4000${url}`} />
            )}
      </div>
       
     </div>
   );
}

export default App;