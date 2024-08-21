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
exports.ColaboradorDTO = exports.EditaColaboradorDTO = exports.CriaColaboradorDTO = void 0;
const class_validator_1 = require("class-validator");
const email_unico_validator_1 = require("../validacao/email-unico.validator");
const cpf_unico_validator_1 = require("../validacao/cpf-unico.validator");
class CriaColaboradorDTO {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'O nome não pode ser vazio' }),
    __metadata("design:type", String)
], CriaColaboradorDTO.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(undefined, { message: 'O email informado é inválido' }),
    (0, email_unico_validator_1.EmailUnico)({ message: 'Já existe um colaborador com este e-mail.' }),
    __metadata("design:type", String)
], CriaColaboradorDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CriaColaboradorDTO.prototype, "usuario", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O CPF deve conter 11 caracteres' }),
    (0, class_validator_1.MinLength)(11),
    (0, cpf_unico_validator_1.CPFUnico)({ message: 'Já existe um colaborador com este CPF.' }),
    __metadata("design:type", String)
], CriaColaboradorDTO.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CriaColaboradorDTO.prototype, "data_nascimento", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CriaColaboradorDTO.prototype, "data_admissao", void 0);
exports.CriaColaboradorDTO = CriaColaboradorDTO;
class EditaColaboradorDTO {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditaColaboradorDTO.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(undefined, { message: 'O email informado é inválido' }),
    (0, email_unico_validator_1.EmailUnico)({ message: 'Já existe um colaborador com este e-mail.' }),
    __metadata("design:type", String)
], EditaColaboradorDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EditaColaboradorDTO.prototype, "usuario", void 0);
__decorate([
    (0, class_validator_1.IsOptional)({ message: 'O CPF deve conter 11 caracteres' }),
    (0, class_validator_1.MinLength)(11),
    (0, cpf_unico_validator_1.CPFUnico)({ message: 'Já existe um colaborador com este CPF.' }),
    __metadata("design:type", String)
], EditaColaboradorDTO.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditaColaboradorDTO.prototype, "data_nascimento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditaColaboradorDTO.prototype, "data_admissao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditaColaboradorDTO.prototype, "data_demissao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditaColaboradorDTO.prototype, "motivo_demissao", void 0);
exports.EditaColaboradorDTO = EditaColaboradorDTO;
class ColaboradorDTO {
    constructor(nome, id, email, usuario, data_nascimento, data_admissao, data_demissao, motivo_demissao, cpf) {
        this.nome = nome;
        this.id = id;
        this.email = email;
        this.usuario = usuario;
        this.data_nascimento = data_nascimento;
        this.data_admissao = data_admissao;
        this.data_demissao = data_demissao;
        this.motivo_demissao = motivo_demissao;
        this.cpf = cpf;
    }
}
exports.ColaboradorDTO = ColaboradorDTO;
//# sourceMappingURL=colaborador.dto.js.map