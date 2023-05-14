import { useGetShemaQuery } from '@/store/api/graphQLRequest';
import { IntrospectionType } from 'graphql';
import React, { useState } from 'react';

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
    <div
      style={{
        width: '800px',
        maxHeight: '300px',
        padding: '5px',
        border: '1px solid red',
        fontSize: '16px',
        overflowY: 'auto',
      }}
    >
      {!stack.length && (
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
      )}
      {!!stack.length && (
        <div>
          <p>
            <a href="#" onClick={prevPage}>
              {'< '}
              {stack[stack.length - 1]}
            </a>
          </p>
          <p>{current}</p>
          {currentObject.kind === 'OBJECT' && <p>Fields</p>}
          <p>{currentObject.description}</p>
          {currentObject && (
            <>
              {currentObject.fields &&
                currentObject.fields?.map((el) => (
                  <p key={el.name}>
                    {el.name}
                    {!!el.args.length && (
                      <>
                        <span>(</span>
                        {el.args.map((arg) => (
                          <p key={arg.name}>
                            {arg.name}:{' '}
                            {(arg.type.name || arg.type.ofType?.name) && (
                              <a
                                href="#"
                                onClick={(e) =>
                                  nextPage(e, current, arg.type.name || arg.type.ofType?.name || '')
                                }
                              >
                                {arg.type.name || arg.type.ofType?.name}
                              </a>
                            )}
                            {arg.type.ofType?.ofType?.ofType.name && (
                              <a
                                href="#"
                                onClick={(e) =>
                                  nextPage(e, current, arg.type.ofType?.ofType?.ofType.name || '')
                                }
                              >
                                [{arg.type.ofType?.ofType?.ofType?.name}!]
                              </a>
                            )}
                            {!arg.type.name && <span>!</span>}
                          </p>
                        ))}

                        <span>)</span>
                      </>
                    )}
                    {(el.type.name || el.type.ofType) && <span>: </span>}
                    {el.type.name && (
                      <a href="#" onClick={(e) => nextPage(e, current, el.type.name || '')}>
                        {el.type.name}
                      </a>
                    )}
                    {el.type.ofType && (
                      <>
                        <a
                          href="#"
                          onClick={(e) =>
                            nextPage(
                              e,
                              current,
                              el.type.ofType?.name || el.type.ofType?.ofType?.name || ''
                            )
                          }
                        >
                          [{el.type.ofType.name || el.type.ofType?.ofType?.name}]
                        </a>
                        {el.type.ofType?.ofType && <span>!</span>}
                      </>
                    )}
                    {el.description && <p>{el.description}</p>}
                  </p>
                ))}
              {currentObject.inputFields &&
                currentObject.inputFields?.map((el) => (
                  <p key={el.name}>
                    {el.name}
                    {': '}
                    {el.type.name && (
                      <a href="#" onClick={(e) => nextPage(e, current, el.type.name || '')}>
                        {el.type.name}
                      </a>
                    )}
                  </p>
                ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Schema;
