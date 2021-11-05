import React from 'react';

import chatImg from '../../img/chat.png';
import './NavBar.css';

export default function Nav(props) {

    return (
        <nav>
            <h2>Atendimentos</h2>
            <ul>
                {props.calls.map((call, index) =>
                    <li key={index} onClick={() => {props.chatInfo(call)}}>
                        <div className="infoChat">
                            <img className="chatImg" src={chatImg} alt="Chat Icon" />
                            <div style={{ display: 'block' }}>
                                <p>{call.caller}</p>
                                <p className="service">{call.service}</p>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </nav>
    );
}