import React, {useState, ChangeEvent, useCallback, useRef, useEffect} from 'react';
import Icon from './Icon';
import {SearchProps} from './type';
import Button from './Button';

const SearchComponent: React.FC<SearchProps> = ({
  placeholder = 'Search for tasks...',
  onSearch
}) => {
  const [query, setQuery] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleSearch = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        onSearch(value);
      }, 300);
    },
    [onSearch]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setQuery(newValue);
      handleSearch(newValue);
    },
    [handleSearch]
  );

  const clearSearch = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center border border-gray-300 rounded-md p-2 h-11">
      <Icon name="search" />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="border-none outline-none focus:outline-0 flex-1 bg-transparent px-2"
        aria-label="Search input"
      />
      <Button
        id="clear-btn"
        btnType="icon"
        label="Clear"
        onClick={clearSearch}
        aria-label="Clear search"
        icon={<Icon name="close" />}
      />
    </div>
  );
};

export default React.memo(SearchComponent);
