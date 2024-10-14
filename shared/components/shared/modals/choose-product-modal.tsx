'use client';

import { Dialog, DialogContent } from '../../ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types';
import { ChoosePizzaForm, ChooseProductForm, ProductForm } from '..';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

interface Props {
	className?: string;
	product: ProductWithRelations;
}

export const ChooseProductModal = ({ product, className }: Props) => {
	const router = useRouter();

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={(open) => !open && router.back()}
		>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] bg-white overflow-hidden',
					className
				)}
			>
				<ProductForm product={product} onSubmit={() => router.back()} />
			</DialogContent>
		</Dialog>
	);
};
