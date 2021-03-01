import React, {useState, useEffect} from 'react';
import useSWR from 'swr';

function MediaDropdown({videoID, onChange}) {
    const [allMedia, setMedia] = useState([]);

    // 
    useEffect(() => {
        axios.get('/api/media/all')
        .then(r => {
            const {data} = r.data;
            if (data instanceof Array && data.length) {
                setMedia(data);
            }
        })
    }, [1])

    return (
        <select className="form-control w-50" onChange={e => onChange(e.target.value)}>
            {allMedia.map(m => (
                <option value={m.id} key={m.id}>
                    {m.name}
                </option>
            ))}
        </select>
    )
}

export default MediaDropdown;