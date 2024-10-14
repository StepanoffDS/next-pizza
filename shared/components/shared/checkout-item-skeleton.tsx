import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
	className?: string;
}

export const CheckoutItemSkeleton = ({ className }: Props) => {
	return (
		<div className={cn('flex items-center justify-between', className)}>
			<div className='flex items-center gap-5 w-[50%]'>
				<div className='w-[50px] h-[50px] bg-gray-200 rounded-full animate-pulse flex-shrink-0' />
				<h2 className='w-full h-5 bg-gray-200 rounded animate-pulse' />
			</div>
			<div className='h-5 w-10 bg-gray-200 rounded animate-pulse' />
			<div className='h-8 w-[133px] bg-gray-200 rounded animate-pulse' />
		</div>
	);
};
