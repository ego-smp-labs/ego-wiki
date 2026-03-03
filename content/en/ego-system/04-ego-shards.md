---
title: Ego Shards
description: Shard Slot mechanism — equip shards to receive hidden powers.
order: 4
---

# Ego Shards

> *"Each shard is a residual fragment, violently torn from a shattered soul. Bind them —
> and submerge yourself into a power that has long forsaken the boundaries of humanity."*

The Shard Slot is a special vessel, allowing you to equip **Ego Shards**
to receive abyssal combat effects. Each shard is the remains of a **true self** —
not a legend, but an imprisoned agony trapped in matter.

---

## Unlocking
- A seal is the hidden power within your ego, allowing you to inherit the ego of others.

| Tier | Seal Unlocked |
|------|--------------:|
| < 3  | None ❌ |
| 3+ | **1 Seal** (Slot 1 — left) |
| 6+   | **2 Seals** (Slot 1 + Slot 2) |

- Locked seal → displays **red glass** 🔒 (cannot interact)
- Unlocked but empty → displays **gray glass** (empty)

- Can be viewed in `/ego`

---

## Activation

| Slot | Activation Keybind |
|---|---|
| Slot 1 (left) | **SHIFT + LEFT CLICK** |
| Slot 2 (right) | **SHIFT + RIGHT CLICK** |

> ⚔️ **Active Shards** require holding a **melee weapon**
> (sword, axe, mace) to activate (or some special conditions).
> **Passive Shards** always operate in the background when equipped, regardless of slot position.

---

## Equipping

- **Right-click** with Shard in hand to equip.
- If a seal is occupied, you will be asked if you want to replace it.
- If both seals are full: **sneak + right-click** to select seal 1, **sneak + Shift+Right-click** to select seal 2.
- **Cannot** place Shards in chests, barrels, shulkers, or any container (automatically drops out).

---

## Uniqueness

Each type of Shard exists **ONE AND ONLY ONE** across the entire server.

- The shard holder becomes a **hunted target**.
- When holder dies → shard **vanishes forever** (does not drop).
- After death → shard can be **reforged** at the Cursed Crafting Table.
- When reforging → **location is revealed** to the whole server.

---

## Shard List

> All Shards require **[Tier 3+](/en/wiki/ego-system/tier-system)** to equip and activate.
> Forge at **[Cursed Crafting Table](/en/wiki/items/cursed-crafting)** — see more [Forging Mechanics](/en/wiki/advanced/forging).

| Shard | Type | Tier | Effect | Cooldown / Condition |
|---------|------|------|-----------|----------------------|
| [🗡️ Hidden Blade Shard](#hidden-blade-shard) | Passive | 3+ | 20% chance to reflect 15% melee damage + Poison for 3s | Always active |
| [🩸 Blood Wolf Shard](#blood-wolf-shard) | A/P | 3+ | Passive: HP < 30% → x3 dmg (5s). Active: Blood-red aura & Rage boost (1 min). | Passive: On hit. Active: CD 10m |
| [🌑 Nameless Shard](#nameless-shard) | Active | 3+ | Abyssal silence: True invisibility & hides armor for 8 mins (Anonymous kill) | CD 15 min |
| [🌘 Blood Shadow Shard](#blood-shadow-shard) | Active | 3+ | Dash 8 blocks + Invisibility. 3 Charges with escalating buffs (Regen, Max HP Boost). Leaves a toxic Abyssal trail. | 3 Charges, CD 60s |
| [💀 Mad Sound Shard](#mad-sound-shard) | A/P | 3+ | Passive: Sonic Boom. Active(15s): 20% Warden curse(10s) + spawns Shrieker on kill | P.CD: 30s. A.CD: 30s |
| [☁️ Sky Pride Shard](#sky-pride-shard) | Active | 3+ | Pierce the sky 10 blocks + Enforce targets (10-block radius) to bow for 3s | CD 60s |
| [🍖 Flesh Devourer Shard](#flesh-devourer-shard) | A/P | 3+ | Passive: True DMG Bleed + Regen III. Active: Steal Max HP | P: Melee. A: CD 10m |

---

## Visual Effects (VFX)

- **When equipped**: All players equipping a Shard will have subtle ambient particles orbiting them, with colors matching the specific Shard type.
- **When activated**: Each Shard (both Passive and Active) has distinct particle effects upon activation. (e.g., Hidden Blade emits black dust around the attacker when reflecting damage, Blood Shadow leaves a smoke trail while dashing).

---

## Forging Recipes

> All forged at [Cursed Crafting Table](/en/wiki/items/cursed-crafting).
> Ingredients are chosen based on the **essence** of each bearer — every recipe tells a story.

---

<ItemCard id="hidden-blade-shard" name="Hidden Blade Shard" image="/wiki/shard/shard_tang_kiem.jpg" rarity="rare">

> *"The deadliest blade is the one never unsheathed.
> By the time you realize, it is already drenched in your own blood."*

Hidden Blade was a wandering swordsman who never bothered with a weapon.
The realm spat upon his empty hands until he breached the forbidden palace,
and departed holding the sovereign's severed head.
He never needed to forge steel, for **his condensed killing intent was the ultimate edge**.
He met his demise not by subjugation, but because his own abyssal malice
severed his life thread — extinguishing his mortal coil
in a single, silent blink.

- Requires **Tier 3+** to seal and awaken.
- **Curse (Passive)**: A **20% probability** to rebound **15% melee suffering** back to the aggressor. Upon impact, the attacker is cursed with **Poison III for 3 seconds**. When your flesh bleeds, the enemy shares the abyssal backlash.
- **Latent** when sealed.

| | Col 1 | Col 2 | Col 3 |
|---|:---:|:---:|:---:|
| Row 1 | Prismarine Shard ×16 | Netherite Sword ×1 | Prismarine Shard ×16 |
| Row 2 | Netherite Sword ×1 | **[Dark Ego Sealing Vessel](https://ego.sabicoder.xyz/en/wiki/items/ego-items)** | Enchanted Book (Thorns III) ×1 |
| Row 3 | Prismarine Shard ×16 | Netherite Sword ×1 | Prismarine Shard ×16 |

> 🔮 **Ingredient lore**: Prismarine Shard = hidden sharpness beneath the ocean (concealed intent), Netherite Sword = the blade never drawn, Thorns III = the philosophy of retaliation.

- **Souls**: 1 · **Time**: 5 min

</ItemCard>

---

<ItemCard id="blood-wolf-shard" name="Blood Wolf Shard" image="/wiki/shard/shard_huyet_lang.jpg" rarity="epic">

> *"The metallic taste of crimson... That is the solitary line separating you from frail prey."*

Blood Wolf was once a mortal. Or at least, bore a mortal vessel,
before an endless famine devoured his final thread of sanity.
He blindly hunted within the abyssal woods, devoid of hatred, uncaring of power —
driven solely by the hot vitae that bestowed the illusion of living.
The deeper he bathed in gore, the more tyrannical he became. When no flesh remained to rend,
he succumbed to madness and devoured his own.

- Requires **Tier 3+** to seal and awaken.
- **Curse (Passive)**: When Life Force **< 30%** and struck → **30% probability** to erupt with **x3 melee damage** for **5 seconds**.
- **Dominion (Active)**: Instantly consumed by a **crimson incandescence**, an **Explosion of Ki (+200% Strength II)** and **Speed II** for **1 minute**. Slumber time: **10 minutes**.
- Passive eruption is accompanied by blood-stained phantoms (boiling vitae — killing intent).

| | Col 1 | Col 2 | Col 3 |
|---|:---:|:---:|:---:|
| Row 1 | Bone Block ×16 | Crimson Fungus ×16 | **Blood Wolf's Memory Fragment** |
| Row 2 | Crimson Fungus ×16 | **[Dark Ego Sealing Vessel](https://ego.sabicoder.xyz/en/wiki/items/ego-items)** | Crimson Fungus ×16 |
| Row 3 | Bone Block ×16 | Crimson Fungus ×16 | Bone Block ×16 |

> 🔮 **Ingredient lore**: Bone Block = bones of prey, Crimson Fungus = blood-red Nether fungus (bloodlust), Memory Fragment = die from starvation during Ego (hunger devours).

- **Memory Fragment**: Die of starvation when Food Bar is 0 while in Ego/Dark Ego state.
- **Souls**: 1 · **Time**: 5 min

</ItemCard>

---

<ItemCard id="nameless-shard" name="Nameless Shard" image="/wiki/shard/shard_vo_thanh.jpg" rarity="epic">

> *"I do not dwell in the shadows. I care not for escape.
> I simply... unbind the shackles of my presence before your very eyes."*

The Nameless One was not purged by history's ink — he **eradicated his own ego first**.
This was no mortal illusion of invisibility, but a dark art
**draining his existence from all sentient senses** —
not a single figure harbored the memory of his visage, no ear retained the echo of his voice.
In his final twilight, he dissolved in broad daylight. Silent annihilation.

- Requires **Tier 3+** to seal and awaken.
- **Dominion (Active)**: Upon awakening → **Plunge into absolute stillness, concealing your armor and being for 8 minutes**. Any soul that perishes by your hand will only witness a tragedy claimed by **THE NAMELESS**.
- Your armor emerges unscathed when parting from this state, or ascending from the realm.
- **Slumber time**: **15 minutes**.

| | Col 1 | Col 2 | Col 3 |
|---|:---:|:---:|:---:|
| Row 1 | Fermented Spider Eye ×16 | Phantom Membrane ×16 | Fermented Spider Eye ×16 |
| Row 2 | Phantom Membrane ×16 | **[Dark Ego Sealing Vessel](https://ego.sabicoder.xyz/en/wiki/items/ego-items)** | Phantom Membrane ×16 |
| Row 3 | Fermented Spider Eye ×16 | Ink Sac ×32 | Fermented Spider Eye ×16 |

> 🔮 **Ingredient lore**: Fermented Spider Eye = THE vanilla invisibility potion ingredient (!), Phantom Membrane = unseen predators that appear only when you don't sleep, Ink Sac = ink that erases names — erasing identity.

- **Souls**: 1 · **Time**: 8 min

</ItemCard>

---

<ItemCard id="blood-shadow-shard" name="Blood Shadow Shard" image="/wiki/shard/shard_anh_nguyet.jpg" rarity="mythic">

> *"I was never standing here. Mundane dust bears no footprint of mine.
> But your life essence... weathered away long before."*

Blood Shadow is the solitary silent phantom whose true face remains unseen.
His ledger of the deceased stretches further than any recorded diabolical butcher —
yet devoid of a single surviving spectator.
Zealots whisper he does not traverse through the physical plane — he **phases through the abyssal dimension**.
He faded from the river of time in its truest literal sense.
No tomb. No title. Only an ego shard left behind,
frigid as a shattered sky and fleeting as a reaper's scythe.

- Requires **Tier 3+** to seal and awaken.
- **Dominion (Active)**: Awakens a **3-Charge Dash** system, each dash transversing the void **8 blocks**:
  - **Charge 1**: Merge with the darkness (Invisibility) for **5 seconds**.
  - **Charge 2**: Darkness extends to **10 seconds**, accompanied by healing **Regen I (2s)**.
  - **Charge 3**: Absolute silence for **15 seconds**, granting **Regen III (5s)** and stimulating survival instincts for **+20 Max HP (30 seconds)**.
- **Abyssal Curse**: Each dash leaves behind a ruptured trail of abyssal smoke. Any unfortunate entity caught in this path will be afflicted by **Wither II, Poison, Nausea, and Blindness for 3 seconds**.
- **Slumber time**: **60 seconds** after exhausting the 3rd charge.

| | Col 1 | Col 2 | Col 3 |
|---|:---:|:---:|:---:|
| Row 1 | Ender Pearl ×8 | Wither Rose ×8 | Ender Pearl ×8 |
| Row 2 | Wither Rose ×8 | **[Dark Ego Sealing Vessel](https://ego.sabicoder.xyz/en/wiki/items/ego-items)** | Enchanted Book (Wind Burst III) ×1 |
| Row 3 | Ender Pearl ×8 | Wither Rose ×8 | Ender Pearl ×8 |

> 🔮 **Ingredient lore**: Ender Pearl = phase through space (shadow teleportation), Wither Rose = death flower that grows on corpses (only drops when Wither kills mobs — **extremely rare**), Wind Burst III = wind dash tome from Trial Chambers.

- **Souls**: 1 · **Time**: 5 min · *Location revealed*

</ItemCard>

---

<ItemCard id="mad-sound-shard" name="Mad Sound Shard" image="/wiki/shard/shard_cuong_thanh.png" rarity="mythic">

> *"This frequency was never meant to grace your ears.
> It was born... to sever your very existence."*

Mad Sound lost his entire world in a single, deadly quiet night — lineage, dignity, and mind.
He stood motionless on the desolate ruins and **roared** — a frequency alienated from humanity,
of an entity that had severed ties with mortality.
Lingering phantoms were swept aside like withered leaves in a maelstrom.
The world dared not execute him, for none could approach near enough to strike.
He departed in utter silence — the most tragic reality he never actively chose.

- Requires **Tier 3+** to seal and awaken.
- **Curse (Passive)**: Enduring close-quarters torment unleashes an aftershock (**Sonic Boom**) that repels enemies **5 blocks**. **Passive Slumber**: **30 seconds**.
- **Dominion (Active)**: For **15 seconds**, every slash wields a **20% probability** to drown the target in darkness **Warden (Darkness + Nausea)** for **10 seconds**. Any entity that perishes in this fleeting moment will sacrifice itself to birth a **Sculk Shrieker**.
- **Slumber time**: **30 seconds**.

| | Col 1 | Col 2 | Col 3 |
|---|:---:|:---:|:---:|
| Row 1 | Sculk Shrieker ×1 | Echo Shard ×16 | Sculk Shrieker ×1 |
| Row 2 | Echo Shard ×16 | **[Dark Ego Sealing Vessel](https://ego.sabicoder.xyz/en/wiki/items/ego-items)** | Echo Shard ×16 |
| Row 3 | Sculk Shrieker ×1 | **Mad Sound's Memory Fragment** | Goat Horn ×1 |

> 🔮 **Ingredient lore**: Sculk Shrieker = the shriek that shattered reality, Echo Shard = echoes of lost sanity, Goat Horn = the primal scream, Memory Fragment = die near a Shrieker during Ego (the final scream).

- **Memory Fragment**: Die while in Ego/Dark Ego state near a Sculk Shrieker (5 block radius). The Shrieker has a 50% chance to explode and drop this fragment.
- **Souls**: 1 · **Time**: 5 min

</ItemCard>

---

<ItemCard id="sky-pride-shard" name="Sky Pride Shard" image="/wiki/shard/shard_ngao_thien.jpg" rarity="mythic">

> *"The filth lodged beneath my heel is the basest of existence.
> This mortal realm is unworthy. My true throne sits upon the highest zenith."*

Sky Pride is the sovereign who shunned kneeling — even to deities.
He constructed a spire so colossal that storm clouds were forced to yield.
Yet when his hubris reached its apex and the spire collapsed,
he did not plummet to the abyss — ironically, that sheer arrogance **propelled him straight into the heavens**,
as if the filthy earth refused to embrace his corporeal form.
The world excavated fruitlessly for his corpse.
Perhaps he still wanders the eternal firmament —
or breached limits that the egoless never dared utter aloud.

- Requires **Tier 3+** to seal and awaken.
- **Dominion (Active)**: Shatter gravity, propelling into the void **10 blocks**. Resist the crushing pressure with **Resistance I** for 2 seconds. The inferior terrestrial lifeforms trapped within a 10-block radius (piercing vertical space) will be forcibly afflicted by **Submission**, bowing their heads in reverence to the floor for 3 seconds amidst fading ash.
- **Slumber time**: **60 seconds**.

| | Col 1 | Col 2 | Col 3 |
|---|:---:|:---:|:---:|
| Row 1 | Wind Charge ×16 | Emerald Block ×8 | Wind Charge ×16 |
| Row 2 | Slime Block ×16 | **[Dark Ego Sealing Vessel](https://ego.sabicoder.xyz/en/wiki/items/ego-items)** | Slime Block ×16 |
| Row 3 | Wind Charge ×16 | Breeze Rod ×16 | Wind Charge ×16 |

> 🔮 **Ingredient lore**: Wind Charge = defying wind itself, Breeze Rod = rare wind essence from Breeze (**Trial Chambers — extremely rare**), Slime Block = the earth rejects him — bouncing him skyward, Emerald Block = the emperor's wealth and arrogance.

- **Souls**: 1 · **Time**: 5 min · *Location revealed*

</ItemCard>

---

<ItemCard id="flesh-devourer-shard" name="Flesh Devourer Shard" image="/wiki/shard/shard_ke_nuot_tron.gif" rarity="mythic">

> *"The biting cold of the flesh is not as terrifying as the scream of the stomach. 
> You will never understand... how warm the flesh of your kind truly is."*

The Flesh Devourer was not born a demon. He was once a great traveler trapped in the blizzard of the ages. When food ran out and companions fell to the cold, survival defeated humanity. He began to eat. First the cold corpses, then the dying...

A soul cursed by an endless hunger, a cannibal surviving amidst the white disaster.

- Requires **Tier 3+** to seal and awaken.
- **Curse (Passive)**: Bloodletting — Enemies suffering melee damage have a chance to bleed (True Damage), while granting you Regen III. Bleeding targets suffer Hunger II. The shard bearer must endure an eternal starvation (Hunger I) draining their energy.
- **Dominion (Active)**: Devourer's Bite — The next melee strike (within 5s) will **permanently steal the victim's Max HP** and add it to your own (max +20 HP bonus). If the bearer or the victim perishes, the stolen/lost Max HP is restored.
- **Slumber time**: **10 minutes**.

| | Col 1 | Col 2 | Col 3 |
|---|:---:|:---:|:---:|
| Row 1 | Rotten Flesh ×32 | Spider Eye ×32 | Rotten Flesh ×32 |
| Row 2 | Bone ×32 | **[Dark Ego Sealing Vessel](https://ego.sabicoder.xyz/en/wiki/items/ego-items)** | Bone ×32 |
| Row 3 | Rotten Flesh ×32 | **Devourer's Memory Fragment** | Spider Eye ×32 |

> 🔮 **Ingredient lore**: Rotten Flesh & Bone = The putrefied remains of victims, Spider Eye = The venom of physical torment, Memory Fragment = Harvested from souls incinerated by vitality drain.

- **Souls**: 1 · **Time**: 5 min · *Location revealed*

</ItemCard>

---

## 🔮 Ego Purification Ritual (Shard Extraction)

Because Shards represent Sins deeply rooted in your subconscious, you cannot remove them like normal equipment. To unequip, you must perform an agonizing ritual.

### Ego Purification Ritual
This item requires you to place 1 **Purification Stone** at the center of a normal Crafting Table, surrounded by 8 **Sculk** blocks.

1. Hold the **Ego Purification Ritual** in your hand and **Right-Click**.
2. The purification magic will tear out the Sins (Shards) you have equipped and **drop them on the ground**.
3. **The Price**: You will receive fatal purification damage, resulting in **instant death** (bypasses Totems) and your **Tier resets to 1**.
> **Note**: You will NOT drop your Ego since this is not PvP death; your Ego remains safe in your inventory. Server broadcast: *"&lt;player&gt; was consumed by their own ego"*.

---

## See Also

- → [Cursed Crafting Table](/en/wiki/items/cursed-crafting)
- → [Cursed Recipes](/en/wiki/items/cursed-recipes)
- → [Forging Mechanics (Advanced)](/en/wiki/advanced/forging)
- → [Tier System](/en/wiki/ego-system/tier-system)
- → [Sacrifice — Hearts & Shards](/en/wiki/ego-system/sacrifice)
- → [Dark Ego](/en/wiki/ego-system/dark-ego)
- → [Tainted Ego](/en/wiki/items/ego-items#tainted-ego)
- → [Memory Fragments](/en/wiki/ego-system/memory-fragments)
