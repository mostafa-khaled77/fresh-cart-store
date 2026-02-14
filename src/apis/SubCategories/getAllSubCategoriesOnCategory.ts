import { SubCategory } from "@/interfaces/subcategory.interface";

export default async function GetAllSubCategoriesOnCategory(id:string):Promise<SubCategory[]>{
    let res = await fetch(`${process.env.BASE_URL}/categories/${id}/subcategories` , {
        method:"GET",
        next:{revalidate:60}
    });
    let {data} = await res.json();
    return data
}