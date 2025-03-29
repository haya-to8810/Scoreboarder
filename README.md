# Scoreboarder Class Documentation

## 概要

Minecraft Bedrock の ScriptAPI で Scoreboard の管理をより、
簡易的に操作するために設計されたクラスです。

遅延をかけているため、トップレベルで使用可能です。

## constructor
### `constructor(name,displayName)`

- **name** スコアボードの名前
- **displayName** スコアボードのディスプレイネーム

## Instance Property

### `default`
スコアがなかった場合のデフォルト数値

## Instance Methods

## Objective 操作

### `setDisplay(mode,sort)`
ディスプレイにスコアボードを表示します
### `delete()`
スコアボードを削除します

## スコア 操作

### `get(targets,score)`
ターゲットのスコアを取得します
### `getStrings(target,separator)`
ターゲットのスコアを文字列として取得します
- **separator** `boolean` 3桁区切りにします
### `set(targets,score)`
ターゲットのスコアを指定した数値します

### `add(targets,score)`
ターゲットのスコアを加算します
### `remove(targets,score)`
ターゲットのスコアを減算します
### `multiply(targets,score)`
ターゲットのスコアを乗算します
### `divide(targets,score,mode)`
ターゲットのスコアを除算します
小数点の場合、切り捨て、切り上げ、四捨五入をmodeから選択可能
### `random(targets,range,each)`
ターゲットのスコアをランダムに設定します
- **range** `{ max: number, min: number }`
- **each** `boolean` ターゲットが複数いる場合、それぞれにランダムなスコアを代入
### `reset(targets)`
ターゲットのスコアをリセットします
