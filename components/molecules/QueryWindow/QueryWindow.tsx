import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { schema } from '../../../constants/schema';
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
      extensions={[graphql(schema)]}
      theme="dark"
      minHeight="84.1vh"
      minWidth="45vw"
      maxHeight="84.1vh"
    />
  );
};

export default QueryWindow;
