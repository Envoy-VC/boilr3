import React from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

interface Props {
	title: string;
	description: string;
}

const HeadingComponent = (props: Props) => {
	return (
		<div className='text-[#EDEEEE]'>
			<h2 className={`${inter.className} text-[36px] font-semibold`}>
				{props.title}
			</h2>
			<div className={`${inter.className} text-[18px] pt-8 leading-7`}>
				{props.description}
			</div>
		</div>
	);
};

export default HeadingComponent;
