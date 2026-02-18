import { getLoggedUserAddresses } from "@/app/_actions/address.actions";
import { getLoggedUserCart } from "@/app/_actions/cart.actions";
import CheckoutVisaForm from "@/app/_components/PaymentsForm/CheckoutVisaForm/CheckoutVisaForm";
export const dynamic = 'force-dynamic';

export default async function CheckoutVisa() {
    const [cartResponse , addressResponse] = await Promise.all([
            getLoggedUserCart(),
            getLoggedUserAddresses()
        ])

    return (
        <CheckoutVisaForm 
            initialData={cartResponse} 
            cartId={cartResponse?.data?._id || cartResponse?.cartId} 
            savedAddresses={addressResponse?.data || []}
        />
    );
}