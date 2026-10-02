Built static output of the FlowJoe user docs. Do not edit by hand.

Regenerate:

1. In the FlowJoe app repo run `npm run docs:export` (produces `docs-site/`).
2. Copy the contents of `docs-site/` into this repo (replace everything except `.git`, `CNAME`, `.nojekyll`, `README.md`, `THIRD_PARTY_NOTICES.md`, `tools/`, `vendor-assets/`; the 404 page is `404.html`). Delete the desktop helpers `Start Docs.bat`, `Start Docs.command`, `serve.js`, `run_docs.sh`.
3. Run `node tools/postprocess-docs.js` (needs network the first time to vendor icons/fonts; no dependencies).

The script makes the site self-hosted (zero third-party requests), hides the search UI and dev pill, stubs Mintlify-only background requests, and generates `llms.txt`.
