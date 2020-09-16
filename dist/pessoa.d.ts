import { Context, Contract } from 'fabric-contract-api';
export declare class Pessoa extends Contract {
    criarPessoa(ctx: Context, id: string, pessoa: any): Promise<void>;
    consultarPessoa(ctx: Context, id: string): Promise<string>;
}
