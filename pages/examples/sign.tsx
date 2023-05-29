import React, { useState, useRef } from 'react';
import { NextSeo } from 'next-seo';
import { useAccount, useSignMessage } from 'wagmi';
import { recoverMessageAddress } from 'viem';
import toast, { Toaster } from 'react-hot-toast';

import { Navbar, HeadingComponent, CustomButton } from '@/components/layout';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Sign = () => {
	const { address } = useAccount();
	const recoveredAddress = React.useRef<string>('');

	const [message, setMessage] = useState<string>(
		`Sign in with your Ethereum account and let's HODL our way to web3 glory! 🎉 Remember, WAGMI! 🤝`
	);

	const { data, error, isLoading, signMessageAsync, variables } =
		useSignMessage({
			message,
			async onSuccess(data, variables) {
				const res = await recoverMessageAddress({
					message: variables?.message,
					signature: data,
				});
				recoveredAddress.current = res;
				if (recoveredAddress.current === address) {
					toast.success('Message verified successfully!');
				}
			},
			onError(error) {
				toast.error(error.message);
			},
		});

	const handleSubmit = async () => {
		signMessageAsync();
	};

	return (
		<div>
			<NextSeo title='Sign Message' />
			<Toaster position='bottom-left' toastOptions={{ duration: 5000 }} />
			<Navbar />
			<section className='max-w-7xl bg-black mx-auto my-24 px-12 xl:px-0 text-[#EDEEEE]'>
				<HeadingComponent
					title='Sign and verify message'
					description={`WAGMI hooks provide a streamlined approach to signing and verifying messages using Ethereum accounts. By integrating these hooks into your application, users can sign in with their Ethereum account, ensuring a secure and decentralized authentication process. To sign a message, the user's Ethereum address is used in conjunction with their private key. The hook generates a unique signature for the message, which can later be verified by ethers. This process ensures that the message's origin is authenticated, and the sender's identity is confirmed without exposing their private key.`}
				/>
				<div className='flex flex-col justify-start'>
					<textarea
						placeholder={message}
						onChange={(e) => setMessage(e.target.value)}
						className={`w-full max-w-2xl h-36 bg-[#202020] mt-12 rounded-xl border-2 border-gray-600 p-2 text-white outline-none ${inter.className}`}
					/>

					<CustomButton
						text={isLoading ? 'Check Wallet' : 'Sign Message'}
						type={isLoading ? 'grey' : 'blue'}
						handleClick={handleSubmit}
					/>
					{data && recoveredAddress.current !== '' && (
						<div
							className={`${inter.className} w-full max-w-3xl text-[16px] pt-8 leading-7 break-all`}
						>
							<b>Recovered Address</b>: {recoveredAddress.current}
							<br />
							<b>Signature</b>: {data}
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

export default Sign;
