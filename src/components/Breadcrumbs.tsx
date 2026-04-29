import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

export function Breadcrumbs({
    items
}: {
    items: { name: string; url: string }[]
}) {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors flex items-center">
                <Home className="w-4 h-4" />
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                    <Link
                        href={item.url}
                        className={`transition-colors ${index === items.length - 1
                                ? "text-gray-300 font-medium pointer-events-none"
                                : "hover:text-white"
                            }`}
                        aria-current={index === items.length - 1 ? "page" : undefined}
                    >
                        {item.name}
                    </Link>
                </div>
            ))}
        </nav>
    )
}
