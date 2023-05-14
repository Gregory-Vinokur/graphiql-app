import React from 'react';
import schema from './tempValueSchema';

function TempSchema() {
  // const { data } = useGetShemaQuery();
  // const schema = data?.data.__schema;
  return (
    <div
      style={{
        width: '800px',
        maxHeight: '300px',
        border: '1px solid red',
        fontSize: '16px',
        overflowY: 'auto',
      }}
    >
      <pre>
        {' '}
        {JSON.stringify(
          schema.types.find((el) => el.name === 'FilterLocation'),
          null,
          2
        )}
      </pre>
    </div>
  );
}

export default TempSchema;
