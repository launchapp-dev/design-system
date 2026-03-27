import { NextRequest, NextResponse } from "next/server";
import { generateComponent } from "../../../lib/component-generator";

interface GenerateComponentRequest {
  description: string;
  requirements?: string;
}

interface GenerateComponentResponse {
  code: string;
  componentName: string;
  story: string;
  timestamp: string;
  metadata: {
    hasForwardRef: boolean;
    hasCVA: boolean;
    hasTypeScript: boolean;
    hasAccessibility: boolean;
  };
}

export async function POST(request: NextRequest) {
  try {
    const startTime = Date.now();
    const body: GenerateComponentRequest = await request.json();

    if (!body.description) {
      return NextResponse.json(
        { error: "Component description is required" },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY environment variable is not set" },
        { status: 500 }
      );
    }

    const result = await generateComponent({
      description: body.description,
      requirements: body.requirements,
    });

    const endTime = Date.now();
    const responseTime = (endTime - startTime) / 1000;

    const response: GenerateComponentResponse = {
      code: result.code,
      componentName: result.componentName,
      story: result.story,
      timestamp: result.timestamp,
      metadata: result.metadata,
    };

    return NextResponse.json(
      {
        ...response,
        responseTime,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating component:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
