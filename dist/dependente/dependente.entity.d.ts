import { ColaboradorEntity } from '../colaborador/colaborador.entity';
export declare class DependenteEntity {
    id: string;
    nome: string;
    cpf: string;
    data_nascimento: string;
    parentesco: string;
    colaborador_id: ColaboradorEntity;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}
