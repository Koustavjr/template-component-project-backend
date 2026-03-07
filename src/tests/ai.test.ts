import request from "supertest";
import { jest, describe, it, expect } from "@jest/globals";

jest.unstable_mockModule("../models/ai.model.js", () => ({
    aiGeneratedComponent: jest.fn()
}))


const mockResponse: any = {
    choices: [{
        message: {
            content: JSON.stringify({
                name: "login-form",
                dependencies: ["react-hook-form"],
            })
        }
    }]
};

const { aiGeneratedComponent } = await import("../models/ai.model.js");
const { app } = await import("../index.js");

const mockAiGeneratedComponent = jest.mocked(aiGeneratedComponent);

describe("create ai components", () => {
    it("generating ai components", async () => {
        mockAiGeneratedComponent.mockResolvedValue(JSON.parse(mockResponse?.choices?.[0]?.message?.content));
        const response = await request(app).post("/registry/ai/generate").send({ prompt: "login form" });
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual("login-form");
    })
})