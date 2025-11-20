"use client";
import React, { useContext, useState } from "react";

type BillingProviderProps = {
  credits: string;
  tier: string;
  setCredits: React.Dispatch<React.SetStateAction<string>>;
  setTier: React.Dispatch<React.SetStateAction<string>>;
};

const initialValues: BillingProviderProps = {
  credits: "",
  setCredits: () => undefined,
  tier: "",
  setTier: () => undefined,
};

const context = React.createContext(initialValues);

export const BillingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [credits, setCredits] = useState(initialValues.credits);
  const [tier, setTier] = useState(initialValues.tier);

  const values = {
    credits,
    tier,
    setCredits,
    setTier,
  };

  return <context.Provider value={values}>{children}</context.Provider>;
};

export const useBilling = () => {
  const state = useContext(context);

  if (!state) {
    throw new Error("Must be used in the billing page");
  }

  return state;
};
