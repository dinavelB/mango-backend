export function ErrorHandler(e: any) {
  // Log the full error for debugging
  console.error("=== LOGIN ERROR DETAILS ===");
  console.error("Timestamp:", new Date().toISOString());
  console.error("Error type:", e.name);
  console.error("Error message:", e.message);
  console.error("Stack trace:", e.stack);

  // Check for specific error types
  if (e.name === "MongoError" || e.code) {
    console.error("Database error code:", e.code);
  }
  if (e.name === "ValidationError") {
    console.error("Validation errors:", e.errors);
  }
  if (e.name === "JsonWebTokenError") {
    console.error("JWT error:", e.message);
  }
}
