import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {BACKEND_HOST} from '../../constants/env';
import {useCallback, useEffect, useRef} from 'react';

let client: {
    client: Stomp.Client,
    sessionId: string
};

const createClient = (sessionId: string) => {
    if (client) {
        return client;
    }

    console.log('sessionId', sessionId);
    const socket = new SockJS(BACKEND_HOST + '/websocket', undefined, {
        sessionId: () => sessionId
    });
    client = {
        client: Stomp.over(socket),
        sessionId
    };
    return client;
};

const getFrameSessionId = (frame: Stomp.Frame) => {
    const headers = frame.headers as Record<string, string>;
    const messageId = headers['message-id'];
    return /(.+)-\d+$/.exec(messageId)?.[1];
};

export interface TextEditorWebSocketParams {
    sessionId: string;
    onFileChange: (content: string) => void;
    onUserSelectionChange: (userSelection: object) => void;
}

const useTextEditorWebSocket = ({sessionId, onFileChange, onUserSelectionChange}: TextEditorWebSocketParams) => {
    const {client} = useRef(createClient(sessionId)).current;

    const changeFile = useCallback((fileContent: string) => {
        if (!client.connected) {
            return;
        }

        client.send('/app/fileEditor/fileChange', {sessionId}, JSON.stringify(fileContent));
    }, [client, sessionId]);

    const changeSelection = useCallback((selection: object) => {
        if (!client.connected) {
            return;
        }

        client.send('/app/fileEditor/selectionChange', {sessionId}, JSON.stringify(selection));
    }, [client, sessionId]);

    useEffect(() => {
        client.connect({}, () => {
            console.log('WS: Connected');

            client.subscribe('/fileEditor/changes/file', (message) => {
                if (getFrameSessionId(message) === sessionId) {
                    return;
                }

                onFileChange(JSON.parse(message.body));
            });

            client.subscribe('/fileEditor/changes/selection', ({body}) => {
                console.log('subscribe selection')
                onUserSelectionChange(JSON.parse(body))
            });
        });

        return () => {
            client.disconnect(() => {
                console.log('WS: Disconnected');
            });
        };
    }, []);

    return {
        changeFile,
        changeSelection
    };
};

export default useTextEditorWebSocket;
