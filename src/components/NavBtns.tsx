import React, {useState} from "react";
import ProfMenu from './ProfMenu';
import { useAuthState} from "react-firebase-hooks/auth";
import {auth,firestore} from './firebase';
import firebase from "firebase/compat/app";
import CreateNewPost from "./CreateNewPost";

export default function NavBtns(props: { selected: 'home' | 'direct' }) {
    const sel = props.selected;
    const [showProfMenu,setShowProfMenu] = useState(false);
    const [showNewPost,setShowNewPost] = useState(false);

    const [user] = useAuthState(auth as any);

    const SignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(data =>
        {
            const docRef = firestore.collection("users")
                .where('uid','==',data.user!.uid);
            docRef.get().then(snapshot => {
                    if(snapshot.docs.length){
                        console.log('exists');
                    } else{
                        console.log('doesnt');
                        firestore.collection("users").add({
                            uid: data.user!.uid,
                            picurl: data.user!.photoURL,
                            name: data.user!.displayName,
                            tagname: `@${data.user!.displayName}`,
                            liked: [],
                            follows: [],
                            followedby: [],
                            bio: '',
                            posts: []
                        });
                    }
                })
            .catch(error => {
                console.log(error);
            });
        });
    };
    const showNewPostClick = () => {
        if(user)
            setShowNewPost(true);
    };

    return (<div className='btns'>

        {sel === 'home' ?
        <svg aria-label="Home" className="_8-yf5 " color="#262626" fill="#262626" height="24" role="img"
              viewBox="0 0 24 24" width="24">
            <path
                d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path>
        </svg>
        :
        <svg aria-label="Home" className="_8-yf5 " color="#262626" fill="#262626" height="24" role="img"
        viewBox="0 0 24 24" width="24">
            <path
            d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
            fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
        </svg>}



        {sel === 'direct' ?
        <svg aria-label="Direct" className="_8-yf5 " color="#262626" fill="#262626" height="24" role="img"
             viewBox="0 0 24 24" width="24">
            <path
                d="M22.91 2.388a.69.69 0 00-.597-.347l-20.625.002a.687.687 0 00-.482 1.178L7.26 9.16a.686.686 0 00.778.128l7.612-3.657a.723.723 0 01.937.248.688.688 0 01-.225.932l-7.144 4.52a.69.69 0 00-.3.743l2.102 8.692a.687.687 0 00.566.518.655.655 0 00.103.008.686.686 0 00.59-.337L22.903 3.08a.688.688 0 00.007-.692"
                fill-rule="evenodd"></path>
        </svg>
        :
        <svg aria-label="Direct" className="_8-yf5 " color="#262626" fill="#262626" height="24" role="img"
             viewBox="0 0 24 24" width="24">
            <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218"
                  y1="3" y2="10.083"></line>
            <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                     stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
        </svg>}


        <svg aria-label="New Post" className="_8-yf5 " color="#262626" fill="#262626" height="24" role="img"
             viewBox="0 0 24 24" width="24" onClick={showNewPostClick}>
            <path
                d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
                fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"></path>
            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
        </svg>

        <svg aria-label="Find People" className="disabled" height="24" role="img"
             viewBox="0 0 24 24" width="24">
            <polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                     stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
            <polygon fill-rule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon>
            <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round"
                    stroke-linejoin="round" stroke-width="2"></circle>
        </svg>
        {/*<svg aria-label="Find People" className="_8-yf5 " color="#262626" fill="#262626" height="24" role="img"*/}
        {/*     viewBox="0 0 24 24" width="24">*/}
        {/*    <path*/}
        {/*        d="M13.173 13.164l1.491-3.829-3.83 1.49zM12.001.5a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012.001.5zm5.35 7.443l-2.478 6.369a1 1 0 01-.57.569l-6.36 2.47a1 1 0 01-1.294-1.294l2.48-6.369a1 1 0 01.57-.569l6.359-2.47a1 1 0 011.294 1.294z"></path>*/}
        {/*</svg>*/}


        <svg aria-label="Activity Feed" className="disabled" height="24"
             role="img" viewBox="0 0 24 24" width="24">
            <path
                d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
        </svg>
        {/*<svg aria-label="Activity Feed" className="_8-yf5 " color="#262626" fill="#262626" height="24"*/}
        {/*     role="img" viewBox="0 0 48 48" width="24">*/}
        {/*    <path*/}
        {/*        d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>*/}
        {/*</svg>*/}

        {user ?
            <div className='profCont'>
                <picture className={showProfMenu ? 'active' : ''}
                         onClick={() => setShowProfMenu(!showProfMenu)}>
                    <img src={user.photoURL ? user.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW2zB9ZfnqjeJkkgqMS7zen-NVpatbD9U3tiEirtof0QIA8Cx3ApChLYPJO9hVdncSkrA&usqp=CAU'}/>
                </picture>
                {showProfMenu ? <ProfMenu/> : null}
            </div>
            :
            <button onClick={SignIn}>Login</button>
        }
        {showNewPost? <CreateNewPost hide={()=>{setShowNewPost(false)}}/> : null}
    </div>);
}