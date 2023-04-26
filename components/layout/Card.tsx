import Image from 'next/image';

interface Props {
	icon: string;
	title: string;
	description: string;
	href: string;
}

const Card = (props: Props) => {
	return (
		<div className='w-full max-w-xl block max-h-screen-md rounded-[18px] border border-gray-800 bg-black p-4 shadow-xl sm:p-6 lg:p-8'>
			<Image
				src={props.icon}
				alt={`${props.title} Icon`}
				width={100}
				height={100}
			/>
			<a href={props.href}>
				<h3 className='mt-3 text-lg font-bold text-white sm:text-xl hover:underline'>
					{props.title}
				</h3>
			</a>
			<p className='mt-4 text-sm text-gray-300'>{props.description}</p>
		</div>
	);
};

export default Card;
