import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        const { name, email, password, role } = await req.json();

        const { collection } = await dbConnect('users');

        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            role
        };
        await collection.insertOne(newUser);
        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}