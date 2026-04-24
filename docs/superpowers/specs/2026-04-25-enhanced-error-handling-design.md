# Design Doc: Enhanced Gemini Error Handling

## Goal
Improve the user experience when Gemini AI fails (specifically during high demand) by displaying the actual error message from the API instead of a generic failure message.

## Architecture

### 1. Service Layer (`src/services/geminiService.ts`)
- **Action:** Update `analyzeImage` to catch and parse SDK-specific errors.
- **Implementation:**
    - Catch `GoogleGenerativeAIFetchError` to extract HTTP status and server-side error messages (e.g., "Too many requests", "Model is overloaded").
    - Catch `GoogleGenerativeAIResponseError` to handle response-level issues (e.g., safety filters).
    - Throw descriptive error messages that reflect the actual cause of failure.

### 2. Logic Layer (`src/logic/visionLogic.ts`)
- **Action:** None (already handles error propagation).
- **Behavior:** The `processImage` method catches errors from the service and sets the `errorMsg` in the application state.

### 3. UI Layer (`src/components/VibeDashboard.tsx`)
- **Action:** Enhance the error state rendering.
- **Implementation:**
    - Display the `errorMsg` prominently.
    - Improve the styling of the error container to be more informative and consistent with the app's aesthetic.

## Error Mapping Table

| Error Type | Extracted Information | Resulting Message |
|------------|-----------------------|-------------------|
| 429 Too Many Requests | Server message | "Gemini API: [Actual Message from Server]" |
| 503 Service Unavailable | Server message | "Gemini API: [Actual Message from Server]" |
| Safety Block | Block reason | "Gemini API: Response blocked due to safety reasons." |
| Network Error | Error name/message | "Network Error: [Message]" |
| Other | e.message | "[Message]" |

## Testing Strategy
- **Manual Verification:** Mock different error responses (if possible) or trigger high-demand scenarios to verify the message display.
- **Type Safety:** Ensure imports of `GoogleGenerativeAIFetchError` and `GoogleGenerativeAIResponseError` work correctly with the installed SDK version.
