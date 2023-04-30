import {
	useAccount,
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
	useNetwork,
} from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { NFT_CONTRACT_ADDRESS } from '@/utils/config';

import { NextSeo } from 'next-seo';
import { Toaster, toast } from 'react-hot-toast';

import { Inter } from 'next/font/google';
import { Navbar, HeadingComponent } from '@/components/layout';

const inter = Inter({ subsets: ['latin'] });

function MintNFT() {
	const { chain } = useNetwork();
	const { address } = useAccount();

	const { config } = usePrepareContractWrite({
		// BOILR3 NFT CONTRACT EXAMPLE
		// https://testnets.opensea.io/collection/boilr3
		address: NFT_CONTRACT_ADDRESS,
		chainId: polygonMumbai.id,
		abi: [
			{
				inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
				name: 'safeMint',
				stateMutability: 'nonpayable',
				type: 'function',
			},
		],
		functionName: 'safeMint',
		args: [address ? address : '0x0'],
	});

	const contractWrite = useContractWrite({
		...config,
		onError() {
			toast.error('User denied transaction');
		},
	});

	const waitForTransaction = useWaitForTransaction({
		hash: contractWrite.data?.hash,
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
				<button
					className={`w-full max-w-[200px] text-lg text-white rounded-3xl font-semibold px-4 py-2 mt-8 ${inter.className} bg-[#3898FF]`}
					disabled={!contractWrite.writeAsync || waitForTransaction.isLoading}
					type='submit'
				>
					{waitForTransaction.isLoading
						? 'Minting...'
						: contractWrite.isLoading
						? 'Check your wallet'
						: 'Mint'}
				</button>

				{waitForTransaction.isSuccess && (
					<div
						className={`${inter.className} w-full max-w-3xl text-[16px] pt-8 leading-7 break-all`}
					>
						Successfully Minted NFT
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
						Error Minting NFT
						<div>{waitForTransaction.error?.message}</div>
					</div>
				)}
			</form>
		</div>
	);
}

export default function MintNFTExample() {
	const { isConnected } = useAccount();
	return (
		<div>
			<NextSeo title='Mint NFT' />
			<Toaster position='bottom-left' />
			<Navbar />
			<section className='max-w-7xl bg-black mx-auto my-24 px-12 xl:px-0 text-[#EDEEEE]'>
				<HeadingComponent
					title='Mint NFT'
					description={`This example shows how to  and mint a non-fungible token (NFT) using wagmi useContractWrite and usePrepareContractWrite Hooks. NFTs are unique digital assets that can represent things like artwork, collectibles, and other unique items. Connect to Polygon Mumbai to Mint a NFT. You can view the example collection on OpenSea at this link: https://testnets.opensea.io/collection/boilr3`}
				/>
				{isConnected ? (
					<MintNFT />
				) : (
					<div
						className={`${inter.className} w-full max-w-3xl text-[16px] pt-8 leading-7 break-all`}
					>
						<b>Connect Wallet to Mint NFT</b>
					</div>
				)}
			</section>
		</div>
	);
}
