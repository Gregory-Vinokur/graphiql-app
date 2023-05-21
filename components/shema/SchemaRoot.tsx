import React from 'react';

interface ISchemaRoot {
  nextPage: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    current: string,
    el: string
  ) => void;
}

function SchemaRoot({ nextPage }: ISchemaRoot) {
  return (
    <div>
      <p>A GraphQL schema provides a root type for each kind of operation.</p>
      <p>Root Types</p>
      <p>
        <span>query: </span>
        <a href="#" onClick={(e) => nextPage(e, 'Docs', 'Query')}>
          Query
        </a>
      </p>
    </div>
  );
}

export default SchemaRoot;
