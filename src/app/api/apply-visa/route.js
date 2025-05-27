import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { country, visaType, price, validity, applicantName, visaStatus, mobileNumber } = body;

    if (!country || !visaType || !price || !validity || !applicantName || !visaStatus || !mobileNumber) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const { db } = await dbConnect();

        const application = {
            country,
            name: applicantName,
            email: session.user.email,
            mobileNumber,
            visaType,
            price,
            validity,
            applicationId: `WV-${Date.now()}`,
            appliedAt: new Date(),
            visaStatus,
        };

        const result = await db.collection('applied_visas').insertOne(application);

        return NextResponse.json({ message: 'Application saved', id: result.insertedId }, { status: 201 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }

}