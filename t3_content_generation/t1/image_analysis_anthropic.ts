import * as fs from "node:fs";
import * as path from "node:path";

import { ANTHROPIC_API_KEY } from "../../commons";

// https://docs.anthropic.com/en/docs/build-with-claude/vision
// https://docs.anthropic.com/en/api/messages

//TODO:
// You need to analyse these 2 images with Claude (Anthropic Messages API):
//   - https://a-z-animals.com/media/2019/11/Elephant-male-1024x535.jpg
//   - in this folder we have 'logo.png', load it as encoded data (see documentation)
// ---
// Hints:
//   - Initialize the Anthropic SDK client (see https://github.com/anthropics/anthropic-sdk-typescript?tab=readme-ov-file#getting-started)
//   - Use client.messages.create with a vision-capable model (e.g. "claude-sonnet-4-5")
//   - Each image is its own content block: { type: "image", source: {...} }
//     - Remote image by URL:    { type: "url", url: "<image url>" }
//     - Local image by base64:  { type: "base64", media_type: "image/png", data: "<base64 string>" }
//   - Add a final { type: "text", text: "..." } content block with your prompt
// ---
// In the end load both images (url and base64 encoded 'logo.png'), ask "Generate poem based on images" and see what will happen?
