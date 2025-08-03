'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';

import AvailabilityCalendar from '@/components/AvailabilityCalendar/AvailabilityCalendar';
import SharePopup from '@/components/SharePopup/SharePopup';
import NotificationToast from '@/components/common/NotificationToast/NotificationToast';
import '@/styles/ProductDetail.css';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const closeToast = () => setToastMessage(null);

  const navigateToLogin = (message) => {
    router.push(`/login?message=${encodeURIComponent(message)}&fromReserve=${id}`);
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) throw new Error('Producto no encontrado');
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    // lógica opcional de favoritos
  };

  const fetchReviews = async () => {
    // lógica opcional de reviews
  };

  const fetchAverageRating = async () => {
    // lógica opcional de rating
  };

  const fetchReviewCount = async () => {
    // lógica opcional de conteo
  };

  const toggleFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigateToLogin('Debes iniciar sesión para usar favoritos.');
      return;
    }
    // lógica de toggle favoritos
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigateToLogin('Debes iniciar sesión para acceder a esta página.');
    } else {
      fetchProduct();
      checkIfFavorite();
      fetchReviews();
      fetchAverageRating();
      fetchReviewCount();
    }
  }, [id]);

  if (loading) return <div className="loading-message">Cargando...</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="product-detail">
      <h1 className="product-title">{product.name}</h1>

      <div className="gallery-container">
        <div className="gallery-block">
          <div className="main-image">
            {product.images?.[0] && (
              <Image
                src={product.images[0]}
                alt={`Imagen principal de ${product.name}`}
                width={600}
                height={400}
                className="image-main"
              />
            )}
          </div>
          <div className="grid-images">
            {product.images?.slice(1, 5).map((image, index) => (
              <div key={index} className="grid-image">
                <Image
                  src={image}
                  alt={`Imagen ${index + 1} de ${product.name}`}
                  width={150}
                  height={100}
                  className="image-thumb"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="view-more">
          <Link href={`/product/${product.id}/gallery`}>Ver más</Link>
        </div>
      </div>

      {/* Secciones adicionales opcionales */}
      {/* <AvailabilityCalendar productId={product.id} /> */}
      {showSharePopup && <SharePopup product={product} onClose={() => setShowSharePopup(false)} />}
      <NotificationToast message={toastMessage} onClose={closeToast} />
    </div>
  );
};

export default ProductDetail;
