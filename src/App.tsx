import React from 'react';
import './styles/main.scss';
import Navbar from "./components/Navbar";
import PostFeed from "./components/PostFeed";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import FullPost from "./components/FullPost";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (<div>
        <BrowserRouter>
            <Navbar/>
            <main>
            <Routes>
                <Route index element={<PostFeed/>}/>
                <Route path='/post/:postId' element={<FullPost/>}/>
                <Route path='/profile/:profileId' element={<ProfilePage/>}/>
            </Routes>
            </main>
        </BrowserRouter>

  </div>);
}

export default App;
