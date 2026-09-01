# YUAN SHOWROOM Development Guidance

## Verification policy

- Match verification effort to the risk and scope of the current change.
- Treat CSS, spacing, typography, static copy, and image adjustments as low-risk changes unless they alter interaction, routing, data, or build configuration.
- During development, low-risk changes should use only directly relevant checks. Do not run a production build until preparing a deployment or when compilation behavior is part of the change.
- Do not add source-regex or implementation-detail tests for purely visual adjustments unless they protect a specific, previously reproduced regression.
- For component logic changes, run relevant tests, ESLint for the affected scope, and TypeScript validation when types or component contracts changed.
- For routing, shared data structures, dependencies, Next.js configuration, security headers, or deployment scripts, run `npm run check` before completion.
- Use `npm run check:fast` for low-risk production releases and `npm run check` for high-risk releases.
- Do not repeat a check when the relevant code and configuration have not changed since that check passed.
- Keep successful command output concise. Report a summary for passing checks and include only actionable output for failures.
- Do not inspect, load, or invoke skills that are unrelated to the current request. Use a skill only when it directly applies or the user explicitly requests it.

## Deployment safety

- Every production deployment must still create a production build, upload into an independent staging location, preserve a rollback copy, perform local and public health checks, and automatically restore the previous release on failure.
- Never use the fast path for dependency, routing, data-model, security, infrastructure, or deployment changes.
- Never modify the `yuan-academy` application, process, port, files, data, or Nginx configuration while deploying this website.
