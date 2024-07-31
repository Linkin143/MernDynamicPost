import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CreatePost = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState(0);
  console.log(name, email, age);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const HandleSubmit = async (event) => {
    event.preventDefault();

    const addUser = { name, email, age };
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": 'application/json',

      }

    });


    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      console.log(result.error)
      setError(result.error);

    }
    if (response.ok) {
      console.log(result);
      setError("");
      setName("");
      setEmail("");
      
      setAge(0);
      navigate("/all")
    }




  }


  return (
    <div>
      <Navbar />
      <div className='container my-2'>
        {error && <div className="alert alert-danger">
          {error}
        </div>}
        <h2 className='text-center'>Edit the data</h2>
        <form onSubmit={HandleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" value={email} onChange={(event) => setEmail(event.target.value)} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input type="number" className="form-control" value={age} onChange={(event) => setAge(event.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost;