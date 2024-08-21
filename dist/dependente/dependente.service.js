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
exports.DependenteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dependente_entity_1 = require("./dependente.entity");
const typeorm_2 = require("typeorm");
const dependente_dto_1 = require("./dependente.dto");
const colaborador_entity_1 = require("../colaborador/colaborador.entity");
let DependenteService = class DependenteService {
    constructor(dependenteRepository, colaboradorRepository) {
        this.dependenteRepository = dependenteRepository;
        this.colaboradorRepository = colaboradorRepository;
    }
    async criaDependente(dependente) {
        return await this.dependenteRepository.save(dependente);
    }
    async listaDependente(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const dependentesSalvos = await this.dependenteRepository.find({
            relations: ['colaborador_id'],
            skip,
            take: limit,
        });
        const dependentesLista = await Promise.all(dependentesSalvos.map(async (dependente) => {
            const colaborador = await this.colaboradorRepository.findOne({
                where: { id: dependente.colaborador_id.id },
            });
            return new dependente_dto_1.DependenteReturn(dependente.nome, dependente.id, dependente.parentesco, dependente.data_nascimento, colaborador ? colaborador.nome : null);
        }));
        return dependentesLista;
    }
    async atualizaDependente(id, dependenteEntity) {
        await this.dependenteRepository.update(id, dependenteEntity);
        const dependenteAtualizado = await this.dependenteRepository.findOneOrFail({
            where: { id },
            relations: ['colaborador_id'],
        });
        const colaborador = await this.colaboradorRepository.findOne({
            where: { id: dependenteAtualizado.colaborador_id.id },
        });
        return new dependente_dto_1.DependenteReturn(dependenteAtualizado.nome, dependenteAtualizado.id, dependenteAtualizado.parentesco, dependenteAtualizado.data_nascimento, colaborador ? colaborador.nome : null);
    }
    async deletaDependente(id) {
        await this.dependenteRepository.delete(id);
    }
    async listaDependenteById(id) {
        const dependente = await this.dependenteRepository.findOne({
            where: { id },
            relations: ['colaborador_id'],
        });
        if (!dependente) {
            throw new Error('Dependente não encontrado.');
        }
        return Object.assign(Object.assign({}, dependente), { colaborador: dependente.colaborador_id
                ? dependente.colaborador_id.nome
                : null });
    }
};
DependenteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dependente_entity_1.DependenteEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(colaborador_entity_1.ColaboradorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DependenteService);
exports.DependenteService = DependenteService;
//# sourceMappingURL=dependente.service.js.map