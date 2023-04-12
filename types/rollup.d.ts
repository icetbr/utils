export function cssToEsm(): {
    name: string;
    transform: (code: any, id: any) => {
        code: string;
    };
};
