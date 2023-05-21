import { IntrospectionInputObjectType } from 'graphql';
import React from 'react';
import LinkNextPage from './LinkNextPage';

interface ISchtmaKindInput {
  element: IntrospectionInputObjectType;
  current: string;
  nextPage: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    current: string,
    el: string
  ) => void;
}

function schemaKindInput({ element, current, nextPage }: ISchtmaKindInput) {
  return (
    <>
      {element.inputFields.map((el) => (
        <p key={el.name}>
          {el.name}
          {': '}
          {el.type.kind === 'SCALAR' && (
            <LinkNextPage current={current} next={el.type.name} nextPage={nextPage} />
          )}
        </p>
      ))}
    </>
  );
}

export default schemaKindInput;
