import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const {
            phoneNumber,
            passportNumber,
            dateOfBirth,
            passportExpiry,
            image,
            passportImage,
        } = body;

        // Validate required fields
        if (!phoneNumber || !passportNumber || !dateOfBirth || !passportExpiry) {
            return NextResponse.json(
                { success: false, error: "Missing required fields." },
                { status: 400 }
            );
        }


        const { collection } = await dbConnect("users");
        const updateFields = {
            phoneNumber,
            passportNumber,
            dateOfBirth,
            passportExpiry,
            ...(image && { image }),
            ...(passportImage && { passportImage }),
        };

        await collection.updateOne(
            { email: session.user.email },
            { $set: updateFields }
        );

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Update error", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }

}