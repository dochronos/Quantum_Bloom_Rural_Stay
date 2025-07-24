import React, { useRef, useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import './LocationAutocomplete.css';

const libraries = ['places'];

const LocationAutocomplete = ({ onPlaceSelected }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // API Key desde .env
    libraries,
  });

  const autocompleteRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  if (loadError) return <div>Error al cargar Google Maps</div>;
  if (!isLoaded) return <div>Cargando...</div>;

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      const address = place.formatted_address || place.name;
      if (address) {
        onPlaceSelected(address);
      } else {
        console.log("No se pudo obtener la dirección.");
      }
    }
  };

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={handlePlaceChanged}
      options={{
        componentRestrictions: { country: 'ar' },
        fields: ['address_components', 'geometry', 'icon', 'name'],
      }}
    >
      <input
        type="text"
        placeholder="Ingresa la ubicación"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="location-autocomplete-input"
      />
    </Autocomplete>
  );
};

export default LocationAutocomplete;
