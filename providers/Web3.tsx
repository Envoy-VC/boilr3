/* eslint-disable react/no-children-prop */
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
import { publicProvider } from 'wagmi/providers/public';

import { ReactNode } from 'react';

import { ETH_CHAINS, WALLET_CONNECT_PROJECT_ID } from '@/utils/config';
import '@rainbow-me/rainbowkit/styles.css';

interface Props {
	children: ReactNode;
}

const projectId = WALLET_CONNECT_PROJECT_ID;

const { chains, provider } = configureChains(ETH_CHAINS, [publicProvider()]);

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

const Web3Provider = (props: Props) => {
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
				children={props.children}
			></RainbowKitProvider>
		</WagmiConfig>
	);
};

export default Web3Provider;
