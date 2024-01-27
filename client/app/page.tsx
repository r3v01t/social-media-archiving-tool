"use client";
import React, { useState } from "react";
import { Button, Title, Subtitle } from "@tremor/react";
import { imageFromBuffer, getImageData } from "@canvas/image";
import { bmvbhash } from "blockhash-core";
import { createArchiveByWallet } from "@/services/web3";

export default function Home() {
  const [file, setFile] = useState<File>();
  const [hash, setHash] = useState("");

  const calculatePHash = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const imageData = await getImageData(await imageFromBuffer(buffer));
      let { width, height, data } = imageData!;
      const hexHash = bmvbhash({ width, height, data }, 8);
      setHash(hexHash);
      createArchiveByWallet(hexHash);
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-around p-20">
      <div>
        <form onSubmit={calculatePHash} className="flex flex-col">
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Upload file
          </label>
          <input
            className="block h-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <p
            className="mb-3 mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, or JPG.
          </p>
          <Button type="submit">Archive</Button>
        </form>

        {hash.length > 0 && (
          <div>
            <Title>Perceptual Hash</Title>
            <Subtitle>{hash}</Subtitle>
          </div>
        )}
      </div>
    </main>
  );
}
