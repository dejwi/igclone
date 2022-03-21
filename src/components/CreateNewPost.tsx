import {useState, useEffect} from "react";
import {storage,auth,firestore,timestamp} from "./firebase";
import { v4 as uuidv4 } from 'uuid';
import { useAuthState} from "react-firebase-hooks/auth";

export default function CreateNewPost(props: {hide: () => void}){
    const [file,setFile] = useState(null as File | any);
    const [fileSrc,setFileSrc] = useState(undefined as undefined | string);
    const [user] = useAuthState(auth as any);
    const [content,setContent] = useState('' as string);

    useEffect(()=>{
        const fr = new FileReader()
        fr.onloadend  =  () => {
            setFileSrc(fr.result as string);
        }
        if(file){
            fr.readAsDataURL(file);
        }
    },[file]);

    const createPost = () => {
        if(file && user){
            const postId = uuidv4();

            const ref = storage.ref(`posts/${postId}`);
            ref.put(file).then(snap => {
                ref.getDownloadURL().then(url => {
                   const data = {
                       picurl: url,
                       likes: 0,
                       comments: [],
                       timestamp:  timestamp(),
                       autorid: user.uid,
                       content,
                       postId
                   };
                   firestore.collection('posts').add(data);
                   addPostToUser(postId);
                });
            });
        }
        props.hide();
    };

    const addPostToUser = (postId: string) => {
      if(user){
          firestore.collection('users')
              .where('uid','==',user.uid).get().then(snap => {
                  const temp = (snap.docs[0].data()).posts;
                  snap.docs[0].ref.update({posts: [...temp,postId]});
          });
      }
    };

    return(<div className='newPostCont' onClick={props.hide}>

        <div className='content'
             onClick={(e)=> {e.stopPropagation()}}>
            <span>Create new post</span>
            {file ? <button className='share' onClick={createPost}>Share</button> : null}

            {!fileSrc ?
                <label>
                    <input type='file' accept="image/jpeg, image/png, image/jpg"
                           onChange={e => {
                               if (e.target.files) {
                                   setFile(e.target.files[0]);
                               }
                           }}/>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
                         className="profile__upload_upload__1PAGV" height="1em" width="1em"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                              d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56"></path>
                        <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                              d="M320 255.79l-64-64-64 64m64 192.42V207.79"></path>
                    </svg>
                    <span>Click or drag file</span>
                </label>
                :
                <img src={fileSrc} className='createPostImg'/>}
            {file ?
                <div className='descCont'>
                    <input type='text' placeholder='Description' value={content}
                           onChange={e => setContent(e.target.value)}/>
                </div>
                : null}
            {/*<button>Post</button>*/}
        </div>

    </div>);
}
