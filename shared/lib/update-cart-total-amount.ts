import { prisma } from '@/prisma/prisma-client';
import { calcCartItemTotalPrice } from '.';

export const updateCartTotalAmount = async (token: string) => {
	const userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
		include: {
			CartItems: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	});

	if (!userCart) {
		return;
	}

	const totalAmount = userCart.CartItems.reduce((acc, item) => {
		return acc + calcCartItemTotalPrice(item);
	}, 0);

	return await prisma.cart.update({
		where: {
			id: userCart.id,
		},
		data: {
			totalAmount,
		},
		include: {
			CartItems: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	});
};
