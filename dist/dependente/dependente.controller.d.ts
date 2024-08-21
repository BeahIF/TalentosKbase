import { DependenteService } from './dependente.service';
import { AtualizaDependenteResponse, CriaDependenteDTO, CriaDependenteResponse, DependenteReturn, EditaDependenteDTO } from './dependente.dto';
export declare class DependenteController {
    private dependenteService;
    constructor(dependenteService: DependenteService);
    criaDependente(dados: CriaDependenteDTO): Promise<CriaDependenteResponse>;
    getDependente(page?: number, limit?: number): Promise<DependenteReturn[]>;
    getDependenteById(id: string): Promise<DependenteReturn>;
    atualizaDependente(id: string, dados: EditaDependenteDTO): Promise<AtualizaDependenteResponse>;
    removeDependente(id: string): Promise<{
        mensagem: string;
    }>;
}
