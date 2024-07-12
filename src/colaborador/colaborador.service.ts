import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ColaboradorEntity } from "./colaborador.entity";
import { Repository } from "typeorm";
import { ListaColaboradorDTO } from "./colaborador.dto";

@Injectable()
export class ColaboradorService {
  constructor(
    @InjectRepository(ColaboradorEntity)
    private readonly colaboradorRepository: Repository<ColaboradorEntity>
  ) {}

  async criaColaborador(){
    await this.colaboradorRepository.save
  }
  async listaColaborador() {
    const colaboradoresSalvos = await this.colaboradorRepository.find();
    const colaboradoresLista = colaboradoresSalvos.map(
      (colaborador) =>
        new ListaColaboradorDTO(
          colaborador.nome,
          colaborador.id,
          colaborador.email,
          colaborador.usuario,
          colaborador.data_nascimento,
          colaborador.data_admissao,
          colaborador.data_demissao,
          colaborador.motivo_demissao
        )
    );
    return colaboradoresLista
  }
}
