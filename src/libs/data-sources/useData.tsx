import { useContext, useEffect, useMemo } from 'react';
import { DataSource, FilterObject, WithOptionalId } from '.';
import { DataContext } from './DataProvider';

export interface UseDataPropsOptions<T> {
  datasource?: any;
  addDatasourceWhenNotAvailable?: boolean;
  filter?: FilterObject<T>;
  find?: { field: keyof T; operator: '=='; value: any };
  // [key: string]: any;
}

// interface UseDataReturn<T> {
//   // TODO: implement
//   [key: string]: any;
// }

const defaultOptions = {
  addDatasourceWhenNotAvailable: true,
};

// Overload signatures

// function useData<T>(key: string, options?: UseDataPropsOptions<T>): DataSource<T, T[]>;
// function useData<T>(key: string, options?: UseDataPropsOptions<T>): DataSource<T, T>;

// Implementation
function useData<T, Z = T[]>(
  key: string,
  options: UseDataPropsOptions<T> = defaultOptions
): DataSource<T, Z> {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }

  const mergedOptions = { ...defaultOptions, ...(options || {}) };
  const { datasource: newDataSource, addDatasourceWhenNotAvailable } = mergedOptions || {};

  const dataSource = useMemo(() => context.dataSources[key], [key, context]);

  const {
    subscribeToData,
    subscriptions,
    data,
    loading,
    error,
    add,
    update,
    set,
    remove,
    addDataSource,
    fetchData,
  } = context;

  useEffect(() => {
    if (
      dataSource &&
      dataSource.options?.subscribe &&
      typeof dataSource?.subscribe === 'function' &&
      !subscriptions[key]
    ) {
      subscribeToData(key);
    }
  }, [key, dataSource, subscribeToData, subscriptions, context.dataSources]);

  useEffect(() => {
    if (newDataSource && !context.dataSources[key] && addDatasourceWhenNotAvailable) {
      addDataSource(key, newDataSource);
    }
  }, [newDataSource, key, addDataSource, context.dataSources, addDatasourceWhenNotAvailable]);

  const { get, getAll } = dataSource || {};
  const returnData = useMemo(() => data[key], [data, key]);

  function getClassMethods(obj: { [key: string]: any }): Record<string, () => any> {
    const allMethods: Record<string, () => any> = {};
    const parentMethods: Set<string> = new Set();

    let currentProto = Object.getPrototypeOf(obj);

    // Collect all methods from the prototype chain (base/parent classes)
    while (currentProto && currentProto !== Object.prototype) {
      Object.getOwnPropertyNames(currentProto)
        .filter(
          (method) =>
            method !== 'constructor' &&
            typeof obj[method] === 'function' &&
            !method.startsWith('#') &&
            !method.startsWith('_') &&
            method !== 'validate'
        )
        .forEach((method) => {
          parentMethods.add(method);
        });
      currentProto = Object.getPrototypeOf(currentProto);
    }

    // Include methods from the object itself (child class) that are not in the parentMethods set
    Object.getOwnPropertyNames(obj)
      .filter(
        (method) =>
          method !== 'constructor' &&
          typeof obj[method] === 'function' &&
          !method.startsWith('#') &&
          !method.startsWith('_') &&
          method !== 'validate' &&
          method !== 'subscribe' &&
          !parentMethods.has(method)
      )
      .forEach((method) => {
        if (!allMethods[method]) {
          allMethods[method] = obj[method].bind(obj);
        }
      });

    return allMethods;
  }

  const methods = useMemo(() => {
    if (!dataSource) return;
    return getClassMethods(dataSource);
  }, [dataSource]);

  const returnObject: DataSource<T, Z> = useMemo(
    () => ({
      // Custom methods
      custom: { ...methods },
      // Data state
      data: returnData,
      loading: loading[key] || false,
      error: error[key],
      // Public methods
      actions: {
        fetchData: (filter?: FilterObject<T>) => fetchData(key, filter),
        get: get || (() => {}),
        getAll: getAll || (() => {}),
        add: (item: WithOptionalId<T>) => add(key, item),
        update: (data, id) => update(key, data, id),
        set: (data, id) => set(key, data, id),
        delete: (id) => remove(key, id),
        validate: dataSource?.validate,
      },
      // Raw datasource info
      dataSource,
      provider: dataSource?.provider,
    }),
    [
      add,
      fetchData,
      dataSource,
      error,
      get,
      getAll,
      key,
      loading,
      methods,
      remove,
      set,
      update,
      returnData,
    ]
  );

  return returnObject;
}

export default useData;
