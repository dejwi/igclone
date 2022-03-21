import {useState,useEffect} from "react";
import {firestore} from "./firebase";
import {Link} from "react-router-dom";

interface comment{
    autorId: string,
    content: string,
    timestamp: any
}

export default function PostComment(props: {data: comment,type: 'feed' | 'full'}){
    const [name,setName] = useState('loading');
    const [profSrc,setProfSrc] = useState(null as null | string);

    useEffect(()=>{
        firestore.collection('users')
            .where('uid','==',props.data.autorId).get().then(snap=>{
           const data = snap.docs[0].data();
            setName(data.name);
            if(props.type === 'full')
                setProfSrc(data.picurl);
        });
    },[]);

    return (<div className='postComment'>
        {profSrc ? <img src={profSrc} alt="avatar"/> : null}
        <p>
            <Link to={'/'}>{name}</Link>
            {props.data.content}
        </p>
    </div>);
}
