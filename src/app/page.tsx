"use client"

import { Vault, FileIcon, CopyIcon } from "lucide-react";
import { useState, useRef } from "react";
import { alert } from "./util";
import { upload } from "./action";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [id, setId] = useState(0);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(formData: FormData) {
    const response = await upload(formData)
    if (response.success) {
      setSuccess(response.success)
      setId(response.id)
    } else {
      alert("Erro", response.message)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-950">
      <nav className="w-full bg-teal-700 p-4">
        <h1 className="flex justify-between items-center text-3xl font-bold text-teal-50">
          One View Vault
          <Vault className="size-10" />
        </h1>
      </nav>

      <div className="flex-grow flex items-center justify-center p-8">
        <form action={handleUpload}>
          <div
            className={`flex flex-col items-center gap-3 border-2 border-dashed rounded-lg p-12 text-center transition-colors ${isDragging ? 'border-teal-500 bg-teal-900' : 'border-teal-300'}`}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                setSelectedFile(e.dataTransfer.files[0]);
                fileInputRef.current!.files = e.dataTransfer.files;
                e.currentTarget.closest('form')?.requestSubmit();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
          >
            {selectedFile ? (
              <div className="flex flex-col items-center">
                <FileIcon className="size-16 text-teal-500 mb-4" />
                <p className="text-lg text-teal-50">{selectedFile.name}</p>
              </div>
            ) : (
              <>
                <p className="text-lg mb-4 text-teal-50">
                  Arraste e solte um arquivo aqui
                </p>
                <p className="text-sm text-gray-500">ou</p>
              </>
            )}
            <Label htmlFor="fileInput" className="mt-4 inline-block bg-teal-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-teal-700 transition-colors">
              Selecionar Arquivo
            </Label>
            <Input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
              name="file"
              ref={fileInputRef}
            />
            <Button className="bg-teal-200 text-teal-900 ">Enviar</Button>
          </div>
        </form>
      </div>

      {success && (
        <div className="mt-8 p-4 bg-teal-100 border border-teal-400 rounded-md shadow-md flex items-center justify-between">
          <p className="text-teal-700">
            Link do arquivo: 
            <a href={`http://localhost:3000/${id}`} className="font-bold ml-2 text-teal-600 hover:underline">
              http://localhost:3000/{id}
            </a>
          </p>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(`http://localhost:3000/${id}`);
              alert("Sucesso", "Link copiado para a área de transferência");
            }}
            className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 transition-colors"
          >
            <CopyIcon className="size-5" />
          </Button>
        </div>
      )}
    </main>
  );
}
