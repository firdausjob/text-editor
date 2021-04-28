
import React, { useEffect, useState } from "react";
import { EditorState } from 'draft-js';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript'
import {Modal, Form, Space, Card ,Input, Button, Checkbox, Row, Col  } from 'antd';

const TextEditorWys = () => {
    const [data, setData] = useState<any> ({
        editorState: htmlToDraft('Your html contents') // or use an EmptyState
    })

    console.log(data.editorState)
    return (
        <>
            <Card>
            <Draft
                editorState={data.editorState}
                onEditorStateChange={(editorState) => { setData({ editorState }) }}
            />
            </Card>
        </>
    );
};

export default TextEditorWys;