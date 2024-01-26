"use client";
import ArchivedItemsTable from "@/components/ArchivedItemsTable";
import UploadScreenshot from "@/components/UploadScreenshot";
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-around p-20">
      <UploadScreenshot />
    </main>
  );
}
