import { Brand } from "@/interfaces/brand.interface";

export default async function getAllBrands(): Promise<Brand[]> {
    const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

    try {
        let res = await fetch(`${API_URL}/brands`, {
            method: 'GET',
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            console.error(`Failed to fetch brands: ${res.status}`);
            return []; 
        }

        const responseData = await res.json();
        return responseData.data || [];
    } catch (error) {
        console.error("Error in getAllBrands:", error);
        return []; 
    }
}