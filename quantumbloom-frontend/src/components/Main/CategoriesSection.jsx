import React, { useState } from 'react';

const CategoriesSection = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([
    'Cabañas',
    'Casas de Campo',
    'Tiny Houses',
    'Glamping',
    'Estancias',
  ]);

  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
  };

  return (
    <section className="categories-section">
      <h2 className="section-title">Tipos de Alojamiento</h2>
      <div className="categories-grid">
        <button key="all" className="category-card" onClick={() => handleCategoryClick('')}>
          Todos
        </button>
        {categories.map((category, index) => (
          <button key={index} className="category-card" onClick={() => handleCategoryClick(category)}>
            {category}
          </button>
        ))}
      </div>

      <div className="add-category">
        <input
          type="text"
          placeholder="Nueva categoría"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addCategory();
          }}
        />
        <button onClick={addCategory}>Agregar Categoría</button>
      </div>
    </section>
  );
};

export default CategoriesSection;
