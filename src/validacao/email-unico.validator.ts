import {
  registerDecorator,
  validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ColaboradorEntity } from 'src/colaborador/colaborador.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(ColaboradorEntity)
    private readonly colaboradorRepository: Repository<ColaboradorEntity>,
  ) {}
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
 

    const colaborador = await this.colaboradorRepository.findOne({
      where: { email: value },
    });

    return !colaborador;
  }
}

export const EmailUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailUnicoValidator,
    });
  };
};
