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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizaDependenteResponse = exports.CriaDependenteResponse = exports.DependenteReturn = exports.DependenteDTO = exports.EditaDependenteDTO = exports.CriaDependenteDTO = void 0;
const class_validator_1 = require("class-validator");
const cpf_unico_validator_1 = require("../validacao/cpf-unico.validator");
const colaborador_entity_1 = require("../colaborador/colaborador.entity");
class CriaDependenteDTO {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'O nome não pode ser vazio' }),
    __metadata("design:type", String)
], CriaDependenteDTO.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O CPF deve conter 11 caracteres' }),
    (0, class_validator_1.MinLength)(11),
    (0, cpf_unico_validator_1.CPFUnico)({ message: 'Já existe um dependente com este CPF.' }),
    __metadata("design:type", String)
], CriaDependenteDTO.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CriaDependenteDTO.prototype, "data_nascimento", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CriaDependenteDTO.prototype, "parentesco", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", colaborador_entity_1.ColaboradorEntity)
], CriaDependenteDTO.prototype, "colaborador_id", void 0);
exports.CriaDependenteDTO = CriaDependenteDTO;
class EditaDependenteDTO {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditaDependenteDTO.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)({ message: 'O CPF deve conter 11 caracteres' }),
    (0, class_validator_1.MinLength)(11),
    (0, cpf_unico_validator_1.CPFUnico)({ message: 'Já existe um colaborador com este CPF.' }),
    __metadata("design:type", String)
], EditaDependenteDTO.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditaDependenteDTO.prototype, "data_nascimento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditaDependenteDTO.prototype, "parentesco", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", colaborador_entity_1.ColaboradorEntity)
], EditaDependenteDTO.prototype, "colaborador_id", void 0);
exports.EditaDependenteDTO = EditaDependenteDTO;
class DependenteDTO {
    constructor(nome, id, parentesco, data_nascimento, colaborador_id) {
        this.nome = nome;
        this.id = id;
        this.parentesco = parentesco;
        this.data_nascimento = data_nascimento;
        this.colaborador_id = colaborador_id;
    }
}
exports.DependenteDTO = DependenteDTO;
class DependenteReturn {
    constructor(nome, id, parentesco, data_nascimento, colaborador) {
        this.nome = nome;
        this.id = id;
        this.parentesco = parentesco;
        this.data_nascimento = data_nascimento;
        this.colaborador = colaborador;
    }
}
exports.DependenteReturn = DependenteReturn;
class CriaDependenteResponse {
}
exports.CriaDependenteResponse = CriaDependenteResponse;
class AtualizaDependenteResponse {
}
exports.AtualizaDependenteResponse = AtualizaDependenteResponse;
//# sourceMappingURL=dependente.dto.js.map