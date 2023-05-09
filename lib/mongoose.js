/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
    // eslint-disable-next-line no-else-return
  } else {
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri);
  }
}
