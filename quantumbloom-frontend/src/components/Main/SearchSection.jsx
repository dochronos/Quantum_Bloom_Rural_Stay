import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const SearchSection = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/products/suggestions?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      fetchSuggestions(searchTerm);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch({ searchTerm, startDate, endDate });
  };

  return (
    <section className="search-section">
      <h2 className="search-title">Buscar Escapadas Rurales</h2>
      <p className="search-description">
        Explorá destinos únicos para desconectar y relajarte. Elegí fechas y filtrá por nombre o ubicación.
      </p>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Buscar propiedades por nombre..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => setSearchTerm(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <div className="date-picker-container">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Desde"
            className="date-picker"
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Hasta"
            className="date-picker"
          />
        </div>
        <button className="search-button" onClick={handleSearchClick}>
          Buscar
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
