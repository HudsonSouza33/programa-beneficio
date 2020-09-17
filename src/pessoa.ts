/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract } from 'fabric-contract-api';

export class Pessoa extends Contract {

    public async criarPessoa(ctx: Context, id: string, pessoa: any){
        // validar os atributos da pessoa
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(pessoa)));
    }

    public async consultarPessoa(ctx: Context, id: string): Promise<string> {
        const pessoa = await ctx.stub.getState(id); 
        if (!pessoa || pessoa.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(JSON.parse(JSON.stringify(pessoa)));
        return JSON.parse(JSON.stringify(pessoa));
    }
}
