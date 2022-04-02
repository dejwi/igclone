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
    const [data,setData] = useState([] as datatype[]);

    useEffect(()=>{
        if(props.ids.length){

            const promises = props.ids.map(id =>
                firestore.collection('posts').where('postId','==',id).get());

            Promise.all(promises).then(res => {
                //excludes nonexistent posts
                const temp = res.filter(snap => {
                    return !!snap.docs.length;
                });
                const tempn = temp.map(snap => {
                    return snap.docs[0].data() as datatype;
                });
                setData(tempn);
            });
        }
    },[]);

    return (<div className='postDisplay'>
        {data.map(post => <ProfilePost data={post} key={post.postId}/>)}
    </div>);
}