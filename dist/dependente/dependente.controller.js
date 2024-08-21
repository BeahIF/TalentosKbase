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
exports.DependenteController = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const dependente_service_1 = require("./dependente.service");
const dependente_dto_1 = require("./dependente.dto");
const dependente_entity_1 = require("./dependente.entity");
let DependenteController = class DependenteController {
    constructor(dependenteService) {
        this.dependenteService = dependenteService;
    }
    async criaDependente(dados) {
        const dependenteEntity = new dependente_entity_1.DependenteEntity();
        dependenteEntity.cpf = dados === null || dados === void 0 ? void 0 : dados.cpf;
        dependenteEntity.parentesco = dados === null || dados === void 0 ? void 0 : dados.parentesco;
        dependenteEntity.data_nascimento = dados === null || dados === void 0 ? void 0 : dados.data_nascimento;
        dependenteEntity.colaborador_id = dados === null || dados === void 0 ? void 0 : dados.colaborador_id;
        dependenteEntity.id = (0, uuid_1.v4)();
        dependenteEntity.nome = dados === null || dados === void 0 ? void 0 : dados.nome;
        const dependenteSalvo = await this.dependenteService.criaDependente(dependenteEntity);
        return {
            dependente: dependenteSalvo,
            message: 'Dependente criado!',
        };
    }
    async getDependente(page = 1, limit = 100) {
        const dependenteesSalvos = await this.dependenteService.listaDependente(page, limit);
        return dependenteesSalvos;
    }
    async getDependenteById(id) {
        return await this.dependenteService.listaDependenteById(id);
    }
    async atualizaDependente(id, dados) {
        try {
            const dependenteAtualizado = await this.dependenteService.atualizaDependente(id, dados);
            return {
                dependente: dependenteAtualizado,
                mensagem: 'Dependente atualizado com sucesso!',
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: 'Dependente não encontrado',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Erro ao atualizar dependente',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeDependente(id) {
        await this.dependenteService.deletaDependente(id);
        return {
            mensagem: 'Dependente removido com sucesso!',
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dependente_dto_1.CriaDependenteDTO]),
    __metadata("design:returntype", Promise)
], DependenteController.prototype, "criaDependente", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DependenteController.prototype, "getDependente", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DependenteController.prototype, "getDependenteById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dependente_dto_1.EditaDependenteDTO]),
    __metadata("design:returntype", Promise)
], DependenteController.prototype, "atualizaDependente", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DependenteController.prototype, "removeDependente", null);
DependenteController = __decorate([
    (0, common_1.Controller)('/dependente'),
    __metadata("design:paramtypes", [dependente_service_1.DependenteService])
], DependenteController);
exports.DependenteController = DependenteController;
//# sourceMappingURL=dependente.controller.js.map