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
        const beneficio = await ctx.stub.getState(id); 
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
        const atividade = await ctx.stub.getState(id); 
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

    public async alterarStatusAtividade(ctx: Context, id: string, status: string) {
        let atividade = JSON.parse(await this.consultarAtividade(ctx, id));
        atividade.status = status;

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(atividade)));
    }

    
    public async consultarLedger(ctx: any, key: any) {

        let resultsIterator = await ctx.stub.getQueryResult(key);
        let results = await this.GetAllResults(resultsIterator, true);
        console.log('RESULTS consultarLedger ');

        return JSON.stringify(results);

    }

    async GetAllResults(iterator: any, isHistory: any) {
        let allResults = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                let jsonRes: any = {};
                console.log(res.value.value.toString('utf8'));
                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.tx_id;
                    jsonRes.Timestamp = res.value.timestamp;
                    try {
                        jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                        console.log('jsonRes.Value ', jsonRes.Value);

                    } catch (err) {
                        console.log(err);
                        jsonRes.Value = res.value.value.toString('utf8');
                    }
                } else {
                    jsonRes.Key = res.value.key;
                    console.log('jsonRes.Value  2dsfsdfsdd225454445', jsonRes.Value);
                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Record = res.value.value.toString('utf8');
                    }
                }
                allResults.push(jsonRes);
            }
            res = await iterator.next();
        }
        iterator.close();
        return allResults;
    }







}
