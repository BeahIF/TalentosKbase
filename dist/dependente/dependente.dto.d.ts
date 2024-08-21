import { ColaboradorEntity } from 'src/colaborador/colaborador.entity';
import { DependenteEntity } from './dependente.entity';
export declare class CriaDependenteDTO {
    nome: string;
    cpf: string;
    data_nascimento: string;
    parentesco: string;
    colaborador_id: ColaboradorEntity;
}
export declare class EditaDependenteDTO {
    nome: string;
    cpf: string;
    data_nascimento: string;
    parentesco: string;
    colaborador_id: ColaboradorEntity;
}
export declare class DependenteDTO {
    readonly nome: string;
    readonly id: string;
    readonly parentesco: string;
    readonly data_nascimento: string;
    readonly colaborador_id: ColaboradorEntity;
    constructor(nome: string, id: string, parentesco: string, data_nascimento: string, colaborador_id: ColaboradorEntity);
}
export declare class DependenteReturn {
    readonly nome: string;
    readonly id: string;
    readonly parentesco: string;
    readonly data_nascimento: string;
    readonly colaborador?: string;
    constructor(nome: string, id: string, parentesco: string, data_nascimento: string, colaborador?: string);
}
export declare class CriaDependenteResponse {
    dependente: DependenteEntity;
    message: string;
}
export declare class AtualizaDependenteResponse {
    dependente: DependenteReturn;
    mensagem: string;
}
