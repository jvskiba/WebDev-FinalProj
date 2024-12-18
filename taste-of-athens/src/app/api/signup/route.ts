import connectMongoDB from "@/libs/mongodb";
import { User } from "@/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    const { username, password } = await request.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash (password, 5); 

    const userExists = await User.exists( {username: username} );
    if (userExists) {
        return NextResponse.json({ message: 'User already exists' }, { status: 403 });
    }

    const newUser = {
        username,
        password: hashedPassword,
    }

    try {
        await User.create(newUser);
        return NextResponse.json({ message: 'User added successfully '}, { status: 201});
    } catch {
        return NextResponse.json({ message: 'User add failed'}, { status: 400}); // wrong status
    }
}