import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => (
	<nav class='bg-white border-gray-200 px-2 sm:px-4 py-4 dark:bg-gray-900'>
		<div class='container flex flex-wrap items-center justify-between mx-auto'>
			<span class='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
				dApp Kit
			</span>

			<div class='flex md:order-2'>
				<ConnectButton />
			</div>
		</div>
	</nav>
);

export default Navbar;
