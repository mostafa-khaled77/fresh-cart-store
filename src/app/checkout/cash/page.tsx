import { getLoggedUserAddresses } from "@/app/_actions/address.actions";
import { getLoggedUserCart } from "@/app/_actions/cart.actions";
import CheckoutCashForm from "@/app/_components/PaymentsForm/CheckoutCashForm/CheckoutCashForm";

export const dynamic = 'force-dynamic';

export default async function CheckoutCash() {
    const [cartResponse , addressResponse] = await Promise.all([
        getLoggedUserCart(),
        getLoggedUserAddresses()
    ])

    return <CheckoutCashForm initialData={cartResponse} savedAddresses={addressResponse?.data || []} />;
}