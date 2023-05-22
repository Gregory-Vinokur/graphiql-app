import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { setVariablesValue } from '@/store/reducers/redactorValue';

const Variables = () => {
  const { variablesValue } = useAppSelector((store) => store.redactorValue);
  const disp = useAppDispatch();

  const onChange = (value: string) => {
    disp(setVariablesValue(value));
  };

  return (
    <CodeMirror
      value={variablesValue}
      onChange={onChange}
      extensions={[graphql()]}
      theme="dark"
      minHeight="20vh"
      maxHeight="30vh"
      width="30vw"
    />
  );
};

export default Variables;
