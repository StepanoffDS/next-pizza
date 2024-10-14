import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

interface Props {
	src: string;
	className?: string;
	alt: string;
}

export const CartItemDetailsImage = ({ src, className, alt }: Props) => {
	return (
		<Image
			className={cn('w-[60px] h-[60px]', className)}
			src={src}
			alt={alt}
			width={60}
			height={60}
		/>
	);
};
