'use client';

import React, { useState } from 'react';
import CategoriesSection from '@/components/Main/CategoriesSection';
import styles from './manageCategories.module.css';

const ManageCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([
    'Cabañas',
    'Casas de Campo',
    'Glampings',
    'EcoDomos',
    'Refugios de Montaña',
  ]);

  const addCategory = (newCategory: string) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setCategories(categories.filter((category) => category !== categoryToRemove));
  };

  const editCategory = (oldCategory: string, newCategory: string) => {
    setCategories(
      categories.map((category) =>
        category === oldCategory ? newCategory : category
      )
    );
  };

  return (
    <div className={styles.manageCategories}>
      <h1>Gestión de Categorías de Alojamiento</h1>

      <div className={styles.categoryActions}>
        <h2>Agregar una nueva categoría</h2>
        <input
          type="text"
          id="new-category"
          placeholder="Ej: Casa rural de adobe"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const input = e.target as HTMLInputElement;
              addCategory(input.value.trim());
              input.value = '';
            }
          }}
        />
        <button
          onClick={() => {
            const input = document.getElementById('new-category') as HTMLInputElement;
            const newCategory = input.value.trim();
            addCategory(newCategory);
            input.value = '';
          }}
        >
          Agregar Categoría
        </button>
      </div>

      <div className={styles.categoriesList}>
        <h2>Categorías actuales</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className={styles.categoryItem}>
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

      <CategoriesSection
        onSelectCategory={(category: string) => console.log('Seleccionaste:', category)}
      />
    </div>
  );
};

export default ManageCategoriesPage;
