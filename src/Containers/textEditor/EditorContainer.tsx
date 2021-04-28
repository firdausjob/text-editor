import React, { Component } from "react";
import { render } from "react-dom";
import { EditorState, ContentState,convertFromRaw,convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import parse from 'html-react-parser';

import { Card} from 'antd';
// examples in https://github.com/jpuri/react-draft-wysiwyg/tree/master/stories

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

interface Props {
}

interface State {
  editorState: EditorState;
  editMode: boolean;
}

class EditorContainer extends Component<Props, State> {
  private editorRef: React.RefObject<Editor>;
  constructor(props: any) {
    super(props);   
    const html = '<p>Edit Me</p>';
    const contentBlock = htmlToDraft(html);
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks)),
                  //EditorState.createWithContent(convertFromRaw(content)),
                  //createWithContent(HtmlBlock),
                  //.createEmpty(),
     
      editMode: true
    };
    this.editorRef = React.createRef<Editor>();
  }

  focus = () => {
    let editor = this.editorRef.current;
    if (editor) {
      editor.focusEditor();
    }
  };

  componentDidMount = () => {
    const storeData:any = window.localStorage.getItem('content');
    if(storeData){
      this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(storeData))) });
      console.log("exist")
    }
    console.log("edit Me");
    if (this.state.editMode) {
      this.focus();
    }
  };

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  onEditorStateChange = (editorState: EditorState) => {
     console.log(editorState)
    this.setState({
      editorState
    });
  };

  saveData = () => {
    
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState));
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(contentState)));
    const html=draftToHtml(convertToRaw(contentState));
    window.localStorage.setItem('html', JSON.stringify(html));
    this.setState({
      editorState,
    });

  }

  render() {
    const { editorState, editMode } = this.state;
    const RawHtml= draftToHtml(convertToRaw(editorState.getCurrentContent()));
    return (
      <>
      <Card>
        <h1>Editor</h1>
        <button onClick={this.toggleEditMode}>Readonly</button>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          ref={this.editorRef}
          readOnly={!editMode}
          // toolbarHidden={true}
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker'],
            // inline: { inDropdown: true },
            // list: { inDropdown: true },
            // textAlign: { inDropdown: true },
            // link: { inDropdown: true },
            // history: { inDropdown: true },
          }}
        />
        
        <button onClick={this.saveData}>Save Data (SAVE TO LOCAL STORAGE. CAN BE EDIT TO DB)</button>
        </Card>
        <br/><br/><br/>
        <Card>
        <h1>Raw HTML GENERATED</h1>
       {RawHtml}
        </Card>
        <br/><br/><br/>
        <Card>
        <h1>Convert Raw HTML by using Parse </h1>
          {parse(RawHtml)}

      </Card>
      </>
    );
  }
}

export default EditorContainer;