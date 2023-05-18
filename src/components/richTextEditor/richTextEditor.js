import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ font: [] }],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["table"],
    ["link", "image", "video"],
    ["code-block"],
    [{ formula: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "font",
  "color",
  "background",
  "list",
  "align",
  "table",
  "link",
  "image",
  "video",
  "code-block",
  "formula",
  "script",
  "clean",
];

export function RichTextEditor(props) {
  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      name={props.nameTextArea}
      value={props.valueTextArea}
      onChange={(e) => props.handleOnChangeTextArea(props.nameTextArea, e)}
    />
  );
}

export function RichTextViewer(props) {
  return (
    <ReactQuill
      theme="bubble"
      name={props.nameTextArea}
      value={props.valueTextArea}
      readOnly={true}
    />
  );
}
