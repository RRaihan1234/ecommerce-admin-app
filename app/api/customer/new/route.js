import Customer from "../../../../models/customer";
import { connectToDB } from "../../../../utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const { customerMobile, customerAddress, customerName } = body;
    await connectToDB();
    try {
        let customer = new Customer({ customerMobile, customerAddress, customerName });
        await customer.save();
        return NextResponse.json({ msg: "Customer has been saved", success: true }, { status: 201 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}