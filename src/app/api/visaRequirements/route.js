import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const {collection: OfferNoticeCardCollection} =await dbConnect("visaRequirements");
        const data = await OfferNoticeCardCollection.find({}).toArray();

        // Convert MongoDB ObjectId to string
    const sanitized = data.map(doc => ({
      ...doc,
      _id: doc._id.toString()
    }));

        return NextResponse.json(sanitized);
    } catch (error) {
        {
            console.error('Error fetching offer notices:', error);
            return NextResponse.json({ error: 'Failed to load offer notices' }, { status: 500 });
        }
    }

}