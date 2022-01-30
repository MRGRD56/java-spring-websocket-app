import React, {useEffect, useMemo, useState} from 'react';
import useTextEditorWebSocket, {TextEditorWebSocketParams} from '../../hooks/api/useTextEditorWebSocket';
import getFileContent from '../actions/api/getFileContent';
import {v4} from 'uuid';
import styles from './TextEditor.module.scss';
import './TextEditor.scss';
import {Tabs} from 'antd';
import classNames from 'classnames';
const {TabPane} = Tabs;

const TextEditor = () => {
    const [text, setText] = useState<string>();

    const wsParams = useMemo<TextEditorWebSocketParams>(() => ({
        sessionId: v4(),
        onFileChange: setText,
        onUserSelectionChange: () => {
            console.log('onUserSelectionChange')
        }
    }), [])

    const {changeFile, changeSelection} = useTextEditorWebSocket(wsParams);

    const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        setText(newText);
        changeFile(newText);
    };

    useEffect(() => {
        if (text === undefined) {
            getFileContent().then(content => {
                setText(content);
            });
        }
    }, [text]);

    return (
        <div className={classNames(styles.container, 'TextEditor')}>
            <Tabs defaultActiveKey="1" className={styles.fullSize}>
                <TabPane tab="Raw" key="1" className={classNames(styles.fullSize, styles.rawTab)}>
                    <textarea className={styles.textarea} value={text} onChange={onTextChange} readOnly={text === undefined}/>
                </TabPane>
                <TabPane tab="HTML" key="2" className={classNames(styles.fullSize, styles.htmlTab)}>
                    <div dangerouslySetInnerHTML={{__html: text ?? ''}}/>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default TextEditor;
