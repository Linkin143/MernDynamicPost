import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Update = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState(0);
    console.log(name, email, age);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    //get single user data
    const getSingleData = async () => {

        const response = await fetch(`http://localhost:5000/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',

            }

        })

        const result = await response.json();
        if (!response.ok) {
            console.log(result.error)
            setError(result.error);

        }
        if (response.ok) {

            setError("");
            console.log(result);
            setName(result.name);
            setEmail(result.email);
            setAge(result.age);

        }
    }
    //Send edited data to backend
    const handleUpdate = async (event) => {
        event.preventDefault();

        const udatedUser = { name, email, age };
        const response = await fetch(`http://localhost:5000/${id}`, {
            method: "PATCH",
            body: JSON.stringify(udatedUser),
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
            navigate("/all")
        }
    }

    useEffect(() => {
        getSingleData()

    }, [])


    return (
        <div>
            <Navbar />
            <div className='container my-2'>
                {error && <div className="alert alert-danger">
                    {error}
                </div>}
                <h2 className='text-center'>Enter the data</h2>
                <form onSubmit={handleUpdate}>
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




export default Update;