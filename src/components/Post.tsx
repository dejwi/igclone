import React from "react";
import PostComment from "./PostComment";
import {useEffect,useState} from "react";
import {firestore} from "./firebase";
import PostLike from './postBtns/PostLike';
import AddComment from "./AddComment";
import {Link} from "react-router-dom";


interface datatype{
    picurl: string,
    likes: number,
    comments: {
        autorId: string,
        content: string,
        timestamp: any
    }[],
    timestamp: any,
    autorid: string,
    content: string,
    postId: string
}

interface autortype {
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

export default function Post( props: {data: datatype,type: 'feed' | 'full'} ){
    const {picurl,comments,timestamp,autorid,content,postId} = props.data;
    const [likes,setLikes] = useState(props.data.likes);
    const [autor,setAutor] = useState({
        name: 'name',
        picurl: 'https://www.viewhotels.jp/ryogoku/wp-content/uploads/sites/9/2020/03/test-img.jpg',
        tagname: '@name',
        uid: null
    } as autortype | any);

    useEffect(() => {
        firestore.collection('users')
            .where('uid','==',autorid).get().then(snap => {
            setAutor(snap.docs[0].data() as autortype);
        });
    },[]);

    const addLike = () =>{
      firestore.collection('posts').where('postId', '==',postId)
          .get().then(snap => {
             const likestemp = (snap.docs[0].data()).likes;
             snap.docs[0].ref.update({likes: likestemp+1});
             setLikes(likestemp+1);
      });
    };

    const removeLike = () =>{
        firestore.collection('posts').where('postId', '==',postId)
            .get().then(snap => {
            const likestemp = (snap.docs[0].data()).likes;
            snap.docs[0].ref.update({likes: likestemp-1});
            setLikes(likestemp-1);
        });
    };

    // new Date(1647710294 * 1000)

    return (<div className='post'>
        <div className='top'>
            {/* top */}
            <div>
                {/*https://www.viewhotels.jp/ryogoku/wp-content/uploads/sites/9/2020/03/test-img.jpg*/}
                <img src={autor.picurl}/>
                <span>{autor.name}</span>
                <p>{autor.tagname}</p>
            </div>
            <svg aria-label="More options" className="_8-yf5 " color="#262626" fill="#262626" height="24" role="img"
                 viewBox="0 0 24 24" width="24">
                <circle cx="12" cy="12" r="1.5"></circle>
                <circle cx="6" cy="12" r="1.5"></circle>
                <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
        </div>
        <div className='imgContainer'><img src={picurl}/></div>
        <div className='btns'>
            {/* btns */}
            <div className='left'>
                <PostLike postId={postId} likedown={removeLike} likeup={addLike}/>
                <svg aria-label="Comment" color="#262626" fill="#262626" height="24" role="img"
                     viewBox="0 0 24 24" width="24">
                    <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor"
                          stroke-linejoin="round" stroke-width="2"></path>
                </svg>
                <svg aria-label="Share Post"  color="#262626" fill="#262626" height="24" role="img"
                     viewBox="0 0 24 24" width="24">
                    <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218"
                          y1="3" y2="10.083"></line>
                    <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                             stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                </svg>
            </div>
            <svg aria-label="Save"  color="#262626" fill="#262626" height="24" role="img"
                 viewBox="0 0 24 24" width="24">
                <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor"
                         stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
            </svg>
        </div>

        <span className='likes'>{likes} likes</span>





        {props.type === 'feed' ? <>
            <Link to={`/post/${postId}`} className='allcomments'>View all comments</Link>
            <div className='postComment autorComment'>
                <span>{autor.name}</span>
                <p>{content}</p>
            </div>
            </>
        : null}

        <div className='comments'>
            {/* comments should be limited ex. 3*/}
            {props.type === 'feed' ?
                [...comments].slice(0,3).map(e => <PostComment data={e} key={e.content+e.autorId} type={props.type}/>)
            : comments.map(e => <PostComment data={e} key={e.content+e.autorId} type={props.type}/>)}
        </div>
        <div className='addcomment'>
            {/* add comment */}
            <AddComment type='feed' postId={postId}/>
        </div>
    </div>);
}
