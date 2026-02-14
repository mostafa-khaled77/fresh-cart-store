import { Product } from './../../interfaces/product.interface';

export async function getProductsBySubCategory(subid: string): Promise<Product[]> {
  let res = await fetch(
    `${process.env.BASE_URL}/products?subcategory[in]=${subid}`,
    {
      next: { revalidate: 60 },
      method: "GET",
    },
  );
  let { data } = await res.json();
  return data;
}