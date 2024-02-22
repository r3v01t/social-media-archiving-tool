import React, { useState } from "react";
import { Button } from "@tremor/react";
import { imageFromBuffer, getImageData } from "@canvas/image";
import { bmvbhash } from "blockhash-core";
import { createArchiveByWallet } from "./services/web3.service";
import { Buffer } from "buffer";
window.Buffer = Buffer;

export default function Home() {
  const [file, setFile] = useState<File>();
  const [imageSrc, setImageSrc] = useState<string | undefined>();

  const calculatePHash = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      if (file.type !== "image/png") {
        // TODO: toasts
        alert("Invalid file type. Please select a PNG file.");
        return;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const imageData = await getImageData(await imageFromBuffer(buffer));
      const { width, height, data } = imageData!;
      const hexHash = bmvbhash({ width, height, data }, 8);

      createArchiveByWallet(hexHash, file.name);
    } catch (e: unknown) {
      console.error(e);
    }
  };

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-around">
      <div className="w-4/5">
        {" "}
        {/* Set width to 80% */}
        <form onSubmit={calculatePHash} className="flex flex-col">
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Upload file
          </label>
          <input
            className="block h-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            accept=".png"
            onChange={(e) => {
              setFile(e.target.files?.[0]);
              if (e.target.files) {
                setImageSrc(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          <p className="mb-3 mt-1 text-sm text-gray-500 dark:text-gray-300">
            PNG files only.
          </p>
          <Button type="submit">Archive</Button>
        </form>
        <div className="mx-auto mt-5 w-full max-w-2xl">
          {imageSrc && <img src={imageSrc} alt="imageSrc" className="h-auto" />}
        </div>
      </div>
    </main>
  );
}
