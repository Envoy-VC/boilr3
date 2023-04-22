import Image from 'next/image';
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Inter } from 'next/font/google';
import { Toaster, toast } from 'react-hot-toast';
import {
	useDisconnect,
	useAccount,
	useBalance,
	useSignMessage,
	useBlockNumber,
} from 'wagmi';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const { address } = useAccount();
	const balance = useBalance({
		address,
		formatUnits: 'ether',
		watch: true,
	});
	const message: string = `Welcome! Sign this message to confirm your address and start exploring our amazing decentralized application.\n\nAddress: ${address}`;
	const { signMessage } = useSignMessage({
		message,
		onSuccess(data) {
			console.log('Success', data);
			toast.success('Signature Verification successful');
		},
		onError(error) {
			console.log('Error', error);
			toast.error('Signature Verification failed');
		},
	});
	const { data, isError, isLoading } = useBlockNumber();
	const { disconnect } = useDisconnect();

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		>
			<Head>
				<title>boilr3: Next.js dApp Boilerplate</title>
			</Head>
			<Toaster position='bottom-left' reverseOrder={false} />
			<div className='z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex'>
				<p className='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
					Get started by editing&nbsp;
					<code className='font-mono font-bold'>pages/index.tsx</code>
				</p>
				<div className='bottom-0 left-0 flex items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black static h-auto w-auto lg:bg-none my-24 lg:my-0'>
					<ConnectButton />
				</div>
			</div>

			<div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
				<Image
					className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
					src='/boilr3.svg'
					alt='BOILR3 Logo'
					width={250}
					height={37}
					priority
				/>
			</div>
			<div>
				{address && (
					<p className='flex flex-col justify-center mt-4 text-sm text-left text-gray-500 dark:text-gray-400 leading-8'>
						<p className='left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:from-inherit static lg:w-auto  rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30 my-8 lg:my-0'>
							Address: {address}
							<br />
							Balance: {balance.data?.formatted} {balance.data?.symbol}
							<br />
							Block Number:{' '}
							{isLoading ? 'Loading...' : isError ? 'Error' : data}
						</p>
						<div className='flex flex-col lg:flex-row'>
							<button
								className={`min-w-[144px] text-lg text-white rounded-3xl font-semibold mx-auto px-4 py-2 mt-8 bg-[#3898FF] ${inter.className}`}
								onClick={() => signMessage()}
							>
								Sign Message
							</button>
							<button
								className={`min-w-[144px] text-lg text-white rounded-3xl font-semibold mx-auto px-4 py-2 mt-8 bg-[#ff3535] ${inter.className}`}
								onClick={() => disconnect()}
							>
								Disconnect
							</button>
						</div>
					</p>
				)}
			</div>

			<div className='mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left mt-24 lg:mt-0'>
				<a
					href='https://nextjs.org/'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Next.js{' '}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						Seamlessly integrate your decentralized application with Next.js, a
						popular React-based framework.
					</p>
				</a>

				<a
					href='https://www.rainbowkit.com/'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						RainbowKit{' '}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						A powerful and easy-to-use wallet authentication library for
						Ethereum-based dApps.
					</p>
				</a>

				<a
					href='https://tailwindcss.com/'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Tailwind CSS{' '}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						Effortlessly style your decentralized application with Tailwind CSS,
						a utility-first CSS framework.
					</p>
				</a>

				<a
					href='https://github.com/Envoy-VC/boilr3.git'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Boilerplate{' '}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						Get started quickly with our feature-rich boilerplate.
					</p>
				</a>
			</div>
		</main>
	);
}
