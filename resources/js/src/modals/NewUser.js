import React, {useState, useRef} from "react";
import {Modal, Button} from 'react-bootstrap';

import swal from "sweetalert";

import Spinner from '../components/Spinner.js';

function UploadMedia({show, onClose, onMutate}) {
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleUpload = ()=>{
        setLoading(true);

        addUser([name, email], (success) => {
            setLoading(false);
            if (success) {
                onMutate();
                setName(""), setEmail("");
            }
        });
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



/**
 * Adds a user.
 *
 * @param     name      User name
 * @param     email     User email
 * @param     callback  callback
 */
async function addUser([name, email], callback) {
    axios.post('/api/user', {
        name,
        email
    })
    .then(r => {
        const {success} = r.data;
        callback(success);
        if (!success) {
            swal("Failed to create User", `${r.data.message}\n\n${r.data.data.join('\n')}`, "error");
        }
    })
}

export default UploadMedia;
