"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookAIcon, HeadphonesIcon } from "lucide-react";
import SearchBar from "./upper-info-search-bar";

export default function UpperInfoBar() {
  return (
    <header
      className="
        sticky top-0 z-50
        flex w-full items-center justify-between gap-3
        bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60
         px-5 py-3
      "
    >
      {/* Left section: Sidebar + Search */}
      <div className="flex items-center gap-3 min-w-0">
        <Separator orientation="vertical" className="h-6" />
        <div className="flex-1 min-w-[200px]">
          <SearchBar />
        </div>
      </div>

      {/* Right section: Actions */}
      <div className="flex items-center gap-3 flex-wrap justify-end">
        <Button
          className="
            flex items-center gap-2 rounded-lg font-medium
            text-primary border border-border/30
            hover:bg-muted/70 transition-colors
            cursor-not-allowed opacity-70
          "
          variant="ghost"
          disabled
        >
          <HeadphonesIcon className="w-4 h-4" />
          Support
        </Button>
        <Button
          className="
            flex items-center gap-2 rounded-lg font-medium
            text-primary border border-border/30
            hover:bg-muted/70 transition-colors
            cursor-not-allowed opacity-70
          "
          variant="ghost"
          disabled
        >
          <BookAIcon className="w-4 h-4" />
          Guide
        </Button>
      </div>
    </header>
  );
}
