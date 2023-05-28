import { IntrospectionType } from 'graphql';
import React, { useState } from 'react';
import SchemaKindInput from './SchemaKindInput';
import SchemaKindObject from './SchemaKindObject';
import SchemaRoot from './SchemaRoot';
import SchemaHeader from './SchemaHeader';
import Box from '@mui/material/Box';

interface ISchema {
  types: readonly IntrospectionType[] | undefined;
}

function Schema({ types }: ISchema) {
  const [stack, setStack] = useState<string[]>([]);
  const [current, setCurrent] = useState<string>('');
  const [currentObject, setCurrentObject] = useState<IntrospectionType | Record<string, never>>({});
  const [isError, setIsError] = useState(false);

  const nextPage = (e: React.MouseEvent, cur: string, next: string) => {
    e.preventDefault();
    setStack((prev) => [...prev, cur]);
    setCurrent(next);
    setCurrentObject(types?.find((el) => el.name === next) || {});
  };

  const prevPage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent(stack[stack.length - 1]);
    setStack((prev) => {
      const newState = [...prev];
      newState.pop();
      return newState;
    });
    setCurrentObject(types?.find((el) => el.name === stack[stack.length - 1]) || {});
  };
  if (isError) {
    throw new Error('Test ErrorBoundary');
  }
  return (
    <Box
      color={'#abb2bf'}
      bgcolor={'#282c34'}
      style={{
        width: '100%',
        minHeight: '84.1vh',
        maxHeight: '84.1vh',
        padding: '5px',
        fontSize: '16px',
        overflowY: 'auto',
      }}
    >
      <button
        onClick={() => {
          setIsError(true);
        }}
      >
        test error
      </button>
      {!stack.length && <SchemaRoot nextPage={nextPage} />}
      {!!stack.length && (
        <div>
          <SchemaHeader
            element={currentObject}
            current={current}
            stack={stack}
            prevPage={prevPage}
          />
          {currentObject && currentObject.kind === 'OBJECT' && (
            <SchemaKindObject element={currentObject} current={current} nextPage={nextPage} />
          )}
          {currentObject.kind === 'INPUT_OBJECT' && (
            <SchemaKindInput element={currentObject} current={current} nextPage={nextPage} />
          )}
        </div>
      )}
    </Box>
  );
}

export default Schema;
