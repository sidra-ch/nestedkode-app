import Image from "next/image";

interface Company {
    id: string;
    name: string;
    logo: string;
}

interface CompanyListProps {
    companies: Company[];
}

export default function CompanyList({ companies }: CompanyListProps) {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-right">
                شرکت‌های اتوبوسرانی
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                {companies.map((company) => (
                    <div
                        key={company.id}
                        className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow cursor-pointer aspect-square sm:aspect-auto sm:h-32"
                    >
                        <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3">
                            <Image
                                src={company.logo}
                                alt={company.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-gray-700 font-medium text-sm md:text-base text-center">
                            {company.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
