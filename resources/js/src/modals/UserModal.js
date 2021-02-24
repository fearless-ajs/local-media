import React, {useState, useRef} from "react";
import {Modal, Button} from 'react-bootstrap';

import Spinner from '../components/Spinner.js';

function UploadMedia({show, user, onClose}) {
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleUpload = ()=>{
        setLoading(true);

    }

    return user != null ?
    (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{user.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            Hi, i am {user.name}
        </Modal.Body>

      </Modal>
    )
    : <div></div>
}


async function addUser() {
    // body...
}

export default UploadMedia;
