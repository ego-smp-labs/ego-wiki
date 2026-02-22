---
title: Ego Shards
description: Shard Slot mechanism — equip shards to receive hidden powers.
order: 4
---

# Ego Shards

> *"Each shard is a piece of soul torn apart. Assemble them —
> and you will become something no longer human."*

The Shard Slot is a special vessel, allowing you to equip **Ego Shards**
to receive combat effects. Each shard is the remains of a **true self** —
not a legend, but a memory imprisoned in matter.

---

## Unlocking
- A seal is the hidden power within your ego, allowing you to inherit the ego of others.

| Tier | Seal Unlocked |
|------|--------------:|
| &lt; 3  | None ❌ |
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
| [🗡️ Hidden Blade Shard](#️-hidden-blade-shard) | Passive | 3+ | 20% chance to reflect 15% melee damage | Always active |
| [🩸 Blood Wolf Shard](#🩸-blood-wolf-shard) | Passive | 3+ | &lt;30% HP → 30% chance: x3 dmg for 5s | Triggers when hit |
| [🌑 Nameless Shard](#-nameless-shard) | Active | 3+ | Full invisibility 5 minutes | CD 10 min |
| [🌘 Blood Shadow Shard](#-blood-shadow-shard) | Active | 3+ | Dash 8 blocks + Invisibility 3s | CD 30s |
| [💀 Mad Sound Shard](#-mad-sound-shard) | Passive | 3+ | Retaliatory Sonic Boom when hit | CD 30s |
| [☁️ Sky Pride Shard](#️-sky-pride-shard) | Active | 3+ | Launch straight up 10 blocks | CD 60s |

---

## Forging Recipes

> All forged at [Cursed Crafting Table](/en/wiki/items/cursed-crafting).
> Ingredients are chosen based on the **essence** of each bearer — every recipe tells a story.

---

<ItemCard id="hidden-blade-shard" name="Hidden Blade Shard" image="/wiki/shard/shard_tang_kiem.jpg" rarity="rare">

> *"The sharpest blade is the one never drawn.
> Unless it is already at your throat."*

Hidden Blade was a swordsman who never carried a weapon.
People laughed at him until he walked into the imperial palace empty-handed,
and walked out with the emperor's head.
He didn't need to forge a blade, because **his killing intent was the sharpest edge**.
He died not by being defeated, but because his own will
severed his own life force — he killed himself
with just a blink of an eye.

- Requires **Tier 3+** to equip and activate.
- **Effect (Passive)**: **20% chance** to reflect **15% melee damage** back to the attacker. When you take damage, the enemy has a chance to take a portion of the damage back.
- **Always active** when equipped.

| | Col 1 | Col 2 | Col 3 |
|---|:---:|:---:|:---:|
| Row 1 | Prismarine Shard ×16 | Netherite Sword ×1 | Prismarine Shard ×16 |
| Row 2 | Netherite Sword ×1 | **Dark Ego Soul** | Enchanted Book (Thorns III) ×1 |
| Row 3 | Prismarine Shard ×16 | Netherite Sword ×1 | Prismarine Shard ×16 |

> 🔮 **Ingredient lore**: Prismarine Shard = hidden sharpness beneath the ocean (concealed intent), Netherite Sword = the blade never drawn, Thorns III = the philosophy of retaliation.

- **Souls**: 1 · **Time**: 5 min

</ItemCard>

---

<ItemCard id="blood-wolf-shard" name="Blood Wolf Shard" image="/wiki/shard/shard_huyet_lang.jpg" rarity="epic">

> *"The smell of blood. It is the only thing separating you from prey."*

Blood Wolf was once human. Or at least, he looked like one
before hunger devoured the last boundary.
He hunted in the deep forest, not out of hatred, not for power —
only because hot blood made him feel alive.
The more he bled, the stronger he grew. When no creature remained to tear apart,
he went mad and tore himself apart.

- Requires **Tier 3+** to equip and activate.
- **Effect (Passive)**: When HP **&lt; 30%** and hit → **30% chance** to activate **x3 melee damage** for **5 seconds**.
- Triggers with red particle effects (boiling blood — killing intent).

| | Col 1 | Col 2 | Col 3 |
|---|:---:|:---:|:---:|
| Row 1 | Bone Block ×16 | Crimson Fungus ×16 | **Blood Wolf's Memory Fragment** |
| Row 2 | Crimson Fungus ×16 | **Dark Ego Soul** | Crimson Fungus ×16 |
| Row 3 | Bone Block ×16 | Crimson Fungus ×16 | Bone Block ×16 |

> 🔮 **Ingredient lore**: Bone Block = bones of prey, Crimson Fungus = blood-red Nether fungus (bloodlust), Memory Fragment = die from starvation during Ego (hunger devours).

- **Memory Fragment**: Die of starvation when Food Bar is 0 while in Ego/Dark Ego state.
- **Souls**: 1 · **Time**: 5 min

</ItemCard>

---

<ItemCard id="nameless-shard" name="Nameless Shard" image="/wiki/shard/shard_vo_thanh.jpg" rarity="epic">

> *"I am not hiding. I am not running.
> I simply... no longer exist in your eyes."*

The Nameless One was not erased by history — he **erased himself first**.
Not invisible in the usual sense, but he learned to
**withdraw from the perception of everyone around** —
no one remembers his face, no one hears his voice.
He sat in the crowded court, watching the king take everything from him,
and smiled — because he knew the time would come to disappear completely.
At the end of his life, he left in broad daylight. No one noticed.

- Requires **Tier 3+** to equip and activate.
- **Effect (Active)**: On activation → **Complete invisibility for 5 minutes**.
- **Cooldown**: **10 minutes**.

| | Col 1 | Col 2 | Col 3 |
|---|:---:|:---:|:---:|
| Row 1 | Fermented Spider Eye ×16 | Phantom Membrane ×16 | Fermented Spider Eye ×16 |
| Row 2 | Phantom Membrane ×16 | **Dark Ego Soul** | Phantom Membrane ×16 |
| Row 3 | Fermented Spider Eye ×16 | Ink Sac ×32 | Fermented Spider Eye ×16 |

> 🔮 **Ingredient lore**: Fermented Spider Eye = THE vanilla invisibility potion ingredient (!), Phantom Membrane = unseen predators that appear only when you don't sleep, Ink Sac = ink that erases names — erasing identity.

- **Souls**: 1 · **Time**: 5 min

</ItemCard>

---

<ItemCard id="blood-shadow-shard" name="Blood Shadow Shard" image="/wiki/shard/shard_anh_nguyet.jpg" rarity="mythic">

> *"I am not here. I was never here.
> But you are already dead."*

Blood Shadow is the only assassin no one has ever seen the face of.
His victim list is longer than any butcher in history —
but there are no living witnesses.
They say he does not move through space — he **phases through darkness**.
He vanished from history literally.
No grave. No name. Only fragments of an ego left
cold as night and swift as death.

- Requires **Tier 3+** to equip and activate.
- **Effect (Active)**: Dash forward **8 blocks** + gain **Invisibility 3 seconds**.
- **Cooldown**: **30 seconds**.

| | Col 1 | Col 2 | Col 3 |
|---|:---:|:---:|:---:|
| Row 1 | Ender Pearl ×8 | Wither Rose ×8 | Ender Pearl ×8 |
| Row 2 | Wither Rose ×8 | **Dark Ego Soul** | Enchanted Book (Wind Burst III) ×1 |
| Row 3 | Ender Pearl ×8 | Wither Rose ×8 | Ender Pearl ×8 |

> 🔮 **Ingredient lore**: Ender Pearl = phase through space (shadow teleportation), Wither Rose = death flower that grows on corpses (only drops when Wither kills mobs — **extremely rare**), Wind Burst III = wind dash tome from Trial Chambers.

- **Souls**: 1 · **Time**: 5 min · *Location revealed*

</ItemCard>

---

<ItemCard id="mad-sound-shard" name="Mad Sound Shard" image="/wiki/shard/shard_cuong_thanh.png" rarity="mythic">

> *"This scream is not for you to hear.
> It is to push you away."*

Mad Sound lost everything in one night — family, honor, reason.
He stood in the empty battlefield and **screamed** — not a human voice,
but the voice of something that had given up on being human.
Enemies around him were blown away like dry leaves before a storm.
People could not kill him because they could never get close enough.
He died in silence — the only thing he never chose.

- Requires **Tier 3+** to equip and activate.
- **Effect (Passive)**: When hit by melee, retaliates with a **Sonic Boom** shockwave that pushes the attacker **5 blocks** back.
- **Cooldown**: **30 seconds** (displayed on action bar).

| | Col 1 | Col 2 | Col 3 |
|---|:---:|:---:|:---:|
| Row 1 | Sculk Shrieker ×1 | Echo Shard ×16 | Sculk Shrieker ×1 |
| Row 2 | Echo Shard ×16 | **Dark Ego Soul** | Echo Shard ×16 |
| Row 3 | Sculk Shrieker ×1 | **Mad Sound's Memory Fragment** | Goat Horn ×1 |

> 🔮 **Ingredient lore**: Sculk Shrieker = the shriek that shattered reality, Echo Shard = echoes of lost sanity, Goat Horn = the primal scream, Memory Fragment = die near a Shrieker during Ego (the final scream).

- **Memory Fragment**: Die while in Ego/Dark Ego state near a Sculk Shrieker (5 block radius). The Shrieker has a 50% chance to explode and drop this fragment.
- **Souls**: 1 · **Time**: 5 min

</ItemCard>

---

<ItemCard id="sky-pride-shard" name="Sky Pride Shard" image="/wiki/shard/shard_ngao_thien.jpg" rarity="mythic">

> *"The ground beneath my feet is what I despise the most.
> I do not belong here. I belong somewhere higher."*

Sky Pride is the emperor who refused to bow — even to the sky.
He built a tower so high that clouds had to dodge him.
When the tower collapsed under the weight of arrogance,
he did not fall down — he **was shot upward**,
as if the earth could not stand him either.
They searched for his body forever but found nothing.
Perhaps he is still flying somewhere —
or he has reached something no one else dared to think of.

- Requires **Tier 3+** to equip and activate.
- **Effect (Active)**: Launch straight up **10 blocks** instantly. Grants **Resistance I** for 2 seconds to absorb fall damage.
- **Cooldown**: **60 seconds**.

| | Col 1 | Col 2 | Col 3 |
|---|:---:|:---:|:---:|
| Row 1 | Wind Charge ×16 | Emerald Block ×8 | Wind Charge ×16 |
| Row 2 | Slime Block ×16 | **Dark Ego Soul** | Slime Block ×16 |
| Row 3 | Wind Charge ×16 | Breeze Rod ×16 | Wind Charge ×16 |

> 🔮 **Ingredient lore**: Wind Charge = defying wind itself, Breeze Rod = rare wind essence from Breeze (**Trial Chambers — extremely rare**), Slime Block = the earth rejects him — bouncing him skyward, Emerald Block = the emperor's wealth and arrogance.

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
