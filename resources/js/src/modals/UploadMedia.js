import React, {useState, useRef} from "react";
import {Modal, Button} from 'react-bootstrap';

import Spinner from '../components/Spinner.js';

function UploadMedia({show, onClose}) {
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const ref = useRef(null);

    const handleUpload = ()=>{
        setLoading(true);
        uploadFile(name, ref);
    }

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Media</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="form-body">
                <div className="form-row mb-2">
                    <label>Name</label>
                    <input type="text" value={name} onChange={e=>setName(e.target.value)} className="form-control" disabled={loading} />
                </div>

                <div className="form-row">
                    <label>Select File</label>
                    <input type="file" className="form-control" disabled={loading} ref={ref} />
                </div>
            </div>

        </Modal.Body>


        <Modal.Footer style={{width: '100%'}}>
            <div className="text-right" style={{width: '100%'}}>
                <Button variant="success" disabled={loading || !name} onClick={handleUpload}>
                    {loading ? <Spinner type='list'/> : "Upload" }
                </Button>
            </div>
        </Modal.Footer>
      </Modal>
    );
}


async function uploadFile() {
    // body...
}

export default UploadMedia;
