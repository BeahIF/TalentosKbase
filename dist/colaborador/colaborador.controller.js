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
exports.ColaboradorController = void 0;
const common_1 = require("@nestjs/common");
const colaborador_dto_1 = require("./colaborador.dto");
const colaborador_entity_1 = require("./colaborador.entity");
const uuid_1 = require("uuid");
const colaborador_service_1 = require("./colaborador.service");
let ColaboradorController = class ColaboradorController {
    constructor(colaboradorService) {
        this.colaboradorService = colaboradorService;
    }
    async criaColaborador(dados) {
        const colaboradorEntity = new colaborador_entity_1.ColaboradorEntity();
        colaboradorEntity.cpf = dados === null || dados === void 0 ? void 0 : dados.cpf;
        colaboradorEntity.data_admissao = dados === null || dados === void 0 ? void 0 : dados.data_admissao;
        colaboradorEntity.data_nascimento = dados === null || dados === void 0 ? void 0 : dados.data_nascimento;
        colaboradorEntity.email = dados === null || dados === void 0 ? void 0 : dados.email;
        colaboradorEntity.id = (0, uuid_1.v4)();
        colaboradorEntity.nome = dados === null || dados === void 0 ? void 0 : dados.nome;
        colaboradorEntity.usuario = dados === null || dados === void 0 ? void 0 : dados.usuario;
        this.colaboradorService.criaColaborador(colaboradorEntity);
        return {
            colaborador: new colaborador_dto_1.ColaboradorDTO(colaboradorEntity === null || colaboradorEntity === void 0 ? void 0 : colaboradorEntity.nome, colaboradorEntity === null || colaboradorEntity === void 0 ? void 0 : colaboradorEntity.id, colaboradorEntity === null || colaboradorEntity === void 0 ? void 0 : colaboradorEntity.email, colaboradorEntity === null || colaboradorEntity === void 0 ? void 0 : colaboradorEntity.usuario, colaboradorEntity === null || colaboradorEntity === void 0 ? void 0 : colaboradorEntity.data_nascimento, colaboradorEntity === null || colaboradorEntity === void 0 ? void 0 : colaboradorEntity.data_admissao, colaboradorEntity === null || colaboradorEntity === void 0 ? void 0 : colaboradorEntity.data_demissao, colaboradorEntity === null || colaboradorEntity === void 0 ? void 0 : colaboradorEntity.motivo_demissao, colaboradorEntity.cpf),
            message: 'Colaborador criado!',
        };
    }
    async getColaborador(page = 1, limit = 100) {
        limit = limit > 100 ? 100 : limit;
        const colaboradoresSalvos = await this.colaboradorService.listaColaborador(page, limit);
        return colaboradoresSalvos;
    }
    async getColaboradorById(id) {
        const colaborador = await this.colaboradorService.listaColaboradorById(id);
        const colaboradorReturn = new colaborador_dto_1.ColaboradorDTO(colaborador.id, colaborador.nome, colaborador.email, colaborador.usuario, colaborador.data_nascimento, colaborador.data_admissao, colaborador.data_demissao, colaborador.motivo_demissao, colaborador.cpf);
        return colaboradorReturn;
    }
    async atualizaUsuario(id, dados) {
        try {
            const colaboradorAtualizado = await this.colaboradorService.atualizaColaborador(id, dados);
            return {
                colaborador: colaboradorAtualizado,
                mensagem: 'Colaborador atualizado com sucesso!',
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: 'Colaborador não encontrado',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Erro ao atualizar colaborador',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeColaborador(id) {
        try {
            await this.colaboradorService.deletaColaborador(id);
            return {
                mensagem: 'Colaborador removido com sucesso!',
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: 'Colaborador não encontrado',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Opa! Parece que esse colaborador possui dependentes, primeiro você precisa deletar os dependentes!',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDependentes(id, page = 1, limit = 100) {
        try {
            const dependentes = await this.colaboradorService.listaDependentes(id, page, limit);
            if (!dependentes) {
                throw new common_1.NotFoundException('Dependentes não encontrados');
            }
            const colaborador = dependentes[0];
            return Object.assign(Object.assign({}, colaborador), { mensagem: 'Dependentes encontrados com sucesso!' });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: 'Dependentes não encontrados',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Erro ao buscar dependentes',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [colaborador_dto_1.CriaColaboradorDTO]),
    __metadata("design:returntype", Promise)
], ColaboradorController.prototype, "criaColaborador", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ColaboradorController.prototype, "getColaborador", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ColaboradorController.prototype, "getColaboradorById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, colaborador_dto_1.EditaColaboradorDTO]),
    __metadata("design:returntype", Promise)
], ColaboradorController.prototype, "atualizaUsuario", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ColaboradorController.prototype, "removeColaborador", null);
__decorate([
    (0, common_1.Get)('/:id/dependentes'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ColaboradorController.prototype, "getDependentes", null);
ColaboradorController = __decorate([
    (0, common_1.Controller)('/colaborador'),
    __metadata("design:paramtypes", [colaborador_service_1.ColaboradorService])
], ColaboradorController);
exports.ColaboradorController = ColaboradorController;
//# sourceMappingURL=colaborador.controller.js.map