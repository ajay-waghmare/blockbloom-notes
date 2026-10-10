# Setting up Claude Code on the new laptop

Order matters only for step 6 (memory needs the repo slug to exist).

1. **Install Claude Code** (the native installer; the version here was 2.1.160+) and log in with
   the claude.ai account you will use for personal work. Use the normal login, not a long-lived
   setup token: the token has inference scope only and disables every connector (Claude Docs,
   Drive, M365) and some artifact features.
2. **Global rules:** copy `starter-kit\CLAUDE.md` to `C:\Users\<you>\.claude\CLAUDE.md` and
   fix the two paths marked `<edit>`.
3. **Settings:** copy `starter-kit\settings.json` to `~\.claude\settings.json`. Pick the model
   with `/model` in a session; `effortLevel: xhigh` is what you have been using.
4. **Standards and templates:** copy `starter-kit\standards\` and `starter-kit\templates\` to
   `~\.claude\standards\` and `~\.claude\templates\`.
5. **Skills:** copy `starter-kit\skills\blockbloom-release` and `blockbloom-analytics` to
   `~\.claude\skills\`. Add any of `_optional-generic\` you actually want. Open `SKILL.md` of the
   two Block Bloom skills once and fix the paths if your layout differs.
6. **Memory:** clone the repo, run `claude` inside it once, find the slug under
   `~\.claude\projects\`, create `memory\` there, copy everything from `starter-kit\memory\`.
   Fill in `reference_personal_laptop_environment.md`. Details in `04-memory-system.md`.
7. **Repo-level contract (optional, your call because it is a code-repo change):** copy
   `starter-kit\BlockBloom-repo-CLAUDE.md` to the repo root as `CLAUDE.md` and commit it. It is
   the one-screen stack contract Claude reads in full whenever it works in that repo.
8. **Permissions:** if you use auto mode, expect the classifier to block credential hunting and
   some outward actions; that is fine. Add `settings.local.json` allow-rules only for commands you
   run constantly.
9. **First prompt** (the one in `00-START-HERE.md`), then one real task. After it, check that
   Claude wrote to memory and added an index line; if not, say "persist this to memory" once and
   the `feedback_persist_work_to_memory` rule is in context from then on.

What you do **not** need from the work laptop: the multi-user `.claude-<name>` config dirs and
launcher batch files, the QiSpine skills/rules, the Postgres MCP server, the `settings.json`
allow entry for the Strapi deploy key, the VS Code auto-update workarounds, and the JDK loopback
patch (keep the memory file in case the symptom ever appears).

## A note on connectors

On the work laptop the claude.ai connectors (Atlassian, Figma, Drive, M365, Claude Docs) were
tied to the work account. On the personal laptop only what you connect to the personal account
exists. Nothing in Block Bloom depends on a connector; Play, GA4 and Firebase are reached by the
Node scripts with the service-account key.
