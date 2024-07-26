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
import {
  CriaColaboradorDTO,
  ColaboradorDTO,
  EditaColaboradorDTO,
} from './colaborador.dto';
import { ColaboradorEntity } from './colaborador.entity';
import { v4 as uuid } from 'uuid';
import { ColaboradorService } from './colaborador.service';

@Controller('/colaborador')
export class ColaboradorController {
  constructor(private colaboradorService: ColaboradorService) {}

  @Post()
  async criaColaborador(@Body() dados: CriaColaboradorDTO) {
    const colaboradorEntity = new ColaboradorEntity();
    colaboradorEntity.cpf = dados?.cpf;
    colaboradorEntity.data_admissao = dados?.data_admissao;
    colaboradorEntity.data_nascimento = dados?.data_admissao;
    colaboradorEntity.email = dados?.email;
    colaboradorEntity.id = uuid();
    colaboradorEntity.nome = dados?.nome;
    colaboradorEntity.usuario = dados?.usuario;
    colaboradorEntity.time = dados?.time

    this.colaboradorService.criaColaborador(colaboradorEntity);
    return {
      colaborador: new ColaboradorDTO(
        colaboradorEntity?.nome,
        colaboradorEntity?.id,
        colaboradorEntity?.email,
        colaboradorEntity?.usuario,
        colaboradorEntity?.data_nascimento,
        colaboradorEntity?.data_admissao,
        colaboradorEntity?.data_demissao,
        colaboradorEntity?.motivo_demissao,
        colaboradorEntity?.time
      ),
      message: 'Colaborador criado!',
    };
  }

  @Get()
  async getColaborador() {
    const colaboradoresSalvos =
      await this.colaboradorService.listaColaborador();

    return colaboradoresSalvos;
  }

  @Get('/:id')
  async getColaboradorById(@Param('id') id: string) {
    const colaborador = await this.colaboradorService.listaColaboradorById(id);
    const colaboradorReturn = new ColaboradorDTO(
      colaborador.id,
      colaborador.nome,
      colaborador.email,
      colaborador.usuario,
      colaborador.data_nascimento,
      colaborador.data_admissao,
      colaborador.data_demissao,
      colaborador.motivo_demissao,
      colaborador.time
    );

    return colaboradorReturn;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() dados: EditaColaboradorDTO,
  ) {
    console.log(dados)
    try {
      const colaboradorAtualizado =
        await this.colaboradorService.atualizaColaborador(id, dados);
      return {
        colaborador: colaboradorAtualizado,
        mensagem: 'Colaborador atualizado com sucesso!',
      };
    } catch (error) {
      console.log(error)
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Colaborador não encontrado',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Erro ao atualizar colaborador',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Regras que deverão ser revistar:

  // - Delete de Colaborador - Não pode deletar um colaborador se o mesmo tiver dependentes.
  @Delete('/:id')
  async removeColaborador(@Param('id') id: string) {
    try {
      const colaborador = await this.colaboradorService.deletaColaborador(id);
      return {
        colaborador: colaborador,
        messagem: 'Colaborador removido com sucesso!',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Colaborador não encontrado',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error:
            'Opa! Parece que esse colaborador possui dependentes, primeiro você precisa deletar os dependentes!',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
