interface OrderItem {
    _id: string;
    product: {
        title: string;
        imageCover: string;
        id: string;
    };
    price: number;
    count: number;
}

export interface Order {
    _id: string;
    createdAt: string;
    totalOrderPrice: number;
    paymentMethodType: string;
    shippingAddress?: {
        city?: string;
        details?: string;
    };
    cartItems: OrderItem[];
    isPaid: boolean;
    isDelivered: boolean;
}