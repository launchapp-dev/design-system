import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  handleComponentGenerationRequest,
  type APIRequest,
  type APIResponse,
} from "./ai-component-generator-api";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("handleComponentGenerationRequest", () => {
  describe("Input validation", () => {
    it("rejects non-object requests", async () => {
      const response = await handleComponentGenerationRequest(
        null as unknown as APIRequest
      );

      expect(response.success).toBe(false);
      expect(response.error).toContain("Request must be an object");
      expect(response.code).toBe("INVALID_REQUEST");
    });

    it("requires a type field", async () => {
      const request = { payload: {} } as unknown as APIRequest;
      const response = await handleComponentGenerationRequest(request);

      expect(response.success).toBe(false);
      expect(response.error).toContain("'type' field");
      expect(response.code).toBe("MISSING_TYPE");
    });

    it("requires a payload field", async () => {
      const request = { type: "structured" } as unknown as APIRequest;
      const response = await handleComponentGenerationRequest(request);

      expect(response.success).toBe(false);
      expect(response.error).toContain("'payload' field");
      expect(response.code).toBe("MISSING_PAYLOAD");
    });

    it("validates component name is required", async () => {
      const request: APIRequest = {
        type: "structured",
        payload: {
          description: "A test component",
        } as unknown,
      };

      const response = await handleComponentGenerationRequest(request);

      expect(response.success).toBe(false);
      expect(response.error).toContain("name");
      expect(response.code).toBe("MISSING_NAME");
    });

    it("validates component description is required", async () => {
      const request: APIRequest = {
        type: "structured",
        payload: {
          name: "TestButton",
        } as unknown,
      };

      const response = await handleComponentGenerationRequest(request);

      expect(response.success).toBe(false);
      expect(response.error).toContain("description");
      expect(response.code).toBe("MISSING_DESCRIPTION");
    });

    it("validates component name format (PascalCase)", async () => {
      const request: APIRequest = {
        type: "structured",
        payload: {
          name: "test-button",
          description: "A test button",
        },
      };

      const response = await handleComponentGenerationRequest(request);

      expect(response.success).toBe(false);
      expect(response.error).toContain("PascalCase");
      expect(response.code).toBe("INVALID_NAME_FORMAT");
    });

    it("validates component name length", async () => {
      const request: APIRequest = {
        type: "structured",
        payload: {
          name: "A".repeat(101),
          description: "A test component",
        },
      };

      const response = await handleComponentGenerationRequest(request);

      expect(response.success).toBe(false);
      expect(response.error).toContain("less than 100 characters");
      expect(response.code).toBe("NAME_TOO_LONG");
    });

    it("validates description length", async () => {
      const request: APIRequest = {
        type: "structured",
        payload: {
          name: "TestButton",
          description: "A".repeat(2001),
        },
      };

      const response = await handleComponentGenerationRequest(request);

      expect(response.success).toBe(false);
      expect(response.error).toContain("less than 2000 characters");
      expect(response.code).toBe("DESCRIPTION_TOO_LONG");
    });

    it("validates request type", async () => {
      const request: APIRequest = {
        type: "invalid" as unknown as "structured",
        payload: { name: "Button", description: "Test" },
      };

      const response = await handleComponentGenerationRequest(request);

      expect(response.success).toBe(false);
      expect(response.code).toBe("INVALID_REQUEST_TYPE");
    });

    it("rejects empty description for description type", async () => {
      const request: APIRequest = {
        type: "description",
        payload: "",
      };

      const response = await handleComponentGenerationRequest(request);

      expect(response.success).toBe(false);
      expect(response.code).toBe("INVALID_DESCRIPTION");
    });
  });

  describe("Structured request handling", () => {
    it("accepts valid structured request", async () => {
      const mockGenerateComponent = vi
        .spyOn(await import("./ai-component-generator"), "generateComponent")
        .mockResolvedValue({
          component: "mock component",
          story: "mock story",
          test: "mock test",
          validation: { isValid: true, errors: [] },
        });

      const request: APIRequest = {
        type: "structured",
        payload: {
          name: "TestButton",
          description: "A test button component",
          variants: {
            size: ["sm", "md", "lg"],
          },
        },
        apiKey: "test-key",
      };

      const response = await handleComponentGenerationRequest(request);

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data?.component).toBe("mock component");
      expect(response.data?.story).toBe("mock story");
      expect(response.data?.test).toBe("mock test");

      mockGenerateComponent.mockRestore();
    });

    it("passes API key to generator", async () => {
      const mockGenerateComponent = vi
        .spyOn(await import("./ai-component-generator"), "generateComponent")
        .mockResolvedValue({
          component: "mock",
          story: "mock",
          test: "mock",
          validation: { isValid: true, errors: [] },
        });

      const request: APIRequest = {
        type: "structured",
        payload: {
          name: "Button",
          description: "Test",
        },
        apiKey: "custom-api-key",
      };

      await handleComponentGenerationRequest(request);

      expect(mockGenerateComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Button",
          description: "Test",
        }),
        "custom-api-key"
      );

      mockGenerateComponent.mockRestore();
    });
  });

  describe("Description request handling", () => {
    it("accepts valid description request", async () => {
      const mockGenerateFromDescription = vi
        .spyOn(
          await import("./ai-component-generator"),
          "generateComponentFromDescription"
        )
        .mockResolvedValue({
          component: "mock component",
          story: "mock story",
          test: "mock test",
          validation: { isValid: true, errors: [] },
        });

      const request: APIRequest = {
        type: "description",
        payload: "Button - A reusable button component",
        apiKey: "test-key",
      };

      const response = await handleComponentGenerationRequest(request);

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();

      mockGenerateFromDescription.mockRestore();
    });
  });

  describe("Error handling", () => {
    it("handles generation errors gracefully", async () => {
      const mockGenerateComponent = vi
        .spyOn(await import("./ai-component-generator"), "generateComponent")
        .mockRejectedValue(new Error("API error"));

      const request: APIRequest = {
        type: "structured",
        payload: {
          name: "Button",
          description: "Test",
        },
      };

      const response = await handleComponentGenerationRequest(request);

      expect(response.success).toBe(false);
      expect(response.error).toContain("API error");
      expect(response.code).toBe("GENERATION_ERROR");

      mockGenerateComponent.mockRestore();
    });

    it("returns proper response structure on error", async () => {
      const request: APIRequest = {
        type: "structured",
        payload: {
          name: "invalid-name",
          description: "Test",
        },
      };

      const response = await handleComponentGenerationRequest(request);

      expect(response).toHaveProperty("success");
      expect(response).toHaveProperty("error");
      expect(response).toHaveProperty("code");
      expect(response.data).toBeUndefined();
    });
  });

  describe("Response structure", () => {
    it("returns success response with data", async () => {
      const mockGenerateComponent = vi
        .spyOn(await import("./ai-component-generator"), "generateComponent")
        .mockResolvedValue({
          component: "component",
          story: "story",
          test: "test",
          validation: { isValid: true, errors: [] },
        });

      const request: APIRequest = {
        type: "structured",
        payload: {
          name: "Button",
          description: "Test button",
        },
      };

      const response = await handleComponentGenerationRequest(request);

      expect(response).toMatchObject({
        success: true,
        data: expect.objectContaining({
          component: expect.any(String),
          story: expect.any(String),
          test: expect.any(String),
          validation: expect.any(Object),
        }),
      });

      mockGenerateComponent.mockRestore();
    });

    it("includes validation results in response", async () => {
      const mockGenerateComponent = vi
        .spyOn(await import("./ai-component-generator"), "generateComponent")
        .mockResolvedValue({
          component: "component",
          story: "story",
          test: "test",
          validation: {
            isValid: false,
            errors: ["Missing import", "Invalid syntax"],
          },
        });

      const request: APIRequest = {
        type: "structured",
        payload: {
          name: "Button",
          description: "Test",
        },
      };

      const response = await handleComponentGenerationRequest(request);

      expect(response.data?.validation).toEqual({
        isValid: false,
        errors: ["Missing import", "Invalid syntax"],
      });

      mockGenerateComponent.mockRestore();
    });
  });
});
