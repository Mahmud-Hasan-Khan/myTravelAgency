// app/api/offer-notice/[id]/route.js

import dbConnect from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const client = await dbConnect;
    const db = client.db();
    const collection = db.collection('offerNoticeCards');

    const card = await collection.findOne({ _id: new ObjectId(id) });

    if (!card) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    return Response.json({
      ...card,
      _id: card._id.toString(), // convert ObjectId to string
    });
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
