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
import {
  CriaColaboradorDTO,
  ColaboradorDTO,
  EditaColaboradorDTO,
  CreateColaboradorResponse,
  UpdateColaboradorResponse,
  DeleteColaboradorResponse,
  GetDependentesResponse,
  ListaColaboradorResponse,
} from './colaborador.dto';
import { ColaboradorEntity } from './colaborador.entity';
import { v4 as uuid } from 'uuid';
import { ColaboradorService } from './colaborador.service';

@Controller('/colaborador')
export class ColaboradorController {
  constructor(private colaboradorService: ColaboradorService) {}

  @Post()
  async criaColaborador(
    @Body() dados: CriaColaboradorDTO,
  ): Promise<CreateColaboradorResponse> {
    const colaboradorEntity = new ColaboradorEntity();
    colaboradorEntity.cpf = dados?.cpf;
    colaboradorEntity.data_admissao = dados?.data_admissao;
    colaboradorEntity.data_nascimento = dados?.data_nascimento;
    colaboradorEntity.email = dados?.email;
    colaboradorEntity.id = uuid();
    colaboradorEntity.nome = dados?.nome;
    colaboradorEntity.usuario = dados?.usuario;

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
        colaboradorEntity.cpf,
      ),
      message: 'Colaborador criado!',
    };
  }

  @Get()
  async getColaborador(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
  ): Promise<ListaColaboradorResponse> {
    limit = limit > 100 ? 100 : limit;
    const colaboradoresSalvos = await this.colaboradorService.listaColaborador(
      page,
      limit,
    );

    return colaboradoresSalvos;
  }

  @Get('/:id')
  async getColaboradorById(@Param('id') id: string): Promise<ColaboradorDTO> {
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
      colaborador.cpf,
    );

    return colaboradorReturn;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() dados: EditaColaboradorDTO,
  ): Promise<UpdateColaboradorResponse> {
    try {
      const colaboradorAtualizado =
        await this.colaboradorService.atualizaColaborador(id, dados);
      return {
        colaborador: colaboradorAtualizado,
        mensagem: 'Colaborador atualizado com sucesso!',
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
          error: 'Erro ao atualizar colaborador',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Regras que deverão ser revistar:

  // - Delete de Colaborador - Não pode deletar um colaborador se o mesmo tiver dependentes.
  @Delete('/:id')
  async removeColaborador(
    @Param('id') id: string,
  ): Promise<DeleteColaboradorResponse> {
    try {
      await this.colaboradorService.deletaColaborador(id);
      return {
        mensagem: 'Colaborador removido com sucesso!',
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

  @Get('/:id/dependentes')
  async getDependentes(
    @Param('id') id: string,
    @Query('page') page = 1,
    @Query('limit') limit = 100,
  ): Promise<GetDependentesResponse> {
    try {
      const dependentes = await this.colaboradorService.listaDependentes(
        id,
        page,
        limit,
      );
      if (!dependentes) {
        throw new NotFoundException('Dependentes não encontrados');
      }
      const colaborador = dependentes[0];

      return {
        ...colaborador,
        mensagem: 'Dependentes encontrados com sucesso!',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Dependentes não encontrados',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Erro ao buscar dependentes',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
