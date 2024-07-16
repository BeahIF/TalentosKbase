import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DependenteEntity } from './dependente.entity';
import { Repository } from 'typeorm';
import { DependenteDTO, DependenteReturn } from './dependente.dto';
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
    console.log('here');
    // console.log(await this.dependenteRepository.save(dependente))
    return await this.dependenteRepository.save(dependente);
  }

  async listaDependente() {
    const dependentesSalvos = await this.dependenteRepository.find({
      relations: ['colaborador_id'],
    });
    console.log(dependentesSalvos);
    const dependentesLista = await Promise.all(
      dependentesSalvos.map(async (dependente) => {
        console.log(dependente);
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

  // async atualizaDependente(
  //   id: string,
  //   dependenteEntity: EditaDependenteDTO,
  // ) {
  //   await this.dependenteRepository.update(id, dependenteEntity);
  // }

  // async deletaDependente(id: string) {
  //   await this.dependenteRepository.delete(id);
  // }

  // async listaDependenteById(id: string) {
  //   return await this.dependenteRepository.findOne({
  //     where: { id },
  //   });
  // }
}
