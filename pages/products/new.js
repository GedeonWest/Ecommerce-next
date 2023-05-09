import React from 'react';
import Layout from '@/components/Layout';
import ProductsForm from '@/components/ProductsForm';

// TODO: refactor Form to RHF

export default function NewProduct() {
  return (
    <Layout>
      <h1>New Product</h1>
      <ProductsForm />
    </Layout>
  );
}
