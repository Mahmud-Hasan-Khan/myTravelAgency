import dbConnect from "@/lib/dbConnect";

export async function GET() {
    try {
        const {collection: OfferNoticeCardCollection} =await dbConnect("OfferNoticeCard");
        const data = await OfferNoticeCardCollection.find({}).toArray();

        // Convert MongoDB ObjectId to string
    const sanitized = data.map(doc => ({
      ...doc,
      _id: doc._id.toString()
    }));

        return Response.json(sanitized);
    } catch (error) {
        {
            console.error('Error fetching offer notices:', error);
            return Response.json({ error: 'Failed to load offer notices' }, { status: 500 });
        }
    }

}