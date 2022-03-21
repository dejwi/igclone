import React from "react";
import {useState,useEffect} from "react";
import {firestore,auth} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";

export default function PostSave(props: {postId: string}){
    const [saved,setSaved] = useState(false as boolean);
    const [user] = useAuthState(auth as any);

    useEffect(()=>{
        if(user){
            firestore.collection('users')
                .where('uid','==',user.uid).get().then(snap => {
                const data = snap.docs[0].data();

                if(data.saved.includes(props.postId)){
                    setSaved(true);
                }
            });
        }
    },[]);

    const saveClick = async () =>{
        if(user){
            firestore.collection('users')
                .where('uid','==',user.uid).get().then(snap => {
                const data = snap.docs[0].data();

                if(data.saved.includes(props.postId)){
                    // idk safe
                    setSaved(true);
                } else {
                    snap.docs[0].ref.update({saved: [...data.saved,props.postId]});
                    setSaved(true);
                }
            });
        }
    };
    const unSaveClick = async () =>{
        if(user){
            firestore.collection('users')
                .where('uid','==',user.uid).get().then(snap => {
                const data = snap.docs[0].data();

                if(data.saved.includes(props.postId)){
                    setSaved(false);

                    const index = data.saved.indexOf(props.postId);
                    const temparr = [...data.saved];
                    temparr.splice(index, 1);

                    snap.docs[0].ref.update({saved: temparr});
                } else {
                    // idk safe
                    setSaved(false);
                }
            });
        }
    };

    return saved ? <svg aria-label="Remove" className="_8-yf5 " color="#262626" fill="#262626" height="24" role="img"
                        viewBox="0 0 24 24" width="24" onClick={unSaveClick}>
            <path
                d="M20 22a.999.999 0 01-.687-.273L12 14.815l-7.313 6.912A1 1 0 013 21V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1z"></path>
        </svg>
        :
        <svg aria-label="Save"  color="#262626" fill="#262626" height="24" role="img"
             viewBox="0 0 24 24" width="24" onClick={saveClick}>
            <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor"
                     strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
        </svg>;
}