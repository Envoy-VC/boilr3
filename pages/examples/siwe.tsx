import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import toast, { Toaster } from 'react-hot-toast';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';

import { Navbar, HeadingComponent, CustomButton } from '@/components/layout';
import { Inter } from 'next/font/google';

import { SITE_NAME } from '@/utils/config';

const inter = Inter({ subsets: ['latin'] });

const SIWE = () => {
	const [loggedInAddress, setLoggedInAddress] = useState<string>('');
	const { address } = useAccount();
	const { chain } = useNetwork();
	const { signMessageAsync } = useSignMessage();

	// Fetch User Account
	useEffect(() => {
		const handler = async () => {
			try {
				const res = await fetch('/api/siwe/me');
				const json = await res.json();
				if (json.address) {
					setLoggedInAddress(json.address);
				}
			} catch (_error) {}
		};

		// Firstly when page loads
		handler();

		// Again if user logs out of another tab
		window.addEventListener('focus', handler);
		return () => window.removeEventListener('focus', handler);
	}, []);

	const signIn = async () => {
		try {
			const chainId = chain?.id;
			if (!address || !chainId) {
				toast.error('Please connect your wallet');
				throw new Error('Please connect your wallet');
			}

			// Step 1: Get Random nonce
			const nonceRes = await fetch('/api/siwe/nonce');
			const nonce = await nonceRes.text();

			// Step 2: Create SIWE Message
			const message = new SiweMessage({
				domain: window.location.host,
				address,
				statement: `Sign in with Ethereum to ${SITE_NAME}.`,
				uri: window.location.origin,
				version: '1',
				chainId,
				nonce: nonce,
			});

			// Step 3: Sign Message
			const signature = await signMessageAsync({
				message: message.prepareMessage(),
			});

			// Step 4: Send Signature to Backend for Verification
			const verifyRes = await fetch('/api/siwe/verify', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message, signature }),
			});

			if (!verifyRes.ok) {
				toast.error('Error verifying message');
				throw new Error('Error verifying message');
			} else {
				toast.success('Successfully verified message');
				setLoggedInAddress(address);
			}
		} catch (error) {
			console.error(error);
			setLoggedInAddress('');
		}
	};

	const logout = async () => {
		await fetch('/api/siwe/logout');
		setLoggedInAddress('');
	};

	return (
		<div>
			<NextSeo title='SIWE' />
			<Toaster position='bottom-left' toastOptions={{ duration: 5000 }} />
			<Navbar />
			<section className='max-w-7xl bg-black mx-auto my-24 px-12 xl:px-0 text-[#EDEEEE]'>
				<HeadingComponent
					title='Sign-in with Ethereum'
					description={`Sign-In with Ethereum (SIWE) is a robust authentication standard (EIP-4361) that allows for secure communication between a frontend and backend. By leveraging Ethereum accounts, SIWE provides a powerful method for creating user sessions based on wallet connections, enabling seamless and secure access to blockchain-based applications. Additionally, SIWE offers a range of other benefits, including enhanced security, privacy, and decentralization. With SIWE, developers can build applications that prioritize user control and security, while also benefiting from the efficiency and convenience of a standardized authentication method.`}
				/>
				<div className='flex flex-col lg:flex-row gap-6 mx-auto'>
					<CustomButton text='Sign In' type='blue' handleClick={signIn} />

					{loggedInAddress && address && (
						<CustomButton text='Logout' type='red' handleClick={logout} />
					)}
				</div>
				{loggedInAddress && address && (
					<div
						className={`${inter.className} w-full max-w-3xl text-[16px] pt-8 leading-7 break-all`}
					>
						<b>Address</b>: {loggedInAddress}
					</div>
				)}
			</section>
		</div>
	);
};

export default SIWE;
