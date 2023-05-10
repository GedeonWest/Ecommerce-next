import { getServerSession } from 'next-auth';
import { Category } from '@/models/Category';
import { mongooseConnect } from '@/lib/mongoose';
// import { authOptions, isAdminRequest } from '@/pages/api/auth/[...nextauth]';

export default async function handle(request, response) {
  const { method } = request;
  await mongooseConnect();
  // await isAdminRequest(request, response);

  if (method === 'GET') {
    response.json(await Category.find().populate('parent'));
  }

  if (method === 'POST') {
    const { name, parentCategory, properties } = request.body;
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    response.json(categoryDoc);
  }

  if (method === 'PUT') {
    const { name, parentCategory, properties, _id } = request.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory || undefined,
        properties,
      }
    );
    response.json(categoryDoc);
  }

  if (method === 'DELETE') {
    const { _id } = request.query;
    await Category.deleteOne({ _id });
    response.json('ok');
  }
}
