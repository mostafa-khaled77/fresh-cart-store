import { Category } from "@/interfaces/category.interface";

export default async function GetAllCategories():Promise<Category[]> {
    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories` , {
        method : 'GET',
        next :{revalidate : 60}
    }
    );
    let { data } = await res.json();
    return data;
}

