import Post from "./Post";
import {useEffect,useState} from "react";
import {firestore} from "./firebase";

export default function PostFeed(){

    const [posts,setPosts] = useState([] as any[]);

    const tempd = {
        picurl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Calico_tabby_cat_-_Savannah.jpg/1200px-Calico_tabby_cat_-_Savannah.jpg',
        likes: 25,
        comments: null,
        timestamp: 1647710294,
        autorid: null,
        description: 'ur mom on vacation'
    };
    const tempd2 = {
        picurl: 'https://www.instalki.pl/images/newsy/02-2021/nyan-cat.jpg',
        likes: 69,
        comments: null,
        timestamp: 1647710294,
        autorid: null,
        description: 'flying'
    };

    useEffect(()=>{
        firestore.collection('posts').get().then(snap => {
            const data = snap.docs.map(e => e.data());
            setPosts(data);
        });
    },[]);

    return (<div className='postFeed'>
        {/*<Post data={tempd}/>*/}
        {/*<Post data={tempd2}/>*/}
        {posts.map(e => <Post data={e} key={e.postId}/>)}
    </div>);
}
