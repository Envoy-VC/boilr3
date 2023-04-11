import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => (
	<nav className='bg-white w-full px-4 md:px-12 py-6 max-w-screen-2xl mx-auto'>
		<div className='flex justify-between pt-4'>
			<span className='font-rubik text-3xl font-extrabold mask'>DAPP KIT</span>
			<div>
				<ConnectButton showBalance={false} chainStatus='none' />
			</div>
		</div>
	</nav>
);

export default Navbar;
