import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    const { id } = params;
    const { status } = await req.json();

    if (!['blocked', 'unblocked'].includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    try {
        const { collection } = await dbConnect('users');
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });

        return NextResponse.json({ message: 'Status updated' });
    } catch (err) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

}