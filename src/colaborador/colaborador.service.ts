import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColaboradorEntity } from './colaborador.entity';
import { Repository } from 'typeorm';
import { EditaColaboradorDTO, ColaboradorDTO } from './colaborador.dto';
import { DependenteEntity } from 'src/dependente/dependente.entity';

@Injectable()
export class ColaboradorService {
  constructor(
    @InjectRepository(ColaboradorEntity)
    private readonly colaboradorRepository: Repository<ColaboradorEntity>,
  ) {}

  async criaColaborador(colaborador: ColaboradorEntity) {
    await this.colaboradorRepository.save(colaborador);
  }
  async listaColaborador(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
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
          colaborador.time,
          colaborador.cpf,
        ),
    );
    return colaboradoresLista;
  }
  async atualizaColaborador(
    id: string,
    colaboradorEntity: EditaColaboradorDTO,
  ) {
    // Atualizar o colaborador
    await this.colaboradorRepository.update(id, colaboradorEntity);

    // Buscar o colaborador atualizado
    const colaboradorAtualizado = await this.colaboradorRepository.findOne({
      where: { id },
    });

    if (!colaboradorAtualizado) {
      throw new NotFoundException('Colaborador não encontrado');
    }

    return colaboradorAtualizado;
  }

  async deletaColaborador(id: string) {
    await this.colaboradorRepository.delete(id);
  }

  async listaColaboradorById(id: string) {
    return await this.colaboradorRepository.findOne({
      where: { id },
    });
  }

  async listaDependentes(id: string): Promise<ColaboradorEntity[]> {
    const colaborador = await this.colaboradorRepository.find({
      where: { id },
      relations: ['dependentes'],
    });
    if (!colaborador) {
      throw new NotFoundException('Colaborador não encontrado');
    }

    return colaborador
  }
}
