"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColaboradorModule = void 0;
const common_1 = require("@nestjs/common");
const colaborador_controller_1 = require("./colaborador.controller");
const email_unico_validator_1 = require("../validacao/email-unico.validator");
const typeorm_1 = require("@nestjs/typeorm");
const colaborador_entity_1 = require("./colaborador.entity");
const colaborador_service_1 = require("./colaborador.service");
let ColaboradorModule = class ColaboradorModule {
};
ColaboradorModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([colaborador_entity_1.ColaboradorEntity])],
        controllers: [colaborador_controller_1.ColaboradorController],
        providers: [colaborador_service_1.ColaboradorService, email_unico_validator_1.EmailUnicoValidator],
    })
], ColaboradorModule);
exports.ColaboradorModule = ColaboradorModule;
//# sourceMappingURL=colaborador.module.js.map