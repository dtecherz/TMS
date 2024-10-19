import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export const RichTextEditor = ({ value, handleTextEditor }) => {
    console.log("RichTextEditor", value);

    var Editor = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    }

    return <>
        {/* <div>RichTextEditor</div> */}

        <ReactQuill placeholder='Add Email description' modules={Editor} theme="snow" value={value || ""} onChange={handleTextEditor} />
    </>
}
