import {useState,useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {firestore,auth} from "./firebase";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import ProfilePostDisplay from "./ProfilePostDisplay";

interface Profiletype {
    name: string,
    picurl: string,
    tagname: string,
    uid: string,
    liked: any[],
    bio: string,
    followedby: any[],
    follows: any[],
    posts: any[]
}

export default function ProfilePage() {
    const params = useParams() as {profileId: string};
    const [profileData,setProfileData] = useState(null as Profiletype | any);
    const [selected,setSelected] = useState('created' as 'created' | 'saved');

    useEffect(()=>{
        firestore.collection('users')
            .where('uid','==',params.profileId).get().then(snap =>{
                if(snap.docs.length){
                    setProfileData(snap.docs[0].data());
                }
        });
    },[]);

    return (<div className='profilePage'>
        {profileData ?<>
            <div className='userInfo'>
                <div className='top'>
                    <img src={profileData.picurl} alt='avatar'/>
                    <div>
                        <h2>{profileData.name}</h2>
                        <h3>{profileData.tagname}</h3>
                    </div>


                    <div className='stats'>
                        <span>{profileData.posts.length} posts</span>
                        <span>{profileData.followedby.length} followers</span>
                        <span>{profileData.follows.length} following</span>
                    </div>
                </div>
                <span>{profileData.bio}</span>
            </div>
            <div className='selectMenu'>
                {selected === 'created' ? <>
                    <span className='selected'>POSTS</span>
                    <button>SAVED</button>
                </>:<>
                    <button>POSTS</button>
                    <span className='selected'>SAVED</span>
                </>}
            </div>
            {selected === 'created' ?
                <ProfilePostDisplay ids={profileData.posts}/>
            :null}


        </>: null}

    </div>)
}