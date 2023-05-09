import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Products() {
  return (
    <Layout>
      <Link href='/products/new' className="bg-blue-900 rounded-md text-white py-1 px-2 ">Add new product</Link>
    </Layout>
  )
}
