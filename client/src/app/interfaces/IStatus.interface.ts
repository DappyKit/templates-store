type Hex = string;

export interface IStatus {
        state: State;
        nonce: string;
        message?: string;
        signature?: Hex;
        fid?: number;
        username?: string;
        bio?: string;
        displayName?: string;
        pfpUrl?: string;
        custody?: Hex;
        verifications?: Hex[];
}

export type State = 'pending' | 'completed';

export enum StatusState {
    pending = 'pending',
    completed = 'completed'
}