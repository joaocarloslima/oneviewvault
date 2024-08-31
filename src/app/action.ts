"use server" 

export async function upload(formData: FormData) {
    const response = await fetch('http://localhost:8080/file', {
        method: 'POST',
        body: formData,
    })

    if(!response.ok) {
        return {
            success: false,
            message: response.statusText,
            id: 0
        }
    }
    
    const data = await response.json()
    return {
        success: true,
        message: "Arquivo enviado com sucesso",
        id: data.link
    }
}

export async function getFile(id: string) {
    const response = await fetch(`http://localhost:8080/${id}`);
    if(!response.ok) {
        return {
            success: false,
            message: response.statusText,
            id: 0
        }
    }
    const data = await response.json()
    return {
        success: true,
        message: "Arquivo encontrado",
        id: data.link
    }
}
