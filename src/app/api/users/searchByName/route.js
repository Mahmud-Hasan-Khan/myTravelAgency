import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await getServerSession({ req, ...authOptions }); // ✅ use await

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { collection } = await dbConnect("users");

    // ✅ Fix: session.use.email → session.user.email
    const adminUser = await collection.findOne({ email: session.user.email });
    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json({ error: "Forbidden - Admins only" }, { status: 403 });
    }

    // ✅ Search query
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query || query.length < 1) {
      return NextResponse.json({ message: "Missing query" }, { status: 400 });
    }

    // ✅ Search users
    const results = await collection
      .find({
        $or: [
          { givenName: { $regex: query, $options: "i" } },
          { surName: { $regex: query, $options: "i" } },
        ],
      })
      .project({
        email:1,
        givenName: 1,
        surName: 1,
        passportNumber: 1,
        dateOfBirth: 1,
        passportExpiry: 1,
        _id: 0,
      })
      .limit(5)
      .toArray();

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
