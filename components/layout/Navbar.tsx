import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
	return (
		<nav className='w-full bg-[#000000] border-b border-gray-800'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex flex-row justify-between items-center py-6 px-12 xl:px-0'>
					<div>
						<Image
							className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
							src='/boilr3.svg'
							alt='BOILR3 Logo'
							width={125}
							height={37}
							priority
						/>
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
