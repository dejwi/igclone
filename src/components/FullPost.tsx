import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import Post from "./Post";
import {firestore} from "./firebase";

export default function FullPost(){
    const params = useParams() as {postId: string};
    const [data,setData] = useState(null as any);

    useEffect(()=>{
        firestore.collection('posts')
            .where('postId','==',params.postId).get().then(snap =>{
                if(snap.docs.length){
                    setData(snap.docs[0].data());
                }
        });
    },[]);

    return (<div className='postFull'>
        {data ? <Post data={data} type='full'/> : null}
    </div>)
}