import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    typescript: true,
    apiVersion: "2025-11-17.clover",
  });

  const products = await stripe.prices.list({
    limit: 3,
    active: true,
    expand: ["data.product"],
  });

  console.log(products);

  return NextResponse.json(products.data);
}

// CHANGE URL
export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    typescript: true,
    apiVersion: "2025-11-17.clover",
  });

  const data = await req.json();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: data.priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url:
      "http://localhost:3000/billing?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/billing",
  });

  return NextResponse.json(session.url);
}
