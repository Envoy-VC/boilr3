import Image from 'next/image';
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/utils/config';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const origin =
		typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: SITE_URL;

	const links = [
		{
			title: 'Next.js',
			description:
				'Seamlessly integrate your decentralized application with Next.js, a popular React-based framework.',
			href: 'https://nextjs.org',
		},
		{
			title: 'RainbowKit',
			description: 'A powerful and easy-to-use wallet Ethereum-based dApps.',
			href: 'https://www.rainbowkit.com',
		},
		{
			title: 'WAGMI',
			description:
				'wagmi is a collection of React Hooks containing everything you need to start working with Ethereum.',
			href: 'https://wagmi.sh',
		},
		{
			title: 'Examples',
			description:
				'Start by exploring some pre-built examples to inspire your creativity!',
			href: `${origin}/examples`,
		},
	];
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		>
			<Head>
				<title>{SITE_NAME}</title>
				<meta name='description' content={SITE_DESCRIPTION} />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
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
			<div className='mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left mt-24 lg:mt-0'>
				{links.map((link, index) => (
					<Link
						key={index}
						href={link.href}
						className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
						rel='noopener noreferrer'
					>
						<h2 className={`mb-3 text-2xl font-semibold`}>
							{link.title}
							<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
								-&gt;
							</span>
						</h2>
						<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
							{link.description}
						</p>
					</Link>
				))}
			</div>
		</main>
	);
}
