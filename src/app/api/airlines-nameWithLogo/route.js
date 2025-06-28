import dbConnect from "@/lib/dbConnect"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const { collection } = await dbConnect('airlinesPartnerLogo');
        const logosWithName = await collection.find({}).toArray();
        return NextResponse.json(logosWithName);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
    }
}