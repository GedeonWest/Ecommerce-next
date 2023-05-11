/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Product } from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';
import { isAdminRequest } from '@/pages/api/auth/[...nextauth]';

export default async function handle(request, response) {
  const { method } = request;
  // mongoose.connect(clientPromise.url);
  await mongooseConnect();
  await isAdminRequest(request, response);

  if (method === 'GET') {
    if (request.query?.id) {
      response.json(await Product.findOne({ _id: request.query.id }));
    } else {
      response.json(await Product.find());
    }
  }

  if (method === 'POST') {
    const { title, description, price, images, category, properties } =
      request.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      properties,
    });
    response.json(productDoc);
  }

  if (method === 'PUT') {
    const { title, description, price, images, category, properties, _id } =
      request.body;
    await Product.updateOne(
      { _id },
      { title, description, price, images, category, properties }
    );
    response.json(true);
  }

  if (method === 'DELETE') {
    if (request.query?.id) {
      await Product.deleteOne({ _id: request.query?.id });
      request.json(true);
    }
  }
}
