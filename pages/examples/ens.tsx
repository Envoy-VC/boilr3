import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { useEnsAddress } from 'wagmi';
import { Toaster, toast } from 'react-hot-toast';
import { Navbar, HeadingComponent, CustomButton } from '@/components/layout';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const ENS = () => {
	const [name, setName] = useState<string>('');
	const [ensAddress, setEnsAddress] = useState<string>('');
	const ens = useEnsAddress({
		name: name,
		enabled: false,
		suspense: true,
		onSuccess(data) {
			setEnsAddress(String(data));
		},
	});

	const fetchENS = () => {
		if (!name) {
			toast.error('Please Enter ENS Name');
			return;
		}
		ens.refetch();
	};
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
						placeholder='vitalik.eth'
						required
						onChange={(e) => setName(e.target.value)}
						className={`w-full max-w-sm bg-[#202020] mt-12 rounded-xl border-2 border-gray-600 p-2 ps-4 text-white outline-none ${inter.className}`}
					/>
					<CustomButton type='blue' text='Fetch' handleClick={fetchENS} />
					{ensAddress && (
						<div
							className={`${inter.className} w-full max-w-3xl text-[16px] pt-8 leading-7 break-all`}
						>
							<b>Address</b>: {ensAddress}
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

export default ENS;
