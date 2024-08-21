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
exports.ColaboradorEntity = void 0;
const dependente_entity_1 = require("../dependente/dependente.entity");
const typeorm_1 = require("typeorm");
let ColaboradorEntity = class ColaboradorEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ColaboradorEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome', length: 100, nullable: false }),
    __metadata("design:type", String)
], ColaboradorEntity.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', length: 70, nullable: false }),
    __metadata("design:type", String)
], ColaboradorEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario', length: 70, nullable: false }),
    __metadata("design:type", String)
], ColaboradorEntity.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cpf', length: 11, nullable: false }),
    __metadata("design:type", String)
], ColaboradorEntity.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_nascimento', length: 12, nullable: false }),
    __metadata("design:type", String)
], ColaboradorEntity.prototype, "data_nascimento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_admissao', length: 100, nullable: false }),
    __metadata("design:type", String)
], ColaboradorEntity.prototype, "data_admissao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_demissao', length: 100, nullable: true }),
    __metadata("design:type", String)
], ColaboradorEntity.prototype, "data_demissao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'motivo_demissao', length: 100, nullable: true }),
    __metadata("design:type", String)
], ColaboradorEntity.prototype, "motivo_demissao", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dependente_entity_1.DependenteEntity, (dependeteEntity) => dependeteEntity.colaborador_id),
    __metadata("design:type", Array)
], ColaboradorEntity.prototype, "dependentes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", String)
], ColaboradorEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", String)
], ColaboradorEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", String)
], ColaboradorEntity.prototype, "deletedAt", void 0);
ColaboradorEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'beatriz_colaborador' })
], ColaboradorEntity);
exports.ColaboradorEntity = ColaboradorEntity;
//# sourceMappingURL=colaborador.entity.js.map