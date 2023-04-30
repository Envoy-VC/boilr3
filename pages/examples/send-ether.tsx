import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Toaster, toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import {
	useNetwork,
	usePrepareSendTransaction,
	useSendTransaction,
	useWaitForTransaction,
} from 'wagmi';
import { utils } from 'ethers';

import { Navbar, HeadingComponent } from '@/components/layout';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function SendTransaction() {
	const [to, setTo] = useState('');
	const [debouncedTo] = useDebounce(to, 500);

	const [amount, setAmount] = useState('');
	const [debouncedAmount] = useDebounce(amount, 500);

	const { chain } = useNetwork();

	const { config } = usePrepareSendTransaction({
		request: {
			to: debouncedTo,
			value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
		},
	});

	const { data, sendTransactionAsync } = useSendTransaction({
		...config,
		onError() {
			toast.error('User Rejected Transaction');
		},
	});

	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	return (
		<div className='flex flex-col justify-start'>
			<form
				className='flex flex-col justify-start'
				onSubmit={(e) => {
					e.preventDefault();
					sendTransactionAsync?.().then((res) => {
						toast.promise(res.wait(), {
							loading: 'Waiting for confirmation',
							success: 'Transaction Successful',
							error: 'Transaction failed',
						});
					});
				}}
			>
				<input
					type='text'
					placeholder='0xA0Cf…251e'
					value={to}
					required
					onChange={(e) => setTo(e.target.value)}
					className={`w-full max-w-lg bg-[#202020] mt-12 rounded-xl border-2 border-gray-600 p-2 ps-4 text-white outline-none ${inter.className}`}
				/>
				<input
					type='text'
					placeholder='1 Ether'
					required
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					className={`w-full max-w-[200px] bg-[#202020] mt-12 rounded-xl border-2 border-gray-600 p-2 ps-4 text-white outline-none ${inter.className}`}
				/>
				<button
					className={`w-full max-w-[200px] text-lg text-white rounded-3xl font-semibold px-4 py-2 mt-8 ${inter.className} bg-[#3898FF]`}
					disabled={isLoading || !sendTransactionAsync || !to || !amount}
					type='submit'
				>
					Send
				</button>
			</form>
			{isSuccess && (
				<div
					className={`${inter.className} w-full max-w-3xl text-[16px] pt-8 leading-7 break-all`}
				>
					Successfully sent {amount} ether to {to}
					<div>
						View Transaction on{'  '}
						<a
							href={`${chain?.blockExplorers?.default.url}/tx/${data?.hash}`}
							target='_blank'
							rel='noopener noreferrer'
							className='hover:underline text-blue-500'
						>
							Etherscan
						</a>
					</div>
				</div>
			)}
		</div>
	);
}

const SendEtherExample = () => {
	return (
		<div>
			<NextSeo title='Send Ether' />
			<Toaster position='bottom-left' />
			<Navbar />
			<section className='max-w-7xl bg-black mx-auto my-24 px-12 xl:px-0 text-[#EDEEEE]'>
				<HeadingComponent
					title='Send Ether'
					description={`This example demonstrates how to send a transaction on the Ethereum network using the Wagmi library. It covers the use of the useSendTransaction and usePrepareSendTransaction hooks, which handle the process of sending the transaction and fetching required parameters such as the gas estimate and ENS resolution`}
				/>
				<SendTransaction />
			</section>
		</div>
	);
};

export default SendEtherExample;
