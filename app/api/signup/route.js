import User from "../../../models/user";
import { connectToDB } from "../../../utils/database";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req) {
    const body = await req.json();
    const { mobile, password } = body;
    await connectToDB();
    const isUserAlreadyPresent = await User.findOne({ mobile });
    if (isUserAlreadyPresent) {
            return NextResponse.json({ msg: "User is already present", success: false })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        let user = new User({ mobile, password: hashPassword});
        await user.save();
        return NextResponse.json({ msg: "User has been registered", success: true }, { status: 201 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}