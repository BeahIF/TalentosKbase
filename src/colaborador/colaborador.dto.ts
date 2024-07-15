import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { EmailUnico } from '../validacao/email-unico.validator';
import { CPFUnico } from '../validacao/cpf-unico.validator';

  // Regras a Considerar:
  // - Não pode existir mais de um colaborador com o mesmo e-mail
  // - Não pode existir mais de um colaborador com o mesmo CPF
  // - O nome não pode conter espaçõs no começo e no final
  // - O e-mail não pode conter espaços no começo e no final
  // - Validar se o e-mail é um e-mail válido
  //   - Somente estrutural, ou sejan está no formato correto (xxxxxx@xxxxx.xxx.xx ou xxxxxx@xxxxx.xxx)
  // - Validar se o CPF -e um cpf válido
  //   - somente estrutural também, podemos contar a quantidade de dígitos (11)
export class CriaColaboradorDTO {
  @IsString({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'O email informado é inválido' })
  @EmailUnico({ message: 'Já existe um colaborador com este e-mail.' })
  email: string;

  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString({ message: 'O CPF deve conter 11 caracteres' })
  @MinLength(11)
  @CPFUnico({ message: 'Já existe um colaborador com este CPF.' })
  cpf: string;

  @IsString()
  data_nascimento: string;

  @IsString()
  data_admissao: string;
}





export class EditaColaboradorDTO {
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
  data_demissao:string
  
  @IsOptional()
  motivo_demissao:string
}



export class ColaboradorDTO {
    constructor(
      readonly nome: string,
      readonly id: string,
  
      readonly email: string,
  
      readonly usuario: string,
  
      readonly data_nascimento: string,
  
      readonly data_admissao: string,
      readonly data_demissao: string,
      readonly motivo_demissao: string,
    ) {}
  }

  

