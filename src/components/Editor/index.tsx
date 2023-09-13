import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps { 
    onChange?: () => void;
    placeholder?: string;
    value?: string;
}
const TextEditor = (props: TextEditorProps) => {
    const {onChange, placeholder, value} = props;
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'code','image', 'video'],
            ['clean'],
        ],
    };
    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code',
      ];

  return (
    <>
        <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className="w-100 schedule-message"
        />
    </>
  );
};

export default TextEditor;
