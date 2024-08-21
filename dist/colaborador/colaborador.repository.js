"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColaboradorRepository = void 0;
const common_1 = require("@nestjs/common");
class ColaboradorRepository {
    constructor() {
        this.colaboradores = [];
    }
    async salvar(colaborador) {
        if (colaborador.nome.trim() !== colaborador.nome) {
            return {
                status: 400,
                message: 'O nome não pode conter espaços no começo ou no final.',
            };
        }
        if (colaborador.email.trim() !== colaborador.email) {
            return {
                status: 400,
                message: 'O e-mail não pode conter espaços no começo ou no final.',
            };
        }
        this.colaboradores.push(colaborador);
    }
    listar() {
        return this.colaboradores;
    }
    listarById(id) {
        const colaborador = this.colaboradores.find((c) => c.id === id);
        if (!colaborador) {
            throw new common_1.NotFoundException('Colaborador não existe!');
        }
        return colaborador;
    }
    existEmail(email) {
        const colaborador = this.colaboradores.find((c) => c.email === email);
        return colaborador !== undefined;
    }
    async atualiza(id, dados) {
        const possivelColaborador = this.colaboradores.find((colaboradorSalvo) => colaboradorSalvo.id === id);
        if (!possivelColaborador) {
            throw new common_1.NotFoundException('Colaborador não existe!');
        }
        Object.entries(dados).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }
            possivelColaborador[chave] = valor;
        });
        return possivelColaborador;
    }
    async remove(id) {
        const possivelColaborador = this.listarById(id);
        this.colaboradores = this.colaboradores.filter((colaboradorSalvo) => colaboradorSalvo.id !== id);
        return possivelColaborador;
    }
}
exports.ColaboradorRepository = ColaboradorRepository;
//# sourceMappingURL=colaborador.repository.js.map