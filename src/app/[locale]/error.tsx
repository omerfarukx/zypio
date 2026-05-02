"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Uygulama hatası:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
            <div className="bg-red-500/10 p-4 rounded-full mb-6">
                <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
                Hay aksi! Bir şeyler ters gitti.
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                İşleminizi gerçekleştirirken beklenmedik bir hata oluştu. Lütfen sayfayı yenileyip tekrar deneyin.
            </p>
            <Button
                onClick={() => reset()}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-8 h-12"
            >
                <RefreshCcw className="w-5 h-5 mr-2" />
                Tekrar Dene
            </Button>
        </div>
    );
}