import { toast } from "sonner";

export function alert(titulo: string, mensagem: string) {
    toast(titulo, {
        description: mensagem,
        style: {
            background: '#000',
            color: '#ffffff',
            border: '1px solid #0f766e',
        },
        position: 'top-right'
    })
}
