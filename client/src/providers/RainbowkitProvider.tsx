import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { zkSyncSepoliaTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export default function RainbowkitProvider({
  children,
}: React.PropsWithChildren) {
  const { chains, publicClient } = configureChains(
    [zkSyncSepoliaTestnet],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "Web Archiver dApp",
    projectId: import.meta.env.VITE_PROJECT_ID as string,
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
