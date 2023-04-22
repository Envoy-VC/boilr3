import {
	connectorsForWallets,
	RainbowKitProvider,
	lightTheme,
	darkTheme,
} from '@rainbow-me/rainbowkit';

import {
	injectedWallet,
	metaMaskWallet,
	trustWallet,
	walletConnectWallet,
	ledgerWallet,
	coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, sepolia, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const { chains, provider } = configureChains(
	[mainnet, polygon, sepolia, polygonMumbai],
	[publicProvider()]
);

const connectors = connectorsForWallets([
	{
		groupName: 'Recommended',
		wallets: [
			injectedWallet({ chains }),
			metaMaskWallet({ projectId, chains }),
			walletConnectWallet({ projectId, chains }),
		],
	},
	{
		groupName: 'Others',
		wallets: [
			trustWallet({ projectId, chains }),
			ledgerWallet({ projectId, chains }),
			coinbaseWallet({ chains, appName: 'DAPP KIT' }),
		],
	},
]);

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				chains={chains}
				theme={{
					lightMode: lightTheme({ overlayBlur: 'small' }),
					darkMode: darkTheme({ overlayBlur: 'small' }),
				}}
				appInfo={{
					appName: 'DAPP KIT',
					learnMoreUrl: 'https://github.com/Envoy-VC-dapp-kit',
				}}
			>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}
