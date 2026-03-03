import { getComponent } from "../models/components.model.js";
export const getComponentController = async (req, res) => {
    try {
        const name = req.params.name;
        if (!name) {
            return res.status(400).json({
                message: "Component name is required"
            });
        }
        const component = await getComponent(name);
        return res.status(200).json(component);
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
//# sourceMappingURL=components.controller.js.map