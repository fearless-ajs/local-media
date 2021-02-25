import React, { Component, useState } from "react";

import Spinner from "../components/Spinner";

import swal from 'sweetalert';
import Cookies from 'js-cookie';

function Admin() {
    const [isLoading, setLoading] = useState(false);
    const [password, setPassword] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true);

        login(password, ()=>{
            setLoading(false);
        });      
    }


    return (
        <>
            <div className="limiter">
                <div
                    className="container-login100"
                    style={{ backgroundImage: "url('images/bg-01.jpg')" }}
                >
                    <div className="wrap-login100 p-t-30 p-b-50">
                        <span className="login100-form-title p-b-41">
                            <b>Media Distributor</b>
                        </span>
                        <form className="login100-form validate-form p-b-33 p-t-5">
                            <div
                                className="wrap-input100 validate-input"
                                data-validate="Enter password"
                            >
                                <input
                                    name="pass"
                                    type="password"
                                    value={password}
                                    className="input100"
                                    onChange={e=>setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                                <span
                                    className="focus-input100"
                                    data-placeholder="&#xe80f;"
                                ></span>
                            </div>

                            <div className="container-login100-form-btn m-t-32">
                                <button className="login100-form-btn" disabled={!password} onClick={onSubmit}>
                                    {!isLoading ? 'Login' : <Spinner type='list' /> }
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


function login(password, callback) {
    axios.post('/api/login', {
        password,
    })
    .then(res => {
        const {data} = res;
        if (data.success) {
            const {token} = data.data;
            
            // set auth token in cookie 
            Cookies.set('AUTH_TOKEN', token);

            swal("Login successful", "Redirecting you!", "success");
            location.reload();
        } else {
            swal("Password is incorrect");
        }
    })
    .finally(callback);
}

export default Admin;
