import React, { useState } from 'react';

import Toast from '../../components/Toast/Toast';

import './Login.css';

export default function Login(props) {

    const [msg, setMsg] = useState('');
    const [maxCalls, setMaxCalls] = useState(0);
    const [username, setUserName] = useState('');
    const [colorToast, setColorToast] = useState('');
    const [showToast, setShowToast] = useState(false);

    const sendUser = () => {
        if (username.trim() !== '' && parseInt(maxCalls) !== 0) {
            props.history.push('/chats', { username, maxCalls });
        } else {
            showAndConfigToast(<p><strong>Digite</strong> o usuário e o número de chamadas!</p>, 'red');
        }
    }

    const showAndConfigToast = (msg, color = 'rgb(214, 248, 135)', time = 5000) => {
        setMsg(msg);
        setColorToast(color);
        setShowToast(true);

        setTimeout(() => {
            dontShowToast();
        }, time);
    }

    const dontShowToast = () => {
        setMsg('');
        setColorToast('');
        setShowToast(false);
    }

    return (
        <div className="container">

            <Toast
                msg={msg}
                color={colorToast}
                showToast={showToast}
            />

            <h1>Chats</h1>

            <div id="grouper">
                <div id="styledBorder">

                    <fieldset>
                        <label htmlFor="inputUser">
                            Usuário
                        </label><br />
                        <input
                            type="text"
                            id="inputUser"
                            name="inputUser"
                            onChange={(input) => setUserName(input.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="inputcallNumbers">
                            Máximo de chamadas
                        </label><br />
                        <input
                            type="number"
                            id="inputcallNumbers"
                            name="inputcallNumbers"
                            onChange={(input) => setMaxCalls(input.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    sendUser();
                                }
                            }}
                        />
                    </fieldset>

                    <button className="btnLogin" type="submit" onClick={() => sendUser()}>Conectar</button>

                </div>
            </div>
        </div>
    );
}
