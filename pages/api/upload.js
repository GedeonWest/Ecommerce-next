import multiparty from 'multiparty';

export default async function handle(request, response) {
  const form = multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(request, (error, fields, files) => {
      if (error) reject(error);
      resolve({ fields, files });
    });
  });

  return response.json('ok');
}

export const config = {
  api: { bodyParser: false },
};
