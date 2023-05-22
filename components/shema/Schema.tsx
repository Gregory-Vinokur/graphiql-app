import { useGetShemaQuery } from '@/store/api/graphQLRequest';
import { IntrospectionType } from 'graphql';
import React, { useState } from 'react';
import SchemaKindInput from './SchemaKindInput';
import SchemaKindObject from './SchemaKindObject';
import SchemaRoot from './SchemaRoot';
import SchemaHeader from './SchemaHeader';
import { Box } from '@mui/material';

function Schema() {
  const { data } = useGetShemaQuery();
  const types = data?.data.__schema.types;
  const [stack, setStack] = useState<string[]>([]);
  const [current, setCurrent] = useState<string>('');
  const [currentObject, setCurrentObject] = useState<IntrospectionType | Record<string, never>>({});

  const nextPage = (e: React.MouseEvent, cur: string, next: string) => {
    e.preventDefault();
    setStack((prev) => [...prev, cur]);
    setCurrent(next);
    setCurrentObject(types?.find((el) => el.name === next) || {});
  };

  const prevPage = () => {
    setCurrent(stack[stack.length - 1]);
    setStack((prev) => {
      const newState = [...prev];
      newState.pop();
      return newState;
    });
    setCurrentObject(types?.find((el) => el.name === stack[stack.length - 1]) || {});
  };
  return (
    <Box
      color={'black'}
      style={{
        width: '500px',
        maxHeight: '300px',
        padding: '5px',
        border: '1px solid red',
        fontSize: '16px',
        overflowY: 'auto',
      }}
    >
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
