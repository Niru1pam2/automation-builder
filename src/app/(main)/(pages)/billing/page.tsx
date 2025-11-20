import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";
import BillingDashboard from "./_components/billing-dashboard";

interface Props {
  searchParams: Promise<{
    session_id: string;
  }>;
}

export default async function page(props: Props) {
  const { session_id } = await props.searchParams;

  if (session_id) {
    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
      typescript: true,
      apiVersion: "2025-11-17.clover",
    });

    const session = await stripe.checkout.sessions.listLineItems(session_id);
    const user = await currentUser();

    if (user) {
      await prisma.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          tier: session.data[0].description,
          credits:
            session.data[0].description == "Unlimited"
              ? "Unlimited"
              : session.data[0].description == "Pro"
              ? "100"
              : "10",
        },
      });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Billing</span>
      </h1>
      <BillingDashboard />
    </div>
  );
}
