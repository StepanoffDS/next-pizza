'use client';

import { useCartStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/shared/lib/utils';
import { Button } from '../ui';
import { CartDrawer } from '.';
import { ArrowRight, ShoppingCart } from 'lucide-react';

interface Props {
	className?: string;
}

export const CartButton = ({ className }: Props) => {
	const [totalAmount, items, loading] = useCartStore(
		useShallow((state) => [state.totalAmount, state.items, state.loading])
	);

	return (
		<CartDrawer>
			<Button
				className={cn('group relative', { 'w-[105px]': loading }, className)}
				loading={loading}
			>
				<b>{totalAmount} ₽</b>
				<span className='h-full w-[1px] bg-white/30 mx-3' />
				<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
					<ShoppingCart size={16} className='relative' strokeWidth={2} />
					<b>{items.length}</b>
				</div>
				<ArrowRight
					size={20}
					className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
				/>
			</Button>
		</CartDrawer>
	);
};
