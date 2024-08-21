"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependenteModule = void 0;
const common_1 = require("@nestjs/common");
const dependente_controller_1 = require("./dependente.controller");
const email_unico_validator_1 = require("../validacao/email-unico.validator");
const cpf_unico_validator_1 = require("../validacao/cpf-unico.validator");
const typeorm_1 = require("@nestjs/typeorm");
const dependente_entity_1 = require("./dependente.entity");
const dependente_service_1 = require("./dependente.service");
const colaborador_entity_1 = require("../colaborador/colaborador.entity");
let DependenteModule = class DependenteModule {
};
DependenteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([dependente_entity_1.DependenteEntity, colaborador_entity_1.ColaboradorEntity])],
        controllers: [dependente_controller_1.DependenteController],
        providers: [dependente_service_1.DependenteService, email_unico_validator_1.EmailUnicoValidator, cpf_unico_validator_1.CPFUnicoValidator],
    })
], DependenteModule);
exports.DependenteModule = DependenteModule;
//# sourceMappingURL=dependente.module.js.map