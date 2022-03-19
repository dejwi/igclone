import React from "react";
import PostComment from "./PostComment";
import styled from "styled-components";

const MargDiv = styled.div`
  margin-left: 1rem;
`;

export default function Post( props: {data: any} ){
    const {picurl,likes,comments,timestamp,autorid,description} = props.data;
    // new Date(1647710294 * 1000)

    return (<div className='post'>
        <div className='top'>
            {/* top */}
            <div>
                <img src='https://www.viewhotels.jp/ryogoku/wp-content/uploads/sites/9/2020/03/test-img.jpg'/>
                <span>barackobama</span>
                <p>@dejw</p>
            </div>
            <svg aria-label="More options" className="_8-yf5 " color="#262626" fill="#262626" height="24" role="img"
                 viewBox="0 0 24 24" width="24">
                <circle cx="12" cy="12" r="1.5"></circle>
                <circle cx="6" cy="12" r="1.5"></circle>
                <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
        </div>
        <img src={picurl}/>
        <div className='btns'>
            {/* btns */}
            <div className='left'>
                <svg aria-label="Like" color="#262626" fill="#262626" height="24" role="img"
                     viewBox="0 0 24 24" width="24">
                    <path
                        d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                </svg>
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
        <MargDiv>
            <PostComment autor='barackobama' content={description}/>
        </MargDiv>
        <span className='allcomments'>View all comments</span>

        <div className='comments'>
            {/* comments should be limited ex. 3*/}
            <PostComment autor={'donaldtrump'} content={'nice cat not better than mine'}/>
            <PostComment autor={'putin'} content={'ima bomb him'}/>
            <PostComment autor={'zelensky'} content={'my cat got robbed'}/>
        </div>
        <div className='addcomment'>
            {/* add comment */}
            <input type='text' placeholder='Add a comment...'/>

            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"
                 className="home__card_send__2sMlQ" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"
                      d="M470.3 271.15L43.16 447.31a7.83 7.83 0 01-11.16-7V327a8 8 0 016.51-7.86l247.62-47c17.36-3.29 17.36-28.15 0-31.44l-247.63-47a8 8 0 01-6.5-7.85V72.59c0-5.74 5.88-10.26 11.16-8L470.3 241.76a16 16 0 010 29.39z"></path>
            </svg>
        </div>
    </div>);
}
