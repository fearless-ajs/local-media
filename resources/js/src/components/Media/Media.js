import React, {useState} from 'react';
import ReactPlayer from 'react-player'

// import multimedia_icon from "../../assets/img/multimedia.svg";
// import pdf_icon from "../../assets/img/pdf.svg";

const multimedia_icon = "https://loveworldbooks.com/media-distributor/public/images/multimedia.svg";
const pdf_icon = "https://loveworldbooks.com/media-distributor/public/images/pdf.svg";
import file_icon  from "../../assets/img/file-empty.js";

import { LazyLoadImage } from "react-lazy-load-image-component";


function MediaComponent({media}) {
    const type = media?.type;

    if (type == 'pdf') {
        return (
            <LazyLoadImage
                className="img-fluid"
                style={{maxHeight: '350px'}}
                src={ pdf_icon }
                onError={({target}) => { target.src = file_icon; }}
            />
        );
    }
    else if (type == 'video') {
        return <Video path={media.path} />;
    }

    return <img src={file_icon} />;
}


/**
 * Return video component
 */
function Video({path}) {
    return (
        <ReactPlayer
            width="100%"
            controls={true}
            url={`https://loveworldbooks.com/media-distributor/public/storage/${path}`}
        />
    );
}

export default MediaComponent;
