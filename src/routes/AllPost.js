import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


const AllPost = () => {

  const [data, setData] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function getData() {
    const response = await fetch("http://localhost:5000/", {
      method: "GET",

      headers: {
        "Content-Type": 'application//"json',

      }

    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error)
      setError(result.error);

    }
    if (response.ok) {
      console.log(result);
      setData(result)
      setError("");

    }

  }
  async function handleDelete(id) {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": 'application//"json',

      }

    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error)
      setError(result.error);

    }
    if (response.ok) {
      setError(`Data has been removed`);
      setTimeout(() => {
        setError("")
        getData();
      }, 1000);



    }

  }

  




  useEffect(() => {
    getData();
  }, [])

  console.log(data);

  return (
    <div>
      <Navbar />
      <div className='container my-2'>
        {error && <div className="alert alert-danger">
          {error}
        </div>}
        <h2 className='text-center'>All Data</h2>
        <div className='row'>
          {data?.map((element) => (
            <div key={element._id} className='col-3'>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{element.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{element.email}</h6>
                  <p className='text-muted'>{element.age}</p>
                  <a href="#" className="card-link" onClick={() => handleDelete(element._id)}>Delete</a>
                  <Link to={`/${element._id}`} className="card-link" >Edit</Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default AllPost;