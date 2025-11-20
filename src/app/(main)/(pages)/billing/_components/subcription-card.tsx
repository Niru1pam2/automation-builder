/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  onPayment: (id: string) => void;
  products: any[];
  tier: string;
}

export default function SubscriptionCard({ onPayment, products, tier }: Props) {
  return (
    <section className="flex w-full justify-center md:flex-row flex-col gap-6">
      {products &&
        products.map((price: any) => {
          const planName = price.product?.name || "Unknown";
          const isCurrentTier = planName === tier;

          return (
            <Card className="p-3" key={price.id}>
              <CardHeader>
                <CardTitle>{planName}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <CardDescription>
                  {planName === "Unlimited"
                    ? "Enjoy a monthly torrent of credits flooding your account, empowering you to tackle even the most ambitious automation tasks effortlessly."
                    : planName === "Pro"
                    ? "Experience a monthly surge of credits to supercharge your automation efforts. Ideal for small to medium-sized projects seeking consistent support."
                    : planName === "Free" &&
                      "Get a monthly wave of credits to automate your tasks with ease. Perfect for starters looking to dip their toes into Fuzzie's automation capabilities."}
                </CardDescription>
                <div className="flex justify-between">
                  <p>
                    {planName === "Free"
                      ? "10"
                      : planName === "Pro"
                      ? "100"
                      : planName === "Unlimited" && "unlimited"}{" "}
                    credits
                  </p>
                  <p className="font-bold">
                    {planName === "Free"
                      ? "Free"
                      : planName === "Pro"
                      ? "500.00"
                      : planName === "Unlimited" && "1000.00"}
                    /mo
                  </p>
                </div>
                {isCurrentTier ? (
                  <Button disabled variant="outline">
                    Active
                  </Button>
                ) : (
                  <Button onClick={() => onPayment(price.id)} variant="outline">
                    Purchase
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
    </section>
  );
}
