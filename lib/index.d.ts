export declare class Aws {
    private options;
    constructor(options?: IOptions);
    command(command: string, callback?: (err: any, data: any) => void): Promise<any>;
}
export interface IOptions {
    accessKey?: string;
    secretKey?: string;
    sessionToken?: string;
    currentWorkingDirectory?: string;
}
export declare class Options implements IOptions {
    accessKey?: string | undefined;
    secretKey?: string | undefined;
    sessionToken?: string | undefined;
    currentWorkingDirectory?: string | undefined;
    constructor(accessKey?: string | undefined, secretKey?: string | undefined, sessionToken?: string | undefined, currentWorkingDirectory?: string | undefined);
}
