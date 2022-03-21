import {useEffect,useState} from "react";
import {firestore} from "./firebase";
import ProfilePost from "./ProfilePost";

interface datatype{
    picurl: string,
    likes: number,
    comments: {
        autorId: string,
        content: string,
        timestamp: any
    }[],
    timestamp: any,
    autorid: string,
    content: string,
    postId: string
}

export default function ProfilePostDisplay(props: {ids: string[]}){
    const [data,setData] = useState([] as datatype[])

    useEffect(()=>{
        const promises = props.ids.map(id =>
        firestore.collection('posts').where('postId','==',id).get());

        Promise.all(promises).then(res => {
            const temp = res.map(snap =>
               snap.docs[0].data() as datatype);
            setData(temp);
        });
    },[]);
    useEffect(()=>{
        console.log(data);
    },[data]);

    return (<div className='postDisplay'>
        {data.map(post => <ProfilePost data={post} key={post.postId}/>)}
    </div>);
}