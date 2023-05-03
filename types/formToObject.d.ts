type ConflictResolver = (targetPonter: string, original: {}, current: any, next: any, localPointer: string) => any;
export declare function formToObject<T extends {} = {}>(sourceElement: Element, options?: {
    attribute?: string;
    conflictResolver?: ConflictResolver;
}): T;
export {};
