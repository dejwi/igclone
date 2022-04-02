import NavBtns from "./NavBtns";
import {useState} from 'react';
import {Link} from "react-router-dom";
import Search from "./Search";

export default function Navbar(){
    const [searchVal,setSearchVal] = useState('');
    const [ActiveSearch,setActiveSearch] = useState(false);
    const [showSearch,setShowSearch] = useState(false);

    // so requests wouldnt be done every key press
    const [searchValKey,setSearchValKey] = useState('');

    const submit = async (e: any) =>{
        e.preventDefault();
        setShowSearch(true)
        setSearchValKey(searchVal);
    };

        return (<nav>
            <div className='content'>
                <Link to='/' className='logo'>Poopgram</Link>

                <div className='searchCont'>
                    {!ActiveSearch ? <svg aria-label="Search" className="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="16" role="img"
                          viewBox="0 0 24 24" width="16">
                        <path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor"
                              strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
                    </svg> : null}
                    <form onSubmit={submit}>
                        <input type='text' placeholder='Search'
                               value={searchVal} onChange={e=>setSearchVal(e.target.value)}
                               onFocus={()=>setActiveSearch(true)}
                               onBlur={()=> {
                                   setActiveSearch(false);
                                   // so Link click can register
                                   setTimeout(()=>setShowSearch(false),150);
                               }}/>
                        {showSearch ? <Search searchVal={searchVal} key={searchValKey}/> : null}
                    </form>

                </div>

                <NavBtns selected='home' />
            </div>
        </nav>);
}
