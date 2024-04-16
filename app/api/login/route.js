import User from "../../../models/user";
import { connectToDB } from "../../../utils/database";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';;
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const body = await req.json();
    const { mobile, password } = body
    await connectToDB();
    try {
        const isUserPresent = await User.findOne({ mobile });
        if (!isUserPresent) {
            return NextResponse.json({ msg: "Authentication Failure" })
        }
        const isPasswordMatch = await bcrypt.compare(password, isUserPresent.password)
        if (!isPasswordMatch) {
            return NextResponse.json({ msg: "Authentication Failure" })
        }
        const token = jwt.sign({ mobile, id : isUserPresent._id }, process.env.SECRET_KEY);
        return NextResponse.json({ token, success: true }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err, success: false }, { status: 500 })
    }
}