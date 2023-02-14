type ConflictResolver = (targetPonter: string, original: {}, current: any, next: any, localPointer: string) => any;
export declare function formToObject<T extends {} = {}>(sourceElement: Element, options?: {
    conflictResolver?: ConflictResolver;
}): T;
export {};
