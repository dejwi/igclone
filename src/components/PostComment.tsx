import {useState,useEffect} from "react";
import {firestore} from "./firebase";

interface comment{
    autorId: string,
    content: string,
    timestamp: any
}

export default function PostComment(props: {data: comment}){
    const [name,setName] = useState('loading');

    useEffect(()=>{
        firestore.collection('users')
            .where('uid','==',props.data.autorId).get().then(snap=>{
           const data = snap.docs[0].data();
            setName(data.name);
        });

    },[]);

    return (<div className='postComment'>
        <span>{name}</span>
        <p>{props.data.content}</p>
    </div>);
}
