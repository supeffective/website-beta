import { boolean, datetime, index, int, json, mysqlTable } from 'drizzle-orm/mysql-core'
import {
  createdAtColumn,
  descriptionColumn,
  foreignKeyColumn,
  genderColumn,
  languageColumn,
  primaryKeyColumn,
  publicIdColumn,
  shortSlugColumn,
  slugColumn,
  titleColumn,
  updatedAtColumn,
  userIdForeignColumn,
} from '../db/column-types'

export const gameSaveTable = mysqlTable(
  'gamesave',
  {
    id: primaryKeyColumn(),
    publicId: publicIdColumn(),
    userId: userIdForeignColumn(),
    //
    gameSlug: slugColumn('game'),
    title: titleColumn(),
    description: descriptionColumn(),
    otName: shortSlugColumn('otName'),
    otId: shortSlugColumn('otId'),
    otGender: genderColumn('otGender'), // 1 = male, 2 = female, 3 = other
    language: languageColumn(),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => {
    return {
      userIdIdx: index('userId_idx').on(table.userId),
    }
  },
)

export const pokemonTable = mysqlTable(
  'pokemon',
  {
    id: primaryKeyColumn(),
    publicId: publicIdColumn(),
    userId: userIdForeignColumn(),
    //
    pokemonSlug: slugColumn('pokemon'),
    nickname: shortSlugColumn('nickname'),
    level: shortSlugColumn('level'),
    isShiny: boolean('shiny'),
    // isEgg: shortSlugColumn('isEgg'),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),

    // Box organization data:
    gameSaveId: foreignKeyColumn('gameSaveId'),
    isDraft: boolean('draft'), // if it's a draft, or it's already organized in the real living dex
    box: int('box'),
    boxSlot: int('boxSlot'),
    tradeBoxSlot: int('tradeBoxSlot'), // if set, it is up for trade
    tradeQuantity: int('tradeQuantity'), // how many of this pokemon you have up for
    tradeBack: boolean('tradeBack'), // if set, you want your pokemon back after the trade (e.g. evolution tradebacks)

    // Gimmicks:
    teraType: shortSlugColumn('teraType'), // Tera Pokemon type
    isShadow: boolean('shadow'), // Shadow Pokemon (GO)
    isGmax: boolean('gmax'), // Is Gigantamax
    dmaxLevel: int('dmaxLevel'), // Dynamax level

    // PVP metadata:
    pvpReady: boolean('pvpReady'), // it is ready for PVP
    pvpGoTier: shortSlugColumn('pvpGoTier'), // Pokemon GO League CP tier (little-cup, great, ultra, master)
    pvpStyle: shortSlugColumn('pvpStyle'), // singles or doubles

    // Origin:
    originMark: shortSlugColumn('originMark'),
    originGame: shortSlugColumn('originGame'),
    language: languageColumn(),
    metDate: datetime('metDate'),
    metLocation: datetime('metLocation'),
    metLevel: int('metLevel'),
    otName: shortSlugColumn('otName'),
    otId: shortSlugColumn('otId'),
    otGender: genderColumn('otGender'), // 1 = male, 2 = female, 3 = other

    // Stats:
    pokeball: shortSlugColumn('ball'),
    gender: genderColumn('gender'), // 1 = male, 2 = female, 3 = other
    heldItem: shortSlugColumn('item'),
    move1: shortSlugColumn('move1'),
    move2: shortSlugColumn('move2'),
    move3: shortSlugColumn('move3'),
    move4: shortSlugColumn('move4'),
    ability: shortSlugColumn('ability'),
    nature: shortSlugColumn('nature'),
    mintNature: shortSlugColumn('mintNature'),

    // Training:
    // EVs. They can also be AVs (Awakening Values - Let's GO) and EPs (Effort Points - Legends Arceus), depending on the game.
    hpEv: int('hpEv'),
    atkEv: int('atkEv'),
    defEv: int('defEv'),
    spaEv: int('spaEv'),
    spdEv: int('spdEv'),
    speEv: int('speEv'),
    // IVs. They can also be DVs (Determinant Values - Gen 1-2), depending on the game. 255 means hypertrained.
    hpIv: int('hpIv'),
    atkIv: int('atkIv'),
    defIv: int('defIv'),
    spaIv: int('spaIv'),
    spdIv: int('spdIv'),
    speIv: int('speIv'),

    // evs: json('evs').default('[0,0,0,0,0,0]'),
    // ivs: json('ivs').default('[31,31,31,31,31,31]'),

    // Lists:
    markings: json('markings').default('[0,0,0,0,0,0]'), // Markings state for: [circle, triangle, square, heart, star, diamond]
    ribbons: json('ribbons').default('[]'), // Ribbon slugs
    emblems: json('emblems').default('[]'), // Emblem (marks) slugs
  },
  (table) => {
    return {
      userIdx: index('userId_idx').on(table.userId),
      gameSaveIdx: index('gameSaveIdx_idx').on(table.gameSaveId),
      boxSlotIdx: index('boxSlotIdx_idx').on(table.gameSaveId, table.box, table.boxSlot),
    }
  },
)
