/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract } from 'fabric-contract-api';

export class Programa extends Contract {

    public async criarBeneficio(ctx: Context, id: string, beneficio: any){
        // validar os atributos do beneficio
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(beneficio)));
    }

    public async consultarBeneficio(ctx: Context, id: string): Promise<string>{
        const beneficio = await ctx.stub.getState(id); // get the id from chaincode state
        if (!beneficio || beneficio.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(JSON.parse(JSON.stringify(beneficio)));
        return JSON.parse(JSON.stringify(beneficio));
    }

    public async inativarBeneficio(ctx: Context, id: string) {
        let beneficio = JSON.parse(await this.consultarBeneficio(ctx, id));
        beneficio.ativo = false;

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(beneficio)));
    }

    public async criarAtividade(ctx: Context, id: string, atividade: any){
        // validar os atributos da atividade
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(atividade)));
    }

    public async consultarAtividade(ctx: Context, id: string): Promise<string>{
        const atividade = await ctx.stub.getState(id); // get the id from chaincode state
        if (!atividade || atividade.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(JSON.parse(JSON.stringify(atividade)));
        return JSON.parse(JSON.stringify(atividade));
    }

    public async inativarAtividade(ctx: Context, id: string) {
        let atividade = JSON.parse(await this.consultarAtividade(ctx, id));
        atividade.ativo = false;

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(atividade)));
    }
}
