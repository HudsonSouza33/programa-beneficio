"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoa = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
class Pessoa extends fabric_contract_api_1.Contract {
    async criarPessoa(ctx, id, pessoa) {
        // validar os atributos da pessoa
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(pessoa)));
    }
    async consultarPessoa(ctx, id) {
        const pessoa = await ctx.stub.getState(id); // get the id from chaincode state
        if (!pessoa || pessoa.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(JSON.parse(JSON.stringify(pessoa)));
        return JSON.parse(JSON.stringify(pessoa));
    }
}
exports.Pessoa = Pessoa;
//# sourceMappingURL=pessoa.js.map