import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColaboradorEntity } from './colaborador.entity';
import { Repository } from 'typeorm';
import {
  EditaColaboradorDTO,
  ColaboradorDTO,
  ListaColaboradorResponse,
} from './colaborador.dto';

@Injectable()
export class ColaboradorService {
  constructor(
    @InjectRepository(ColaboradorEntity)
    private readonly colaboradorRepository: Repository<ColaboradorEntity>,
  ) {}

  async criaColaborador(
    colaborador: ColaboradorEntity,
  ): Promise<ColaboradorEntity> {
    return await this.colaboradorRepository.save(colaborador);
  }
  async listaColaborador(
    page = 1,
    limit = 10,
  ): Promise<ListaColaboradorResponse> {
    const skip = (page - 1) * limit;
    const totalColaboradores = await this.colaboradorRepository.count();
    const totalPages = Math.ceil(totalColaboradores / limit);
    const colaboradoresSalvos = await this.colaboradorRepository.find({
      skip,
      take: limit,
    });
    const colaboradoresLista = colaboradoresSalvos.map(
      (colaborador) =>
        new ColaboradorDTO(
          colaborador.nome,
          colaborador.id,
          colaborador.email,
          colaborador.usuario,
          colaborador.data_nascimento,
          colaborador.data_admissao,
          colaborador.data_demissao,
          colaborador.motivo_demissao,
          colaborador.cpf,
        ),
    );
    return { colaboradores: colaboradoresLista, totalPages };
  }
  async atualizaColaborador(
    id: string,
    colaboradorEntity: EditaColaboradorDTO,
  ): Promise<ColaboradorEntity> {
    await this.colaboradorRepository.update(id, colaboradorEntity);
    const colaboradorAtualizado = await this.colaboradorRepository.findOne({
      where: { id },
    });

    if (!colaboradorAtualizado) {
      throw new NotFoundException('Colaborador não encontrado');
    }

    return colaboradorAtualizado;
  }

  async deletaColaborador(id: string): Promise<void> {
    await this.colaboradorRepository.delete(id);
  }

  async listaColaboradorById(id: string): Promise<ColaboradorEntity> {
    return await this.colaboradorRepository.findOne({
      where: { id },
    });
  }

  async listaDependentes(
    id: string,
    page = 1,
    limit = 10,
  ): Promise<ColaboradorEntity[]> {
    const skip = (page - 1) * limit;

    const colaborador = await this.colaboradorRepository.find({
      where: { id },
      relations: ['dependentes'],
      skip,
      take: limit,
    });
    if (!colaborador) {
      throw new NotFoundException('Colaborador não encontrado');
    }

    return colaborador;
  }
}
