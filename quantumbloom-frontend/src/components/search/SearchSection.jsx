import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import '../../styles/search-section.css';

const SearchSection = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
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

  const handleSearch = () => {
    onSearch({ searchTerm, startDate, endDate, guests });
  };

  return (
    <section className="search-section">
      <h2 className="search-title">Buscar Escapadas Rurales</h2>
      <p className="search-description">
        Explorá destinos únicos para desconectar y relajarte. Elegí fechas, filtrá por nombre y cantidad de personas.
      </p>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar propiedades por nombre..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Desde"
            className="date-picker"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Hasta"
            className="date-picker"
          />
        </div>

        <div className="guests-container">
          <label htmlFor="guests">Huéspedes:</label>
          <input
            type="number"
            id="guests"
            className="guests-input"
            min={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </div>

        <button className="search-button" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
