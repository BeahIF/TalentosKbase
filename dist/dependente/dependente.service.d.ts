import { DependenteEntity } from './dependente.entity';
import { Repository } from 'typeorm';
import { DependenteReturn, EditaDependenteDTO } from './dependente.dto';
import { ColaboradorEntity } from 'src/colaborador/colaborador.entity';
export declare class DependenteService {
    private readonly dependenteRepository;
    private readonly colaboradorRepository;
    constructor(dependenteRepository: Repository<DependenteEntity>, colaboradorRepository: Repository<ColaboradorEntity>);
    criaDependente(dependente: DependenteEntity): Promise<DependenteEntity>;
    listaDependente(page?: number, limit?: number): Promise<DependenteReturn[]>;
    atualizaDependente(id: string, dependenteEntity: EditaDependenteDTO): Promise<DependenteReturn>;
    deletaDependente(id: string): Promise<void>;
    listaDependenteById(id: string): Promise<DependenteReturn>;
}
