import { describe, it, expect, jest } from "@jest/globals";

const mockCreate: any = jest.fn()

jest.unstable_mockModule("openai", () => ({
    default: jest.fn().mockImplementation(() => ({
        chat: {
            completions: {
                create: mockCreate
            }
        }
    }))

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


const { aiGeneratedComponent } = await import('../models/ai.model.js');




describe("testing model function", () => {

    it("should return component", async () => {
        mockCreate.mockResolvedValue(mockResponse)
        const result = await aiGeneratedComponent("login form");
        expect(result).toEqual(JSON.parse(mockResponse?.choices?.[0]?.message?.content));
    })
})