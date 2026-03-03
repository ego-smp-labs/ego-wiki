---
title: Bloodmoon
description: Nightmarish event—ferocious mobs, hell traps, boss behaviors with OP gear. Survive or shatter?
order: 7
---

<ItemCard id="bloodmoon" name="Bloodmoon" image="/wiki/events/bloodmoon.png" rarity="legendary">

**Bloodmoon**—when the moon drips with the blood of shattered souls.  
Monsters awaken from the abyss, armed with endgame gear, casting deadly curses. Compass points to loot... or your grave!

> **[Boss Actions](./bloodmoon-actions)** | **[Loot Gear](./bloodmoon-items)** | **[EGOSMP Synergy](./bloodmoon-egosmp)**

</ItemCard>

## Prologue: Curse Under Crimson Moon (Intro Lore)

**Centuries ago, under the first Bloodmoon, an ancient god was torn apart by humanity's sins. Divine blood seeped into the earth, rousing monsters—not to hunt, but to test: who deserves survival?**

EGOSMP revives that nightmare. Each Bloodmoon, the server quakes: mobs x2 strength, mining ambushes, bosses summoning hordes. Rare [EGO] loot tempts, but at life's cost. Ready?

## Activation & Duration (Triggers & Duration)

| Factor | Details |
|--------|---------|
| **Chance** | 10-20% nightly (`bloodmoon-chance: 15`) |
| **Duration** | Full night (no sleep, `prevent-sleep: true`) |
| **Alert** | Title "&4BLOODMOON RISES", subtitle "BEWARE!", dragon death sound |
| **End** | Title "&aBLOODMOON FADES", toast complete sound |

## Comprehensive Mob Buffs (Full Mob Buffs)

| Mob | HP/Dmg | Special |
|-----|--------|---------|
| **Zombie** | x2 HP, x1.5 dmg | Random weapons/armor, door-breaking |
| **Skeleton** | x1.5 HP, x2 speed | Fire arrows (ignites) |
| **Creeper** | x3 power | Fire explosion spread |
| **Spider** | x1.5 HP | Poison II, faster walls |
| **Enderman/Ghast** | Nether/End spawn OW | Aggressive teleport, homing fireballs |
| **All** | x2 spawn, x3 XP/loot | Block-breaking toward players |

## Mining Traps Detailed (Mob-in-Block)

Mine → % instant mob ambush!

| Block | % | Mob | Note |
|-------|---|-----|------|
| **STONE** | 10% | SILVERFISH | Swarm horror |
| **MAGMA_BLOCK** | 100% | MAGMA_CUBE | Melting leap |
| **DEEPSLATE** (custom) | 15% | ENDERMITE | Tele-harass |
| **NETHERRACK** (custom) | 20% | ZOMBIE_PIGLIN | Sword rush |

## Boss Behaviors Table (Actions)

Mobs act like bosses: % trigger events.

| Action | Events | Effect |
|--------|--------|--------|
| **strike-lightning** | lightning r=6-10 | Player bolt strike |
| **swap-spell** | swap + "Blood Moon Devours!" | Position swap + curse |
| **reinforcements** | Zombie x2 r=10 + "Aid me!" | Horde summon |
| **potion** | Blindness 20s lvl2 (50%) | Chaos debuffs (hunger/nausea/jump) |
| **firewarden-messages** | Taunts (20%) | "Fool!", "KAPOW!", "Burn!" |
| **death** | Instant-kill + "Impossible?!" | One-shot |

## Full [EGO] Loot Table (Boss Gear)

20-30% drop rate:

| Item | Material/Enchants | [EGO] Name | Rarity |
|------|-------------------|------------|--------|
| Helmet | Diamond Prot4 Thorns3 | [EGO] Blood Helm | Epic |
| Chestplate | Diamond Prot4 Thorns3 | [EGO] Blood Plate | Epic |
| Leggings/Boots | Diamond Prot4 Thorns3 | [EGO] Hell Legs/Boots | Epic |
| Zombie Sword | Diamond Sharp5 Fire2 | [EGO] Blood Blade | Legendary |
| Bow | Power5 | [EGO] Soul Piercer | Rare |
| Skelly Chest | Gold Prot4 Thorns3 | [EGO] Bone Plate | Rare |
| Wither Sword | Gold Sharp2 | [EGO] Wither Edge | Rare |
| Super Stick | Stick Sharp5 | [EGO] Hell Stick | Epic |

## EGOSMP Integration (Synergy Table)

| Feature | Bloodmoon Boost |
|---------|-----------------|
| **7 Deadly Sins** | CD /2, +20% dmg, 50% debuff resist |
| **High Tier** | Lightning/potion resist +tier%, x2 Death Shard |
| **Shard Hunt** | Radar x2 range, mobs target holders |
| **PvP Meta** | Night raids for gear → sin upgrades |

**Commands**: `/bloodmoon reload` | Force `/bloodmoon start` | Follow compass!

Smart play: Squad epicenter raids, sin holders farm shards!

---