/**
 * Transforms a component's props based on a mapping.
 * @param component The component to transform.
 * @param propMap A mapping of the props to transform.
 * @returns The transformed component props.
 */
const transformToComponentProps = <T extends object, S extends object>(
  component: S,
  propMap: { [K in keyof T]: keyof S }
): T => {
  const result = {} as T;
  (Object.keys(propMap) as Array<keyof T>).forEach((key) => {
    const sourceKey = propMap[key];
    if (component && component[sourceKey] !== undefined) {
      result[key] = component[sourceKey] as T[typeof key];
    }
  });
  return result;
};

export default transformToComponentProps;
