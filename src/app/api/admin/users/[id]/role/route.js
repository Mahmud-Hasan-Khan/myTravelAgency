import dbConnect from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function PUT(req, context) {
  const params = await context.params;
  const { id } = params;


  const { role } = await req.json();

  if (!['admin', 'user'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  try {
    const { collection } = await dbConnect('users');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error('Role Update Error:', error);
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
}
