import { IntrospectionType } from 'graphql';
import React from 'react';

interface ISchemaHeader {
  element: IntrospectionType | Record<string, never>;
  current: string;
  stack: string[];
  prevPage: () => void;
}

function SchemaHeader({ element, current, stack, prevPage }: ISchemaHeader) {
  return (
    <>
      <p>
        <a href="#" onClick={prevPage}>
          {'< '}
          {stack[stack.length - 1]}
        </a>
      </p>
      <p>{current}</p>
      {element.kind === 'OBJECT' && <p>Fields</p>}
      <p>{element.description}</p>
    </>
  );
}

export default SchemaHeader;
