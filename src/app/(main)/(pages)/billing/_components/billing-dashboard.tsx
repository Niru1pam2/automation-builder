"use client";

import { useBilling } from "@/providers/billing-provider";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import SubscriptionCard from "./subcription-card";
import CreditsTracker from "./credits-tracker";

export default function BillingDashboard() {
  const { credits, tier } = useBilling();
  const [stripeProducts, setStripeProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const onStripeProducts = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/payment");

    if (data) {
      setStripeProducts(data);
      setLoading(false);
    }
  };

  const onPayment = async (id: string) => {
    const { data } = await axios.post(
      "/api/payment",
      {
        priceId: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    window.location.assign(data);
  };

  useEffect(() => {
    onStripeProducts();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Loader2Icon className="animate-spin size-10" />
        </>
      ) : (
        <>
          <div className="flex gap-5 p-6">
            <SubscriptionCard
              onPayment={onPayment}
              tier={tier}
              products={stripeProducts}
            />
          </div>
          <CreditsTracker tier={tier} credits={+credits} />
        </>
      )}
    </>
  );
}
