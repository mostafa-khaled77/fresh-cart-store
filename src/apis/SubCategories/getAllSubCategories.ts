import { SubCategory } from './../../interfaces/subcategory.interface';


export default async function getAllSubCategories(categoryId?: string):Promise<SubCategory[]> {
    const baseUrl = `${process.env.BASE_URL}/subcategories`;
    const url = categoryId ? `${baseUrl}?category=${categoryId}` : baseUrl;

    let res = await fetch(url, {
        method: 'GET',
        next: { revalidate: 60 }
    });

    let { data } = await res.json();
    return data;
}