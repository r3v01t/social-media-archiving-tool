"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonZkEvmTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export default function RainbowkitProvider({
  children,
}: React.PropsWithChildren) {
  const { chains, publicClient } = configureChains(
    [polygonZkEvmTestnet],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "Web Archiver dApp",
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}
