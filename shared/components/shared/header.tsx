'use client';

import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { CartButton, Container, SearchInput } from '@/shared/components';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
	hasSearch?: boolean;
	hasCart?: boolean;
	className?: string;
}

export const Header = ({ hasSearch = true, hasCart = true, className }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [openAuthModal, setOpenAuthModal] = useState(false);

	useEffect(() => {
		if (searchParams.has('paid')) {
			setTimeout(() => {
				toast.success('Заказ успешно оплачен!');
			}, 500);
			router.push('/');
		}
	}, [searchParams]);

	return (
		<header className={cn('border-b', className)}>
			<Container className={'flex items-center justify-between py-4'}>
				{/* Левая часть */}
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image src='/logo.png' alt='Logo' width={35} height={35} />
						<div>
							<h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
							<p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
						</div>
					</div>
				</Link>

				{hasSearch && (
					<div className='mx-10 flex-1'>
						<SearchInput />
					</div>
				)}

				{/* Правая часть */}
				<div className='flex items-center gap-3'>
					{hasCart && (
						<div>
							<CartButton />
						</div>
					)}
				</div>
			</Container>
		</header>
	);
};
