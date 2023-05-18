import '../styles/globals.css';
import Web3Provider from '@/providers/Web3';
import { SITE_NAME, SITE_DESCRIPTION } from '@/utils/config';

export const metadata = {
	title: SITE_NAME,
	description: SITE_DESCRIPTION,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<head>
				<meta charSet='utf-8' />
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/favicon/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon/favicon-16x16.png'
				/>
				<link rel='manifest' href='/favicon/site.webmanifest' />

				<meta
					name='robots'
					content='follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large'
				/>
			</head>
			<body>
				<Web3Provider>{children}</Web3Provider>
			</body>
		</html>
	);
}
