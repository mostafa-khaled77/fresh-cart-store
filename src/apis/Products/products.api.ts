import { Product } from "@/interfaces/product.interface";

export default async function getProducts():Promise<Product[]>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products` , {
    method : 'GET',
    next : {revalidate : 60}
  });
  let {data} = await res.json();
  return data;
}



