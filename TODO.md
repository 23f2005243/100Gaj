# TODO

## Authentication JSON parse hardening
- [ ] Add a shared frontend helper to safely parse JSON responses (handle empty/non-JSON bodies)
- [ ] Update SignIn, SignUp, OAuth components to use the helper instead of `res.json()` directly
- [ ] (Optional) Update other `fetch(...); res.json()` usages if the issue persists
- [ ] Run frontend flow to verify the “Unexpected end of JSON input” error is eliminated

