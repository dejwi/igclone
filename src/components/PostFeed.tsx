import Post from "./Post";
import {useEffect,useState} from "react";
import {firestore} from "./firebase";

export default function PostFeed(){

    const [posts,setPosts] = useState([] as any[]);


    useEffect(()=>{
        firestore.collection('posts').get().then(snap => {
            const data = snap.docs.map(e => e.data());
            setPosts(data);
        });
    },[]);

    return (<div className='postFeed'>
        {posts.map(e => <Post data={e} key={e.postId} type='feed'/>)}
    </div>);
}
