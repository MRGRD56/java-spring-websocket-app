import React, {useEffect, useMemo, useState} from 'react';
import useTextEditorWebSocket from '../../hooks/api/useTextEditorWebSocket';
import getFileContent from '../actions/api/getFileContent';

const TextEditor = () => {
    const [text, setText] = useState<string>();

    const wsParams = useMemo(() => ({
        onFileChange: setText,
            onUserSelectionChange: () => {
            console.log('onUserSelectionChange')
        }
    }), [])

    const {changeFile, changeSelection} = useTextEditorWebSocket(wsParams);

    const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        // setText(newText);
        changeFile(newText);
    };

    useEffect(() => {
        if (text === undefined) {
            getFileContent().then(content => {
                setText(content);
            });
            return;
        }
    }, [text]);

    return (
        <div>
            <textarea value={text} onChange={onTextChange} readOnly={text === undefined}/>
        </div>
    );
};

export default TextEditor;
