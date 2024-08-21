import { ColaboradorEntity } from './colaborador.entity';
export declare class ColaboradorRepository {
    private colaboradores;
    salvar(colaborador: ColaboradorEntity): Promise<{
        status: number;
        message: string;
    }>;
    listar(): ColaboradorEntity[];
    listarById(id: string): ColaboradorEntity;
    existEmail(email: string): boolean;
    atualiza(id: string, dados: Partial<ColaboradorEntity>): Promise<ColaboradorEntity>;
    remove(id: string): Promise<ColaboradorEntity>;
}
