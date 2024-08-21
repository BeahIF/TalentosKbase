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
exports.ColaboradorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const colaborador_entity_1 = require("./colaborador.entity");
const typeorm_2 = require("typeorm");
const colaborador_dto_1 = require("./colaborador.dto");
let ColaboradorService = class ColaboradorService {
    constructor(colaboradorRepository) {
        this.colaboradorRepository = colaboradorRepository;
    }
    async criaColaborador(colaborador) {
        return await this.colaboradorRepository.save(colaborador);
    }
    async listaColaborador(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const totalColaboradores = await this.colaboradorRepository.count();
        const totalPages = Math.ceil(totalColaboradores / limit);
        const colaboradoresSalvos = await this.colaboradorRepository.find({
            skip,
            take: limit,
        });
        const colaboradoresLista = colaboradoresSalvos.map((colaborador) => new colaborador_dto_1.ColaboradorDTO(colaborador.nome, colaborador.id, colaborador.email, colaborador.usuario, colaborador.data_nascimento, colaborador.data_admissao, colaborador.data_demissao, colaborador.motivo_demissao, colaborador.cpf));
        return { colaboradores: colaboradoresLista, totalPages };
    }
    async atualizaColaborador(id, colaboradorEntity) {
        await this.colaboradorRepository.update(id, colaboradorEntity);
        const colaboradorAtualizado = await this.colaboradorRepository.findOne({
            where: { id },
        });
        if (!colaboradorAtualizado) {
            throw new common_1.NotFoundException('Colaborador não encontrado');
        }
        return colaboradorAtualizado;
    }
    async deletaColaborador(id) {
        await this.colaboradorRepository.delete(id);
    }
    async listaColaboradorById(id) {
        return await this.colaboradorRepository.findOne({
            where: { id },
        });
    }
    async listaDependentes(id, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const colaborador = await this.colaboradorRepository.find({
            where: { id },
            relations: ['dependentes'],
            skip,
            take: limit,
        });
        if (!colaborador) {
            throw new common_1.NotFoundException('Colaborador não encontrado');
        }
        return colaborador;
    }
};
ColaboradorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(colaborador_entity_1.ColaboradorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ColaboradorService);
exports.ColaboradorService = ColaboradorService;
//# sourceMappingURL=colaborador.service.js.map