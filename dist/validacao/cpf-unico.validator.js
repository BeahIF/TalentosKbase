"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPFUnico = exports.CPFUnicoValidator = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dependente_entity_1 = require("../dependente/dependente.entity");
const colaborador_entity_1 = require("../colaborador/colaborador.entity");
const typeorm_2 = require("typeorm");
let CPFUnicoValidator = class CPFUnicoValidator {
    constructor(dependenteRepository, colaboradorRepository) {
        this.dependenteRepository = dependenteRepository;
        this.colaboradorRepository = colaboradorRepository;
    }
    async validate(value, validationArguments) {
        const dependente = await this.dependenteRepository.findOne({
            where: { cpf: value },
        });
        const colaborador = await this.colaboradorRepository.findOne({
            where: { cpf: value },
        });
        return !dependente || !colaborador;
    }
};
CPFUnicoValidator = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    __param(0, (0, typeorm_1.InjectRepository)(dependente_entity_1.DependenteEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(colaborador_entity_1.ColaboradorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CPFUnicoValidator);
exports.CPFUnicoValidator = CPFUnicoValidator;
const CPFUnico = (opcoesDeValidacao) => {
    return (objeto, propriedade) => {
        (0, class_validator_1.registerDecorator)({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: CPFUnicoValidator,
        });
    };
};
exports.CPFUnico = CPFUnico;
//# sourceMappingURL=cpf-unico.validator.js.map