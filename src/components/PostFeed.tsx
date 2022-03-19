import Post from "./Post";

export default function PostFeed(){

    const tempd = {
        picurl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Calico_tabby_cat_-_Savannah.jpg/1200px-Calico_tabby_cat_-_Savannah.jpg',
        likes: 25,
        comments: {},
        timestamp: 1647710294,
        autorid: null,
        description: 'ur mom on vacation'
    };
    const tempd2 = {
        picurl: 'https://www.instalki.pl/images/newsy/02-2021/nyan-cat.jpg',
        likes: 69,
        comments: {},
        timestamp: 1647710294,
        autorid: null,
        description: 'flying'
    };

    return (<div className='postFeed'>
        <Post data={tempd}/>
        <Post data={tempd2}/>

    </div>);
}
