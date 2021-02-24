import React, {useState, useRef} from "react";
import {Modal, Button} from 'react-bootstrap';

import Spinner from '../components/Spinner.js';

function UploadMedia({show, onClose}) {
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleUpload = ()=>{
        setLoading(true);

    }

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="form-body">
                <div className="form-row mb-2">
                    <label>Name</label>
                    <input type="text" value={name} onChange={e=>setName(e.target.value)} className="form-control" disabled={loading} />
                </div>

                <div className="form-row">
                    <label>Email</label>
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="form-control" disabled={loading} />
                </div>
            </div>

        </Modal.Body>


        <Modal.Footer style={{width: '100%'}}>
            <div className="text-right" style={{width: '100%'}}>
                <Button variant="success" disabled={loading} onClick={handleUpload}>
                    {loading ? <Spinner type='list'/> : "Add User" }
                </Button>
            </div>
        </Modal.Footer>
      </Modal>
    );
}


async function addUser() {
    // body...
}

export default UploadMedia;
