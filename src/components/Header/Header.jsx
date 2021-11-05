import React from 'react';

import './Header.css';

export default function Header(props) {

    return (
        <header>
                <button onClick={() => props.exit()}>Sair</button>
                <p>{props.user}</p>
        </header>
    );
}