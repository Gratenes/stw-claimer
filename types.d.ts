import example from './random/exaple.js';
declare global {
  type publicService = typeof example.publicService;
  type publicAccount = typeof example.publicAccount;
  interface items {
    "errorCode"?: string,
    "errorMessage"?: string,
    "messageVars"?: [],
    "numericErrorCode"?: number,
    "originatingService"?: string,
    "intent"?: string,
    "error_description"?: string,
    "error"?: string;

    "type"?: string,
    "primary"?: boolean,
    "daysLoggedIn"?: number,
    "items"?: [],
    "claimedItem"?: string;
  }
}