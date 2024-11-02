"use client";
import React from "react";
import { Button } from "@/components/ui/moving-border";

export function Border() {
  return (
    <div>
      <Button
        borderRadius="50.75rem"
        className="bg-white dark:bg-slate-900 text-black"
        variant="secondary" 
        size="sm"
      >
        Sign In
      </Button>
    </div>
  );
}
