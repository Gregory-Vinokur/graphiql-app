import { useGetShemaQuery } from '@/store/api/graphQLRequest';
import { IntrospectionInputObjectType, IntrospectionObjectType, IntrospectionType } from 'graphql';
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

  const prevPage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent(stack[stack.length - 1]);
    setStack((prev) => {
      const newState = [...prev];
      newState.pop();
      return newState;
    });
    setCurrentObject(types?.find((el) => el.name === stack[stack.length - 1]) || {});
  };

  const isObjectType = (
    object:
      | IntrospectionType
      | IntrospectionObjectType
      | IntrospectionInputObjectType
      | Record<string, never>
  ): object is IntrospectionObjectType => {
    return object && object.kind === 'OBJECT';
  };

  const isInputObjectType = (
    object:
      | IntrospectionType
      | IntrospectionObjectType
      | IntrospectionInputObjectType
      | Record<string, never>
  ): object is IntrospectionInputObjectType => {
    return object && object.kind === 'INPUT_OBJECT';
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
          <div>A GraphQL schema provides a root type for each kind of operation.</div>
          <div>Root Types</div>
          <div>
            <span>query: </span>
            <a href="#" onClick={(e) => nextPage(e, 'Docs', 'Query')}>
              Query
            </a>
          </div>
        </div>
      )}
      {!!stack.length && (
        <div>
          <div>
            <a href="#" onClick={prevPage}>
              {'< '}
              {stack[stack.length - 1]}
            </a>
          </div>
          <div>{current}</div>
          {currentObject.kind === 'OBJECT' && <div>Fields</div>}
          <div>{currentObject.description}</div>
          {currentObject && (
            <>
              {isObjectType(currentObject) &&
                currentObject.fields?.map((el) => (
                  <div key={el.name}>
                    {el.name}
                    {!!el.args.length && (
                      <>
                        <span>(</span>
                        {el.args.map((arg) => (
                          <div key={arg.name}>
                            {arg.name}:{' '}
                            {('name' in arg.type ||
                              ('ofType' in arg.type && 'name' in arg.type.ofType)) && (
                              <a
                                href="#"
                                onClick={(e) =>
                                  nextPage(
                                    e,
                                    current,
                                    'name' in arg.type
                                      ? arg.type.name
                                      : arg.type.ofType && 'name' in arg.type.ofType
                                      ? arg.type.ofType.name
                                      : ''
                                  )
                                }
                              >
                                {'name' in arg.type ||
                                  ('ofType' in arg.type && 'name' in arg.type.ofType)}
                              </a>
                            )}
                            {arg.type &&
                              'ofType' in arg.type &&
                              arg.type.ofType &&
                              'name' in arg.type.ofType &&
                              arg.type.ofType.name && (
                                <a
                                  href="#"
                                  onClick={(e) =>
                                    nextPage(
                                      e,
                                      current,
                                      'ofType' in arg.type && 'name' in arg.type.ofType
                                        ? arg.type.ofType.name
                                        : ''
                                    )
                                  }
                                >
                                  {arg.type.ofType.name}
                                </a>
                              )}
                            {!('name' in arg.type) && <span>!</span>}
                          </div>
                        ))}

                        <span>)</span>
                      </>
                    )}
                    {('name' in el.type || el.type.ofType) && <span>: </span>}
                    {'name' in el.type && (
                      <a
                        href="#"
                        onClick={(e) =>
                          nextPage(e, current, (el.type && 'name' in el.type && el.type.name) || '')
                        }
                      >
                        {el.type.name}
                      </a>
                    )}
                    {'ofType' in el.type && (
                      <>
                        <a
                          href="#"
                          onClick={(e) =>
                            nextPage(
                              e,
                              current,
                              (el.type &&
                                'ofType' in el.type &&
                                el.type.ofType &&
                                'name' in el.type.ofType &&
                                el.type.ofType.name) ||
                                ''
                            )
                          }
                        >
                          [
                          {el.type &&
                            'ofType' in el.type &&
                            el.type.ofType &&
                            'name' in el.type.ofType &&
                            el.type.ofType.name}
                          ]
                        </a>
                        {'ofType' in el.type &&
                          el.type.ofType &&
                          'ofType' in el.type.ofType &&
                          el.type.ofType?.ofType && <span>!</span>}
                      </>
                    )}
                    {el.description && <div>{el.description}</div>}
                  </div>
                ))}
              {isInputObjectType(currentObject) && (
                <>
                  <div>Input Fields</div>
                  {currentObject.inputFields?.map((el) => (
                    <div key={el.name}>
                      {el.name}
                      {': '}
                      {el.type && 'name' in el.type && el.type.name && (
                        <a
                          href="#"
                          onClick={(e) =>
                            nextPage(
                              e,
                              current,
                              (el.type && 'name' in el.type && el.type.name) || ''
                            )
                          }
                        >
                          {el.type.name}
                        </a>
                      )}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Schema;
