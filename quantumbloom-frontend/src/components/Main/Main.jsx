import React, { useEffect, useState } from 'react';
import './Main.css';
import SearchSection from './SearchSection';
import CategoriesSection from './CategoriesSection';
import RecommendationsSection from './RecommendationsSection';
import ProductsGrid from './ProductsGrid';

export const Main = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/properties', {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Error al cargar las propiedades');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = properties.filter((property) => property.type === selectedCategory);
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(properties);
    }
    setCurrentPage(1);
  }, [selectedCategory, properties]);

  const handleSearch = (searchCriteria) => {
    const { searchTerm, startDate, endDate } = searchCriteria;

    const filtered = properties.filter((property) => {
      const matchesName = property.name.toLowerCase().includes(searchTerm.toLowerCase());

      const isAvailable = !property.occupiedDates.some((date) => {
        const occupiedDate = new Date(date);
        return startDate && endDate && startDate <= occupiedDate && occupiedDate <= endDate;
      });

      if (!startDate || !endDate) return matchesName;

      return matchesName && isAvailable;
    });

    setFilteredProperties(filtered);
    setCurrentPage(1);
    console.log("Fechas seleccionadas:", startDate, endDate);
    console.log("Propiedades filtradas:", filtered);
  };

  if (loading) return <div>Cargando propiedades...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="main-container">
      <SearchSection onSearch={handleSearch} />
      <CategoriesSection onSelectCategory={setSelectedCategory} />
      <RecommendationsSection />
      <section className="home-products-section">
        <h2>Escapadas recomendadas</h2>
        <ProductsGrid
          products={filteredProperties}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </main>
  );
};

export default Main;
