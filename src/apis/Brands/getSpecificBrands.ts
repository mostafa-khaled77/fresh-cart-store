import { Brand } from './../../interfaces/brand.interface';
import { Product } from './../../interfaces/product.interface';


export default async function getSpecificBrand(BrandId: string): Promise<Brand> {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/brands/${BrandId}`,
    {
      next: { revalidate: 60 },
      method: "GET",
    },
  );
  let { data } = await res.json();
  return data;
}

export async function getProductsByBrand(brandId: string): Promise<Product[]> {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products?brand=${brandId}`,
    {
      next: { revalidate: 60 },
      method: "GET",
    },
  );
  let { data } = await res.json();
  return data;
}
