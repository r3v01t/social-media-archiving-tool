import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col items-end gap-5 bg-dark-tremor-brand-dark p-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-300">
          Social Media Archiving Tool
        </h1>

        <ConnectButton />
      </div>
      {children}
    </div>
  );
}
