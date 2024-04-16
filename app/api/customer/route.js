import Customer from "../../../models/customer";
import { connectToDB } from "../../../utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDB();
        const customers = await Customer.find({})
        return NextResponse.json(customers, { status: 201 })  
    }
    catch (error) {
        return NextResponse.json("Failed to fetch customers", { status: 500 })
    }
}