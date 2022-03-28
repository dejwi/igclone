import {auth,firestore} from "./firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useState,useEffect} from "react";

interface dataType{
    name: string,
    tagname: string,
    bio: string
}

export default function SettingsPage(){
    const [user] = useAuthState(auth as any);
    const [data,setData] = useState(null as null | dataType);
    const [enabledSave,setEnabledSave] = useState(false);

    useEffect(()=>{
        if(!user) return;

        firestore.collection('users')
            .where('uid','==',user.uid).get().then(snap => {
                const usr = snap.docs[0].data();
                setData({name: usr.name,tagname: usr.tagname,bio: usr.bio});
        });
    },[user]);

    const updateVal = (e: any, type: 'name' | 'tagname' | 'bio') => {
        setData({...data as dataType, [type]: e.target.value});
        setEnabledSave(true);
    };

    const updateServer = () =>{
        if(!user || !enabledSave) return;

        firestore.collection('users')
            .where('uid','==',user.uid).get().then(snap => {
                snap.docs[0].ref.update({...data});
        });
        setEnabledSave(false);
    };

    return (<div className='settingsPage'>
        {user ?
            (data ? <div className='content'>
                <label>
                    Name:
                    <input type='text' value={data.name} onChange={e => updateVal(e,'name')}/>
                </label>
                <label>
                    Tagname:
                    <input type='text' value={data.tagname} onChange={e => updateVal(e,'tagname')}/>
                </label>
                <label>
                    Bio:
                    <input type='text' value={data.bio} onChange={e => updateVal(e,'bio')}/>
                </label>
                <button className={!enabledSave ? 'disabled' : ''} onClick={updateServer}>Save</button>
                </div> : null)
        : <h2>You need to be signed in</h2>}
    </div>);
}