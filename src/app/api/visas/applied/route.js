import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
    const session = await getServerSession(authOptions); // ✅ no `{ req }` in App Router

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { client, db, collection } = await dbConnect("applied_visas");

        const visas = await db
            .collection("applied_visas")
            .find({ email: session.user.email })
            .sort({ appliedAt: -1 })
            .toArray();

        const visasWithId = visas.map((doc) => ({
            ...doc,
            _id: doc._id.toString(),
        }));

        return NextResponse.json(visasWithId);
    } catch (error) {
        console.error("Visa fetch error:", error); // 🔍 log exact error
        return NextResponse.json({ error: "Failed to fetch visas" }, { status: 500 });
    }
}
