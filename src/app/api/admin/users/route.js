import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
        return new Response("Unauthorized", { status: 403 });
    }

    try {
        const { collection } = await dbConnect("users");
        const users = await collection
            .find({}, { projection: { password: 0 } })
            .sort({ createdAt: -1 })
            .toArray();

        return Response.json(users);

    } catch (error) {
        console.error("Error fetching users:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

}



