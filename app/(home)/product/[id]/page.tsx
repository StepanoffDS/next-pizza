import { prisma } from '@/prisma/prisma-client';
import { Container, ProductForm } from '@/shared/components';
import { notFound } from 'next/navigation';

export default async function ProductPage({
	params: { id },
}: Readonly<{
	params: { id: string };
}>) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			Category: {
				include: {
					products: {
						include: {
							items: true,
						},
					},
				},
			},
			items: true,
		},
	});

	if (!product) {
		return notFound();
	}

	return (
		<Container className='flex flex-col my-10'>
			<ProductForm product={product} />
		</Container>
	);
}
