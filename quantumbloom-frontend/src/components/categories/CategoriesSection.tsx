'use client';

import React, { useState } from 'react';
import styles from './categoriesSection.module.css';

interface CategoriesSectionProps {
  onSelectCategory: (category: string) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<string[]>([
    'Cabañas',
    'Casas de Campo',
    'Tiny Houses',
    'Glamping',
    'Estancias',
  ]);

  const [newCategory, setNewCategory] = useState<string>('');

  const addCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setNewCategory('');
    }
  };

  const handleCategoryClick = (category: string) => {
    onSelectCategory(category);
  };

  return (
    <section className={styles.categoriesSection}>
      <h2 className={styles.sectionTitle}>Tipos de Alojamiento</h2>

      <div className={styles.categoriesGrid}>
        <button className={styles.categoryCard} onClick={() => handleCategoryClick('')}>
          Todos
        </button>

        {categories.map((category, index) => (
          <button
            key={index}
            className={styles.categoryCard}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.addCategory}>
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
