import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';

interface ResponseProps {
  response: string;
  message: string;
}

const Response = ({ response, message }: ResponseProps) => {
  return (
    <CodeMirror
      value={response}
      extensions={[graphql()]}
      theme="dark"
      minHeight="84.1vh"
      minWidth="45vw"
      maxWidth="45vw"
      maxHeight="84.1vh"
      readOnly={true}
      editable={false}
      placeholder={message || ''}
      basicSetup={{
        lineNumbers: false,
      }}
    />
  );
};

export default Response;
