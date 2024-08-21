import { ColaboradorEntity } from './colaborador.entity';
import { Repository } from 'typeorm';
import { EditaColaboradorDTO, ListaColaboradorResponse } from './colaborador.dto';
export declare class ColaboradorService {
    private readonly colaboradorRepository;
    constructor(colaboradorRepository: Repository<ColaboradorEntity>);
    criaColaborador(colaborador: ColaboradorEntity): Promise<ColaboradorEntity>;
    listaColaborador(page?: number, limit?: number): Promise<ListaColaboradorResponse>;
    atualizaColaborador(id: string, colaboradorEntity: EditaColaboradorDTO): Promise<ColaboradorEntity>;
    deletaColaborador(id: string): Promise<void>;
    listaColaboradorById(id: string): Promise<ColaboradorEntity>;
    listaDependentes(id: string, page?: number, limit?: number): Promise<ColaboradorEntity[]>;
}
