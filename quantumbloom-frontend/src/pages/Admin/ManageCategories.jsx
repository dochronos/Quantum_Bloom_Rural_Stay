import React, { useState } from 'react';
import CategoriesSection from '../../components/Main/CategoriesSection.jsx';
import './ManageCategories.css';

const ManageCategories = () => {
  const [categories, setCategories] = useState([
    'Cabañas',
    'Casas de Campo',
    'Glampings',
    'EcoDomos',
    'Refugios de Montaña',
  ]);

  const addCategory = (newCategory) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const removeCategory = (categoryToRemove) => {
    setCategories(categories.filter((category) => category !== categoryToRemove));
  };

  const editCategory = (oldCategory, newCategory) => {
    setCategories(
      categories.map((category) =>
        category === oldCategory ? newCategory : category
      )
    );
  };

  return (
    <div className="manage-categories">
      <h1>Gestión de Categorías de Alojamiento</h1>

      <div className="category-actions">
        <h2>Agregar una nueva categoría</h2>
        <input
          type="text"
          id="new-category"
          placeholder="Ej: Casa rural de adobe"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addCategory(e.target.value.trim());
              e.target.value = '';
            }
          }}
        />
        <button
          onClick={() => {
            const newCategory = document.getElementById('new-category').value.trim();
            addCategory(newCategory);
            document.getElementById('new-category').value = '';
          }}
        >
          Agregar Categoría
        </button>
      </div>

      <div className="categories-list">
        <h2>Categorías actuales</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="category-item">
              <span>{category}</span>
              <button onClick={() => removeCategory(category)}>Eliminar</button>
              <button
                onClick={() => {
                  const newCategory = prompt('Editar categoría:', category);
                  if (newCategory) {
                    editCategory(category, newCategory.trim());
                  }
                }}
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Opcional: sección de vista previa o selección */}
      <CategoriesSection onSelectCategory={(category) => console.log("Seleccionaste:", category)} />
    </div>
  );
};

export default ManageCategories;
