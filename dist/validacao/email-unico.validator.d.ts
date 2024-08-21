import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { Repository } from 'typeorm';
import { ColaboradorEntity } from 'src/colaborador/colaborador.entity';
export declare class EmailUnicoValidator implements ValidatorConstraintInterface {
    private readonly colaboradorRepository;
    constructor(colaboradorRepository: Repository<ColaboradorEntity>);
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean>;
}
export declare const EmailUnico: (opcoesDeValidacao: ValidationOptions) => (objeto: Object, propriedade: string) => void;
