import Product from "../../../../models/product";
import { connectToDB } from "../../../../utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const { productName, productCompany, madeIn } = body;
    await connectToDB();
    try {
        let product = new Product({ productName, productCompany, madeIn });
        await product.save();
        return NextResponse.json({ msg: "Product has been saved", success: true }, { status: 201 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}