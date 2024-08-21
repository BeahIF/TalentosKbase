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
exports.DependenteEntity = void 0;
const colaborador_entity_1 = require("../colaborador/colaborador.entity");
const typeorm_1 = require("typeorm");
let DependenteEntity = class DependenteEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DependenteEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome', length: 100, nullable: false }),
    __metadata("design:type", String)
], DependenteEntity.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cpf', length: 11, nullable: false }),
    __metadata("design:type", String)
], DependenteEntity.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_nascimento', length: 12, nullable: false }),
    __metadata("design:type", String)
], DependenteEntity.prototype, "data_nascimento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parentesco', length: 100, nullable: false }),
    __metadata("design:type", String)
], DependenteEntity.prototype, "parentesco", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => colaborador_entity_1.ColaboradorEntity, (colaboradorEntity) => colaboradorEntity.dependentes),
    (0, typeorm_1.JoinColumn)({ name: 'colaborador_id' }),
    __metadata("design:type", colaborador_entity_1.ColaboradorEntity)
], DependenteEntity.prototype, "colaborador_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", String)
], DependenteEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", String)
], DependenteEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", String)
], DependenteEntity.prototype, "deletedAt", void 0);
DependenteEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'beatriz_dependente' })
], DependenteEntity);
exports.DependenteEntity = DependenteEntity;
//# sourceMappingURL=dependente.entity.js.map