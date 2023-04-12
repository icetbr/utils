export namespace macroCommands {
    namespace FooMacro {
        export const no: number;
        export { fooFunc as func };
    }
    namespace Compact {
        const no_1: number;
        export { no_1 as no };
        export { compact as func };
    }
}
/**
 * FooMacro
 */
declare function fooFunc(): void;
declare function compact(): void;
export {};
