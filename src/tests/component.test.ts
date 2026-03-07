import request from "supertest";
import { jest, describe, it, expect } from "@jest/globals";

jest.unstable_mockModule("../models/components.model", () => ({
    getComponent: jest.fn(),
}));

const { getComponent } = await import("../models/components.model.js");
const { app } = await import("../index.js");
const mockedGetComponent = jest.mocked(getComponent);

const mockComponent = {
    name: "login-form",
    dependencies: ["react-hook-form"],
    files: [
        {
            path: "components/auth/login-form.tsx",
            content: "export const LoginForm = () => {}"
        }
    ]
};

describe('Checking component fetch from registry.json', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should return component from registry.json', async () => {
        mockedGetComponent.mockResolvedValue(mockComponent);

        const res = await request(app).get("/registry/r/login-form");

        expect(res.status).toBe(200);
        expect(res.body.name).toBe(mockComponent.name);
    })

    it('should return 404 if component not found', async () => {
        mockedGetComponent.mockResolvedValue(null as any);
        const res = await request(app).get("/registry/r/unknown");

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Component not found");
    })
})