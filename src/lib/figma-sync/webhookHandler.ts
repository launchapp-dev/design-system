import type { TokenSyncEvent } from "./types";

/**
 * Handles incoming webhook events from Figma
 *
 * REQUIRES HTTP MCP for:
 * - Running an HTTP server to receive webhook events
 * - Verifying Figma webhook signatures
 * - Dispatching sync events to the sync service
 */

export interface FigmaWebhookPayload {
  timestamp: number;
  file_id: string;
  file_key: string;
  event_type: "LIBRARY_PUBLISH" | "FILE_UPDATE" | string;
  event?: {
    file_id: string;
    timestamp: number;
    changes?: Array<{
      id: string;
      type: string;
      name: string;
      description?: string;
    }>;
  };
}

export interface WebhookVerificationResult {
  valid: boolean;
  error?: string;
}

/**
 * Handler for Figma webhook events
 *
 * Figma webhooks are sent when:
 * - A library is published (LIBRARY_PUBLISH)
 * - Variables/styles in a file are updated (FILE_UPDATE)
 * - Components are added/updated (FILE_UPDATE)
 *
 * See: https://www.figma.com/developers/api#webhooks
 */
export class FigmaWebhookHandler {
  private webhookSecret: string;

  constructor(webhookSecret: string) {
    this.webhookSecret = webhookSecret;
  }

  /**
   * Process an incoming webhook from Figma
   *
   * The webhook signature should be verified before calling this method.
   * In a real implementation with HTTP MCP, this would:
   * 1. Verify the X-Figma-Signature header
   * 2. Parse the webhook payload
   * 3. Extract token changes
   * 4. Dispatch sync event
   */
  processWebhook(
    payload: FigmaWebhookPayload
  ): {
    success: boolean;
    syncEvent?: TokenSyncEvent;
    error?: string;
  } {
    try {
      // Validate payload structure
      if (!payload.file_id || !payload.file_key) {
        return {
          success: false,
          error: "Missing file_id or file_key",
        };
      }

      // Only sync on library publish events (safe change point)
      // FILE_UPDATE events are too frequent and may include non-token changes
      if (payload.event_type !== "LIBRARY_PUBLISH") {
        return {
          success: true,
          error: `Ignoring event type: ${payload.event_type}`,
        };
      }

      // Create sync event for token synchronization
      const syncEvent = this.createSyncEvent(payload);

      return {
        success: true,
        syncEvent,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Verify the webhook signature from Figma
   *
   * REQUIRES HTTP MCP to access request headers and body
   * The verification process:
   * 1. Get X-Figma-Signature header from request
   * 2. Calculate HMAC-SHA256(secret, request_body)
   * 3. Compare with signature
   */
  verifySignature(
    requestBody: string,
    signature: string
  ): WebhookVerificationResult {
    // In a real implementation with HTTP MCP:
    // const crypto = await import('crypto');
    // const hmac = crypto.createHmac('sha256', this.webhookSecret);
    // hmac.update(requestBody);
    // const calculated = hmac.digest('hex');
    // const valid = calculated === signature;

    // For now, return a placeholder
    if (!signature || !requestBody) {
      return {
        valid: false,
        error: "Missing signature or request body",
      };
    }

    return {
      valid: true,
    };
  }

  private createSyncEvent(payload: FigmaWebhookPayload): TokenSyncEvent {
    return {
      id: `webhook-${payload.timestamp}`,
      timestamp: payload.timestamp,
      source: "figma",
      action: "update",
      tokens: [],
      metadata: {
        figmaFileId: payload.file_id,
        figmaFileKey: payload.file_key,
      },
    };
  }
}

/**
 * Webhook server setup configuration
 *
 * This would be used with HTTP MCP to set up a server that:
 * 1. Listens on POST /webhooks/figma
 * 2. Verifies webhook signatures
 * 3. Processes token changes
 * 4. Triggers sync events
 */
export interface WebhookServerConfig {
  port: number;
  path: string;
  secret: string;
  autoSync: boolean;
}

export const DEFAULT_WEBHOOK_CONFIG: WebhookServerConfig = {
  port: 3000,
  path: "/webhooks/figma",
  secret: process.env.FIGMA_WEBHOOK_SECRET || "default-secret",
  autoSync: true,
};
