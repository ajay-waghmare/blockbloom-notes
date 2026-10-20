# Memory Index — personal laptop (seeded from the work-laptop handover, 10 Oct 2026)

## Block Bloom (read the first one before any Play / release / analytics work)
- [⭐⭐ Block Bloom release](project_blockbloom_release.md) — READ FIRST (synced 19 Oct): vc23 1.12.0 LIVE at 100% since 19 Oct = first revenue build (real AdMob, rewarded-only; Billing ON, IAP products pending); in-app update banner; 🔴main behind FOUR release branches; build output now ~/.build-blockbloom
- [⭐ Block Bloom CODE REVIEW 10 Oct 2026](project_blockbloom_code_review_2026_10.md) — vc21 verified OK (bundle hash, tests, live notes, emulator); ranked findings: latent adLoading bug, banner IS wired, FirebaseEventConfig dead, no portrait lock, no line numbers in release traces → ALL FIXED 11 Oct on release/2026-10-11 (vc22), emulator-verified
- [⭐⭐ Block Bloom revenue (next release)](project_blockbloom_monetization.md) — LIVE since vc23 (18 Oct): AdMob pub-1693732810683011 rewarded-only, banner/interstitial OFF via RC; Billing ON but IAP products not yet in Play (BillDesk KYC done 15 Oct); 15% fee tier; 13 listings refreshed with ASO copy; app-ads.txt live
- [⭐ Ref: Block Bloom analytics](reference_blockbloom_analytics.md) — GA4 + Play scripts; ⛔reports lag 9 days; vitals 0 = no data
- [⭐⭐ FB: Block Bloom release flow](feedback_blockbloom_release_process.md) — release/vcNN cut from main; merge to main only once in production
- [⭐⭐ FB: Block Bloom daily JOURNAL](feedback_blockbloom_daily_journal.md) — 11 Oct 2026: day-to-day work goes in the notes repo D:/abc/Handover (journal/YYYY-MM-DD.md, branch journal), NOT the app repo; Ajay pushes/merges
- [⭐ Android target-API baseline](project_android_target_api_baseline.md) — portfolio toml + sync/preflight scripts; bump every FEBRUARY; Play warning counts every track; Kotlin 1.9.24 pins ads/Firebase/billing
- [⭐ Play Store publishing](project_play_store_publishing.md) — account ids, service account, upload keystore, API limits (no app-content API; first release via console); Jun–Jul 2026 history
- [Block Bloom original notes](project_blockbloom_game.md) — May–Jun 2026 architecture + emulator setup (stale versions; structure still right)
- [Game dev pipeline + Sortopia](project_game_dev_pipeline.md) — clone-BlockBloom scaffold; emulator E2E recipe (`-gpu host`, boot readiness, monkey launch)
- [Env: JDK loopback patch](env_android_gradle_loopback_fix.md) — WORK-LAPTOP quirk (AF_UNIX broken); apply only if `Selector.open()` fails on the new machine
- [Other games](other-games/) — [QuizMaster](other-games/project_quizmaster_app.md), [Ludo (Unity)](other-games/project_ludo_game.md), [Cricket (Godot plan)](other-games/project_cricket_game.md)
- [⭐ Ref: this laptop's environment](reference_personal_laptop_environment.md) — TODO placeholders: fill in paths, SDK, Node, where secrets and the handover folder live

## Working agreement (feedback — standing rules)
- [⭐⭐ FB: ASK before code changes](feedback_ask_before_code_changes.md) — never start edits Ajay didn't ask for; a "why" question is a question; propose → wait
- [⭐⭐ FB: Decide, don't ask](feedback_decide_dont_ask.md) — "continue"/"implement" after a recommendation = act, don't re-poll
- [⭐⭐ FB: Push back, cross-question](feedback_push_back_cross_question.md) — state impacts/conflicts + the alternative before closing a decision
- [⭐⭐ FB: How to collaborate](feedback_how_to_collaborate.md) — counter overcomplication / over-research / scope creep; one improvement at a time; teach the reasoning
- [⭐⭐ FB: Reduce Claude dependency](feedback_reduce_claude_dependency.md) — refuse micro-decisions; tool work only; redirect expression to humans
- [⭐⭐ FB: NEVER merge into master](feedback_never_merge_master.md) — set on the work repos 5 Oct 2026; for Block Bloom's `main` ask Ajay which reading applies
- [⭐⭐ Block Bloom HANDOVER folder](project_blockbloom_handover_2026_10.md) — built 10 Oct 2026 at D:/abc/Handover for the move to a personal laptop; what is inside, what was left out, decisions Ajay still owes
- [⭐⭐ Arrow Bloom (2nd game)](project_arrow_bloom.md) — the line-arrow game (winding lines, 3 hearts, up to 5 stars, shapes, light theme) on release/2026-10-20-line-arrows; vc3 DRAFT on internal + closed (alpha), vc1 live; runbook Part 9 = Ajay rolls out; read before any Arrow Bloom work
- [⭐⭐ Ref: Play API tracks.update gotcha](reference_play_api_track_update_gotcha.md) — PUT with only a draft DROPS the live release; carry live releases over; Block Bloom play-upload.js sends only the draft — check before next use
- [⭐⭐ FB: Worktree per requirement](feedback_worktree_per_requirement.md) — create the worktree FIRST; never chain checkout && pull
- [⭐⭐ FB: No agents for code checks](feedback_no_agents_for_code_checks.md) — even with ultracode ON: inline greps; ask before any fan-out
- [⭐⭐ FB: Session hygiene & usage](feedback_session_hygiene.md) — /clear per task, /compact at ~150k; sonnet for mechanical subagents; no self-initiated workflows
- [⭐⭐ FB: No exhaustive branch scans](feedback_no_exhaustive_branch_scans.md) — `git log --all -S` or ask
- [⭐ FB: One fix agent per finding](feedback_one_fix_agent_per_finding.md) — a Fix-phase workflow already edited the tree; re-read before a follow-up
- [⭐⭐ FB: Persist work to memory](feedback_persist_work_to_memory.md) — topic file + index line at the end of every substantive task (its canonical-dir sentence is stale: use this repo's slug)
- [⭐⭐ FB: Build exit codes](feedback_reading_build_exit_codes.md) — `cmd | tail; echo $?` is tail's code; log to a file, check the real exit, check the artefact mtime
- [⭐ FB: Heredoc eats regex escapes](feedback_heredoc_regex_escapes.md) — write regex scripts via the Write tool; back up + dry-run destructive scripts
- [FB: Branch-sync workflow](feedback_always_pull_latest.md) — pull before merge AND before build; push right after commit
- [FB: Appending to config files](feedback_appending_to_properties_files.md) — back up, force a separator, verify the seam
- [FB: Cherry-pick, don't merge back](feedback_branch_cherry_pick.md) — keep feature history clean
- [FB: Regression red flag](feedback_regression_red_flag.md) — additive by default; count callers before touching shared code
- [FB: Run tests before deploy](feedback_run_tests_before_deploy.md) — never rely on skip-tests
- [FB: No unrequested limits](feedback_no_unrequested_limits.md) — never cap what a job processes unless asked
- [FB: Measure batch jobs at scale](feedback_measure_batch_jobs_at_scale.md) — time it on real-size data before "done"
- [FB: Bash cwd in multi-repo work](feedback_bash_cwd_multi_repo.md) — every chain starts with an explicit cd

## User / personal
- [User profile](user_profile.md) — Ajay, Java backend ~4 yr; goals: architecture, then AWS; top priority technical communication
- [⭐ Personal finance & life](user_personal_finance_and_life.md) — read for personal, health or money chats
- [Communication program](project_communication_program.md) — 6-month practice from 28 Sep 2026; check in, don't redesign; review 21 Dec
- [Ref: Spending reports](reference_personal_spending_reports.md) — GPay → xlsx pipeline (scripts were in D:\abc\claude-tools on the work laptop)

## Reference (machine techniques; re-verify on this laptop)
- [⭐ Ref: Making .xlsx](reference_xlsx_generation_on_this_machine.md) — dependency-free Node OOXML writer `make-xlsx.js` (copy in the handover scripts folder)
- [⭐ Ref: PDF + Python](reference_pdf_and_python_on_this_machine.md) — Chrome headless `--print-to-pdf`; absolute forward-slash paths; verify with a screenshot
