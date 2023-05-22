import { IntrospectionObjectType } from 'graphql';
import React from 'react';
import LinkNextPage from './LinkNextPage';
import { Typography } from '@mui/material';

interface ISchemaKindObject {
  element: IntrospectionObjectType;
  current: string;
  nextPage: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    current: string,
    el: string
  ) => void;
}

function SchemaKindObject({ element, current, nextPage }: ISchemaKindObject) {
  return (
    <>
      {element.fields &&
        element.fields.map((el) => (
          <div key={el.name}>
            <Typography variant="body1" component={'span'} color={'chocolate'}>
              {el.name}
            </Typography>

            {!!el.args.length && (
              <>
                <span>(</span>
                {el.args.map((arg) => (
                  <span key={arg.name}>
                    {el.args.length > 1 && (
                      <>
                        <br />
                        {'\u00A0\u00A0'}
                      </>
                    )}
                    <Typography variant="body1" component={'span'} color={'red'}>
                      {arg.name}:{' '}
                    </Typography>

                    {(arg.type.kind === 'SCALAR' || arg.type.kind === 'INPUT_OBJECT') && (
                      <LinkNextPage current={current} next={arg.type.name} nextPage={nextPage} />
                    )}
                    {arg.type.kind === 'NON_NULL' && arg.type.ofType.kind === 'SCALAR' && (
                      <LinkNextPage
                        current={current}
                        next={arg.type.ofType.name}
                        nextPage={nextPage}
                      />
                    )}
                    {arg.type.kind === 'NON_NULL' &&
                      arg.type.ofType?.kind === 'LIST' &&
                      arg.type.ofType.ofType.kind === 'NON_NULL' &&
                      arg.type.ofType.ofType.ofType.kind === 'SCALAR' && (
                        <>
                          {' '}
                          <span>[</span>
                          <LinkNextPage
                            current={current}
                            next={arg.type.ofType.ofType.ofType.name}
                            nextPage={nextPage}
                          />
                          <span>!]</span>
                        </>
                      )}
                    {arg.type.kind === 'NON_NULL' && <span>!</span>}
                  </span>
                ))}
                {el.args.length > 1 && <br />}
                <span>)</span>
              </>
            )}
            <span>: </span>
            {(el.type.kind === 'OBJECT' || el.type.kind === 'SCALAR') && (
              <LinkNextPage current={current} next={el.type.name} nextPage={nextPage} />
            )}
            {el.type.kind === 'LIST' && el.type.ofType.kind === 'OBJECT' && (
              <>
                <span>[</span>
                <LinkNextPage current={current} next={el.type.ofType.name} nextPage={nextPage} />
                <span>]</span>
              </>
            )}
            {el.type.kind === 'NON_NULL' &&
              el.type.ofType.kind === 'LIST' &&
              el.type.ofType.ofType.kind === 'OBJECT' && (
                <>
                  <span>[</span>
                  <LinkNextPage
                    current={current}
                    next={el.type.ofType.ofType.name}
                    nextPage={nextPage}
                  />
                  <span>]!</span>
                </>
              )}
            {el.description && (
              <Typography variant="body1" mt={1} mb={2}>
                {el.description}
              </Typography>
            )}
          </div>
        ))}
    </>
  );
}

export default SchemaKindObject;
