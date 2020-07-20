import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css'

const Header = () => {
    return (
        <div id="header">
            <div className="headerItem">
                <Link to="" id="homeLink">
                    workout timer
                </Link>
            </div>
        </div>
    )
}

export default Header;