import { useEffect, useRef, useState } from 'react';
import { SiIconfinder } from 'react-icons/si';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Searchbar = ({ handleSerch }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast('Input serch query!');
      return;
    }

    handleSerch(query);
    setQuery('');
  };

  return (
    <div>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={onSubmit}>
          <button type="submit" className="SearchForm-button">
            <SiIconfinder className="SearchForm-button-icon" />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            ref={inputRef}
            name="query"
            value={query}
            onChange={handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
};
