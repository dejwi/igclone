import NavBtns from "./NavBtns";
import {useState} from 'react';

export default function Navbar(){
    const [ActiveSearch,setActiveSearch] = useState(false);

        return (<nav>
            <div className='content'>
                <h1>Codegram</h1>

                <div className='searchCont'>
                    {!ActiveSearch ? <svg aria-label="Search" className="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="16" role="img"
                          viewBox="0 0 24 24" width="16">
                        <path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor"
                              stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                        <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
                    </svg> : null}
                    <input type='text' placeholder='Search'
                           onFocus={()=>setActiveSearch(true)}
                           onBlur={()=>setActiveSearch(false)}
                    />
                </div>

                <NavBtns selected='home' />
            </div>
        </nav>);
}
