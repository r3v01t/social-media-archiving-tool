"use client";

import { createArchive } from "@/services/web3";
import { UploadDropzone } from "@/utils/uploadthing";
import ArchivedItemsTable from "./ArchivedItemsTable";
import { useState } from "react";

export default function UploadScreenshot() {
  const [reload, setReload] = useState(false);
  return (
    <main className="flex w-4/5 flex-col items-center justify-between px-2">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          createArchive(res[0].url, res[0].url);
          setReload(!reload);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
        }}
      />

      <ArchivedItemsTable reload={reload} />
    </main>
  );
}
