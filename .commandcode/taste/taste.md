# Taste

See [taste/taste.md](taste/taste.md)

- Expects the project's production build (`npm run build`) to complete cleanly with no errors or warnings — pastes full build logs (prerender failures, `generateStaticParams` DB errors, missing-`metadataBase` warnings) and asks to fix them all ("bu xetalari aradan qaldir"); when the build fails because Postgres is unreachable (ECONNREFUSED), the expected fix is at the environment level (start the Docker Postgres container, run migrations, verify seed data) and rebuild, not masking the failure. Confidence: 0.55
- Codebase log/console messages are written in Azerbaijani (e.g. "DB xətası, [] qaytarılır") — new log strings in this project should match that language. Confidence: 0.4
