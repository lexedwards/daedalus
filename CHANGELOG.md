# Changelog

## [0.7.0](https://github.com/lexedwards/daedalus/compare/v0.6.1...v0.7.0) (2026-11-27)


### Features

* **plugin:** discover skills and agents from their directories ([#52](https://github.com/lexedwards/daedalus/issues/52)) ([83e426f](https://github.com/lexedwards/daedalus/commit/83e426f9c624e6402771076025e414cad08a088a)), closes [#43](https://github.com/lexedwards/daedalus/issues/43)
* **skills:** add a principle for acting only on explicit authority ([#83](https://github.com/lexedwards/daedalus/issues/83)) ([a2d3e73](https://github.com/lexedwards/daedalus/commit/a2d3e731aed633ceeeef3c215d1f982bd960cd74)), closes [#66](https://github.com/lexedwards/daedalus/issues/66)
* **skills:** add a principle for treating content as data ([#79](https://github.com/lexedwards/daedalus/issues/79)) ([c2dcceb](https://github.com/lexedwards/daedalus/commit/c2dccebf9f06b36bd079cd967eb586f2d63d8b0f)), closes [#67](https://github.com/lexedwards/daedalus/issues/67)
* **skills:** add create-agent to own agent authoring ([#55](https://github.com/lexedwards/daedalus/issues/55)) ([8fa01eb](https://github.com/lexedwards/daedalus/commit/8fa01eb37231d1c38f62783ffac88d76ede7e127)), closes [#50](https://github.com/lexedwards/daedalus/issues/50)
* **skills:** add principle-prove-bugs-before-fixing ([#72](https://github.com/lexedwards/daedalus/issues/72)) ([7b95187](https://github.com/lexedwards/daedalus/commit/7b951874eac2c0710abd8a7b3fa8a5356fff6f61)), closes [#70](https://github.com/lexedwards/daedalus/issues/70)
* **skills:** apply the description rules to the remaining skills ([#74](https://github.com/lexedwards/daedalus/issues/74)) ([a6ed1f9](https://github.com/lexedwards/daedalus/commit/a6ed1f97d3ff226c32ec3f1ec3495884248ec4ba)), closes [#47](https://github.com/lexedwards/daedalus/issues/47)
* **skills:** make create-skill own skill maintenance and selection ([#49](https://github.com/lexedwards/daedalus/issues/49)) ([c5f24e1](https://github.com/lexedwards/daedalus/commit/c5f24e10fcd1b9d553b32393739fad75c2eb23a2)), closes [#42](https://github.com/lexedwards/daedalus/issues/42)
* **skills:** measure skill loads and request vocabulary from session history ([#54](https://github.com/lexedwards/daedalus/issues/54)) ([7b9d4b5](https://github.com/lexedwards/daedalus/commit/7b9d4b5fd41d9d61d54728e8071060bbce58e4a3)), closes [#44](https://github.com/lexedwards/daedalus/issues/44)
* **skills:** rewrite core workflow descriptions around trigger conditions ([#57](https://github.com/lexedwards/daedalus/issues/57)) ([0ed841a](https://github.com/lexedwards/daedalus/commit/0ed841a523e3a4f392ba35875f2dc449749a257a)), closes [#45](https://github.com/lexedwards/daedalus/issues/45)


### Bug Fixes

* make shipped skills and agents portable across harnesses ([#61](https://github.com/lexedwards/daedalus/issues/61)) ([47cec5b](https://github.com/lexedwards/daedalus/commit/47cec5bf0e3baf966bd1bd674a7847465f8d668c)), closes [#58](https://github.com/lexedwards/daedalus/issues/58)
* **skills:** make Claude load code-crafting and technical-writing on matching requests ([#60](https://github.com/lexedwards/daedalus/issues/60)) ([bbc1d9c](https://github.com/lexedwards/daedalus/commit/bbc1d9c94aec6e8df12bcdfbc8c2ea0b721e6322)), closes [#45](https://github.com/lexedwards/daedalus/issues/45)
* **skills:** use the AI label in the jira-epic label rule ([#82](https://github.com/lexedwards/daedalus/issues/82)) ([cbfa99b](https://github.com/lexedwards/daedalus/commit/cbfa99b3e09ea5e1fc7959a50fc6a080906751cf)), closes [#81](https://github.com/lexedwards/daedalus/issues/81)


### Documentation

* require shipped skills and agents to be portable ([#59](https://github.com/lexedwards/daedalus/issues/59)) ([a44442d](https://github.com/lexedwards/daedalus/commit/a44442d8ed7e520a870b690a6d86512f6c7e5146)), closes [#58](https://github.com/lexedwards/daedalus/issues/58)


### Refactoring

* **agents:** point the orchestrator at subagent contracts ([#77](https://github.com/lexedwards/daedalus/issues/77)) ([b90ed60](https://github.com/lexedwards/daedalus/commit/b90ed60c34d1daebac4c61aeb8c1ef0a5c6647fa)), closes [#65](https://github.com/lexedwards/daedalus/issues/65)
* **skills:** deduplicate tracker references ([#80](https://github.com/lexedwards/daedalus/issues/80)) ([9d19840](https://github.com/lexedwards/daedalus/commit/9d19840554926043989628ab463c1435f740ce64)), closes [#69](https://github.com/lexedwards/daedalus/issues/69)
* **skills:** give each duplicated rule one owner ([#71](https://github.com/lexedwards/daedalus/issues/71)) ([368ff54](https://github.com/lexedwards/daedalus/commit/368ff54282c4b1a72d95c7c8dc256fb1313d54fa)), closes [#46](https://github.com/lexedwards/daedalus/issues/46)
* **skills:** give the dependent-increment rule one owner ([#78](https://github.com/lexedwards/daedalus/issues/78)) ([27428b5](https://github.com/lexedwards/daedalus/commit/27428b598c7c10a8d592cee3fbe0c6c7e1416b9a)), closes [#64](https://github.com/lexedwards/daedalus/issues/64)
* **skills:** give worker-report evidence one owner ([#75](https://github.com/lexedwards/daedalus/issues/75)) ([44edd0b](https://github.com/lexedwards/daedalus/commit/44edd0bec1e915eec9771f6e11716052c209e73e)), closes [#63](https://github.com/lexedwards/daedalus/issues/63)
* **skills:** make decision-capture apply preserve-decision-context ([#76](https://github.com/lexedwards/daedalus/issues/76)) ([c9b891c](https://github.com/lexedwards/daedalus/commit/c9b891c0ee6abf99fc6afe02f42be11fe274e4aa)), closes [#62](https://github.com/lexedwards/daedalus/issues/62)
* **skills:** make evidence-before-verdicts own the finding standard ([#73](https://github.com/lexedwards/daedalus/issues/73)) ([66b0354](https://github.com/lexedwards/daedalus/commit/66b0354a02b7076811074c8853b900f8240a7231)), closes [#51](https://github.com/lexedwards/daedalus/issues/51)
* **skills:** trim automate-mechanics paraphrases ([#84](https://github.com/lexedwards/daedalus/issues/84)) ([e961fcc](https://github.com/lexedwards/daedalus/commit/e961fccce15675fc8d9ccec2fd58fffa1560f1b1)), closes [#68](https://github.com/lexedwards/daedalus/issues/68)


### Maintenance

* **skills:** remove the session history script ([#56](https://github.com/lexedwards/daedalus/issues/56)) ([c55e069](https://github.com/lexedwards/daedalus/commit/c55e0696fd62151fb935ec196fc3a97ef207cd43))

## [0.6.1](https://github.com/lexedwards/daedalus/compare/v0.6.0...v0.6.1) (2026-11-27)


### Bug Fixes

* **skills:** compose SDLC workflows at task transitions ([#40](https://github.com/lexedwards/daedalus/issues/40)) ([4bba43b](https://github.com/lexedwards/daedalus/commit/4bba43b13a4e1af282802befd7fba025f6d509b9))

## [0.6.0](https://github.com/lexedwards/daedalus/compare/v0.5.1...v0.6.0) (2026-11-05)


### Features

* **agents:** support isolated adversarial mutation experiments ([#37](https://github.com/lexedwards/daedalus/issues/37)) ([4d9de05](https://github.com/lexedwards/daedalus/commit/4d9de0594b39a16f1ad851bc0d0f6ef5336e5019)), closes [#36](https://github.com/lexedwards/daedalus/issues/36)

## [0.5.1](https://github.com/lexedwards/daedalus/compare/v0.5.0...v0.5.1) (2026-11-04)


### Bug Fixes

* **pr-delivery:** make PR descriptions reviewer summaries ([#34](https://github.com/lexedwards/daedalus/issues/34)) ([2037156](https://github.com/lexedwards/daedalus/commit/2037156ee71dfef665e340d6b0f72a8e059472fe)), closes [#33](https://github.com/lexedwards/daedalus/issues/33)

## [0.5.0](https://github.com/lexedwards/daedalus/compare/v0.4.0...v0.5.0) (2026-10-29)


### Features

* **plugins:** add Copilot marketplace and Claude and Cursor manifests ([#31](https://github.com/lexedwards/daedalus/issues/31)) ([0f25e0b](https://github.com/lexedwards/daedalus/commit/0f25e0b74e03ad4c2e970709a247d043cb51d96c))

## [0.4.0](https://github.com/lexedwards/daedalus/compare/v0.3.0...v0.4.0) (2026-10-24)


### Features

* **skills:** align workflow standards through focused principles ([#30](https://github.com/lexedwards/daedalus/issues/30)) ([f6696ba](https://github.com/lexedwards/daedalus/commit/f6696ba8fc8c8f9722e57bbe02187a03e06281f6))
* **skills:** define investigation completion gates ([#23](https://github.com/lexedwards/daedalus/issues/23)) ([dcb8801](https://github.com/lexedwards/daedalus/commit/dcb88013cba9e3aa4344eafe8e07b23b36a41db3))
* **skills:** validate build-versus-adopt assumptions ([#24](https://github.com/lexedwards/daedalus/issues/24)) ([49da2fc](https://github.com/lexedwards/daedalus/commit/49da2fc55a9ea05f92478de82b2956679210ff2c))
* **skills:** verify stateful workflow handoffs ([#22](https://github.com/lexedwards/daedalus/issues/22)) ([bbc5c7e](https://github.com/lexedwards/daedalus/commit/bbc5c7eaca013932758c072f3c2f456425b36e66))

## [0.3.0](https://github.com/lexedwards/daedalus/compare/v0.2.0...v0.3.0) (2026-10-22)


### Features

* **ci:** automate checks and release pull requests ([#13](https://github.com/lexedwards/daedalus/issues/13)) ([ea49d6e](https://github.com/lexedwards/daedalus/commit/ea49d6ea50a2b503fb7420533234e889822737df))
* **skills:** add approval-gated session retrospectives ([#17](https://github.com/lexedwards/daedalus/issues/17)) ([e392f38](https://github.com/lexedwards/daedalus/commit/e392f384413e6887b540891a4ef7593d85e74497))
* **skills:** automate repeatable mechanics across workflows ([#15](https://github.com/lexedwards/daedalus/issues/15)) ([15c9f97](https://github.com/lexedwards/daedalus/commit/15c9f97eef9658450cd8b2ef1df74c391db2126a))


### Bug Fixes

* **lint:** exclude the generated root changelog ([#18](https://github.com/lexedwards/daedalus/issues/18)) ([68115a4](https://github.com/lexedwards/daedalus/commit/68115a40fced198ee68e82b2a38bf818f1939d30))
