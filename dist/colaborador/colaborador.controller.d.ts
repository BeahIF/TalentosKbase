import { CriaColaboradorDTO, ColaboradorDTO, EditaColaboradorDTO, CreateColaboradorResponse, UpdateColaboradorResponse, DeleteColaboradorResponse, GetDependentesResponse, ListaColaboradorResponse } from './colaborador.dto';
import { ColaboradorService } from './colaborador.service';
export declare class ColaboradorController {
    private colaboradorService;
    constructor(colaboradorService: ColaboradorService);
    criaColaborador(dados: CriaColaboradorDTO): Promise<CreateColaboradorResponse>;
    getColaborador(page?: number, limit?: number): Promise<ListaColaboradorResponse>;
    getColaboradorById(id: string): Promise<ColaboradorDTO>;
    atualizaUsuario(id: string, dados: EditaColaboradorDTO): Promise<UpdateColaboradorResponse>;
    removeColaborador(id: string): Promise<DeleteColaboradorResponse>;
    getDependentes(id: string, page?: number, limit?: number): Promise<GetDependentesResponse>;
}
