import { Product } from "@/interfaces/product.interface";

export default async function getSpecificProduct(id: string):Promise<Product> {
    let res = await fetch(`${process.env.BASE_URL}/products/${id}` ,{
        method: 'GET',
        next :{revalidate : 60}
    })
    let {data} = await res.json();
   return data; 
}