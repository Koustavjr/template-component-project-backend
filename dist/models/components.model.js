import fs from "fs-extra";
import path from "path";
const registryPath = path.join(process.cwd(), "/src/registry/registry.json");
export const getComponent = async (name) => {
    const registry = fs.readJSONSync(registryPath);
    return registry[name];
};
//# sourceMappingURL=components.model.js.map