import React from 'react';

import './ChatInformation.css';

export default function ChatInformation(props) {

    return (
        <>
            {props.chatInfo && <div className="containerChatInfo">
                <strong>Chamada Selecionada</strong>
                <p>{'CallId: ' + props.chatInfo.callId}</p>
                <p>{'Mídia: ' + props.chatInfo.media}</p>
                <p>{'Data inicial: ' + props.chatInfo.startDate}</p>
                <p>{'Serviço: ' + props.chatInfo.service}</p>
                <p>{'Origem: ' + props.chatInfo.caller}</p>
                <button className="btnFinishChat" onClick={() => props.finishChat()} >Finalizar</button>
            </div>}
        </>
    );
}