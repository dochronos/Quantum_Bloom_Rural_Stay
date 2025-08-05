'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import styles from '@/styles/search-section.module.css';

type SearchData = {
  searchTerm: string;
  startDate: Date | null;
  endDate: Date | null;
  guests: number;
};

type SearchSectionProps = {
  onSearch: (data: SearchData) => void;
};

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
          const response = await axios.get(`/api/products/suggestions?query=${searchTerm}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    onSearch({ searchTerm, startDate, endDate, guests });
  };

  return (
    <section className={styles['search-section']}>
      <h2 className={styles['search-title']}>Buscar Escapadas Rurales</h2>
      <p className={styles['search-description']}>
        Explorá destinos únicos para desconectar y relajarte. Elegí fechas, filtrá por nombre y cantidad de personas.
      </p>

      <div className={styles['search-container']}>
        <input
          type="text"
          placeholder="Buscar propiedades por nombre..."
          className={styles['search-input']}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {suggestions.length > 0 && (
          <ul className={styles['suggestions-list']}>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => setSearchTerm(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        <div className={styles['date-picker-container']}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Desde"
            className={styles['date-picker']}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Hasta"
            className={styles['date-picker']}
          />
        </div>

        <div className={styles['guests-container']}>
          <label htmlFor="guests">Huéspedes:</label>
          <input
            type="number"
            id="guests"
            className={styles['guests-input']}
            min={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </div>

        <button className={styles['search-button']} onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
