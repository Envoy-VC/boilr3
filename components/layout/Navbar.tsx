import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className='w-full border-b border-gray-800 bg-zinc-800/30 backdrop-blur-2xl bg-gradient-to-b from-zinc-200 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex flex-row justify-between items-center py-6 px-12 xl:px-0'>
					<div>
						<Link href='/' rel='noopener'>
							<Image
								className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
								src='/boilr3.svg'
								alt='BOILR3 Logo'
								width={125}
								height={37}
								priority
							/>
						</Link>
					</div>
					<div>
						<ConnectButton
							chainStatus='none'
							showBalance={false}
							accountStatus={{
								smallScreen: 'avatar',
								largeScreen: 'full',
							}}
						/>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
