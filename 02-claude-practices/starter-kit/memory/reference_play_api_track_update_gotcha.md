---
name: reference-play-api-track-update-gotcha
description: "Google Play Developer API: tracks.update replaces the track's whole release list — a PUT with only a new draft drops the live (completed) release inside the edit; carry live releases over (seen 20 Oct 2026)"
metadata:
  node_type: memory
  type: reference
  originSessionId: f4795aa1-7942-4344-a6c4-e7b6487ba3f4
  modified: 2026-10-20T06:10:48.009Z
---

Seen in a dry run on 20 Oct 2026 (Arrow Bloom, internal + alpha tracks): `PUT edits/{id}/tracks/{track}` with
`releases: [ {status: "draft", versionCodes: [2]} ]` → reading the track back inside the same edit showed ONLY
the draft; the live `completed` vc1 release was gone. Committing that edit would have removed the live release.

Safe pattern: read the track first, send `releases: [...liveReleasesUnchanged, newDraft]`, read back, compare,
discard the edit if any live release is missing. Implemented in `D:\DevTools\ArrowBloom-pub\tools\play-stage-draft.js`.

**Block Bloom:** its `tools/play-upload.js` sends only the draft. Check (dry-run read-back) before its next use
on any track with a live release, especially production. Related: [[project-arrow-bloom]], [[project-blockbloom-release]].
