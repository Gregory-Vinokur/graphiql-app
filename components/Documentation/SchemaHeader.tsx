import { Link, Typography } from '@mui/material';
import { IntrospectionType } from 'graphql';
import React from 'react';

interface ISchemaHeader {
  element: IntrospectionType | Record<string, never>;
  current: string;
  stack: string[];
  prevPage: (e: React.MouseEvent) => void;
}

function SchemaHeader({ element, current, stack, prevPage }: ISchemaHeader) {
  return (
    <>
      <p>
        <Link href="#" onClick={prevPage}>
          {'< '}
          {stack[stack.length - 1]}
        </Link>
      </p>
      <Typography variant="h6" fontWeight={'bold'} mt={1}>
        {current}
      </Typography>
      {element.kind === 'OBJECT' && (
        <Typography variant="body2" mt={1} mb={1} fontWeight={'bold'}>
          Fields
        </Typography>
      )}
      <Typography variant="body1" mt={1}>
        {element.description}
      </Typography>
    </>
  );
}

export default SchemaHeader;
