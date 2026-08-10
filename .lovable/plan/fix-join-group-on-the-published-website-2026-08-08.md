# Fix Join Group on the published website

## Confirmed current state
- The live preview renders a plain anchor with the exact `/invite/CODE` URL and `target="_blank"`, matching the working HTML example.
- Both WhatsApp direct and `/invite/` URLs respond successfully when requested outside the app.
- No Lovable published URL is currently recorded for this project, so the public site may not contain the latest frontend changes.

## Plan
1. Publish/update the latest frontend so the corrected plain anchor reaches the public site.
2. Inspect the rendered Join link on the actual public domain and confirm its final `href`, target, and whether any hosting script or security policy intercepts the click.
3. Test a real click from the public domain on desktop and mobile, confirming the new tab reaches the exact WhatsApp `/invite/CODE` URL.
4. If the public host still blocks the outbound tab, replace the link with a direct user-click navigation fallback that preserves the exact WhatsApp URL and avoids popup-script behavior.

## Verification
- Compare the public page’s rendered anchor with the working HTML example.
- Confirm the final browser URL is unchanged and no console or content-security-policy error occurs.
