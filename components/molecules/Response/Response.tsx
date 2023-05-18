import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';

interface ResponseProps {
  response: string;
}

const Response = ({ response }: ResponseProps) => {
  return (
    <CodeMirror
      value={response}
      extensions={[graphql()]}
      theme="dark"
      minHeight="84.1vh"
      minWidth="45vw"
      maxHeight="84.1vh"
    />
  );
};

export default Response;
