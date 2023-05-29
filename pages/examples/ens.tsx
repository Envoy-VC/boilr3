import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { fetchEnsAddress, fetchEnsName } from '@wagmi/core';
import { Toaster, toast } from 'react-hot-toast';
import { Navbar, HeadingComponent, CustomButton } from '@/components/layout';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const ENS = () => {
	const [status, setStatus] = useState<'idle' | 'fetching'>('idle');
	const [input, setInput] = useState('');
	const [resolved, setResolved] = useState('');

	async function submit() {
		try {
			setStatus('fetching');
			if (input.endsWith('.eth')) {
				let resolvedENS = await fetchEnsAddress({
					name: input,
				});
				setResolved(String(resolvedENS));
			} else {
				let resolvedAddress = await fetchEnsName({
					address: input as `0x{string}`,
				});
				setResolved(String(resolvedAddress));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setStatus('idle');
		}
	}

	return (
		<div>
			<NextSeo title='Fetch ENS' />
			<Toaster position='bottom-left' toastOptions={{ duration: 5000 }} />
			<Navbar />
			<section className='max-w-7xl bg-black mx-auto my-24 px-12 xl:px-0 text-[#EDEEEE]'>
				<HeadingComponent
					title='Fetch ENS Names'
					description={`This example demonstrates how to use the Ethereum Name Service (ENS) to resolve human-readable names to Ethereum addresses. ENS is a decentralized domain name system that allows users to register and map domain names to Ethereum addresses.`}
				/>
				<div className='flex flex-col justify-start'>
					<input
						type='text'
						placeholder='vitalik.eth/0xAb5...C9B'
						required
						onChange={(e) => setInput(e.target.value)}
						className={`w-full max-w-sm bg-[#202020] mt-12 rounded-xl border-2 border-gray-600 p-2 ps-4 text-white outline-none ${inter.className}`}
					/>
					<CustomButton
						type={status === 'idle' ? 'blue' : 'grey'}
						text={status === 'idle' ? 'Fetch' : 'Fetching...'}
						handleClick={submit}
						disabled={status === 'fetching'}
					/>
					{resolved && (
						<div
							className={`${inter.className} w-full max-w-3xl text-[16px] pt-8 leading-7 break-all`}
						>
							<b>Resolved ENS/Address</b>: {resolved}
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

export default ENS;
