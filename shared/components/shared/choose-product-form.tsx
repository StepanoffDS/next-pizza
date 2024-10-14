import { cn } from '@/shared/lib/utils';
import { Title } from '.';
import { Button } from '../ui';
import Image from 'next/image';

interface Props {
	imageUrl: string;
	name: string;
	loading?: boolean;
	onSubmit?: VoidFunction;
	className?: string;
	price: number;
}

export const ChooseProductForm = ({
	name,
	imageUrl,
	loading,
	onSubmit,
	className,
	price,
}: Props) => {
	const textDetails = 'Параметры для супер-пиццы';
	const totalPrice = 1000;

	return (
		<div className={cn('flex flex-1', className)}>
			<div className='flex items-center justify-center flex-1 relative w-full'>
				<Image
					src={imageUrl}
					alt={name}
					className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'
					width={350}
					height={350}
				/>
			</div>

			<div className='flex flex-col w-[490px] bg-[#f7f6f5] p-7'>
				<Title text={name} size='md' className='font-extrabold mb-1' />

				<Button
					loading={loading}
					onClick={() => onSubmit?.()}
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-auto'
				>
					Добавить в корзину за {price} ₽
				</Button>
			</div>
		</div>
	);
};
