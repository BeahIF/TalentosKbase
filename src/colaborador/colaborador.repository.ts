import { NotFoundException } from '@nestjs/common';
import { ColaboradorEntity } from './colaborador.entity';

export class ColaboradorRepository {
  private colaboradores: ColaboradorEntity[] = [];
  async salvar(colaborador: ColaboradorEntity) {
    if (colaborador.nome.trim() !== colaborador.nome) {
      return {
        status: 400,
        message: 'O nome não pode conter espaços no começo ou no final.',
      };
    }
    if (colaborador.email.trim() !== colaborador.email) {
      return {
        status: 400,
        message: 'O e-mail não pode conter espaços no começo ou no final.',
      };
    }

    this.colaboradores.push(colaborador);
    //retornar o colaborador criado
  }

   listar() {
    return this.colaboradores;
  }

   listarById(id: string) {
    const colaborador = this.colaboradores.find((c) => c.id === id);
    if (!colaborador) {
      throw new NotFoundException('Colaborador não existe!');
    }
    return colaborador;
  }

   existEmail(email: string) {
    const colaborador = this.colaboradores.find((c) => c.email === email);
    return colaborador !== undefined;
  }

   existCPF(cpf: string) {
    return this.colaboradores.find((c) => c.cpf === cpf);
  }

  async atualiza(id: string, dados: Partial<ColaboradorEntity>) {
    const possivelColaborador = this.colaboradores.find(
      (colaboradorSalvo) => colaboradorSalvo.id === id,
    );
    if (!possivelColaborador) {
      throw new NotFoundException('Colaborador não existe!');
    }
    Object.entries(dados).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }
      possivelColaborador[chave] = valor;
    });
    return possivelColaborador;
  }

  async remove(id: string) {
    const possivelColaborador = this.listarById(id);
    this.colaboradores = this.colaboradores.filter(
      (colaboradorSalvo) => colaboradorSalvo.id !== id,
    );
    return possivelColaborador;
  }
}
