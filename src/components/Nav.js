import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';
const Nav = () => {
    const [ show, setShow ] = useState(false);
    const [searchValue, setsearchValue] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setsearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    };



    useEffect(() => {
        window.addEventListener('scroll', () => {
            console.log(window.scrollY);
            if(window.scrollY > 50){
                setShow(true);
            }else{
                setShow(false);
            }
        })
        return() => {
            window.removeEventListener('scroll', () => {});
        }
    }, [])

    return(
        <div className={`nav-container ${show && 'show'}`}>
            <div className="nav-inner">
                <img className='logo-container' onClick={() => {window.location.reload()}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png" alt="icon"/>
                <input value={searchValue} onChange={handleChange} className="nav__input" type="text" placeholder='영화를 검색해주세요'/>
                <img className='user-container' src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg" alt="user"/>
            </div>
        </div>
    )
}

export default Nav;