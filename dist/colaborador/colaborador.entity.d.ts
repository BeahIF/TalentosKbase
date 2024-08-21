import { DependenteEntity } from '../dependente/dependente.entity';
export declare class ColaboradorEntity {
    id: string;
    nome: string;
    email: string;
    usuario: string;
    cpf: string;
    data_nascimento: string;
    data_admissao: string;
    data_demissao: string;
    motivo_demissao: string;
    dependentes: DependenteEntity[];
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}
