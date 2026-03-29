# Content review (Phase 2 migration)

This review captures copied source quirks intentionally preserved during migration.

## Suspected typos

1. `Word sponor` (hero CTA label)
2. `•• Logo op onze website ...` style duplicate bullet pattern in Sponsoring `Pakket 3` source row
3. Repeated benefits in Sponsoring `Pakket 3` (same two bullets appear twice)

## Questionable labels

1. `Donatiecategorie` vs package naming may be less clear for some visitors
2. `Vrije donatie` with threshold label `< € 500` may be interpreted as strict cap
3. `Laat een bericht achter via het formulier...` in Contact intro while no form is implemented in phase 1/2

## Copied WordPress artifacts (for possible cleanup later)

1. Contact intro still references a form that does not exist in this rebuild
2. Sponsoring row keeps dense legacy bullet wording and structure copied from WP table output
3. Sponsor links include a long UTM-heavy Broekhuis URL copied from source
4. Gallery photographer captions (`BDF`, `JPA`, `WK`) are abbreviations without explanatory context
