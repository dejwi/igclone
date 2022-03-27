import {useState,useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {firestore,auth} from "./firebase";
import { ReactComponent as Follow } from '../svgs/follow.svg';
import { ReactComponent as Unfollow } from '../svgs/unfollow.svg';

export default function FollowBtn(params: {profileId: string}){
    const [show,setShow] = useState(false);
    const [followed,setFollowed] = useState(false);
    const [user] = useAuthState(auth as any);

    useEffect(()=>{
        if(!user) return;
        if(user.uid === params.profileId) return;

        firestore.collection('users')
            .where('uid','==',user.uid).get().then(snap => {
                const data = snap.docs[0].data();
                if(data.follows.includes(params.profileId)) setFollowed(true);
        });
        setShow(true);
    },[]);

    const followClick = () => {
        if(!user) return;
        firestore.collection('users')
            .where('uid','==',user.uid).get().then(snap => {
            const data = snap.docs[0].data();

            if(data.follows.includes(params.profileId)) return;
            snap.docs[0].ref.update({follows: [...data.follows,params.profileId]});
        });
        firestore.collection('users')
            .where('uid','==',params.profileId).get().then(snap => {
            const data = snap.docs[0].data();

            if(data.followedby.includes(user.uid)) return;
            snap.docs[0].ref.update({followedby: [...data.followedby,user.uid]});
        });
        setFollowed(true);
    };

    const unFollowClick = () => {
        if(!user) return;
        setFollowed(false);
        firestore.collection('users')
            .where('uid','==',user.uid).get().then(snap => {
            const data = snap.docs[0].data();
            if(!data.follows.includes(params.profileId)) return;

            const index = data.follows.indexOf(params.profileId);
            const temparr = [...data.follows];
            temparr.splice(index, 1);

            snap.docs[0].ref.update({follows: temparr});
        });

        firestore.collection('users')
            .where('uid','==',params.profileId).get().then(snap => {
            const data = snap.docs[0].data();
            if(!data.followedby.includes(user.uid)) return;

            const index = data.followedby.indexOf(user.uid);
            const temparr = [...data.followedby];
            temparr.splice(index, 1);

            snap.docs[0].ref.update({followedby: temparr});
        });
    };

    return show ? (followed ?
            <Unfollow onClick={unFollowClick} className='followBtn'/> :
            <Follow onClick={followClick} className='followBtn'/>) : null;
}