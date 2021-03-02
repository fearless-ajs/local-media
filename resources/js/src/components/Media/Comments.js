import React, {useState} from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import swal from "sweetalert";


import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';
import {formatDistanceToNow} from 'date-fns';

import {fetcher} from '../../helpers/fetcher';
import avatar from "../../assets/img/avatar.png";

const Comments = ({media})=>{
    let {data, error, mutate} = useSWR(`/api/media/${media.id}/comments`, fetcher);
    let isLoading = !data & !error;

    if (data) {
        data = data.data;
    }
    if (error || !data) {
      data = [];
    }

    return (
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>
            {
                isLoading
                ? (
                    <>
                        <div> <Skeleton width={180} /> </div>
                        <div> <Skeleton width={300} /> </div>
                        <br></br>
                        <div> <Skeleton width={180} /> </div>
                        <div> <Skeleton width={300} /> </div>
                    </>
                )
                : data.map((obj)=>(
                    <Comment key={obj.id}>
                        <Comment.Avatar src={avatar} />
                        <Comment.Content>
                            <Comment.Author as='a'>{obj.name}</Comment.Author>
                            <Comment.Metadata>
                                <div>{formatDistanceToNow(new Date(obj.created_at))}</div>
                            </Comment.Metadata>
                            <Comment.Text>
                                <p>{obj.message}</p>
                            </Comment.Text>
                        </Comment.Content>
                    </Comment>
                ))}
        </Comment.Group>
    );
}

export default Comments
