'use client';

import React, { useRef, useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import styles from './locationAutocomplete.module.css';

const libraries: ('places')[] = ['places'];

interface LocationAutocompleteProps {
  onPlaceSelected: (address: string) => void;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({ onPlaceSelected }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      const address = place.formatted_address || place.name;
      if (address) {
        onPlaceSelected(address);
      } else {
        console.log('No se pudo obtener la dirección.');
      }
    }
  };

  if (loadError) return <div>Error al cargar Google Maps</div>;
  if (!isLoaded) return <div>Cargando...</div>;

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={handlePlaceChanged}
      options={{
        componentRestrictions: { country: 'ar' },
        fields: ['address_components', 'geometry', 'icon', 'name', 'formatted_address'],
      }}
    >
      <input
        type="text"
        placeholder="Ingresa la ubicación"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={styles['location-input']}
      />
    </Autocomplete>
  );
};

export default LocationAutocomplete;
