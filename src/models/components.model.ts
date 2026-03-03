import fs from "fs-extra";
import path from "path";

type Component = {
    name: string,
    dependencies: string[],
    files: {
        path: string,
        content: string
    }[]
}

const registryPath = path.join(process.cwd(), "/src/registry/registry.json");


export const getComponent = async (name: string): Promise<Component> => {
    const registry = fs.readJSONSync(registryPath);
    return registry[name];
}