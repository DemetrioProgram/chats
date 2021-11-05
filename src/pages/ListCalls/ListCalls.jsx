import React, { useEffect, useState } from 'react';

import { io } from "socket.io-client";
import ChatInformation from '../../components/ChatInformation/ChatInformation';
import Header from '../../components/Header/Header';
import Nav from '../../components/NavBar/NavChatList';
import Toast from '../../components/Toast/Toast';
import { constants } from '../../util/constants';

import './ListCalls.css';

export default function ListCalls(props) {

    let socket = io(constants.URL, {
        path: constants.PATH
    });
    const [msg, setMsg] = useState('');
    const [calls, setCalls] = useState([]);
    const [chatInfo, setChatInfo] = useState('');
    const [colorToast, setColorToast] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {

        if (props.location.state) {
            const { username, maxCalls } = props.location.state;

            socket.on(constants.EVENTS.CONNECT, () => { });

            socket.on(constants.EVENTS.USER_CONNECTED, () => showAndConfigToast(<p>Usuário conectado com sucesso!</p>, 'lightgreen'));

            socket.on(constants.EVENTS.USER_CONNECTION_ERROR, () => { });

            socket.on(constants.EVENTS.USER_DISCONNECTION_ERROR, () => { });

            socket.on(constants.EVENTS.NEW_CALL, (call) => changeCalls(call));

            socket.on(constants.EVENTS.CALL_ENDED, () => { });

            socket.on(constants.EVENTS.END_CALL_ERROR, () => {  });

            socket.emit(constants.EVENTS.USER_CONNECT, {
                username,
                maxCalls
            });

        } else {
            props.history.push('/');
            return;
        }

        const changeCalls = (call) => {
            let array = calls;

            call.callDuration = 0;

            array.push(call);

            setCalls([...array]);
        }

        const showAndConfigToast = (msg, color = 'rgb(214, 248, 135)', time = 5000) => {
            setMsg(msg);
            setColorToast(color);
            setShowToast(true);
    
            setTimeout(() => {
                dontShowToast();
            }, time);
        }

    }, [props.location, props.history, socket, calls])

    const getChatInfo = (chatInfo) => {
        setChatInfo(chatInfo);
    }

    const exit = () => {
        socket.emit(constants.EVENTS.USER_DISCONNECT, {
            username: props.location.state.user
        });

        props.history.push('/');
    }

    const finishChat = () => {

        const controlCalls = Array.from(calls);

        for (let index = 0; index < controlCalls.length; index++) {
            const call = controlCalls[index];
            if (call.callId === chatInfo.callId) {
                controlCalls.splice(index, 1);
            }
        }

        setCalls(controlCalls);
        setChatInfo('');

        socket.emit(constants.EVENTS.END_CALL, {
            callId: chatInfo.callId
        });

        showAndConfigToast(<p>Chat finalizado com sucesso!</p>, 'lightgreen');
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
        <div className="containerChat" >

            <Toast
                msg={msg}
                color={colorToast}
                showToast={showToast}
            />

            <Header
                user={props.location.state.username}
                exit={exit}
            />

            <Nav
                calls={calls}
                chatInfo={getChatInfo}
            />
            
            <ChatInformation
                className="chatInfo"
                chatInfo={chatInfo}
                finishChat={finishChat}
            />
        </div>
    );
}