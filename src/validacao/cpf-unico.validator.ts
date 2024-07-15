import {
  registerDecorator,
  validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ColaboradorRepository } from '../colaborador/colaborador.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class CPFUnicoValidator implements ValidatorConstraintInterface {
  constructor(private colaboradorRepository: ColaboradorRepository) {}
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    return !this.colaboradorRepository.existCPF(
      value,
    );
    
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
