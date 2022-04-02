import {useState,useEffect} from "react";
import {firestore} from "./firebase";
import {Link} from "react-router-dom";

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

export default function Search(props: {searchVal: string}) {
    const findData = (field: string,val: string) => firestore.collection('users').orderBy(field).startAt(val).endAt(val + "\uf8ff").get();
    const [data,setData] = useState(null as null | Profiletype[])

    const searchData = async() => {
        if(!props.searchVal) return;
        const nameData = (await findData('name',props.searchVal)).docs.map(e => e.data());
        const tagData = (await findData('tagname',props.searchVal)).docs.map(e => e.data());
        const tagExtraData = (await findData('tagname',`@${props.searchVal}`)).docs.map(e => e.data());

        // I am really sorry for this mess I tried to do it myself :c
        const tempids: string[] = [];
        let newarr = nameData.map(e=>{tempids.push(e.uid); return e});

        newarr = [...newarr,...tagData.filter(e => {
            if(tempids.includes(e.uid)) return false;
            tempids.push(e.uid);
            return true;
        })];
        newarr = [...newarr,...tagExtraData.filter(e => {
            if(tempids.includes(e.uid)) return false;
            tempids.push(e.uid);
            return true;
        })];

        if(newarr.length) setData(newarr as Profiletype[]);
        else setData(null);
    };

    useEffect(()=>{
        searchData();
    },[]);

    return (<div className='searchResults'>
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M24 22h-24l12-20z"/></svg>
        <div className='content'>
            {data ? data.map(e => <Link to={`/profile/${e.uid}`} key={e.uid}>
                <img alt='avatar' src={e.picurl}/>
                <span>{e.name}</span>
                <p>{e.tagname}</p>
            </Link>) : null}
        </div>

    </div>);
}