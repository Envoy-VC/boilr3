import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

type btnType = 'blue' | 'red';

interface Props {
	text: string;
	type: btnType;
	className?: string;
	submit?: boolean;
	disabled?: boolean;
	handleClick: () => any;
}

const CustomButton = (props: Props) => {
	return (
		<button
			className={`w-full max-w-[200px] text-lg text-white rounded-3xl font-semibold px-4 py-2 mt-8 ${
				inter.className
			} ${props.type === 'blue' ? 'bg-[#3898FF]' : 'bg-[#ff3838]'} ${
				props.className
			}`}
			onClick={() => props.handleClick()}
			type={`${props.submit ? 'submit' : 'button'}`}
			disabled={props.disabled ? props.disabled : false}
		>
			{props.text}
		</button>
	);
};

export default CustomButton;
