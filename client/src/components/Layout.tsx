import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col items-end gap-5 bg-dark-tremor-background p-5">
      <div className="flex w-full items-end justify-between flex-col">
        <div>
          <ConnectButton
            showBalance={true}
            chainStatus="icon"
            label="Connect your wallet"
          />
        </div>
        <h1 className="text-3xl font-semibold text-gray-300 text-center w-full">
          Social Media Archiving Tool
        </h1>
      </div>
      {children}
    </div>
  );
}
