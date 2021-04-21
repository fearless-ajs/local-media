import React, {useState, useRef} from "react";
import {Modal, Button} from 'react-bootstrap';
import {humanFileSize} from '../helpers/utils';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import swal from "sweetalert";

import Spinner from '../components/Spinner.js';

function UploadMedia({show, onClose, onMutate}) {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(43);

    const [name, setName] = useState("");
    const ref = useRef(null);

    const startUploadProgress = (value) => {
        if (!uploading) setUploading(true);
        setUploadProgress(value)
    }

    const handleUpload = ()=>{
        setLoading(true);

        uploadFile([name, ref, startUploadProgress], (success) => {
            setLoading(false);
            setUploading(false);
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


        <Modal.Footer style={{width: '100%'}} className="row">
            <div className="col-2">
                <div style={{width: '45px', height: '45px'}}>
                    {uploading && <CircularProgressbar value={uploadProgress} text={`${uploadProgress}%`} />}
                </div>
            </div>
            <div className="col"></div>
            <div className="col col-2 text-right" style={{width: '100%'}}>
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
async function uploadFile([name, ref, setUploadProgress], callback) {
    const input = ref.current;
    const file = input.files[0];

    if (!file) {
        callback(false);
        return swal("Select file to upload");
    }

    const fileSize = humanFileSize(file.size),
        sizeInMB = file.size / 1024 / 1024;

    if (sizeInMB > 1024) {
        callback(false);
        return swal(`File too large (${fileSize}), max file size is 1GB (1024MB)`);
    }


    let form = new FormData();
    form.append('name', name);
    form.append('media_file', file);

    const config = {
        onUploadProgress: function(progressEvent) {
          const percentCompleted = ((progressEvent.loaded * 100) / progressEvent.total).toFixed(1)
          setUploadProgress(percentCompleted)
        }
    }

    axios.post('/api/media', form, config)
    .then(r => {
        const {success} = r.data;
        callback(success);
        if (!success) {
            swal("Failed to upload file", `${r.data.message}\n\n${r.data.data.join('\n')}`, "error");
        }
    })
    .catch(e => {
        swal("Failed to upload file", `${e}`, "error");
    })

}

export default UploadMedia;
