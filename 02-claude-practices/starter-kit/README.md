# Starter kit — drop-in files for the new laptop

| Item | Copy to | Notes |
|---|---|---|
| `CLAUDE.md` | `~\.claude\CLAUDE.md` | global rules for the personal laptop; two `<edit>` placeholders |
| `CLAUDE.work-laptop-REFERENCE-ONLY.md` | nowhere | the QiSpine global file, kept so you can see the original shape |
| `settings.json` | `~\.claude\settings.json` | effort + theme only; no secrets, no work permissions |
| `BlockBloom-repo-CLAUDE.md` | `<repo>\CLAUDE.md` (optional, commit it) | the repo's stack contract |
| `memory\` (38 files + `other-games\`) | `~\.claude\projects\<repo-slug>\memory\` | includes `MEMORY.md` index and a TODO-template for the new environment |
| `standards\` (8) | `~\.claude\standards\` | on-demand reference docs |
| `templates\` (10) | `~\.claude\templates\` | fixed output shapes |
| `skills\blockbloom-release\`, `skills\blockbloom-analytics\` | `~\.claude\skills\` | new; written for this handover |
| `skills\_optional-generic\*` | `~\.claude\skills\<name>\` | only the ones you want; they tax every session's context |

Memory files were copied verbatim from the work laptop. Some feedback files use QiSpine paths
or Maven commands as their examples; the rule each one states is general. The old canonical
`user_profile.md` from `D--QiSpine` was **not** copied because it holds work credentials in
plaintext; the clean one from the webservices memory dir is here instead.
