import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { EmailUnico } from '../validacao/email-unico.validator';
import { CPFUnico } from '../validacao/cpf-unico.validator';
import { ColaboradorEntity } from 'src/colaborador/colaborador.entity';

// RegrRegras a Considerar:

// - Não pode existir mais de um dependente com o mesmo CPF

// - O nome não pode conter espaçõs no começo e no final

// - Validar se o CPF -e um cpf válido

// - somente estrutural também, podemos contar a quantidade de dígitos (11)

export class CriaDependenteDTO {
  @IsString({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsString({ message: 'O CPF deve conter 11 caracteres' })
  @MinLength(11)
  @CPFUnico({ message: 'Já existe um colaborador com este CPF.' })
  cpf: string;

  @IsString()
  data_nascimento: string;

  @IsString()
  parentesco: string;

  @IsString()
  colaborador_id: ColaboradorEntity;
}

export class EditaDependenteDTO {
  @IsOptional()
  nome: string;

  @IsOptional()
  @IsEmail(undefined, { message: 'O email informado é inválido' })
  @EmailUnico({ message: 'Já existe um colaborador com este e-mail.' })
  email: string;

  @IsOptional()
  @IsNotEmpty()
  usuario: string;

  @IsOptional({ message: 'O CPF deve conter 11 caracteres' })
  @MinLength(11)
  @CPFUnico({ message: 'Já existe um colaborador com este CPF.' })
  cpf: string;

  @IsOptional()
  data_nascimento: string;

  @IsOptional()
  data_admissao: string;

  @IsOptional()
  data_demissao: string;

  @IsOptional()
  motivo_demissao: string;
}

export class DependenteDTO {
  constructor(
    readonly nome: string,
    readonly id: string,


    readonly parentesco: string,

    readonly data_nascimento: string,

    readonly colaborador_id: ColaboradorEntity,
  ) {}
}


export class DependenteReturn  {
  constructor(
    readonly nome: string,
    readonly id: string,


    readonly parentesco: string,

    readonly data_nascimento: string,

    readonly colaborador?: string,
  ) {}
}
