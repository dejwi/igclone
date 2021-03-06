import {useState,useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {firestore,auth} from "./firebase";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import ProfilePostDisplay from "./ProfilePostDisplay";
import {useLocation} from "react-router-dom";
import FollowBtn from "./FollowBtn";
import FollowingList from "./FollowingList";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Profiletype {
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

export default function ProfilePage() {
    const params = useParams() as {profileId: string};
    const [profileData,setProfileData] = useState(null as Profiletype | any);
    const [selected,setSelected] = useState('created' as 'created' | 'saved');
    const location = useLocation() as {state: {showSaved: boolean} | null};
    const [follxList,setFollxList] = useState(null as null | 'followers' | 'following');

    useEffect(()=>{
        if(location.state){
            setSelected(location.state.showSaved ? 'saved' : 'created');
        }
        firestore.collection('users')
            .where('uid','==',params.profileId).get().then(snap =>{
            if(snap.docs.length){
                setProfileData(snap.docs[0].data());
            }
        });
    },[params]);

    return (<div className='profilePage'>
        {profileData ?<>
            <div className='userInfo'>
                <div className='top'>
                    <div className='imgCont'>
                        <img src={profileData.picurl} alt='avatar'/>
                        <FollowBtn profileId={params.profileId} key={params.profileId}/>
                    </div>

                    <div>
                        <h2>{profileData.name}</h2>
                        <h3>{profileData.tagname}</h3>

                    </div>

                    <div className='stats'>
                        <span>{profileData.posts.length} posts</span>
                        <span onClick={()=>setFollxList("followers")}>{profileData.followedby.length} followers</span>
                        <span onClick={()=>setFollxList("following")}>{profileData.follows.length} following</span>
                    </div>
                </div>
                <span>{profileData.bio}</span>
            </div>
            <div className='selectMenu'>
                {selected === 'created' ? <>
                    <span className='selected'>POSTS</span>
                    <button onClick={()=>setSelected('saved')}>SAVED</button>
                </>:<>
                    <button onClick={()=>setSelected('created')}>POSTS</button>
                    <span className='selected'>SAVED</span>
                </>}
            </div>
            {selected === 'created' ?
                <ProfilePostDisplay ids={profileData.posts} key={`created${profileData.uid}`}/>
            : <ProfilePostDisplay ids={profileData.saved} key={`saved${profileData.uid}`}/> }
            {follxList ? <FollowingList type={follxList} profileId={params.profileId} hide={()=>setFollxList(null)}/> : null}

        </>: <>
        <SkeletonTheme baseColor='#F5F5F5' highlightColor='#ffffff'>
            <div className='userInfo'>
                <div className='top'>
                    <div className='imgCont'>
                        <Skeleton circle={true} width={'8rem'} height={'8rem'}/>
                    </div>

                    <div>
                        <Skeleton width={'10rem'} height={'1.8rem'} borderRadius={20}/>
                        <Skeleton width={'6rem'} height={'1.4rem'} borderRadius={20}/>
                    </div>

                    <div className='stats'>
                        <Skeleton width={'7rem'} height={'1.6rem'} />
                        <Skeleton width={'7rem'} height={'1.6rem'} />
                        <Skeleton width={'7rem'} height={'1.6rem'} />
                    </div>
                </div>
                <Skeleton width={'15rem'} height={'1.5rem'}/>
            </div>
            <div className='selectMenu'>
                    <span className='selected'>POSTS</span>
                    <button>SAVED</button>
            </div>
        </SkeletonTheme>
        </>}

    </div>)
}