'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';

import AvailabilityCalendar from '@/components/availability-calendar/AvailabilityCalendar';
import SharePopup from '@/components/SharePopup/SharePopup';
import NotificationToast from '@/components/common/NotificationToast/NotificationToast';

import styles from './productDetail.module.css';

type Product = {
  id: string;
  name: string;
  images: string[];
};

type PageProps = {
  params: { id: string };
};

const ProductDetailPage = ({ params }: PageProps) => {
  const router = useRouter();
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showSharePopup, setShowSharePopup] = useState<boolean>(false);

  const closeToast = () => setToastMessage(null);

  const navigateToLogin = (message: string) => {
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigateToLogin('Debes iniciar sesión para acceder a esta página.');
    } else {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <div className={styles['loading-message']}>Cargando...</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className={styles['product-detail']}>
      <h1 className={styles['product-title']}>{product.name}</h1>

      <div className={styles['gallery-container']}>
        <div className={styles['gallery-block']}>
          <div className={styles['main-image']}>
            {product.images?.[0] && (
              <Image
                src={product.images[0]}
                alt={`Imagen principal de ${product.name}`}
                width={600}
                height={400}
                className={styles['image-main']}
              />
            )}
          </div>
          <div className={styles['grid-images']}>
            {product.images?.slice(1, 5).map((image, index) => (
              <div key={index} className={styles['grid-image']}>
                <Image
                  src={image}
                  alt={`Imagen ${index + 1} de ${product.name}`}
                  width={150}
                  height={100}
                  className={styles['image-thumb']}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles['view-more']}>
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

export default ProductDetailPage;
