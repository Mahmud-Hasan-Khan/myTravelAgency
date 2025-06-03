import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import User from '@/models/User';

export async function PUT(req, { params }) {
  const { id } = params;
  const { role } = await req.json();

  if (!['admin', 'user'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  try {
    await connectToDB();
    await User.findByIdAndUpdate(id, { role });
    return NextResponse.json({ message: 'Role updated' }, { status: 200 });
  } catch (error) {
    console.error('Role Update Error:', error);
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
}
