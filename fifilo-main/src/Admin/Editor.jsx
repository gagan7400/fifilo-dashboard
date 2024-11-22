import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { EditorAction } from '../redux/actions/pagedataAction';

function Editor() {
    // Quill modules configuration
    const modules = {
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
    };
    let dispatch = useDispatch();
    const [value, setValue] = useState('');
    console.log(value);
    useEffect(() => {
        dispatch(EditorAction(value))
    }, [])


    return (
        <>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']}
                placeholder="Write something amazing..."
                modules={modules}
            />
            <div dangerouslySetInnerHTML={{ __html: value }} />
        </>
    )
}
export default Editor; 