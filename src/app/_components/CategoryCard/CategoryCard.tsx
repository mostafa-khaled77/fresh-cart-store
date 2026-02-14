import Link from "next/link";

interface CategoryCardProps {
  image: string;
  name: string;
  link: string;
}

export default function CategoryCard({ image, name, link }: CategoryCardProps) {
  return (
    <Link href={link} className="block w-full"> 
      <div className="relative w-full h-[350px] mx-auto cursor-pointer rounded-[30px] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group border border-white/10">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end pb-8 items-center">
          <h2 className="text-white text-xl font-extrabold text-center px-4 tracking-tight drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1">
            {name}
          </h2>
          <span className="text-yellow-400 text-sm font-bold mt-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Explore Now →
          </span>
        </div>
      </div>
    </Link>
  );
}