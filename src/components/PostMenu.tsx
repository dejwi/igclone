import {ReactComponent as CopyIcon} from '../svgs/copy.svg';
import {ReactComponent as TrashIcon} from '../svgs/trash.svg';
import {useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth,firestore} from "./firebase";

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

function ConfPopup (props : {postId: string, hide: ()=>void}){
    const [user] = useAuthState(auth as any);

    const deletePost = () => {
        if(!user) return;
        firestore.collection('posts')
            .where('postId','==',props.postId).get().then(snap => {
            if(!snap.docs[0]) return;
            snap.docs[0].ref.delete();
        });
        firestore.collection('users')
            .where('uid','==',user.uid).get().then(snap => {
            const data = snap.docs[0].data();

            if(data.posts.includes(props.postId)){
                const index = data.posts.indexOf(props.postId);
                const temparr = [...data.posts];
                temparr.splice(index, 1);

                snap.docs[0].ref.update({posts: temparr});
            }
        });
        props.hide();
    };

    return (<div className='deletePopup' onClick={props.hide}>
        <div onClick={e => e.stopPropagation()}>
            <h4>Are you sure?</h4>
            <div className='buttons'>
                <button onClick={props.hide}>Cancel</button>
                <button className='delete' onClick={deletePost}>Yes, delete it</button>
            </div>
        </div>
    </div>);
}

export default function PostMenu(props: {postPath: string, hide: ()=>void,data: datatype}){
    const [user] = useAuthState(auth as any);
    const [showConf, setShowConf] = useState(false);

    const pathToClipboard = () => {
        navigator.clipboard.writeText(props.postPath);
        props.hide();
    };

    return (<div className='postMenu'>
        {showConf ? <ConfPopup postId={props.data.postId} hide={()=>setShowConf(false)}/> : null}

        <button onClick={pathToClipboard}>
            <CopyIcon />
            <span>Copy Link</span>
        </button>

        {user?.uid === props.data.autorid ? <button onClick={()=>setShowConf(true)}>
            <TrashIcon/>
            <span>Delete Post</span>
        </button> : null}
    </div>);
}