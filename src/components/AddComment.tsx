import React from "react";
import {useState} from "react";
import {auth,firestore,timestampNow} from "./firebase";
import {useAuthState} from "react-firebase-hooks/auth";

export default function AddComment(props: {type: 'feed' | 'full', postId: string}){
    const [content,setContent] = useState('');
    const [user] = useAuthState(auth as any);

    const addComment = () => {
        if(user && content){
            firestore.collection('posts')
                .where('postId','==',props.postId).get().then(snap => {
                    const temp = (snap.docs[0].data()).comments;
                    snap.docs[0].ref.update({comments: [...temp,{
                        autorId: user.uid,
                        timestamp: timestampNow(),
                        content
                    }]});
                    setContent('');
            });
        }
    };

    return (<>
        <input type='text' placeholder='Add a comment...' value={content} onChange={e => setContent(e.target.value)}/>
        <svg onClick={addComment} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
             className="home__card_send__2sMlQ" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                  d="M470.3 271.15L43.16 447.31a7.83 7.83 0 01-11.16-7V327a8 8 0 016.51-7.86l247.62-47c17.36-3.29 17.36-28.15 0-31.44l-247.63-47a8 8 0 01-6.5-7.85V72.59c0-5.74 5.88-10.26 11.16-8L470.3 241.76a16 16 0 010 29.39z"></path>
        </svg>
        </>);
}