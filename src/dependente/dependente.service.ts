import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DependenteEntity } from './dependente.entity';
import { Repository } from 'typeorm';
import { DependenteReturn, EditaDependenteDTO } from './dependente.dto';
import { ColaboradorEntity } from 'src/colaborador/colaborador.entity';

@Injectable()
export class DependenteService {
  constructor(
    @InjectRepository(DependenteEntity)
    private readonly dependenteRepository: Repository<DependenteEntity>,
    @InjectRepository(ColaboradorEntity)
    private readonly colaboradorRepository: Repository<ColaboradorEntity>,
  ) {}

  async criaDependente(dependente: DependenteEntity) {
    // console.log(await this.dependenteRepository.save(dependente))
    return await this.dependenteRepository.save(dependente);
  }

  async listaDependente() {
    const dependentesSalvos = await this.dependenteRepository.find({
      relations: ['colaborador_id'],
    });
    const dependentesLista = await Promise.all(
      dependentesSalvos.map(async (dependente) => {
        const colaborador = await this.colaboradorRepository.findOne({
          where: { id: dependente.colaborador_id.id },
        });

        return new DependenteReturn(
          dependente.nome,
          dependente.id,
          dependente.parentesco,
          dependente.data_nascimento,
          colaborador ? colaborador.nome : null,
        );
      }),
    );
    return dependentesLista;
  }

  async atualizaDependente(
    id: string,
    dependenteEntity: EditaDependenteDTO,
  ): Promise<DependenteReturn> {
    await this.dependenteRepository.update(id, dependenteEntity);
    const dependenteAtualizado = await this.dependenteRepository.findOneOrFail({
      where: { id },
      relations: ['colaborador_id'],
    });
    const colaborador = await this.colaboradorRepository.findOne({
      where: { id: dependenteAtualizado.colaborador_id.id },
    });
    return new DependenteReturn(
      dependenteAtualizado.nome,
      dependenteAtualizado.id,
      dependenteAtualizado.parentesco,
      dependenteAtualizado.data_nascimento,
      colaborador ? colaborador.nome : null,
    );
  }

  async deletaDependente(id: string) {
    await this.dependenteRepository.delete(id);
  }

  async listaDependenteById(id: string): Promise<DependenteReturn> {
    const dependente = await this.dependenteRepository.findOne({
      where: { id },
      relations: ['colaborador_id'],
    });

    if (!dependente) {
      throw new Error('Dependente não encontrado.');
    }

    return {
      ...dependente,
      colaborador: dependente.colaborador_id
        ? dependente.colaborador_id.nome
        : null,
    };
  }
}
