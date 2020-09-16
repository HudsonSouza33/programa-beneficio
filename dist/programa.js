"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Programa = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
class Programa extends fabric_contract_api_1.Contract {
    async criarBeneficio(ctx, id, beneficio) {
        // validar os atributos do beneficio
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(beneficio)));
    }
    async consultarBeneficio(ctx, id) {
        const beneficio = await ctx.stub.getState(id); // get the id from chaincode state
        if (!beneficio || beneficio.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(JSON.parse(JSON.stringify(beneficio)));
        return JSON.parse(JSON.stringify(beneficio));
    }
    async inativarBeneficio(ctx, id) {
        /* let beneficio = await ctx.stub.getState(id); // get the id from chaincode state
        if (!beneficio || beneficio.length === 0) {
            throw new Error(`${id} does not exist`);
        } */
        let beneficio_aux = JSON.parse(await this.consultarBeneficio(ctx, id));
        beneficio_aux.ativo = false;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(beneficio_aux)));
    }
}
exports.Programa = Programa;
//# sourceMappingURL=programa.js.map