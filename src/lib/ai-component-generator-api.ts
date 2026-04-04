import {
  type ComponentGenerationRequest,
  type ComponentGenerationResponse,
  generateComponent,
  generateComponentFromDescription,
} from "./ai-component-generator";

export interface APIRequest {
  type: "structured" | "description";
  payload: ComponentGenerationRequest | string;
  apiKey?: string;
}

export interface APIResponse {
  success: boolean;
  data?: ComponentGenerationResponse;
  error?: string;
  code?: string;
}

export async function handleComponentGenerationRequest(
  request: APIRequest,
): Promise<APIResponse> {
  try {
    validateAPIRequest(request);

    let result: ComponentGenerationResponse;

    if (request.type === "structured") {
      const payload = request.payload as ComponentGenerationRequest;
      validateComponentRequest(payload);
      result = await generateComponent(payload, request.apiKey);
    } else if (request.type === "description") {
      const payload = request.payload as string;
      if (typeof payload !== "string" || payload.trim().length === 0) {
        throw new ValidationError(
          "Description must be a non-empty string",
          "INVALID_DESCRIPTION",
        );
      }
      result = await generateComponentFromDescription(payload, request.apiKey);
    } else {
      throw new ValidationError(
        "Request type must be 'structured' or 'description'",
        "INVALID_REQUEST_TYPE",
      );
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        success: false,
        error: error.message,
        code: error.code,
      };
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      error: errorMessage,
      code: "GENERATION_ERROR",
    };
  }
}

function validateAPIRequest(request: unknown): asserts request is APIRequest {
  if (!request || typeof request !== "object") {
    throw new ValidationError("Request must be an object", "INVALID_REQUEST");
  }

  const req = request as Record<string, unknown>;

  if (!req.type || typeof req.type !== "string") {
    throw new ValidationError(
      "Request must include a 'type' field",
      "MISSING_TYPE",
    );
  }

  if (!req.payload) {
    throw new ValidationError(
      "Request must include a 'payload' field",
      "MISSING_PAYLOAD",
    );
  }
}

function validateComponentRequest(
  payload: unknown,
): asserts payload is ComponentGenerationRequest {
  if (!payload || typeof payload !== "object") {
    throw new ValidationError("Payload must be an object", "INVALID_PAYLOAD");
  }

  const req = payload as Record<string, unknown>;

  if (!req.name || typeof req.name !== "string") {
    throw new ValidationError("Component name is required", "MISSING_NAME");
  }

  if (!req.description || typeof req.description !== "string") {
    throw new ValidationError(
      "Component description is required",
      "MISSING_DESCRIPTION",
    );
  }

  if (req.name.length > 100) {
    throw new ValidationError(
      "Component name must be less than 100 characters",
      "NAME_TOO_LONG",
    );
  }

  if (req.description.length > 2000) {
    throw new ValidationError(
      "Component description must be less than 2000 characters",
      "DESCRIPTION_TOO_LONG",
    );
  }

  if (!isValidComponentName(req.name as string)) {
    throw new ValidationError(
      "Component name must be PascalCase alphanumeric",
      "INVALID_NAME_FORMAT",
    );
  }
}

function isValidComponentName(name: string): boolean {
  return /^[A-Z][a-zA-Z0-9]*$/.test(name);
}

class ValidationError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export {
  type ComponentGenerationRequest,
  type ComponentGenerationResponse,
  generateComponent,
  generateComponentFromDescription,
};
