import { ColaboradorEntity } from './colaborador.entity';
export declare class CriaColaboradorDTO {
    nome: string;
    email: string;
    usuario: string;
    cpf: string;
    data_nascimento: string;
    data_admissao: string;
}
export declare class EditaColaboradorDTO {
    nome: string;
    email: string;
    usuario: string;
    cpf: string;
    data_nascimento: string;
    data_admissao: string;
    data_demissao: string;
    motivo_demissao: string;
}
export declare class ColaboradorDTO {
    readonly nome: string;
    readonly id: string;
    readonly email: string;
    readonly usuario: string;
    readonly data_nascimento: string;
    readonly data_admissao: string;
    readonly data_demissao: string;
    readonly motivo_demissao: string;
    readonly cpf: string;
    constructor(nome: string, id: string, email: string, usuario: string, data_nascimento: string, data_admissao: string, data_demissao: string, motivo_demissao: string, cpf: string);
}
export interface ListaColaboradorResponse {
    colaboradores: ColaboradorDTO[];
    totalPages: number;
}
export interface CreateColaboradorResponse {
    colaborador: ColaboradorDTO;
    message: string;
}
export interface UpdateColaboradorResponse {
    colaborador: ColaboradorEntity;
    mensagem: string;
}
export interface DeleteColaboradorResponse {
    mensagem: string;
}
export interface GetDependentesResponse extends ColaboradorEntity {
    mensagem: string;
}
