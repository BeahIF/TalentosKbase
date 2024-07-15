import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DependenteRepository } from './dependente.repository';
import {
  CriaDependenteDTO,
  DependenteDTO,
  EditaDependenteDTO,
} from './dependente.dto';
import { DependenteEntity } from './dependente.entity';
import { v4 as uuid } from 'uuid';
import { DependenteService } from './dependente.service';

@Controller('/dependente')
export class DependenteController {
  constructor(
    private dependenteRepository: DependenteRepository,
    private dependenteService: DependenteService,
  ) {}

  @Post()
  async criaDependente(@Body() dados: CriaDependenteDTO) {
    const dependenteEntity = new DependenteEntity();
    dependenteEntity.cpf = dados?.cpf;
    dependenteEntity.data_admissao = dados?.data_admissao;
    dependenteEntity.data_nascimento = dados?.data_admissao;
    dependenteEntity.email = dados?.email;
    dependenteEntity.id = uuid();
    dependenteEntity.nome = dados?.nome;
    dependenteEntity.usuario = dados?.usuario;

    this.dependenteService.criaDependente(dependenteEntity);
    return {
      dependente: new DependenteDTO(
        dependenteEntity?.nome,
        dependenteEntity?.id,
        dependenteEntity?.email,
        dependenteEntity?.usuario,
        dependenteEntity?.data_nascimento,
        dependenteEntity?.data_admissao,
        dependenteEntity?.data_demissao,
        dependenteEntity?.motivo_demissao,
      ),
      message: 'Dependente criado!',
    };
  }

  @Get()
  async getDependente() {
    const dependenteesSalvos = await this.dependenteService.listaDependente();

    return dependenteesSalvos;
  }

  @Get('/:id')
  async getDependenteById(@Param('id') id: string) {
    const dependente = await this.dependenteService.listaDependenteById(id);
    const dependenteReturn = new DependenteDTO(
      dependente.id,
      dependente.nome,
      dependente.email,
      dependente.usuario,
      dependente.data_nascimento,
      dependente.data_admissao,
      dependente.data_demissao,
      dependente.motivo_demissao,
    );

    return dependenteReturn;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() dados: EditaDependenteDTO,
  ) {
    try {
      const dependenteAtualizado =
        await this.dependenteService.atualizaDependente(id, dados);
      return {
        dependente: dependenteAtualizado,
        mensagem: 'Dependente atualizado com sucesso!',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Dependente não encontrado',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Erro ao atualizar dependente',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  async removeDependente(@Param('id') id: string) {
    const dependente = await this.dependenteService.deletaDependente(id);
    return {
      dependente: dependente,
      messagem: 'Dependente removido com sucesso!',
    };
  }
}
