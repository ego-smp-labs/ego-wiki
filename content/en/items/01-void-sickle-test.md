---
title: Void Sickle Test
description: Testing item stats and crafting recipe components
order: 1
---

# Void Sickle

<ItemStats
  name="Void Sickle"
  type="Weapon"
  rarity="mythic"
  description="A blade forged from the abyss itself, capable of harvesting souls."
  stats={[
    { label: "Damage", value: "150", highlight: true },
    { label: "Attack Speed", value: "1.2" },
    { label: "Durability", value: "Infinite", highlight: true },
    { label: "Soul Harvest", value: "+15%" }
  ]}
/>

## Crafting Recipe

<CraftingRecipe
  result={{ item: "https://minecraft.wiki/images/Netherite_Sword.png", label: "Void Sickle", count: 1 }}
  grid={[
    null, { item: "https://minecraft.wiki/images/Nether_Star.png", label: "Void Core" }, null,
    null, { item: "https://minecraft.wiki/images/Netherite_Ingot.png", label: "Dark Metal" }, null,
    null, { item: "https://minecraft.wiki/images/Stick.png", label: "Handle" }, null
  ]}
/>
