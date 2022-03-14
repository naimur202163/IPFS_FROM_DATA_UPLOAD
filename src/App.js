import { create } from 'ipfs-http-client';
import React, { useState } from "react";
import './App.css';


const client = create('https://ipfs.infura.io:5001/api/v0')
function App() {
  const [loginData,setLoginData]=useState({})


  
  const [fileUrl, updateFileUrl] = useState(``)
  // console.log(fileUrl)
  console.log()
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

       
    const handleOnBlur=(e)=>{
          const field=e.target.name;
          const value=e.target.value;
          const newLoginData={...loginData};
          newLoginData[field]=value;
          setLoginData(newLoginData);
    }

      const handleSubmit= async(e)=>{
        e.preventDefault();
        let obj1=loginData;
        let obj2={img:fileUrl};
            // console.log('handlesubmit')
        let h={...obj1,...obj2};
        const ipfss = await client.add(JSON.stringify(h))
          
        // console.log(ipfss)
        console.log(ipfss.path);
        const url1 = `https://ipfs.infura.io/ipfs/${ipfss.path}`
      updateFileUrl(url1);
      console.log(url1)
      
    
    }

  return (
    <div className="App">
      <form  onSubmit={handleSubmit}>
        <input name="name" type="name" placeholder="interyour Name" onBlur={handleOnBlur} />
        <br/>
        <br/>
        <input name="emai" type="email" placeholder="enter  you email" onBlur={handleOnBlur}/>
        <br/>
        <br/>
        <input name="number" type="number" placeholder="enter you number"  onBlur={handleOnBlur}/>
    

        <button type="submit">Submit</button>
      </form>
      <br/>
      <br/>
      <br/>
      <h1>IPFS Example</h1>
      <input
        type="file"
        onChange={onChange}
      />
      {
        fileUrl && (
          <img src={fileUrl} width="600px" alt='' />
        )
      }
     
    </div>
  );
}

export default App;
