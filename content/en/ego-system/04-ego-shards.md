---
title: Ego Shards
description: Shard Slot mechanism — equip shards to receive hidden powers.
order: 4
---

# Ego Shards

> *"Each shard is a piece of soul separated. Assemble them —
> and you will become something no longer human."*

The Shard Slot is a special vessel, allowing you to equip **Ego Shards**
to receive combat effects. Each shard is the remains of a **true self** —
not a legend, but a memory imprisoned in matter.

---

## Unlocking
- A seal is the hidden power within your ego, allowing you to inherit the ego of others.

| Tier | Seal Unlocked |
|------|--------------|
| &lt; 3  | None 🔒 |
| 3+ | **1 Seal** (Slot 1 — left) |
| 6+   | **2 Seals** (Slot 1 + Slot 2) |

- Locked seal → displays **red glass** 🔒 (cannot interact)
- Unlocked but empty seal → displays **gray glass** (empty)

- can be viewed in `/ego`

---

## Activation

| Slot | Activation Keybind |
|---|-------------------|
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
| [🗡️ Hidden Blade Shard](#️-hidden-blade-shard) | Passive | 3+ | Reflect 15% melee damage | Always active |
| [🩸 Blood Wolf Shard](#-blood-wolf-shard) | Passive | 3+ | &lt;30% HP → 30% chance: +200% dmg 5s | Activate when hit |
| [🌑 Nameless Shard](#-nameless-shard) | Active | 3+ | Complete invisibility 5 mins | CD 10m · Hold weapon |
| [🌘 Blood Shadow Shard](#-blood-shadow-shard) | Active | 3+ | Dash 8 blocks + Invisibility 3s | CD 20s · Hold weapon |
| [💀 Mad Sound Shard](#-mad-sound-shard) | Passive | 3+ | Retaliatory Sonic Boom when attacked | Cooldown 30s |
| [☁️ Sky Pride Shard](#️-sky-pride-shard) | Active | 3+ | Shoot straight up 10 blocks | CD 45s · Hold weapon |

---

## Forging Recipes

> All forged at [Cursed Crafting Table](/en/wiki/items/cursed-crafting).

---

### 🗡️ Hidden Blade Shard

> *"My body is full of scars but my eyes are not blurred.
> Each wound on me — is a wound of another."*

Hidden Blade is a warrior who cannot be knocked down — not because he is strong,
but because every time he is slashed, **the enemy's blade breaks itself**.
They say his real weapon is not the sword in his hand —
but **his body surface itself**.
He died not in battle.
He died in his sleep, hands still gripping the sword as if afraid someone would take it.

- Requires **Tier 3+** to equip and activate.
- **Effect (Passive)**: Reflects **15%** melee damage back to the attacker.

| | Column 1 | Column 2 | Column 3 |
|---|:---:|:---:|:---:|
| Row 1 | Cactus ×10 | Netherite Sword ×1 | Prismarine Shard ×10 |
| Row 2 | Prismarine Shard ×10 | **Tainted Ego** | Cactus ×10 |
| Row 3 | Cactus ×10 | Enchanted Book (Thorns III) ×1 | Prismarine Shard ×10 |

- **Soul**: 1 · **Time**: 5 minutes · *Location revealed*

---
<ItemCard id="hidden-sword-shard" name="Hidden Sword Shard" image="/wiki/shard/shard_tang_kiem.jpg" rarity="rare">

> *"The sharpest blade is the one that is never drawn.
> Unless it is already at your throat."*

Hidden Sword was a swordsman who never carried a weapon.
People laughed at him until he walked into the imperial palace empty-handed,
and walked out with the emperor's head.
He didn't need to forge a sword, because **his killing intent was the sharpest blade**.
He died not by being defeated, but because his own will
cut off his own life force — he killed himself
with just a blink of an eye.

- Requires **Tier 1+** to equip and activate.
- **Effect (Active)**: Press **F** (swap to offhand) to slash out a wave of sword aura dealing massive damage in a straight line.
- **Cooldown**: **10 seconds**.

| | Column 1 | Column 2 | Column 3 |
|---|:---:|:---:|:---:|
| Row 1 | Iron Sword ×1 | Diamond Sword ×1 | Iron Sword ×1 |
| Row 2 | Netherite Sword ×1 | **Ego** | Netherite Sword ×1 |
| Row 3 | Iron Sword ×1 | Diamond Sword ×1 | Iron Sword ×1 |

- **Soul**: 1 · **Time**: 5 minutes · *Location revealed*

</ItemCard>

---

<ItemCard id="blood-wolf-shard" name="Blood Wolf Shard" image="/wiki/shard/shard_huyet_lang.jpg" rarity="epic">

> *"The smell of blood. It is the only thing separating you from prey."*

Blood Wolf was once a human. Or at least, he looked like one
before hunger swallowed the final line.
He hunted in the deep forest, not out of hatred, not for power —
only because hot blood made him feel alive.
The more blood he spilled, the stronger he became. When there were no more creatures to tear apart,
he went mad and tore himself apart.

- Requires **Tier 2+** to equip and activate.
- **Effect (Passive)**: When **Sprinting** and **Hitting a target (Enemy/Player)** → You gain **Speed II** and **Lifesteal** for a few seconds.
- The lower your health, the higher your movement speed and healing from attacks.
- **Note**: This effect will **drain your food bar** very quickly. If Food Level runs out, you will take double Starvation damage.
- **Blood Wolf's Memory Fragment**: Die of starvation when Food Bar is 0 and under the effect of Ego/Dark Ego.

| | Column 1 | Column 2 | Column 3 |
|---|:---:|:---:|:---:|
| Row 1 | Spider Eye ×32 | Rotten Flesh ×32 | Spider Eye ×32 |
| Row 2 | Bone ×32 | **Tainted Ego** | **Blood Wolf's Memory Fragment** |
| Row 3 | Spider Eye ×32 | Rotten Flesh ×32 | Spider Eye ×32 |

- **Soul**: 1 · **Time**: 5 minutes · *Location revealed*

</ItemCard>

---

<ItemCard id="nameless-shard" name="Nameless Shard" image="/wiki/shard/shard_vo_thanh.jpg" rarity="epic">

> *"I am not hiding. I am not running.
> I simply... no longer exist in your eyes."*

Nameless was not erased by history — he **erased himself first**.
Not invisible in the usual sense, but he learned how to
**withdraw himself from the perception of people around** —
no one remembers his face, no one hears his voice.
He sat in the crowded court, watching the king take everything from him,
and smiled — because he knew the time would come for him to disappear completely.
At the end of his life, he left in broad daylight. No one noticed.

- Requires **Tier 3+** to equip and activate.
- **Effect (Active)**: When activated → **Complete invisibility for 5 minutes**.
- **Cooldown**: **15 minutes** after effect ends.

| | Column 1 | Column 2 | Column 3 |
|---|:---:|:---:|:---:|
| Row 1 | Obsidian ×10 | Ink Sac ×10 | Obsidian ×10 |
| Row 2 | Ink Sac ×10 | **Tainted Ego** | Ink Sac ×10 |
| Row 3 | Obsidian ×10 | Ink Sac ×10 | Obsidian ×10 |

- **Soul**: 1 · **Time**: 5 minutes · *Location revealed*

</ItemCard>

---

<ItemCard id="blood-shadow-shard" name="Blood Shadow Shard" image="/wiki/shard/shard_anh_nguyet.jpg" rarity="mythic">

> *"I am not here. I was never here.
> But you are already dead."*

Blood Shadow is the only assassin no one has ever seen the face of.
His list of victims is longer than any butcher in history —
but there are no living witnesses.
They say he does not move through space — he **moves through shadow**.
He disappeared from history literally.
No grave. No name. Only fragments of an ego left
cold as night and fast as death.

- Requires **Tier 3+** to equip and activate.
- **Effect (Active)**: Dash forward **8 blocks** + gain **Invisibility 3 seconds**.
- **Cooldown**: **30 seconds**.

| | Column 1 | Column 2 | Column 3 |
|---|:---:|:---:|:---:|
| Row 1 | Gunpowder ×10 | Netherite Spear ×1 | Gunpowder ×10 |
| Row 2 | WIND_CHARGE ×10 | **Tainted Ego** | WIND_CHARGE ×10 |
| Row 3 | Gunpowder ×10 | Enchanted Book (Lunge III) ×1 | Gunpowder ×10 |

- **Soul**: 1 · **Time**: 5 minutes · *Location revealed*

</ItemCard>

---

<ItemCard id="mad-sound-shard" name="Mad Sound Shard" image="/wiki/shard/shard_cuong_thanh.png" rarity="mythic">

> *"This scream is not for you to hear.
> It is to push you away."*

Mad Sound lost everything in one night — family, honor, reason.
He stood in the empty battlefield and **screamed** — not a human voice,
but the voice of something that had given up on being human.
Enemies around him were blown away like dry leaves before a storm.
People did not kill him because they could not get close enough to do so.
Eventually he died in silence — the only thing he never chose.

- Requires **Tier 3+** to equip and activate.
- **Effect (Passive)**: When attacked, retaliates with a Sonic Boom shockwave pushing back and damaging the attacker.
- **Cooldown**: **30 seconds**.
- **Mad Sound's Memory Fragment**: Die while under the effect of Ego/Dark Ego near a Sculk Shrieker (5 block radius). The shrieker has a 50% chance to explode and drop this fragment.

| | Column 1 | Column 2 | Column 3 |
|---|:---:|:---:|:---:|
| Row 1 | Sculk Shrieker ×1 | Echo Shard ×10 | Sculk Shrieker ×1 |
| Row 2 | Echo Shard ×10 | **Tainted Ego** | **Mad Sound's Memory Fragment** |
| Row 3 | Sculk Shrieker ×1 | Echo Shard ×10 | Goat Horn ×1 |

- **Soul**: 1 · **Time**: 5 minutes · *Location revealed*

</ItemCard>

---

<ItemCard id="sky-pride-shard" name="Sky Pride Shard" image="/wiki/shard/shard_ngao_thien.jpg" rarity="mythic">

> *"The ground beneath my feet is what I despise the most.
> I do not belong here. I belong somewhere higher."*

Sky Pride is the emperor who refused to bow — even to the sky.
He built a tower so high that clouds had to dodge him.
When the tower collapsed under the weight of arrogance,
he did not fall down — he **was shot up**,
as if the earth could not stand him either.
They searched for his body forever but found nothing.
Perhaps he is still flying somewhere —
or he has reached something no one else dared to think of.

- Requires **Tier 3+** to equip and activate.
- **Effect (Active)**: Shoot straight up into the air **10 blocks** instantly.
- **Cooldown**: **60 seconds**.

| | Column 1 | Column 2 | Column 3 |
|---|:---:|:---:|:---:|
| Row 1 | Wind Charge ×10 | Slime Ball ×10 | Wind Charge ×10 |
| Row 2 | Slime Ball ×10 | **Tainted Ego** | Slime Ball ×10 |
| Row 3 | Wind Charge ×10 | Slime Ball ×10 | Wind Charge ×10 |

- **Soul**: 1 · **Time**: 5 minutes · *Location revealed*

</ItemCard>

---

## 🔮 Ego Purification Ritual (Shard Extraction)

Because Shards represent Sins deeply rooted in your subconscious, you cannot safely remove or touch them like normal equipment. To unequip them, you must perform an agonizing ritual.

### Ego Purification Ritual
This item requires you to place 1 **Purification Stone** in the center of a normal Crafting Table, surrounded by 8 **Sculk** blocks.

1. Hold the **Ego Purification Ritual** in your hand and **Right-Click**.
2. The purification magic will tear the Sins (Shards) you have equipped and **drop them onto the floor**.
3. **The Price**: You will receive fatal purification damage, resulting in **instant death** (Bypassing Totems) and your **Tier will reset to 1**.
> **Note**: You will NOT drop your Ego since this is not considered PvP death; your Ego remains safe in your inventory. The server broadcast will read: *"&lt;player&gt; was consumed by their own ego"*.

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
