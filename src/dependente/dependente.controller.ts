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
  Query,
} from '@nestjs/common';

import { v4 as uuid } from 'uuid';
import { DependenteService } from './dependente.service';
import {
  CriaDependenteDTO,
  DependenteDTO,
  DependenteReturn,
  EditaDependenteDTO,
} from './dependente.dto';
import { DependenteEntity } from './dependente.entity';

@Controller('/dependente')
export class DependenteController {
  constructor(private dependenteService: DependenteService) {}

  @Post()
  async criaDependente(@Body() dados: CriaDependenteDTO) {
    const dependenteEntity = new DependenteEntity();
    dependenteEntity.cpf = dados?.cpf;
    dependenteEntity.parentesco = dados?.parentesco;
    dependenteEntity.data_nascimento = dados?.data_nascimento;
    dependenteEntity.colaborador_id = dados?.colaborador_id;
    dependenteEntity.id = uuid();
    dependenteEntity.nome = dados?.nome;
    const dependenteSalvo = await this.dependenteService.criaDependente(
      dependenteEntity,
    );
    return {
      dependente: dependenteSalvo,
      message: 'Dependente criado!',
    };
  }

  @Get()
  async getDependente(@Query('page') page = 1, @Query('limit') limit = 100) {
    const dependenteesSalvos = await this.dependenteService.listaDependente(page, limit);

    return dependenteesSalvos;
  }

  @Get('/:id')
  async getDependenteById(@Param('id') id: string): Promise<DependenteReturn> {
    return await this.dependenteService.listaDependenteById(id);
  }

  @Put('/:id')
  async atualizaDependente(
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
