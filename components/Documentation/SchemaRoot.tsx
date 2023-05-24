import { Link, Typography } from '@mui/material';
import React from 'react';

interface ISchemaRoot {
  nextPage: (e: React.MouseEvent, current: string, el: string) => void;
}

function SchemaRoot({ nextPage }: ISchemaRoot) {
  return (
    <>
      <Typography variant="h5" fontWeight={'bold'}>
        Docs
      </Typography>
      <Typography variant="body1" mt={1}>
        A GraphQL schema provides a root type for each kind of operation.
      </Typography>
      <Typography variant="body2" mt={1} mb={1} fontWeight={'bold'}>
        Root Types
      </Typography>
      <p>
        <Typography variant="body1" component={'span'} color={'#d19a66'}>
          query:{' '}
        </Typography>
        <Link href="#" onClick={(e) => nextPage(e, 'Docs', 'Query')}>
          Query
        </Link>
      </p>
    </>
  );
}

export default SchemaRoot;
