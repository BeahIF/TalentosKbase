import {
  registerDecorator,
  validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DependenteEntity } from 'src/dependente/dependente.entity';
import { ColaboradorEntity } from 'src/colaborador/colaborador.entity';
import { Repository } from 'typeorm';

@Injectable()
@ValidatorConstraint({ async: true })
export class CPFUnicoValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(DependenteEntity)
    private readonly dependenteRepository: Repository<DependenteEntity>,
    @InjectRepository(ColaboradorEntity)
    private readonly colaboradorRepository: Repository<ColaboradorEntity>,
  ) {}
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    
    const dependente = await this.dependenteRepository.findOne({
      where: { cpf: value },
    });
    const colaborador = await this.colaboradorRepository.findOne({
      where: { cpf: value },
    });
 

    return !dependente || !colaborador;
    }
}

export const CPFUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: CPFUnicoValidator,
    });
  };
};
