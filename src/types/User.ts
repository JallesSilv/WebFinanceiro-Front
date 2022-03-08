export type User = {
    id: string;
    name: string;
    cpf: string;
    email: string;
    password?: string;
    dtNascimento?: Date;
    dtCadastro?: Date;
    alimentacao: number;
    ValeTransporte: number;
    Inss: number;
    Salario: number;
    SeguroDeVida: number;
    Ativo: boolean;
}