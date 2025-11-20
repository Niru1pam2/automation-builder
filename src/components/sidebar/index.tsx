"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { data } from "@/lib/constants";
import { Link2Icon } from "lucide-react";
import React, { useEffect } from "react";
import NavMenu from "./NavMenu";
import { UserButton, useUser } from "@clerk/nextjs";
import { useBilling } from "@/providers/billing-provider";
import { onPaymentDetails } from "../../../actions/payment-connections";

type Response = {
  credits: string | null;
  tier: string | null;
};

export default function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const { user } = useUser();
  const { credits, setCredits, setTier, tier } = useBilling();

  const onGetPayment = async () => {
    const response = await onPaymentDetails();
    if (response) {
      setTier(response.tier);
      setCredits(response.credits);
    }
  };

  useEffect(() => {
    onGetPayment();
  }, []);

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="max-w-[212px] bg-background-90"
    >
      <SidebarHeader className="pt-6 px-3 pb-0 flex justify-between">
        <div className="flex justify-between items-center">
          <div className="group-data-[collapsible=icon]:hidden">
            <SidebarMenuButton>
              <Link2Icon className="size-5" />
            </SidebarMenuButton>
          </div>
          <div>
            <SidebarTrigger className="size-5" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-10 gap-y-6">
        <NavMenu items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <UserButton />
          </div>
          <div className="group-data-[collapsible=icon]:hidden max-w-[212px] min-w-0">
            <p className="truncate">{user?.emailAddresses[0].emailAddress}</p>
            <p className="text-sm text-muted-foreground truncate">
              {user?.fullName}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
