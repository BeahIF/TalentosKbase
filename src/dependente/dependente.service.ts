import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DependenteEntity } from './dependente.entity';
import { Repository } from 'typeorm';
import { DependenteDTO } from './dependente.dto';

@Injectable()
export class DependenteService {
  constructor(
    @InjectRepository(DependenteEntity)
    private readonly dependenteRepository: Repository<DependenteEntity>,
  ) {}

  async criaDependente(dependente: DependenteEntity) {
    console.log("here")
    console.log(await this.dependenteRepository.save(dependente))
    return await this.dependenteRepository.save(dependente);
  }
  // async listaDependente() {
  //   const dependenteesSalvos = await this.dependenteRepository.find();
  //   const dependenteesLista = dependenteesSalvos.map(
  //     (dependente) =>
  //       new DependenteDTO(
  //         dependente.nome,
  //         dependente.id,
  //         dependente.email,
  //         dependente.usuario,
  //         dependente.data_nascimento,
  //         dependente.data_admissao,
  //         dependente.data_demissao,
  //         dependente.motivo_demissao,
  //       ),
  //   );
  //   return dependenteesLista;
  // }

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
