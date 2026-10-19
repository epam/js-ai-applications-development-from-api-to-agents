import { AnthropicAIClient } from "./_clients/anthropic_client";
import { run } from "./_main";

// Each preset is passed to run() as extra request parameters.
// Pick the active one with the ACTIVE constant below, then ask the suggested query.
const presets = {
  // TODO 1: temperature (0.0-1.0, default 1.0). Lower = deterministic, higher = creative.
  //  Query: "Give me a name for a coffee shop"
  temperatureLow: { temperature: 0.0 },
  temperatureHigh: { temperature: 1.0 },

  // TODO 2: top_p — nucleus sampling (0.0-1.0). Lower = more focused output.
  //  Query: "List 5 alternative uses for a paperclip"
  topPLow: { top_p: 0.1 },
  topPHigh: { top_p: 0.9 },

  // TODO 3: top_k — limits token selection to top K candidates. Lower = more predictable.
  //  Query: "Write a one-sentence story about a robot"
  topKLow: { top_k: 1 },
  topKHigh: { top_k: 50 },

  // TODO 4: stop_sequences — generation stops when one of the strings is encountered.
  //  Query: "Count from 1 to 20, comma separated"
  stopSequences: { stop_sequences: ["10"] },

  // TODO 5: output_config — enforce structured JSON output.
  //  Query: "List 3 programming languages with their year of creation"
  structuredOutput: {
    output_config: {
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            languages: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  name: { type: "string" },
                  year: { type: "integer" },
                },
                required: ["name", "year"],
              },
            },
          },
          required: ["languages"],
        },
      },
    },
  },

  // TODO 6: thinking — extended thinking. max_tokens must be greater than budget_tokens.
  //  Query: "How many r's are in the word strawberry?"
  thinking: {
    thinking: { type: "enabled", budget_tokens: 5000 },
    max_tokens: 8000,
  },
};

const ACTIVE: keyof typeof presets = "structuredOutput";

run(
  new AnthropicAIClient('claude-sonnet-4-5'),
  true, // Switch to False if you do not want to see the request in console
  false, // Switch to True if you want to see only content from response
  presets[ACTIVE],
);
