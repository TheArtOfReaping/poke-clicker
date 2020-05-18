declare namespace NodeJS {
    export interface Global {
      logs: any;
    }
}

(global as any).logs = [];

export function log(...log: any[]) {
    log.forEach(g => (global as any).logs.push(JSON.stringify(g)));
}