import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-end gap-5 p-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-semibold">SMAT</h1>

        <ConnectButton />
      </div>
      {children}
    </div>
  );
}
