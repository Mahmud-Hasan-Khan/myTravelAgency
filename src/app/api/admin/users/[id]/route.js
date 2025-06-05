import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export async function DELETE(req, { params }) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return new Response("Unauthorized", { status: 403 });
    }

    try {
        const { collection } = await dbConnect("users");

        const user = await collection.findOne({ _id: new ObjectId(params.id) });
        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        // Prevent admin from deleting their own account
        if (user.email === session.user.email) {
            return new Response("You cannot delete your own account", { status: 400 });
        }

        await collection.deleteOne({ _id: new ObjectId(params.id) });

        return new Response(JSON.stringify({ message: "User deleted" }), {
            status: 200,
        });

    } catch (error) {
        console.error("Error deleting user:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}