import { Context, Contract } from 'fabric-contract-api';
export declare class Programa extends Contract {
    criarBeneficio(ctx: Context, id: string, beneficio: any): Promise<void>;
    consultarBeneficio(ctx: Context, id: string): Promise<string>;
    inativarBeneficio(ctx: Context, id: string): Promise<void>;
}
