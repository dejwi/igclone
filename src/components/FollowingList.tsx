import {useEffect,useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth,firestore} from "./firebase";
import {Link} from "react-router-dom";

interface ProfileData {
    name: string,
    picurl: string,
    tagname: string,
    uid: string,
    liked: any[],
    bio: string,
    followedby: any[],
    follows: any[],
    posts: any[],
    saved: any[]
}

export default function FollowingList(props: {type: 'followers' | 'following', profileId: string, hide: ()=>void}){
    const [usedData,setUsedData] = useState(null as null | string[]);
    const [displayData,setDisplayData] = useState(null as null | ProfileData[]);
    const [selected,setSelected] = useState(props.type);

    useEffect(()=>{
        if(!selected) return;

        firestore.collection('users')
            .where('uid','==',props.profileId).get().then(snap => {
            const data = snap.docs[0].data() as ProfileData;
            if(selected === 'followers') setUsedData(data.followedby);
            if(selected === 'following') setUsedData(data.follows);
        });
    },[selected]);

    useEffect(()=>{
        if(!usedData) return;

        const promises = usedData.map(id =>
            firestore.collection('users').where('uid','==',id).get());

        Promise.all(promises).then(res => {
            const temp = res.map(snap => snap.docs[0].data() as ProfileData);
            setDisplayData(temp);
        });
    },[usedData]);


    return (<div className='followingList' onClick={props.hide}>
        <div className='content' onClick={(e)=> {e.stopPropagation()}}>
            <div className='btns'>
                {selected === 'followers' ? <>
                    <span className='selected'>Followers</span>
                    <button onClick={()=>setSelected('following')}>Following</button>
                </>:<>
                    <button onClick={()=>setSelected('followers')}>Followers</button>
                    <span className='selected'>Following</span>
                </>}
            </div>
            <div className='users' key={selected}>
                {displayData ? displayData.map(user => <Link to={`/profile/${user.uid}`} key={user.uid} onClick={props.hide}>
                    <img src={user.picurl} alt='user avatar'/>
                    <span>{user.name}</span>
                    <p>{user.tagname}</p>
                </Link>) : null}
            </div>

        </div>
    </div>);
}