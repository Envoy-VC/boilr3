/* eslint-disable react/no-children-prop */
import '@rainbow-me/rainbowkit/styles.css';
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

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { ReactNode } from 'react';

import { ETH_CHAINS, WALLET_CONNECT_PROJECT_ID } from '@/utils/config';

interface Props {
	children: ReactNode;
}

const projectId = WALLET_CONNECT_PROJECT_ID;

const { chains, publicClient } = configureChains(ETH_CHAINS, [
	publicProvider(),
]);

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

const config = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

const Web3Provider = (props: Props) => {
	return (
		<WagmiConfig config={config}>
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
