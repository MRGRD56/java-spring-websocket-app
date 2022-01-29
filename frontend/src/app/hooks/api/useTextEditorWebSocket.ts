import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {BACKEND_HOST} from '../../constants/env';
import {useCallback, useEffect, useRef} from 'react';
import {v4} from 'uuid';

const createClient = () => {
    const sessionId = v4();
    console.log('sessionId', sessionId);
    const socket = new SockJS(BACKEND_HOST + '/websocket', undefined, {
        sessionId: () => sessionId
    });
    return {
        client: Stomp.over(socket),
        sessionId
    };
};

export interface TextEditorWebSocketParams {
    onFileChange: (content: string) => void;
    onUserSelectionChange: (userSelection: object) => void;
}

const useTextEditorWebSocket = ({onFileChange, onUserSelectionChange}: TextEditorWebSocketParams) => {
    const {client, sessionId} = useRef(createClient()).current;

    const changeFile = useCallback((fileContent: string) => {
        if (!client.connected) {
            return;
        }

        client.send('/app/fileEditor/fileChange', {}, JSON.stringify(fileContent));
    }, [client]);

    const changeSelection = useCallback((selection: object) => {
        if (!client.connected) {
            return;
        }

        client.send('/app/fileEditor/selectionChange', {}, JSON.stringify(selection));
    }, [client]);

    useEffect(() => {
        client.connect({}, () => {
            console.log('WS: Connected');

            client.subscribe('/fileEditor/changes/file', (message) => {
                console.log('subscribe file', message)
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
