# Scoreboarder Class Documentation

## 概要

Minecraft Bedrock の ScriptAPI で Scoreboard の管理をより、
簡易的に操作するために設計されたクラスです。

遅延をかけているため、トップレベルで使用可能です。

## constructor
### `constructor(name,displayName?): ScoreBoarder`
- **name** スコアボードの名前
- **[displayName]** スコアボードのディスプレイネーム

## Instance Property

### `default: number`
スコアがなかった場合のデフォルト数値

## Instance Methods

## Objective 操作

### `setDisplay(mode,sort?)`
- **mode** "BelowName" | "List" | "Sidebar"

ディスプレイにスコアボードを表示します

### `delete()`
スコアボードを削除します

## スコア 操作

> **targets** -
> *Player | Entity | string | (Player | Entity | string)[]*
> **score** -
> *number*

### `get(targets,score): number | Map<Targets,Number>`
- *補足* - ターゲットが複数の場合 Map で返されます

ターゲットのスコアを取得します
### `getStrings(target,separator): string`
- **target** `Entity | Player | string`
- **separator** `boolean` 3桁区切りにします

ターゲットのスコアを文字列として取得します
### `set(targets,score)`
ターゲットのスコアを指定した数値します

### `add(targets,score)`
ターゲットのスコアを加算します
### `remove(targets,score)`
ターゲットのスコアを減算します
### `multiply(targets,score)`
ターゲットのスコアを乗算します
### `divide(targets,score,mode?)`
- **targets** `Targets`
- **score** `number` 割る数
- **[mode]** `"ceil" | "floor" | "round"` 小数点の対応

ターゲットのスコアを除算します
小数点の場合、切り捨て、切り上げ、四捨五入をmodeから選択可能
### `random(targets,range,each?)`
- **targets** `Targets`
- **range** `{ max: number, min: number }`
- **[each]** `boolean` ターゲットが複数いる場合、それぞれにランダムなスコアを代入

ターゲットのスコアをランダムに設定します
### `reset(targets)`
ターゲットのスコアをリセットします
