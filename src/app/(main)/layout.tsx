"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return <div className="flex  h-screen overflow-hidden">{children}</div>;
}
