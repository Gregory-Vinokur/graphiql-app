import { IntrospectionInputObjectType } from 'graphql';
import React from 'react';
import LinkNextPage from './LinkNextPage';
import { Typography } from '@mui/material';

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
        <Typography key={el.name} mb={0.5}>
          <Typography variant="body1" component={'span'} color={'chocolate'}>
            {el.name}
            {': '}
          </Typography>

          {el.type.kind === 'SCALAR' && (
            <LinkNextPage current={current} next={el.type.name} nextPage={nextPage} />
          )}
        </Typography>
      ))}
    </>
  );
}

export default schemaKindInput;
