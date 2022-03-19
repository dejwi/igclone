import React from 'react';
import './styles/main.scss';
import Navbar from "./components/Navbar";
import PostFeed from "./components/PostFeed";

function App() {
  return (
    <div>
        <Navbar/>

        <main>
            <PostFeed/>
        </main>
    </div>
  );
}

export default App;
