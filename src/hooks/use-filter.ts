import _, { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface Options {
  initialPage?: number;
  initialRowsPerPage?: number;
  limit?: number;
  initialSortField?: string | null;
  initialSortDirection?: 'asc' | 'desc';
  initialFilters?: Record<string, any>;
  searchableFields?: string[] | null;
  updateInitialData?: boolean;
  debounceTime?: number; // Add debounceTime option
}

interface UseFilterReturn {
  data: any[];
  totalFilteredItems: number;
  page: number;
  pages: number;
  rowsPerPage: number;
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  filters: Record<string, any>;
  searchQuery: string;
  inputQuery: string;
  addFilter: (key: string, filterFunctionOrValue: string | (() => void)) => void;
  removeFilter: (key: string) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setSortField: (sortField: string | null) => void;
  setSortDirection: (sortDirection: 'asc' | 'desc') => void;
  setFilters: (filters: Record<string, any>) => void;
  setSearchQuery: (searchQuery: string) => void;
  setInputQuery: (inputQuery: string) => void;
  setData: (data: any[]) => void;
}

//TODO: use type in usefilter call

const useFilter = (initialData: any[] = [], options: Options = {}): UseFilterReturn => {
  const {
    initialPage = 1,
    initialRowsPerPage = 10,
    limit = Infinity,
    initialSortField = null,
    initialSortDirection = 'asc',
    initialFilters = {},
    searchableFields = null,
    updateInitialData = false,
    debounceTime = 300, // Default debounce time to 300ms
  } = options;

  const [data, setData] = useState<any[]>(initialData);
  const [page, setPage] = useState<number>(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);
  const [sortField, setSortField] = useState<string | null>(initialSortField);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);
  const [filters, setFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputQuery, setInputQuery] = useState(''); // State for the input value

  // Respond to changes in the initial data
  useEffect(() => {
    if (updateInitialData) setData(initialData);
  }, [initialData, updateInitialData]);

  // Debounced search query handler
  const debouncedSetSearchQuery = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, debounceTime),
    [debounceTime]
  );

  // Update the input query and debounce the search query
  const handleInputQueryChange = (query: string) => {
    setInputQuery(query);
    debouncedSetSearchQuery(query);
  };

  const addFilter = (key: string, filterFunctionOrValue: string | (() => void)) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: filterFunctionOrValue,
    }));
  };

  const removeFilter = (key: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[key];
      return newFilters;
    });
  };

  const applySort = (data: any[]): any[] => {
    if (!sortField) return data;

    return _.orderBy(
      data,
      (item) => {
        const value = item[sortField as string];
        if (typeof value === 'string') {
          return value.toLowerCase();
        }
        return value === undefined || value === null ? '' : value;
      },
      [sortDirection]
    );
  };

  const applyFilters = (data: any[]) => {
    return data.filter((item: any) => {
      return Object.keys(filters).every((key) => {
        const filter = filters[key];
        if (typeof filter === 'function') {
          return filter(item);
        }
        return item[key] === filter;
      });
    });
  };

  const applyTextSearch = (data: any[]) => {
    if (!searchQuery) return data; // If no search query, return data unchanged

    const lowerCaseQuery = searchQuery.toLowerCase();

    return data.filter((item) => {
      // Use all fields if `searchableFields` is null
      const fieldsToSearch = searchableFields || Object.keys(item);

      return fieldsToSearch.some((field) => {
        const fieldValue = item[field];
        if (fieldValue) {
          return fieldValue.toString().toLowerCase().includes(lowerCaseQuery);
        }
        return false;
      });
    });
  };

  const applyPagination = (data: any[]) => {
    const startIndex = (page - 1) * rowsPerPage; // Start index for the current page (1-based)
    const endIndex = Math.min(startIndex + rowsPerPage, limit); // Ensure no more than `limit` items are returned
    return data.slice(startIndex, endIndex);
  };

  const totalFilteredItems = useMemo(() => {
    let processedData = applyFilters(data);
    processedData = applyTextSearch(processedData);
    processedData = applySort(processedData);
    return Math.min(processedData.length, limit); // Respect hard limit for total count
  }, [data, filters, searchQuery, sortField, sortDirection, limit]);

  // Memoized computation of filtered, sorted, searched, and paginated data
  const filteredData = useMemo(() => {
    let processedData = applyFilters(data);
    processedData = applyTextSearch(processedData);
    processedData = applySort(processedData);
    return applyPagination(processedData);
  }, [data, filters, searchQuery, sortField, sortDirection, page, rowsPerPage, limit]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [filters, searchQuery, sortField, sortDirection]);

  const updateRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to page 0 when changing rows per page
  };

  const numberOfPages = Math.ceil(totalFilteredItems / rowsPerPage);

  // Return all necessary states and functions for controlling the filter, pagination, search, and sorting.
  return {
    data: filteredData,
    totalFilteredItems, // Total number of items after filters, search, and before pagination
    page,
    pages: numberOfPages,
    rowsPerPage,
    sortField,
    sortDirection,
    filters,
    searchQuery,
    inputQuery,
    setPage,
    setRowsPerPage: updateRowsPerPage, // This allows setting rows per page
    setSortField,
    setSortDirection,
    addFilter,
    removeFilter,
    setFilters,
    setSearchQuery: handleInputQueryChange, // Use the handler for input changes
    setInputQuery,
    setData,
  };
};

export default useFilter;
