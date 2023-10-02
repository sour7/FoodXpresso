import  prisma  from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (order) {
      const priceNumeric = order.price.toNumber();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceNumeric,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { intent_id: paymentIntent.id },
    });

    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret, total: paymentIntent.amount }),
      { status: 200 }
    );
  }
  return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
    status: 404,
  });
}
