import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/peerlist_logo.jpeg"
      alt="peerList Logo"
      width={100}
      height={40}
      className={cn("w-11 rounded-lg", className)}
    />
  );
}
