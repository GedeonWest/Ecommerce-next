import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function ProductsForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const router = useRouter();

  async function createProduct(event) {
    event.preventDefault();
    const data = { title, description, price };
    if (_id) {
      // update
      await axios.put('/api/products', { ...data, _id });
    } else {
      // create
      await axios.post('/api/products', data);
    }

    router.push('/products');
  }

  return (
    <form onSubmit={createProduct}>
      <label>
        product name
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      <label>
        description
        <textarea
          placeholder="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <label>
        Price (in USD)
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>

      <button type="submit" className="button-primary">
        Save
      </button>
    </form>
  );
}
