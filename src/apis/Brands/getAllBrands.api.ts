import { Brand } from "@/interfaces/brand.interface";

export default async function getAllBrands():Promise<Brand[]>{
    let res = await fetch(`${process.env.BASE_URL}/brands` ,{
        method: 'GET',
        next: {revalidate: 60}
    });
    let {data} = await res.json();
    return data;
}