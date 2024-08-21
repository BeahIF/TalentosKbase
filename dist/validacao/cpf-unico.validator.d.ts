import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { DependenteEntity } from 'src/dependente/dependente.entity';
import { ColaboradorEntity } from 'src/colaborador/colaborador.entity';
import { Repository } from 'typeorm';
export declare class CPFUnicoValidator implements ValidatorConstraintInterface {
    private readonly dependenteRepository;
    private readonly colaboradorRepository;
    constructor(dependenteRepository: Repository<DependenteEntity>, colaboradorRepository: Repository<ColaboradorEntity>);
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean>;
}
export declare const CPFUnico: (opcoesDeValidacao: ValidationOptions) => (objeto: Object, propriedade: string) => void;
