import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				{/* Character Set */}
				<meta charSet='utf-8' />

				{/* Description */}
				<meta
					name='description'
					content='Accelerate your dApp development using boilr3, a feature-rich Next.js boilerplate with RainbowKit, Tailwind CSS, and WAGMI React Hooks.'
				/>

				{/* Favicon */}
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

				{/* Robots Search Indexing */}
				<meta
					name='robots'
					content='follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large'
				/>

				{/* Twitter Card data */}
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:site' content='@Envoy_1084' />
				<meta
					name='twitter:title'
					content='boilr3: The Ultimate Next.js dApp Boilerplate with RainbowKit, Tailwind CSS & WAGMI'
				/>
				<meta
					name='twitter:description'
					content='Introducing boilr3: a Next.js dApp boilerplate featuring RainbowKit wallet authentication, Tailwind CSS styling, and WAGMI React Hooks for Ethereum'
				/>
				<meta name='twitter:image:alt' content='boilr3' />
				<meta name='twitter:creator' content='@Envoy_1084' />
				<meta
					name='twitter:image'
					content='https://i.ibb.co/YcMcqK6/Twitter-Card.png'
				/>

				{/* Open Graph data */}
				<meta property='og:locale' content='en_US' />
				<meta
					property='og:title'
					content='boilr3: Build Scalable Decentralized Apps with Next.js, RainbowKit, Tailwind CSS & WAGMI'
				/>
				<meta property='og:url' content='http://boilr3.vercel.app' />
				<meta property='og:image' content='https://i.ibb.co/GRs4n32/OG.png' />
				<meta property='og:image:type' content='image/png' />
				<meta property='og:image:width' content='1200' />
				<meta property='og:image:height' content='630' />
				<meta name='og:image:alt' content='boilr3' />
				<meta property='og:type' content='website' />
				<meta
					property='og:description'
					content='Kickstart your dApp development with boilr3, a powerful Next.js boilerplate packed with RainbowKit wallet authentication, Tailwind CSS styling, and WAGMI React Hooks for Ethereum. Experience a solid foundation for your next decentralized app project.'
				/>
				<meta
					property='og:site_name'
					content='boilr3: Next.js dApp Boilerplate'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
