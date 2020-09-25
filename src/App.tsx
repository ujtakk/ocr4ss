import React from 'react';

import { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import credentials from '../credentials.json';

const Title: React.FC = () => {
  return (
    <h1>OCR for ScreenShots</h1>
  );
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width  : "300px",
  height : "5em",
  margin : "0 0 8px 0",
  padding: '20px',
  borderWidth: '4px',
  borderRadius: 2,
  borderColor: '#cccccc',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const Dropzone: React.FC<any> = ({setContent}) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'image/*'});

  const style: any = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  acceptedFiles.map((file: any) => {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => { setContent(e.target.result) };
    reader.readAsDataURL(file);
  });

  return (
    <div {...getRootProps({style})} >
      <input {...getInputProps()} />
      <p style={{textAlign: "center"}} >
        Drag 'n' drop some files here,<br />
        or click to select files
      </p>
    </div>
  );
}

const submit = (image: string) => {
  const request = {
    requests: [{
      image: { content: image },
      features: [{ type: "DOCUMENT_TEXT_DETECTION" }]
    }]
  };

  const url = new URL("https://vision.googleapis.com/v1/images:annotate");
  url.searchParams.set("key", credentials.API_KEY);

  const message = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(request),
  };

  console.log(message);
  return fetch(url.toString(), message)
    .then(response => response.json());
};

const Viewer: React.FC<any> = ({content}) => {
  const [prevContent, setPrevContent] = useState("");
  const [result, setResult] = useState({
    text: "",
    image: "",
  });

  if (content != prevContent) {
    const content_body = content.split(',').pop();
    const response: Promise<any> = submit(content_body);
    response.then(res => {
      console.log(res);
      setResult({
        text: res.responses[0].fullTextAnnotation.text,
        image: content,
      });
    });
    setPrevContent(content);
  }

  return (
    <div>
      <textarea readOnly cols={80} rows={10} value={result.text} />
      <br />
      <img src={result.image} width="500px" />
      <br />
    </div>
  );
};

const App: React.FC = () => {
  const [content, setContent] = useState("");

  return (
    <div>
      <Title />
      <Dropzone setContent={setContent} />
      <Viewer content={content} />
    </div>
  );
};

export default App;
