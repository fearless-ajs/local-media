import React, {useState, useRef} from "react";
import {Modal, Button} from 'react-bootstrap';

import swal from "sweetalert";

import Spinner from '../components/Spinner.js';

function UploadMedia({show, onClose, onMutate}) {
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const ref = useRef(null);

    const handleUpload = ()=>{
        setLoading(true);

        uploadFile([name, ref], (success) => {
            setLoading(false);
            if (success) {
                onMutate();
                setName("");
            }
        });
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


/**
 * Uploads a file.
 *
 * @param    name      File name
 * @param    ref       input element reference
 * @param    callback  callback
 */
async function uploadFile([name, ref], callback) {
    const input = ref.current;
    const file = input.files[0];

    let form = new FormData();
    form.append('name', name);
    form.append('media_file', file);

    axios.post('/api/media', form)
    .then(r => {
        const {success} = r.data;
        callback(success);
        if (!success) {
            swal("Failed to upload file", `${r.data.message}\n\n${r.data.data.join('\n')}`, "error");
        }
    })

}

export default UploadMedia;
