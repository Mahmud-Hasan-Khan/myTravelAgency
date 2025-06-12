import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session =await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { collection } = await dbConnect("users");
        const userinfo = await collection
            .findOne({ email: session.user.email }, { projection: { password: 0 } });
        if (!userinfo) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(userinfo);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse("Internal Server Error", { status: 500 });
    }

}
