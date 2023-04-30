import React, { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Toaster, toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import {
	useNetwork,
	useAccount,
	useBalance,
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
	erc20ABI,
} from 'wagmi';

import { Navbar, HeadingComponent } from '@/components/layout';
import { Inter } from 'next/font/google';
import { utils } from 'ethers';

const inter = Inter({ subsets: ['latin'] });

function SendTransaction() {
	const [tokenContract, setTokenContract] = useState('');
	const debouncedTokenContract = useDebounce(tokenContract, 500);

	const [to, setTo] = useState('');
	const debouncedTo = useDebounce(to, 500);

	const [amount, setAmount] = useState<string>('');
	const debouncedAmount = useDebounce(amount, 500);

	const { chain } = useNetwork();
	const { address } = useAccount();
	const balance = useBalance({
		address,
		token: debouncedTokenContract[0] as `0x{string}`,
	});

	const prepareContractWrite = usePrepareContractWrite({
		address: debouncedTokenContract[0] as `0x{string}`,
		abi: erc20ABI,
		chainId: chain?.id,
		functionName: 'transfer',
		args: [
			(debouncedTo[0] as `0x{string}`) ?? '0x0',
			debouncedAmount[0]
				? utils.parseEther(debouncedAmount[0])
				: utils.parseEther('0'),
		],
	});
	const contractWrite = useContractWrite({
		...prepareContractWrite.config,
		onError() {
			toast.error('User denied transaction');
		},
	});
	const waitForTransaction = useWaitForTransaction({
		hash: contractWrite.data?.hash,
		onSettled() {
			balance.refetch();
		},
	});

	return (
		<div className='flex flex-col justify-start'>
			<form
				className='flex flex-col justify-start'
				onSubmit={(e) => {
					e.preventDefault();
					contractWrite.writeAsync?.().then((res) => {
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
					placeholder='Token Address'
					value={tokenContract}
					required
					onChange={(e) => setTokenContract(e.target.value)}
					className={`w-full max-w-lg bg-[#202020] mt-12 rounded-xl border-2 border-gray-600 p-2 ps-4 text-white outline-none ${inter.className}`}
				/>
				<input
					type='text'
					placeholder='Recipient Address'
					value={to}
					required
					onChange={(e) => setTo(e.target.value)}
					className={`w-full max-w-lg bg-[#202020] mt-6 rounded-xl border-2 border-gray-600 p-2 ps-4 text-white outline-none ${inter.className}`}
				/>
				<input
					type='text'
					placeholder='Amount'
					value={amount}
					required
					onChange={(e) => setAmount(e.target.value)}
					className={`w-full max-w-[200px] bg-[#202020] mt-6 rounded-xl border-2 border-gray-600 p-2 ps-4 text-white outline-none ${inter.className}`}
				/>
				<button
					className={`w-full max-w-[200px] text-lg text-white rounded-3xl font-semibold px-4 py-2 mt-8 ${inter.className} bg-[#3898FF]`}
					disabled={
						!contractWrite.writeAsync ||
						waitForTransaction.isLoading ||
						!to ||
						!amount
					}
					type='submit'
				>
					{waitForTransaction.isLoading
						? 'Sending...'
						: contractWrite.isLoading
						? 'Check your wallet'
						: 'Send'}
				</button>

				<div
					className={`${inter.className} w-full max-w-3xl text-[16px] pt-8 leading-7 break-all`}
				>
					Your balance: {balance.data?.formatted} {balance.data?.symbol}
				</div>
				{waitForTransaction.isSuccess && (
					<div
						className={`${inter.className} w-full max-w-3xl text-[16px] pt-8 leading-7 break-all`}
					>
						Successfully sent {amount} {balance.data?.symbol} to {to}
						<div>
							View Transaction on{'  '}
							<a
								href={`${chain?.blockExplorers?.default.url}/tx/${contractWrite.data?.hash}`}
								target='_blank'
								rel='noopener noreferrer'
								className='hover:underline text-blue-500'
							>
								Etherscan
							</a>
						</div>
					</div>
				)}
				{waitForTransaction.isError && waitForTransaction.isIdle && (
					<div
						className={`${inter.className} w-full max-w-3xl text-[16px] pt-8 leading-7 break-all`}
					>
						Error sending {amount} {balance.data?.symbol} to {to}
						<div>{waitForTransaction.error?.message}</div>
					</div>
				)}
			</form>
		</div>
	);
}

const ERC20Example = () => {
	const { isConnected } = useAccount();
	return (
		<div>
			<NextSeo title='Send ERC-20' />
			<Toaster position='bottom-left' />
			<Navbar />
			<section className='max-w-7xl bg-black mx-auto my-24 px-12 xl:px-0 text-[#EDEEEE]'>
				<HeadingComponent
					title='Send ERC-20 Token'
					description={`This example shows how ou can send an ERC20 token from one Ethereum address to another. ERC20 is a standard for fungible tokens on the Ethereum network. The example includes a tutorial on how to interact with a deployed ERC20 token contract.`}
				/>
				{isConnected ? (
					<SendTransaction />
				) : (
					<div
						className={`${inter.className} w-full max-w-3xl text-[16px] pt-8 leading-7 break-all`}
					>
						<b>Connect Wallet to Transfer Tokens</b>
					</div>
				)}
			</section>
		</div>
	);
};

export default ERC20Example;
