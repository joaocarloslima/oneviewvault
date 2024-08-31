"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { alert } from "../util";
import { getFile } from "../action";

export default function DownloadPage() {
    const { id } = useParams();
    const router = useRouter();
    const [fileExists, setFileExists] = useState(false);

    useEffect(() => {
        getFile(id as string).then((data) => {
            if(data.success) {
                setFileExists(true);
            } else {
                alert("Erro", data.message);
                router.push("/");
            }
        });
    }, [id, router]);

    const handleDownload = () => {
        router.push("/");
    }

    if (!fileExists) {
        return null;
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-8">
            <div className="bg-teal-700 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-teal-50 mb-6">Download do Arquivo</h1>
                <p className="text-teal-100 mb-4">Ao baixar o arquivo, ele será apagado do servidor</p>
                <a
                    href={`http://localhost:8080/download/${id}`}
                    onClick={handleDownload}
                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >
                    Baixar Arquivo
                </a>
            </div>
        </main>
    );
}
