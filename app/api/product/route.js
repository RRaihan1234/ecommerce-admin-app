import Product from "../../../models/product";
import { connectToDB } from "../../../utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDB();
        const products = await Product.find({})
        return NextResponse.json(products, { status: 201 })  
    }
    catch (error) {
        return NextResponse.json("Failed to fetch products", { status: 500 })
    }
}