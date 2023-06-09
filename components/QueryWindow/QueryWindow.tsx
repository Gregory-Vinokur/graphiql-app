import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { graphql } from 'cm6-graphql';
import { schema } from '../../constants/schema';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { setRedactorValue } from '@/store/reducers/redactorValue';

const QueryWindow = () => {
  const { queryValue } = useAppSelector((store) => store.redactorValue);
  const disp = useAppDispatch();

  const onChange = (value: string) => {
    disp(setRedactorValue(value));
  };

  return (
    <CodeMirror
      value={queryValue}
      onChange={onChange}
      extensions={[graphql(schema), EditorView.lineWrapping]}
      theme="dark"
      minHeight="62.1vh"
      minWidth="100%"
      maxHeight="62.1vh"
    />
  );
};

export default QueryWindow;
