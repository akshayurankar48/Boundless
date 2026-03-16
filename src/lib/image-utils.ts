/** Tiny 4x4 dark gray blur placeholder for Next.js Image component */
export const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNCxAMEQ4NEB4QCgsOERYfFxEHCCIYFhgSNiIeIR4/2wBDAQMEBAUEBQkFBQkeFBkUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAEAAQDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAB//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqwAB/9k=";

/** Fallback component rendered when an image fails to load */
export function getImageErrorStyle(): React.CSSProperties {
  return {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    color: "#6b6b68",
    fontSize: "12px",
    fontFamily: "var(--font-space-grotesk), monospace",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
  };
}
