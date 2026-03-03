type Component = {
    name: string;
    dependencies: string[];
    files: {
        path: string;
        content: string;
    }[];
};
export declare const getComponent: (name: string) => Promise<Component>;
export {};
//# sourceMappingURL=components.model.d.ts.map