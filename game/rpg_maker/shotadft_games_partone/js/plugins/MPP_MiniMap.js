//=============================================================================
// MPP_MiniMap.js
//=============================================================================
// Copyright (c) 2017 - 2022 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Display the minimap on the screen.
 * @author Mokusei Penguin
 * @url
 * 
 * @help [version 4.3.1]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ Plugin command
 *  - In MV, the variable N is referred to by writing 'v[N]' in the item for
 *    inputting a numerical value.
 *  - In MZ, in the item to enter a numerical value, select the text and
 *    write 'v[N]' to refer to the variable N.
 *    
 *  〇 MV / MZ
 *  
 *  〇 ShowMinimap index  / show
 *      index : number(0:Hide)
 *   - Display the minimap.
 *   - The display position and size set in the plug-in parameter
 *     [Display Positions] are applied.
 *  
 *  〇 SetMinimapZoom zoom  / setZoom
 *      zoom : magnification(-1:Whole, 0:Default / 1x at 100)
 *   - Only change the magnification of the minimap display.
 *  
 *  〇 AddMarker x y m tag  / addMarker
 *      x   : X coordinate
 *      y   : Y coordinate
 *      m   : Marker string
 *      tag : tag(Arbitrary value / Not set:0)
 *   - Place a marker at the coordinates (x, y) of the current map.
 *   - Tags are used when deleting.
 *   
 *  〇 RemoveMarker tag  / removeMarker
 *      tag : tag
 *   - Deletes all markers for the specified tag.
 *   
 *  〇 RemoveMarkerXy x y  / removeMarkerXy
 *      x : X coordinate
 *      y : Y coordinate
 *   - Delete the marker at the coordinates (x, y) of the current map.
 *   
 * ▼ Map notes
 *  〇 <Minimap:name>
 *   - Specifies the file name of the minimap image for this map.
 *   - Put the image files in img/pictures.
 * 
 *  〇 <MinimapZoom:n>
 *   - Sets the initial value for the minimap magnification for this map.
 *   - The variable N is referenced by writing 'v[N]'.
 * 
 * ▼ Event notes
 *  〇 <Marker:m>
 *   - Set markers for this event.
 * 
 * ▼ [Comment] of the execution content of the event
 *  〇 MinimapMarker m
 *   - Set a marker for the event when the EV page is displayed.
 *   - If <Marker:m> is set, this will be prioritized.
 * 
 * ▼ Marker designation
 *  - Markers are specified as a combination of strings and numbers.
 *      TCO
 *      T = <Type>
 *      C = <Color number>
 *      O = <Option>
 *  - There are the following 8 types of <Type>.
 *      P : Point type (●)
 *      A : Arrow type / Synchronize with the orientation of the character
 *      I : Icon type / Icon image set by plugin parameters
 *      T : Triangle type (▲)
 *      S : Square type (■)
 *      R : Rhombus type (◆)
 *      X : Cross mark type (×)
 *      C0- : Circle type / Specify the radius after C and insert a hyphen(-)
 *  - <Color number> is the same as the text color of [Display text].
 *  - See img/system/Window.png for specific colors.
 *  - Add <Option> when you want the following functions.
 *      B : Blink flag
 *      T : Synchronize with the orientation of the character / Icon type only
 *      H : Displayed in front of other markers / Always displayed even outside the minimap
 *      M : For MPP_MiniMap_Op1.js / Display only in the mapped range
 *  - Multiple <Option> can be set.
 *  - All strings work in either case.
 * 
 * ▼ Plugin parameters
 *  〇 Map Ids / Wall Region IDs / Floor Region IDs
 *  - Range specification is available for these plug-in parameters.
 *  - You can specify a number from n to m by writing n-m.
 *      Example: 1-4,8,10 => 1 to 4 and 8 and 10
 * 
 *  〇 Icon Image
 *   - The icon image is made up of eight horizontally arranged blocks as
 *     one block, and the blocks are lengthened as long as necessary.
 *   - The width and height of the icon is the width of the image divided by 8.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command show
 *      @desc 
 *      @arg index
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 * 
 *  @command setZoom
 *      @desc 
 *      @arg zoom
 *          @desc 100:1x
 *          @type number
 *              @min -1
 *              @max 10000
 *          @default 100
 * 
 *  @command addMarker
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 *      @arg marker
 *          @desc Type: P,A,I,C0- / Color number / Option: B,T,H,M
 * Can be used in both uppercase and lowercase
 *          @type string
 *          @default P0
 * 
 *  @command removeMarker
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 * 
 * 
 *  @param Map Ids
 *      @desc An array of map IDs to display the minimap
 * (Range can be specified)
 *      @default 1-5
 *
 *  @param Display Positions
 *      @desc 
 *      @type struct<DisplayPositions>[]
 *      @default ["{\"X\":\"32\",\"Y\":\"32\",\"Width\":\"160\",\"Height\":\"120\",\"Opacity\":\"192\",\"Zoom\":\"150\",\"Frame Image\":\"\"}"]
 *
 *  @param Blink Duration
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 999
 *      @default 80
 *
 *  @param Blur Level
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 10
 *      @default 4
 *
 *  @param Wall Region IDs
 *      @desc An array of region IDs to display as impassable
 * (Range can be specified)
 *      @default 63
 *
 *  @param Floor Region IDs
 *      @desc An array of region IDs to display as passable
 * (Range can be specified)
 *      @default 
 *
 *  @param Icon Image
 *      @desc 
 *      @type file
 *          @require 1
 *          @dir img/pictures
 *      @default
 *
 *  @param Marker Size
 *      @desc Point type and arrow type sizes
 *      @type number
 *          @min 1
 *          @max 999
 *      @default 4
 *
 *  @param Player Marker
 *      @desc Type: P,A,I,C0- / Color number / Option: B,T,H,M
 * Can be used in both uppercase and lowercase
 *      @default A3h
 *
 *  @param Vehicle Markers
 *      @desc Vehicle markers when not boarding
 *      @type struct<Vehicle>
 *      @default {"boat":"P3","ship":"P3","airship":"P3"}
 *
 * 
 *  @noteParam Minimap
 *      @noteRequire 1
 *      @noteDir img/system/
 *      @noteType file
 *      @noteData maps
 * 
 */

/*~struct~DisplayPositions:
 *  @param X
 *      @desc
 *      @type number
 *          @min 0
 *          @max 999999
 *      @default 32
 *
 *  @param Y
 *      @desc
 *      @type number
 *          @min 0
 *          @max 999999
 *      @default 32
 *
 *  @param Width
 *      @desc
 *      @type number
 *          @min 1
 *          @max 999999
 *      @default 160
 *
 *  @param Height
 *      @desc
 *      @type number
 *          @min 1
 *          @max 999999
 *      @default 120
 *
 *  @param Opacity
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 255
 *      @default 192
 *
 *  @param Zoom
 *      @desc -1:The entire display,
 * 0:Do not change the value of <MinimapZoom: n> in the map memo
 *      @type number
 *          @min -1
 *          @max 10000
 *      @default 150
 *
 *  @param Frame Image
 *      @desc 
 *      @type file
 *          @require 1
 *          @dir img/pictures
 *      @default 
 *
 */

/*~struct~Vehicle:
 *  @param boat
 *      @desc Type: P,A,I,C0- / Color number / Option: B,T,H,M
 * Can be used in both uppercase and lowercase
 *      @default P3
 *
 *  @param ship
 *      @desc Type: P,A,I,C0- / Color number / Option: B,T,H,M
 * Can be used in both uppercase and lowercase
 *      @default P3
 *
 *  @param airship
 *      @desc Type: P,A,I,C0- / Color number / Option: B,T,H,M
 * Can be used in both uppercase and lowercase
 *      @default P3
 *
 */

/*:ja
 * @target MV MZ
 * @plugindesc ミニマップを画面に表示させます。
 * @author 木星ペンギン
 * @url
 * 
 * @help [version 4.3.1]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ プラグインコマンド
 *  - MVでは数値を入力する項目で v[N] と記述することで変数N番を参照します。
 *  - MZでは数値を入力する項目で、テキストを選択して v[N] と記述することで
 *    変数N番を参照します。
 *  
 *  〇 MV / MZ
 *  
 *  〇 ShowMinimap index  / ミニマップ表示
 *      index : 番号(0:非表示)
 *   - ミニマップを表示します。
 *   - 表示位置やサイズはプラグインパラメータ[Display Positions]で設定したものが
 *     適用されます。
 *  
 *  〇 SetMinimapZoom zoom  / ミニマップ拡大率設定
 *      zoom : 拡大率(-1:全体, 0:デフォルト / 100で等倍)
 *   - ミニマップ表示の拡大率のみを変更します。
 *  
 *  〇 AddMarker x y m tag  / マーカー追加
 *      x   : X座標
 *      y   : Y座標
 *      m   : マーカー文字列
 *      tag : タグ(任意の値 / 未設定:0)
 *   - 現在のマップの座標(x,y)にマーカーを設置します。
 *   - タグは削除する際に使用します。
 *   
 *  〇 RemoveMarker tag  / マーカー削除
 *      tag : タグ
 *   - 指定したタグのマーカーをすべて削除します。
 *   
 *  〇 RemoveMarkerPos x y  / 座標マーカー削除
 *      x : X座標
 *      y : Y座標
 *   - 現在のマップの座標(x,y)にあるマーカーを削除します。
 *   
 * ▼ マップのメモ
 *  〇 <Minimap:name>
 *   - このマップのミニマップ画像のファイル名を指定します。
 *   - 画像ファイルは img/pictures に入れてください。
 * 
 *  〇 <MinimapZoom:n>
 *   - このマップのミニマップ拡大率の初期値を設定します。
 *   - v[N] と記述することで変数N番を参照します。
 * 
 * ▼ イベントのメモ
 *  〇 <Marker:m>
 *   - このイベントのマーカーを設定します。
 * 
 * ▼ イベントの実行内容の注釈
 *  〇 マーカー m
 *   - そのEVページが表示されている際のイベントのマーカーを設定します。
 *   - <Marker:m>を設定している場合、こちらが優先されます。
 * 
 * ▼ マーカーの指定
 *  - マーカーは文字列と数字の組み合わせで指定します。
 *      TCO
 *      T = <タイプ>
 *      C = <色番号>
 *      O = <オプション>
 *  - <タイプ>は以下の8種類があります。
 *      P : 点タイプ (●)
 *      A : 矢印タイプ / キャラの向きに合わせて方向が変わる
 *      I : アイコンタイプ / アイコン画像はプラグインパラメータで設定
 *      T : 三角タイプ(▲)
 *      S : 四角タイプ(■)
 *      R : ひし形タイプ(◆)
 *      X : バツ印タイプ(×)
 *      C0- : 円形タイプ / Cの後に半径を指定しハイフン(-)を入れる
 *  - <色番号>は[文章の表示]の文字色と同じです。
 *  - 具体的な色は img/system/Window.png を参照してください。
 *  - <オプション>は以下の機能が欲しい時に付けてください。
 *      B : 点滅フラグ
 *      T : キャラの向きに合わせて方向が変わる / アイコンタイプのみ
 *      H : 他のマーカーより手前に表示 / ミニマップ外でも常時表示
 *      M : MPP_MiniMap_Op1.js用 / マッピングした範囲でのみ表示
 *  - <オプション>は複数設定可能です。
 *  - 文字列は全て、大文字小文字どちらでも機能します。
 * 
 * ▼ プラグインパラメータ 詳細
 *  〇 マップIDの配列 / 通行不可リージョン / 通行可能リージョン
 *  - これらのプラグインパラメータでは範囲指定が使用できます。
 *  - n-m と表記することで、nからmまでの数値を指定できます。
 *      例: 1-4,8,10 => 1から4と8と10
 * 
 *  〇 アイコン画像
 *   - アイコン画像は横方向に8個並べたものを1ブロックとし、そのブロックを
 *     必要なだけ縦に長くしたものです。
 *   - 画像の幅を8で割ったものが、アイコンの幅と高さになります。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command show
 *      @text ミニマップ表示
 *      @desc 
 *      @arg index
 *          @text 番号
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 * 
 *  @command setZoom
 *      @text ミニマップ拡大率設定
 *      @desc 
 *      @arg zoom
 *          @text 拡大率
 *          @desc 100:等倍
 *          @type number
 *              @min -1
 *              @max 10000
 *          @default 100
 * 
 *  @command addMarker
 *      @text マーカー追加
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 *      @arg marker
 *          @text マーカー
 *          @desc Type: P,A,I,C0- / 色番号 / Option: B,T,H,M
 * 大文字小文字どちらでも使用可能
 *          @type string
 *          @default P0
 *      @arg tag
 *          @text タグ
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 9999
 *          @default 0
 * 
 *  @command removeMarker
 *      @text マーカー削除
 *      @desc 
 *      @arg tag
 *          @text タグ
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 9999
 *          @default 0
 * 
 *  @command removeMarkerXy
 *      @text 座標マーカー削除
 *      @desc 
 *      @arg x
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999
 *          @default 0
 * 
 * 
 *  @param Map Ids
 *      @text マップIDの配列
 *      @desc ミニマップを表示するマップIDの配列
 * (範囲指定可)
 *      @default 1-5
 *
 *  @param Display Positions
 *      @text 表示位置の配列
 *      @desc 
 *      @type struct<DisplayPositions>[]
 *      @default ["{\"X\":\"32\",\"Y\":\"32\",\"Width\":\"160\",\"Height\":\"120\",\"Opacity\":\"192\",\"Zoom\":\"150\",\"Frame Image\":\"\"}"]
 *
 *  @param Blink Duration
 *      @text 点滅時間
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 999
 *      @default 80
 *
 *  @param Blur Level
 *      @text ブラー強さ
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 10
 *      @default 4
 *
 *  @param Wall Region IDs
 *      @text 通行不可リージョン
 *      @desc 通行不可として表示するリージョンIDの配列
 * (範囲指定可)
 *      @default 63
 *
 *  @param Floor Region IDs
 *      @text 通行可能リージョン
 *      @desc 通行可能として表示するリージョンIDの配列
 * (範囲指定可)
 *      @default 
 *
 *  @param Icon Image
 *      @text アイコン画像
 *      @desc 
 *      @type file
 *          @require 1
 *          @dir img/pictures
 *      @default
 *
 *  @param Marker Size
 *      @text マーカーサイズ
 *      @desc 点タイプと矢印タイプのサイズ
 *      @type number
 *          @min 1
 *          @max 999
 *      @default 4
 *
 *  @param Player Marker
 *      @text プレイヤーマーカー
 *      @desc Type: P,A,I,C0- / 色番号 / Option: B,T,H,M
 * 大文字小文字どちらでも使用可能
 *      @default A3h
 *
 *  @param Vehicle Markers
 *      @text 乗り物マーカー
 *      @desc 非搭乗時の乗り物のマーカー
 *      @type struct<Vehicle>
 *      @default {"boat":"P3","ship":"P3","airship":"P3"}
 *
 * 
 *  @noteParam Minimap
 *      @noteRequire 1
 *      @noteDir img/system/
 *      @noteType file
 *      @noteData maps
 * 
 */

/*~struct~DisplayPositions:ja
 *  @param X
 *      @desc
 *      @type number
 *          @min 0
 *          @max 999999
 *      @default 32
 *
 *  @param Y
 *      @desc
 *      @type number
 *          @min 0
 *          @max 999999
 *      @default 32
 *
 *  @param Width
 *      @text 幅
 *      @desc
 *      @type number
 *          @min 1
 *          @max 999999
 *      @default 160
 *
 *  @param Height
 *      @text 高さ
 *      @desc
 *      @type number
 *          @min 1
 *          @max 999999
 *      @default 120
 *
 *  @param Opacity
 *      @text 不透明度
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 255
 *      @default 192
 *
 *  @param Zoom
 *      @text 拡大率
 *      @desc -1:全体表示,
 * 0:マップメモの<MinimapZoom:n>の値、または変更しない
 *      @type number
 *          @min -1
 *          @max 10000
 *      @default 150
 *
 *  @param Frame Image
 *      @text フレーム画像
 *      @desc 
 *      @type file
 *          @require 1
 *          @dir img/pictures
 *      @default 
 *
 */

/*~struct~Vehicle:ja
 *  @param boat
 *      @text 小型船
 *      @desc Type: P,A,I,C0- / 色番号 / Option: B,T,H,M
 * 大文字小文字どちらでも使用可能
 *      @default P3
 *
 *  @param ship
 *      @text 大型船
 *      @desc Type: P,A,I,C0- / 色番号 / Option: B,T,H,M
 * 大文字小文字どちらでも使用可能
 *      @default P3
 *
 *  @param airship
 *      @text 飛行船
 *      @desc Type: P,A,I,C0- / 色番号 / Option: B,T,H,M
 * 大文字小文字どちらでも使用可能
 *      @default P3
 *
 */

(() => {
    'use strict';

    const pluginName = 'MPP_MiniMap';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const reviverParse = function(key, value) {
        try {
            return JSON.parse(value, reviverParse);
        } catch (e) {
            return value;
        }
    };
    const range = function*(start, end) {
        for (let i = start; i < end; i++) {
            yield i;
        }
    };
    const convertToArray = (param) => {
        return param.split(',').reduce((r, item) => {
            if (item) {
                const match = /(\d+)-(\d+)/.exec(item);
                if (match) {
                    r.push(...range(+match[1], +match[2] + 1));
                } else {
                    r.push(+item);
                }
            }
            return r;
        }, []);
    };
    const param_MapIds = convertToArray(parameters['Map Ids']);
    const param_DisplayPositions = JSON.parse(parameters['Display Positions'] || '[]', reviverParse);
    const param_BlinkDuration = Number(parameters['Blink Duration'] || 80);
    const param_BlurLevel = Number(parameters['Blur Level']);
    const param_WallRegionIDs = convertToArray(parameters['Wall Region IDs']);
    const param_FloorRegionIDs = convertToArray(parameters['Floor Region IDs']);
    const param_IconImage = parameters['Icon Image'];
    const param_MarkerSize = Number(parameters['Marker Size'] || 4);
    const param_PlayerMarker = parameters['Player Marker'];
    const param_VehicleMarkers = JSON.parse(parameters['Vehicle Markers'] || '{}');

    // Dealing with other plugins
    const _importedPlugin = (...names) => {
        return names.some(name => PluginManager._scripts.includes(name));
    };
    const _pluginOptions = [
        'MPP_MiniMap_Op1',
        'MPP_MiniMap_Op2',
        'MPP_MiniMap_Op3'
    ];
    
    // JsExtensions alternative
    const MathExt = (() => {
        // Number.prototype.clamp と違い、下限優先
        const clamp = (x, min, max) => Math.max(Math.min(x, max), min);
        const mod = (x, n) => ((x % n) + n) % n;
        return { clamp, mod };
    })();

    //-------------------------------------------------------------------------
    // Bitmap

    if (Utils.RPGMAKER_NAME === 'MV') {
        
        Bitmap.prototype.destroy = function() {
            if (this._baseTexture) {
                this._baseTexture.destroy();
                this.__baseTexture = null;
            }
            this._destroyCanvas();
        };
        
        Bitmap.prototype._destroyCanvas = function() {
            if (this._canvas) {
                this._canvas.width = 0;
                this._canvas.height = 0;
                this.__canvas = null;
            }
        };
        
    }

    //-------------------------------------------------------------------------
    // Sprite

    if (!Sprite.prototype._onBitmapChange) {
        Sprite.prototype._onBitmapChange = function() {
            if (this._bitmap) {
                this._refreshFrame = true;
                this._bitmap.addLoadListener(this._onBitmapLoad.bind(this));
            } else {
                this._refreshFrame = false;
                this.texture.frame = Rectangle.emptyRectangle;
            }
        };
    }

    //-------------------------------------------------------------------------
    // Game_MinimapMarker

    function Game_MinimapMarker() {
        this.initialize.apply(this, arguments);
    }

    window.Game_MinimapMarker = Game_MinimapMarker;

    Game_MinimapMarker._markerReg = /^(P|A|I|T|S|R|X|C(\d+)-|\!)(\d+)([BTHM]*)$/i;
    
    Game_MinimapMarker.checkMarker = function(markerStr) {
        if (markerStr) {
            if (this._markerReg.test(markerStr)) {
                return true;
            } else {
                const errorText = $gameSystem.isJapanese() ? 'マーカーエラー' : 'Marker Error';
                console.log(errorText + ' : ' + markerStr);
            }
        }
        return false;
    };

    Object.defineProperties(Game_MinimapMarker.prototype, {
        realX: {
            get() {
                const subject = this.subject();
                return subject ? subject._realX : this._x;
            },
            configurable: true
        },
        realY: {
            get() {
                const subject = this.subject();
                return subject ? subject._realY : this._y;
            },
            configurable: true
        }
    });

    Game_MinimapMarker.prototype.initialize = function() {
        this._tag = null;
        this.clearPos();
        this.clearMarker();
    };

    Game_MinimapMarker.prototype.clearPos = function() {
        this._mapId = 0;
        this._x = NaN;
        this._y = NaN;
        this._eventId = 0;
        this._vehicleType = null;
    };

    Game_MinimapMarker.prototype.clearMarker = function() {
        this._type = null;
        this._radius = 0;
        this._index = 0;
        this._blink = false;
        this._turn = false;
        this._highlighted = false;
    };

    Game_MinimapMarker.prototype.setMarker = function(markerStr) {
        const match = Game_MinimapMarker._markerReg.exec(markerStr);
        if (match) {
            this._type = match[1].charAt().toUpperCase();
            this._radius = +match[2];
            this._index = +match[3];
            this.setMarkerFlag((match[4] || '').toUpperCase());
        }
    };

    Game_MinimapMarker.prototype.setMarkerFlag = function(flag) {
        this._blink = flag.includes('B');
        this._turn = this._type === 'A' || flag.includes('T');
        this._highlighted = this._type !== 'C' && flag.includes('H');
    };

    Game_MinimapMarker.prototype.setTag = function(tag) {
        this._tag = tag;
    };
    
    Game_MinimapMarker.prototype.tag = function() {
        return this._tag;
    };
    
    Game_MinimapMarker.prototype.type = function() {
        return this._type;
    };
    
    Game_MinimapMarker.prototype.radius = function() {
        return this._radius;
    };
    
    Game_MinimapMarker.prototype.iconIndex = function() {
        return this._index;
    };
    
    Game_MinimapMarker.prototype.color = function() {
        if (Utils.RPGMAKER_NAME === 'MV') {
            const windowskin = ImageManager.loadSystem('Window');
            const n = this._index;
            const px = 96 + (n % 8) * 12 + 6;
            const py = 144 + Math.floor(n / 8) * 12 + 6;
            return windowskin.getPixel(px, py);
        } else {
            return ColorManager.textColor(this._index);
        }
    };
    
    Game_MinimapMarker.prototype.isBlink = function() {
        return this._blink;
    };
    
    Game_MinimapMarker.prototype.angle = function() {
        const subject = this.subject();
        if (subject && this._turn) {
            switch (subject.direction()) {
                case 2:
                    return 0;
                case 4:
                    return 90;
                case 6:
                    return 270;
                case 8:
                    return 180;
            }
        }
        return 0;
    };
    
    Game_MinimapMarker.prototype.isHighlighted = function() {
        return this._highlighted;
    };

    Game_MinimapMarker.prototype.setSubject = function(subject) {
        this.clearPos();
        if (subject) {
            if (subject === $gamePlayer) {
                this._eventId = -1;
            } else if (subject === $gameMap.airship()) {
                this._vehicleType = 'airship';
            } else if (subject === $gameMap.ship()) {
                this._vehicleType = 'ship';
            } else if (subject === $gameMap.boat()) {
                this._vehicleType = 'boat';
            } else {
                this._mapId = $gameMap.mapId();
                this._eventId = subject.eventId();
            }
        }
    };
    
    Game_MinimapMarker.prototype.setPlayer = function() {
        this.clearPos();
        this._eventId = -1;
    };
    
    Game_MinimapMarker.prototype.setEventId = function(eventId) {
        this.clearPos();
        this._mapId = $gameMap.mapId();
        this._eventId = eventId;
    };
    
    Game_MinimapMarker.prototype.setVehicleType = function(vehicleType) {
        this.clearPos();
        this._vehicleType = vehicleType;
    };
    
    Game_MinimapMarker.prototype.subject = function() {
        if (this._eventId < 0) {
            return $gamePlayer;
        } if (this._vehicleType) {
            return $gameMap.vehicle(this._vehicleType);
        } else {
            return this._mapId === $gameMap.mapId()
                ? $gameMap.event(this._eventId)
                : null;
        }
    };
    
    Game_MinimapMarker.prototype.isSubject = function() {
        return this.isPlayer() || this.isVehicle() || this.isEvent();
    };
    
    Game_MinimapMarker.prototype.isPlayer = function() {
        return this._eventId < 0;
    };
    
    Game_MinimapMarker.prototype.isVehicle = function() {
        return !!this._vehicleType;
    };
    
    Game_MinimapMarker.prototype.isEvent = function() {
        return this._eventId > 0 && this._mapId === $gameMap.mapId();
    };
    
    Game_MinimapMarker.prototype.isCoordinate = function() {
        return !isNaN(this._x);
    };
    
    Game_MinimapMarker.prototype.setPosition = function(x, y) {
        this.clearPos();
        this._mapId = $gameMap.mapId();
        this._x = x;
        this._y = y;
    };
    
    Game_MinimapMarker.prototype.pos = function(mapId, x, y) {
        return (
            this._mapId === mapId &&
            this._x === x &&
            this._y === y
        );
    };
    
    Game_MinimapMarker.prototype.isValid = function() {
        return !!this._type;
    };

    Game_MinimapMarker.prototype.isVisible = function() {
        if (!this.isValid()) {
            return false;
        }
        const subject = this.subject();
        return subject
            ? subject.isMinimapMarkerVisible()
            : this._mapId === $gameMap.mapId();
    };

    Game_MinimapMarker.prototype.minimapX = function() {
        return $gameMap.minimap.adjustX(this.realX) + 0.5;
    };
    
    Game_MinimapMarker.prototype.minimapY = function() {
        return $gameMap.minimap.adjustY(this.realY) + 0.5;
    };
    
    //-------------------------------------------------------------------------
    // Game_Minimap

    function Game_Minimap() {
        this.initialize.apply(this, arguments);
    }

    window.Game_Minimap = Game_Minimap;

    Game_Minimap.prototype.initialize = function() {
        this._paramsIndex = 0;
        this._zoom = 100;
        this._targetZoom = 100;
        this._zoomDuration = 0;
        this._markers = [];
        this.clearDisplayRect();
    };

    Game_Minimap.prototype.clearDisplayRect = function() {
        this._displayRect = new Rectangle();
    };
    
    Game_Minimap.prototype.setup = function() {
        this.clearDisplayRect();
        this.setupZoom();
    };
    
    Game_Minimap.prototype.setupZoom = function() {
        this._zoom = (
            this.metadataZoom() ||
            this.paramsZoom() ||
            this._targetZoom
        );
        this._targetZoom = this._zoom;
        this._zoomDuration = 0;
    };
    
    Game_Minimap.prototype.params = function() {
        return this._paramsIndex > 0
            ? param_DisplayPositions[this._paramsIndex - 1]
            : null;
    };
    
    Game_Minimap.prototype.metadataZoom = function() {
        const zoom = $dataMap.meta ? $dataMap.meta.MinimapZoom : null;
        return zoom ? Math.max(PluginManager.mppValue(zoom), 0) : 0;
    };
    
    Game_Minimap.prototype.paramsZoom = function() {
        const params = this.params();
        return params ? params.Zoom || 0 : 0;
    };
    
    Game_Minimap.prototype.setPosition = function(index) {
        if (this._paramsIndex !== index) {
            this._paramsIndex = index;
            this.zoomTo(0);
        }
    };
    
    Game_Minimap.prototype.correctionX = function() {
        const sx = ($gameMap.width() - this._displayRect.width) / 2;
        return sx < 0 ? -sx * this.xRate() : 0;
    };

    Game_Minimap.prototype.correctionY = function() {
        const sy = ($gameMap.height() - this._displayRect.height) / 2;
        return sy < 0 ? -sy * this.yRate() : 0;
    };

    Game_Minimap.prototype.zoom = function() {
        return this._zoom;
    };

    Game_Minimap.prototype.displayRect = function() {
        return this._displayRect;
    };
    
    Game_Minimap.prototype.markers = function() {
        return this._markers;
    };
    
    Game_Minimap.prototype.xRate = function() {
        return MinimapImage.tileWidth() * this._zoom / 100;
    };
    
    Game_Minimap.prototype.yRate = function() {
        return MinimapImage.tileHeight() * this._zoom / 100;
    };
    
    Game_Minimap.prototype.isZoomBottom = function() {
        return this._targetZoom === MinimapImage.minZoom();
    };
    
    Game_Minimap.prototype.isLoopHorizontal = function() {
        return $gameMap.isLoopHorizontal() && !this.isZoomBottom();
    };
    
    Game_Minimap.prototype.isLoopVertical = function() {
        return $gameMap.isLoopVertical() && !this.isZoomBottom();
    };
    
    Game_Minimap.prototype.zoomTo = function(zoom) {
        this._zoom = (
            zoom ||
            this.metadataZoom() ||
            this.paramsZoom() ||
            this._targetZoom
        );
        this._targetZoom = this._zoom;
        this.refreshZoom();
        this.updateScroll();
    };
    
    Game_Minimap.prototype.smoothZoomTo = function(zoom) {
        this._targetZoom = (
            zoom ||
            this.metadataZoom() ||
            this.paramsZoom() ||
            this._targetZoom
        );
        this.refreshZoom();
        this._zoomDuration = 24;
    };
    
    Game_Minimap.prototype.refreshZoom = function() {
        const minZoom = MinimapImage.minZoom();
        this._zoom = Math.max(this._zoom, minZoom);
        this._targetZoom = Math.max(this._targetZoom, minZoom);
    };

    Game_Minimap.prototype.adjustX = function(x) {
        const { x: dx, width: dw } = this._displayRect;
        if (this.isLoopHorizontal() && x < dx - ($gameMap.width() - dw) / 2) {
            return x - dx + $gameMap.width();
        } else {
            return x - dx;
        }
    };
    
    Game_Minimap.prototype.adjustY = function(y) {
        const { y: dy, height: dh } = this._displayRect;
        if (this.isLoopVertical() && y < dy - ($gameMap.height() - dh) / 2) {
            return y - dy + $gameMap.height();
        } else {
            return y - dy;
        }
    };
    
    Game_Minimap.prototype.addMarker = function(x, y, markerStr, tag) {
        if (Game_MinimapMarker.checkMarker(markerStr)) {
            const marker = new Game_MinimapMarker();
            marker.setMarker(markerStr);
            marker.setPosition(x, y);
            marker.setTag(tag);
            this._markers.push(marker);
        }
    };
    
    Game_Minimap.prototype.removeMarker = function(tag) {
        this._markers = this._markers.filter(
            marker => marker.tag() !== tag
        );
    };
    
    Game_Minimap.prototype.removeMarkerXy = function(x, y) {
        const mapId = $gameMap.mapId();
        this._markers = this._markers.filter(
            marker => !marker.pos(mapId, x, y)
        );
    };
    
    Game_Minimap.prototype.displayX = function(tileX) {
        const x = this.centerX() - tileX / 2;
        return this.isLoopHorizontal()
            ? MathExt.mod(x, $gameMap.width())
            : MathExt.clamp(x, 0, $gameMap.width() - tileX);
    };

    Game_Minimap.prototype.centerX = function() {
        return $gamePlayer._realX;
    };

    Game_Minimap.prototype.displayY = function(tileY) {
        const y = this.centerY() - tileY / 2;
        return this.isLoopVertical()
            ? MathExt.mod(y, $gameMap.height())
            : MathExt.clamp(y, 0, $gameMap.height() - tileY);
    };

    Game_Minimap.prototype.centerY = function() {
        return $gamePlayer._realY;
    };

    Game_Minimap.prototype.update = function() {
        this.updateZoom();
        this.updateScroll();
    };
    
    Game_Minimap.prototype.updateZoom = function() {
        if (this._zoomDuration > 0) {
            const d = this._zoomDuration--;
            const sz = this._targetZoom - this._zoom;
            this._zoom += sz * (d ** 2 - (d - 1) ** 2) / (d ** 2);
        }
    };

    Game_Minimap.prototype.updateScroll = function() {
        const rect = this._displayRect;
        const params = this.params();
        if (params) {
            rect.width = params.Width / this.xRate();
            rect.height = params.Height / this.yRate();
        }
        rect.x = this.displayX(rect.width);
        rect.y = this.displayY(rect.height);
    };

    //-------------------------------------------------------------------------
    // Game_Map

    Object.defineProperty(Game_Map.prototype, 'minimap', {
        get() {
            return this._minimap;
        },
        configurable: true
    });
    
    const _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Game_Map_initialize.apply(this, arguments);
        this._minimap = new Game_Minimap();
    };
    
    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_setup.apply(this, arguments);
        this._minimap.setup();
    };
    
    Game_Map.prototype.isShowMinimap = function(mapId) {
        mapId = mapId || this._mapId;
        return param_MapIds.includes(mapId);
    };
    
    Game_Map.prototype.minimapImageName = function() {
        return $dataMap.meta.Minimap || '';
    };
    
    Game_Map.prototype.allMinimapMarkers = function() {
        return [
            ...this.events().map(event => event.minimapMarker()),
            ...this._minimap.markers(),
            ...this.vehicles().map(vehicle => vehicle.minimapMarker()),
            $gamePlayer.minimapMarker()
        ].filter(Boolean);
    };
    
    const _Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        _Game_Map_update.apply(this, arguments);
        this._minimap.update();
    };
    
    //-------------------------------------------------------------------------
    // Game_Character

    Game_Character.prototype.setupMinimapMarker = function() {
        const markerStr = this.getMinimapMarkerStr();
        if (Game_MinimapMarker.checkMarker(markerStr)) {
            this._minimapMarker = new Game_MinimapMarker();
            this._minimapMarker.setMarker(markerStr);
            this.setupMinimapMarkerSubject();
        } else {
            this._minimapMarker = null;
        }
    };
    
    Game_Character.prototype.getMinimapMarkerStr = function() {
        return '';
    };

    Game_Character.prototype.setupMinimapMarkerSubject = function() {
    };

    Game_Character.prototype.minimapMarker = function() {
        return this._minimapMarker;
    };

    Game_Character.prototype.isMinimapMarkerVisible = function() {
        return !this.isTransparent();
    };

    //-------------------------------------------------------------------------
    // Game_Player

    const _Game_Player_initialize = Game_Player.prototype.initialize;
    Game_Player.prototype.initialize = function() {
        _Game_Player_initialize.apply(this, arguments);
        this.setupMinimapMarker();
    };
    
    Game_Player.prototype.setupMinimapMarkerSubject = function() {
        this._minimapMarker.setPlayer();
    };

    Game_Player.prototype.getMinimapMarkerStr = function() {
        return param_PlayerMarker;
    };

    Game_Player.prototype.isMinimapMarkerVisible = function() {
        return (
            this._vehicleType !== 'walk' ||
            Game_Character.prototype.isMinimapMarkerVisible.call(this)
        );
    };

    //-------------------------------------------------------------------------
    // Game_Vehicle

    const _Game_Vehicle_initialize = Game_Vehicle.prototype.initialize;
    Game_Vehicle.prototype.initialize = function(type) {
        _Game_Vehicle_initialize.apply(this, arguments);
        this.setupMinimapMarker();
    };
    
    Game_Vehicle.prototype.setupMinimapMarkerSubject = function() {
        this._minimapMarker.setVehicleType(this._type);
    };

    Game_Vehicle.prototype.getMinimapMarkerStr = function() {
        return param_VehicleMarkers[this._type];
    };

    Game_Vehicle.prototype.isMinimapMarkerVisible = function() {
        return (
            !this._driving &&
            Game_Character.prototype.isMinimapMarkerVisible.call(this)
        );
    };

    //-------------------------------------------------------------------------
    // Game_Event

    Game_Event.prototype.setupMinimapMarkerSubject = function() {
        this._minimapMarker.setEventId(this._eventId);
    };

    const _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
        _Game_Event_setupPage.apply(this, arguments);
        this.setupMinimapMarker();
    };
    
    Game_Event.prototype.getMinimapMarkerStr = function() {
        if (this._pageIndex >= 0) {
            return (
                this.getCommentMinimapMarkerStr() ||
                this.event().meta.Marker
            );
        }
        return '';
    };

    Game_Event.prototype.getCommentMinimapMarkerStr = function() {
        const commandNames = ['MinimapMarker', 'マーカー'];
        for (const comment of this.generatorCommentCommand(commandNames)) {
            const [_, markerStr] = comment.split(' ');
            return markerStr;
        }
        return null;
    };

    Game_Event.prototype.generatorCommentCommand = function*(commandNames) {
        for (const evCom of this.list()) {
            switch (evCom.code) {
                case 108:
                case 408:
                    const comment = evCom.parameters[0];
                    if (commandNames.some(name => comment.startsWith(name))) {
                        yield comment;
                    }
                    break;
                default:
                    return;
            }
        }
    };

    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _mzCommands = {
        ShowMinimap: { name: 'show', keys: ['index'] },
        SetMinimapZoom: { name: 'setZoom', keys: ['zoom'] },
        AddMarker: { name: 'addMarker', keys: ['x', 'y', 'marker', 'tag'] },
        RemoveMarker: { name: 'removeMarker', keys: ['tag'] },
        RemoveMarkerXy: { name: 'removeMarkerXy', keys: ['x', 'y'] }
    };
    Object.assign(_mzCommands, {
        'ミニマップ表示': _mzCommands.ShowMinimap,
        'ミニマップ拡大率設定': _mzCommands.SetMinimapZoom,
        'マーカー追加': _mzCommands.AddMarker,
        'マーカー削除': _mzCommands.RemoveMarker,
        '座標マーカー削除': _mzCommands.RemoveMarkerXy
    });

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        const mzCommand = _mzCommands[command];
        if (mzCommand) {
            const args2 = Object.assign(
                {}, ...mzCommand.keys.map((k, i) => ({ [k]: args[i] }))
            );
            PluginManager.callCommandMV(this, pluginName, mzCommand.name, args2);
        }
    };

    //-------------------------------------------------------------------------
    // PluginManager
    
    if (!PluginManager.registerCommand && !PluginManager._commandsMV) {
        PluginManager._commandsMV = {};

        PluginManager.registerCommandMV = function(pluginName, commandName, func) {
            const key = pluginName + ':' + commandName;
            this._commandsMV[key] = func;
        };
        
        PluginManager.callCommandMV = function(self, pluginName, commandName, args) {
            const key = pluginName + ':' + commandName;
            const func = this._commandsMV[key];
            if (typeof func === 'function') {
                func.bind(self)(args);
            }
        };
    }

    const _registerCommandName = PluginManager.registerCommand
        ? 'registerCommand'
        : 'registerCommandMV';
    
    PluginManager[_registerCommandName](pluginName, 'show', args => {
        const index = PluginManager.mppValue(args.index);
        $gameMap.minimap.setPosition(index);
    });

    PluginManager[_registerCommandName](pluginName, 'setZoom', args => {
        const zoom = PluginManager.mppValue(args.zoom);
        $gameMap.minimap.smoothZoomTo(zoom);
    });

    PluginManager[_registerCommandName](pluginName, 'addMarker', args => {
        const x = PluginManager.mppValue(args.x);
        const y = PluginManager.mppValue(args.y);
        const tag = PluginManager.mppValue(args.tag || '0');
        $gameMap.minimap.addMarker(x, y, args.marker, tag);
    });

    PluginManager[_registerCommandName](pluginName, 'removeMarker', args => {
        const tag = PluginManager.mppValue(args.tag);
        $gameMap.minimap.removeMarker(tag);
    });

    PluginManager[_registerCommandName](pluginName, 'removeMarkerXy', args => {
        const x = PluginManager.mppValue(args.x);
        const y = PluginManager.mppValue(args.y);
        $gameMap.minimap.removeMarkerXy(x, y);
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
    
    //-------------------------------------------------------------------------
    // MinimapImage

    function MinimapImage() {
        throw new Error('This is a static class');
    }

    if (_importedPlugin(..._pluginOptions)) {
        window.MinimapImage = MinimapImage;
    }

    MinimapImage.bitmap = null;
    MinimapImage._tileSize = 3;
    MinimapImage.COLORS = {
        Land: 'rgba(255,255,255,1.0)',
        Sea: 'rgba(0,0,0,0.5)',
        Ford: 'rgba(64,64,64,0.75)',
        Mountain: 'rgba(128,128,128,1.0)',
        Hill: 'rgba(160,160,160,1.0)',
        Forest: 'rgba(192,192,192,1.0)',
        River: 'rgba(128,128,128,0.5)',
        Shallow: 'rgba(160,160,160,0.75)',
        Ladder: 'rgba(160,160,160,1.0)',
        Bush: 'rgba(192,192,192,1.0)',
        Counter: 'rgba(160,160,160,0.5)',
        Wall: 'rgba(64,64,64,0.25)',
        Floor: 'rgba(255,255,255,1.0)',
        None: 'rgba(0,0,0,0)'
    };

    MinimapImage.destroy = function() {
        if (this.bitmap && !this._isUserImage) {
            this.bitmap.destroy();
        }
        this.bitmap = null;
    };

    MinimapImage.isReady = function() {
        return this.bitmap && this.bitmap.isReady();
    };

    MinimapImage.onLoad = function(imageName) {
        this._isUserImage = !!imageName;
        if (this._isUserImage) {
            this.bitmap = ImageManager.loadPicture(imageName);
            this.bitmap.addLoadListener(() => $gameMap.minimap.refreshZoom());
        } else {
            const width = $gameMap.width() * this._tileSize;
            const height = $gameMap.height() * this._tileSize;
            this.bitmap = new Bitmap(width, height);
        }
    };

    MinimapImage.tileColors = function() {
        return this.COLORS;
    };

    MinimapImage.isForcedWall = function(x, y) {
        const regionId = $gameMap.regionId(x, y);
        return param_WallRegionIDs.includes(regionId)
    };

    MinimapImage.isForcedFloor = function(x, y) {
        const regionId = $gameMap.regionId(x, y);
        return param_FloorRegionIDs.includes(regionId);
    };

    MinimapImage.tileWidth = function() {
        return this.bitmap ? (this.bitmap.width / $gameMap.width()) || 1 : 1;
    };

    MinimapImage.tileHeight = function() {
        return this.bitmap ? (this.bitmap.height / $gameMap.height()) || 1 : 1;
    };

    MinimapImage.minZoom = function() {
        const params = $gameMap.minimap.params();
        if (params && this.bitmap.isReady()) {
            const minRate = Math.min(
                params.Width / this.bitmap.width,
                params.Height / this.bitmap.height
            );
            return Math.max(Math.floor(minRate * 100), 1);
        }
        return 1;
    };
    
    MinimapImage.refresh = function() {
        if (this.bitmap && !this._isUserImage) {
            this.bitmap.clear();
            const width = $gameMap.width();
            const height = $gameMap.height();
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    this.paintSpot(x, y);
                }
            }
            this.bitmap.baseTexture.update();
        }
    };

    MinimapImage.paintSpot = function(x, y) {
        const size = this._tileSize;
        const dx = x * size;
        const dy = y * size;
        if ($gameMap.isOverworld()) {
            const color = this.getWorldSpotColor(x, y);
            this.fillRect(dx, dy, size, size, color);
        } else {
            const flag = this.spotFlag(x, y);
            const color = this.getAreaSpotColor(flag);
            this.fillRect(dx, dy, size, size, color);
            this.paintPassage(dx, dy, size, size, flag);
        }
    };

    MinimapImage.getWorldSpotColor = function(x, y) {
        const colors = this.tileColors();
        const type = this.autotileType(x, y);
        if (type === 1) {
            return colors.Sea;
        } else if (type >= 0 && type < 16) {
            return colors.Ford;
        } else if ([20, 21, 28, 36, 44].includes(type)) {
            return colors.Forest;
        } else if ([22, 30, 38, 46].includes(type)) {
            return colors.Hill;
        } else if ([23, 31, 39, 47].includes(type)) {
            return colors.Mountain;
        } else {
            return colors.Land;
        }
    };

    MinimapImage.autotileType = function(x, y) {
        const flags = $gameMap.tilesetFlags();
        const tiles = $gameMap.layeredTiles(x, y);
        for (const tile of tiles) {
            const flag = flags[tile];
            if ((flag & 0x10) !== 0 || tile < 2048) {
                continue;
            }
            return Math.floor((tile - 2048) / 48);
        }
        return -1;
    };

    MinimapImage.getAreaSpotColor = function(flag) {
        const colors = this.tileColors();
        if (flag === 0x400) return colors.River;
        if (flag === 0x200) return colors.Shallow;
        if (flag === 0x10) return colors.None;
        if (flag === 0x20) return colors.Ladder;
        if (flag === 0x40) return colors.Bush;
        if (flag === 0x80) return colors.Counter;
        if (flag === 0x0f) return colors.Wall;
        return colors.Floor;
    };

    MinimapImage.spotFlag = function(x, y) {
        if (this.isForcedWall(x, y)) return 0x0f;
        if (this.isForcedFloor(x, y)) return 0x00;
        const flags = $gameMap.tilesetFlags();
        const tiles = $gameMap.layeredTiles(x, y);
        for (const tile of tiles) {
            const flag = flags[tile];
            if ((flag & 0x20) !== 0) return 0x20;
            if ((flag & 0x40) !== 0) return 0x40;
            if ((flag & 0x80) !== 0) return 0x80;
        }
        for (const tile of tiles) {
            const flag = flags[tile];
            if ((flag & 0x10) !== 0) continue;
            const type = Math.floor((tile - 2048) / 48);
            if (type >= 0 && type < 16) {
                return (flag & 0x0f) === 0x0f ? 0x400 : 0x200;
            } else {
                return flag & 0x0f;
            }
        }
        return 0x10;
    };

    MinimapImage.paintPassage = function(x, y, width, height, flag) {
        if ((flag & 0x0f) !== 0 && (flag & 0x0f) !== 0x0f) {
            const color = this.tileColors().Wall;
            const wall = this._tileSize / 3;
            const isBit = bit => (flag & bit) === bit;
            const x2 = x + wall;
            const x3 = x + width - wall;
            const y2 = y + wall;
            const y3 = y + height - wall;
            if (isBit(0x02) || isBit(0x08)) {
                this.fillRect(x, y, wall, wall, color);
            }
            if (isBit(0x08)) {
                this.fillRect(x2, y, wall, wall, color);
            }
            if (isBit(0x04) || isBit(0x08)) {
                this.fillRect(x3, y, wall, wall, color);
            }
            if (isBit(0x02)) {
                this.fillRect(x, y2, wall, wall, color);
            }
            if (isBit(0x04)) {
                this.fillRect(x3, y2, wall, wall, color);
            }
            if (isBit(0x01) || isBit(0x02)) {
                this.fillRect(x, y3, wall, wall, color);
            }
            if (isBit(0x01)) {
                this.fillRect(x2, y3, wall, wall, color);
            }
            if (isBit(0x01) || isBit(0x04)) {
                this.fillRect(x3, y3, wall, wall, color);
            }
        }
    };

    MinimapImage.fillRect = function(x, y, width, height, color) {
        const context = this.bitmap.context;
        context.save();
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
        context.restore();
    };

    //-----------------------------------------------------------------------------
    // TilingSprite_MinimapBack

    function TilingSprite_MinimapBack() {
        this.initialize(...arguments);
    }
    
    TilingSprite_MinimapBack.prototype = Object.create(TilingSprite.prototype);
    TilingSprite_MinimapBack.prototype.constructor = TilingSprite_MinimapBack;
    
    TilingSprite_MinimapBack.prototype.initialize = function() {
        TilingSprite.prototype.initialize.call(this);
        // if (param_BlurLevel > 0) {
        //     this._createBlurFilter();
        //     this._blurFilter.blur = param_BlurLevel / 4;
        // }
    };
    
    // TilingSprite_MinimapBack.prototype._createBlurFilter = function() {
    //     this._blurFilter = new PIXI.filters.BlurFilter();
    //     if (!this.filters) {
    //         this.filters = [];
    //     }
    //     this.filters.push(this._blurFilter);
    // };
    
    TilingSprite_MinimapBack.prototype.updateTransform = function() {
        if (MinimapImage.isReady()) {
            this.bitmap = MinimapImage.bitmap;
            this.updatePlacement();
            this.scale.set($gameMap.minimap.zoom() / 100);
        }
        if (Utils.RPGMAKER_NAME === 'MV') {
            this.updateTransformTS();
        } else {
            PIXI.TilingSprite.prototype.updateTransform.call(this);
        }
    };
    
    TilingSprite_MinimapBack.prototype.updatePlacement = function() {
        const rect = $gameMap.minimap.displayRect();
        const tileWidth = MinimapImage.tileWidth();
        const tileHeight = MinimapImage.tileHeight();
        this._width = Math.min(rect.width, $gameMap.width()) * tileWidth;
        this._height = Math.min(rect.height, $gameMap.height()) * tileHeight;
        this.tilePosition.x = -rect.x * tileWidth;
        this.tilePosition.y = -rect.y * tileHeight;
    };

    //-------------------------------------------------------------------------
    // Sprite_MinimapMarker

    function Sprite_MinimapMarker() {
        this.initialize.apply(this, arguments);
    }
    
    if (_importedPlugin(..._pluginOptions)) {
        window.Sprite_MinimapMarker = Sprite_MinimapMarker;
    }

    Sprite_MinimapMarker.prototype = Object.create(Sprite.prototype);
    Sprite_MinimapMarker.prototype.constructor = Sprite_MinimapMarker;

    Sprite_MinimapMarker._arrowBitmaps = {};

    Sprite_MinimapMarker.markerSize = function() {
        return param_MarkerSize;
    };

    Sprite_MinimapMarker.upperPadding = function() {
        return this.markerSize() * 3;
    };

    Sprite_MinimapMarker.arrowBitmap = function(color) {
        const size = this.markerSize();
        const key = `${color}:${size}`;
        if (!this._arrowBitmaps[key]) {
            const c = size + 1;
            const bitmap = new Bitmap(c * 2, c * 2);
            const context = bitmap.context;
            context.save();
            context.beginPath();
            context.moveTo(c, c + size);
            context.lineTo(c + size, c - size);
            context.lineTo(c, c - size / 2);
            context.lineTo(c - size, c - size);
            context.closePath();
            context.lineWidth = 2;
            context.lineJoin = 'bevel';
            context.strokeStyle = color;
            context.stroke();
            context.fillStyle = color;
            context.fill();
            context.restore();
            this._arrowBitmaps[key] = bitmap;
        }
        return this._arrowBitmaps[key];
    };

    Sprite_MinimapMarker.destroyArrow = function() {
        for (const bitmap of Object.values(this._arrowBitmaps)) {
            bitmap.destroy();
        }
        this._arrowBitmaps = {};
    };
    
    Object.defineProperty(Sprite_MinimapMarker.prototype, 'padding', {
        get() {
            return this._padding;
        },
        set(value) {
            this._padding = value;
            this.x = -value;
            this.y = -value;
        },
        configurable: true
    });
    
    Sprite_MinimapMarker.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this, new Bitmap(1, 1));
        this._width = 1;
        this._height = 1;
        this._padding = 0;
    };

    Sprite_MinimapMarker.prototype.destroy = function() {
        Sprite_MinimapMarker.destroyArrow();
        this.bitmap.destroy();
        Sprite.prototype.destroy.call(this);
    };
    
    Sprite_MinimapMarker.prototype.setSize = function(width, height) {
        const realWidth = width + this._padding * 2;
        const realHeight = height + this._padding * 2;
        if (this._width !== realWidth || this._height !== realHeight) {
            this._width = realWidth;
            this._height = realHeight;
            this.bitmap.resize(realWidth, realHeight);
            const context = this.bitmap.context;
            context.shadowColor = 'black';
            context.shadowOffsetX = 1;
            context.shadowOffsetY = 1;
            context.shadowBlur = 4;
            this._onBitmapChange();
        }
    };

    Sprite_MinimapMarker.prototype.setPaintOpacity = function(opacity) {
        this.bitmap.paintOpacity = opacity;
    };

    Sprite_MinimapMarker.prototype.clear = function() {
        this.bitmap.clear();
    };

    Sprite_MinimapMarker.prototype.paintMarker = function(x, y, marker) {
        const rx = x + this._padding;
        const ry = y + this._padding;
        switch (marker.type()) {
            case 'P':
                this.paintPoint(rx, ry, marker.color());
                break;
            case 'A':
                this.paintArrow(rx, ry, marker.color(), marker.angle());
                break;
            case 'I':
                this.paintIcon(rx, ry, marker.iconIndex());
                break;
            case 'T':
                this.paintTriangle(rx, ry, marker.color());
                break;
            case 'S':
                this.paintSquare(rx, ry, marker.color());
                break;
            case 'R':
                this.paintRhombus(rx, ry, marker.color());
                break;
            case 'X':
                this.paintCross(rx, ry, marker.color());
                break;
            case 'C': {
                const xRate = $gameMap.minimap.xRate();
                const radius = marker.radius() * xRate;
                this.paintCircle(rx, ry, radius, marker.color());
                break;
            }
        }
    };

    Sprite_MinimapMarker.prototype.paintPoint = function(x, y, color) {
        const radius = Sprite_MinimapMarker.markerSize();
        this.bitmap.drawCircle(x, y, radius, color);
    };

    Sprite_MinimapMarker.prototype.paintArrow = function(x, y, color, angle) {
        const arrowBitmap = Sprite_MinimapMarker.arrowBitmap(color);
        const context = this.bitmap.context;
        context.save();
        context.translate(x, y);
        context.rotate(angle * Math.PI / 180);
        context.globalCompositeOperation = "source-over";
        const image = arrowBitmap._canvas;
        const dx = -arrowBitmap.width / 2;
        const dy = -arrowBitmap.height / 2;
        context.drawImage(image, dx, dy);
        context.restore();
        this.bitmap.baseTexture.update();
    };

    Sprite_MinimapMarker.prototype.paintIcon = function(x, y, iconIndex, angle) {
        const icons = ImageManager.loadPicture(param_IconImage);
        if (param_IconImage && icons.isReady()) {
            const context = this.bitmap.context;
            context.save();
            context.translate(x, y);
            context.rotate(angle * Math.PI / 180);
            context.globalCompositeOperation = "source-over";
            const n = Math.floor(icons.width / 8);
            const p = -n / 2;
            const image = icons._canvas || icons._image;
            const sx = (iconIndex % 16) * n;
            const sy = Math.floor(iconIndex / 16) * n;
            context.drawImage(image, sx, sy, n, n, p, p, n, n);
            context.restore();
            this.bitmap.baseTexture.update();
        }
    };

    Sprite_MinimapMarker.prototype.paintTriangle = function(x, y, color) {
        const size = Sprite_MinimapMarker.markerSize() + 1;
        const h = size * Math.sqrt(3);
        const r = size * 2 / Math.sqrt(3);
        const context = this.bitmap.context;
        context.save();
        context.beginPath();
        context.moveTo(x, y - r);
        context.lineTo(x + size, y - r + h);
        context.lineTo(x - size, y - r + h);
        context.closePath();
        context.fillStyle = color;
        context.fill();
        context.restore();
        this.bitmap.baseTexture.update();
    };

    Sprite_MinimapMarker.prototype.paintSquare = function(x, y, color) {
        const size = Sprite_MinimapMarker.markerSize();
        const context = this.bitmap.context;
        context.save();
        context.fillStyle = color;
        context.fillRect(x - size, y - size, size * 2, size * 2);
        context.restore();
        this.bitmap.baseTexture.update();
    };

    Sprite_MinimapMarker.prototype.paintRhombus = function(x, y, color) {
        const size = Sprite_MinimapMarker.markerSize() + 1;
        const context = this.bitmap.context;
        context.save();
        context.beginPath();
        context.moveTo(x, y - size);
        context.lineTo(x + size, y);
        context.lineTo(x, y + size);
        context.lineTo(x - size, y);
        context.closePath();
        context.fillStyle = color;
        context.fill();
        context.restore();
        this.bitmap.baseTexture.update();
    };

    Sprite_MinimapMarker.prototype.paintCross = function(x, y, color) {
        const size = Sprite_MinimapMarker.markerSize();
        const w = size * 2 / 3;
        const r = size - w / 2 + 0.25;
        const context = this.bitmap.context;
        context.save();
        context.beginPath();
        context.moveTo(x - r, y - r);
        context.lineTo(x + r, y + r);
        context.moveTo(x + r, y - r);
        context.lineTo(x - r, y + r);
        context.lineWidth = w;
        context.lineCap = 'round';
        context.strokeStyle = color;
        context.stroke();
        context.restore();
        this.bitmap.baseTexture.update();
    };

    Sprite_MinimapMarker.prototype.paintCircle = function(x, y, radius, color) {
        const context = this.bitmap.context;
        context.save();
        context.shadowColor = '#00000000';
        const grad = context.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, color);
        grad.addColorStop(1, color + '60');
        context.fillStyle = grad;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.fill();
        context.restore();
        this.bitmap.baseTexture.update();
    };

    Sprite_MinimapMarker.prototype.paintHighlightedArrow = function(x, y, radian) {
        if (!isNaN(radian)) {
            const size = Sprite_MinimapMarker.markerSize();
            const pad = this._padding;
            const context = this.bitmap.context;
            context.save();
            context.translate(x + pad, y + pad);
            context.rotate(radian);
            context.beginPath();
            context.moveTo(size * 2, 0);
            context.lineTo(size, size);
            context.lineTo(size, -size);
            context.closePath();
            context.fillStyle = 'white';
            context.fill();
            context.restore();
            this.bitmap.baseTexture.update();
        }
    };

    //-----------------------------------------------------------------------------
    // Sprite_MiniMap

    function Sprite_MiniMap() {
        this.initialize.apply(this, arguments);
    }
    
    if (_importedPlugin(..._pluginOptions)) {
        window.Sprite_MiniMap = Sprite_MiniMap;
    }

    Sprite_MiniMap.prototype = Object.create(Sprite.prototype);
    Sprite_MiniMap.prototype.constructor = Sprite_MiniMap;

    Sprite_MiniMap.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.anchor.set(0.5);
        this.visible = false;
        this._blinkDuration = param_BlinkDuration;
        this._show = true;
        this._frameName = '';
        this._frameLoaded = true;
        this.createBackSprite();
        this.createMarkerSprites();
        this.createFrameSprite();
    };

    Sprite_MiniMap.prototype.createBackSprite = function() {
        // MVではTilingSpriteにBlurFilterが使えないため、
        // PIXI.Containerに入れてこちらにブラーをかける
        this._baclContainer = new PIXI.Container();
        if (param_BlurLevel > 0) {
            const blurFilter = new PIXI.filters.BlurFilter();
            blurFilter.blur = param_BlurLevel / 4;
            this._baclContainer.filters = [blurFilter];
        }
        this.addChild(this._baclContainer);
        this._backSprite = new TilingSprite_MinimapBack();
        this._baclContainer.addChild(this._backSprite);
    };

    Sprite_MiniMap.prototype.createMarkerSprites = function() {
        this._lowerMarkerSprite = new Sprite_MinimapMarker();
        this._upperMarkerSprite = new Sprite_MinimapMarker();
        this._upperMarkerSprite.padding = Sprite_MinimapMarker.upperPadding();
        this.addChild(this._lowerMarkerSprite);
        this.addChild(this._upperMarkerSprite);
    };

    Sprite_MiniMap.prototype.createFrameSprite = function() {
        this._frameSprite = new Sprite();
        this.addChild(this._frameSprite);
    };

    Sprite_MiniMap.prototype.hide = function() {
        this._show = false;
    };

    Sprite_MiniMap.prototype.clearMarker = function() {
        this._lowerMarkerSprite.clear();
        this._upperMarkerSprite.clear();
    };

    Sprite_MiniMap.prototype.update = function() {
        Sprite.prototype.update.call(this);
        const params = $gameMap.minimap.params();
        if (params) {
            this.updateFrame(params);
        }
        this.updateVisibility(params);
        if (this.visible) {
            this.updateBack();
            this.updatePosition(params);
            this.updateMarker(params);
            this.updateBlink();
            this.updateOpacity(params);
        }
    };

    Sprite_MiniMap.prototype.updateVisibility = function(params) {
        this.visible = params && this._show && this._frameLoaded;
    };

    Sprite_MiniMap.prototype.updateBack = function() {
        const rect = $gameMap.minimap.displayRect();
        const tileWidth = MinimapImage.tileWidth();
        const tileHeight = MinimapImage.tileHeight();
        const width = Math.min(rect.width, $gameMap.width()) * tileWidth;
        const height = Math.min(rect.height, $gameMap.height()) * tileHeight;
        this._backSprite.move(0, 0, width, height);
        this._backSprite.origin.x = rect.x * tileWidth;
        this._backSprite.origin.y = rect.y * tileHeight;
        this._backSprite.scale.set($gameMap.minimap.zoom() / 100);
    };

    Sprite_MiniMap.prototype.updateFrame = function(params) {
        const name = params['Frame Image'];
        if (this._frameName !== name) {
            this._frameName = name;
            this._frameSprite.bitmap = ImageManager.loadPicture(name);
            this._frameLoaded = false;
        }
        if (!this._frameLoaded && this._frameSprite.bitmap.isReady()) {
            const { width, height } = this._frameSprite.bitmap;
            this._frameSprite.x = (params.Width - width) / 2;
            this._frameSprite.y = (params.Height - height) / 2;
            this._frameLoaded = true;
        }
    };

    Sprite_MiniMap.prototype.updatePosition = function(params) {
        this.x = params.X + $gameMap.minimap.correctionX();
        this.y = params.Y + $gameMap.minimap.correctionY();
    };

    Sprite_MiniMap.prototype.updateMarker = function(params) {
        const { Width:width, Height:height } = params;
        this._lowerMarkerSprite.setSize(width, height);
        this._upperMarkerSprite.setSize(width, height);
    };

    Sprite_MiniMap.prototype.updateBlink = function() {
        this._blinkDuration--;
        if (this._blinkDuration <= 0) {
            this._blinkDuration = param_BlinkDuration;
        }
    };

    Sprite_MiniMap.prototype.updateOpacity = function(params) {
        this.opacity = params.Opacity;
    };

    Sprite_MiniMap.prototype.updateTransform = function() {
        if (this.visible) {
            this.clearMarker();
            this.paintAllMarkers();
        }
        Sprite.prototype.updateTransform.call(this);
    };

    Sprite_MiniMap.prototype.paintAllMarkers = function() {
        const xRate = $gameMap.minimap.xRate();
        const yRate = $gameMap.minimap.yRate();
        for (const marker of $gameMap.allMinimapMarkers()) {
            if (marker.isVisible()) {
                this.paintMarker(marker, xRate, yRate);
            }
        }
    };

    Sprite_MiniMap.prototype.paintMarker = function(marker, xRate, yRate) {
        const x = marker.minimapX();
        const y = marker.minimapY();
        if (marker.isHighlighted()) {
            const sprite = this._upperMarkerSprite;
            this.setSpriteOpacity(sprite, marker);
            const [cx, cy, radian] = this.correctionPos(x, y);
            const dx = cx * xRate;
            const dy = cy * yRate;
            sprite.paintMarker(dx, dy, marker);
            sprite.paintHighlightedArrow(dx, dy, radian);
        } else {
            const sprite = this._lowerMarkerSprite;
            this.setSpriteOpacity(sprite, marker);
            const dx = x * xRate;
            const dy = y * yRate;
            sprite.paintMarker(dx, dy, marker);
        }
    };

    Sprite_MiniMap.prototype.setSpriteOpacity = function(sprite, marker) {
        const opacity = marker.isBlink()
            ? 255 * this._blinkDuration / param_BlinkDuration
            : 255;
        sprite.setPaintOpacity(opacity);
    };

    Sprite_MiniMap.prototype.correctionPos = function(x, y) {
        const rect = $gameMap.minimap.displayRect();
        const hw = rect.width / 2
        const hh = rect.height / 2;
        let sx = x - hw;
        let sy = y - hh;
        if (sx < -hw) {
            sy *= -hw / sx;
            sx = -hw;
        } else if (sx > hw) {
            sy *= hw / sx;
            sx = hw;
        }
        if (sy < -hh) {
            sx *= -hh / sy;
            sy = -hh;
        } else if (sy > hh) {
            sx *= hh / sy;
            sy = hh;
        }
        return [
            sx + hw,
            sy + hh,
            sx !== x - hw || sy !== y - hh ? Math.atan2(sy, sx) : NaN
        ];
    };

    //-------------------------------------------------------------------------
    // Spriteset_Map

    const _Spriteset_Map_loadTileset = Spriteset_Map.prototype.loadTileset;
    Spriteset_Map.prototype.loadTileset = function() {
        _Spriteset_Map_loadTileset.apply(this, arguments);
        MinimapImage.refresh();
    };
    
    //-------------------------------------------------------------------------
    // Scene_Map

    const _Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function() {
        if (this._minimapSprite) this._minimapSprite.hide();
        _Scene_Map_terminate.apply(this, arguments);
        if (this._minimapSprite && Utils.RPGMAKER_NAME === 'MV') {
            this._minimapSprite.destroy();
            this.removeChild(this._minimapSprite);
        }
    };

    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        MinimapImage.destroy();
        if ($gameMap.isShowMinimap()) {
            MinimapImage.onLoad($gameMap.minimapImageName());
        }
        _Scene_Map_createDisplayObjects.apply(this, arguments);
        this.createMinimap();
    };

    Scene_Map.prototype.createMinimap = function() {
        if ($gameMap.isShowMinimap()) {
            this._minimapSprite = new Sprite_MiniMap();
            const index = this.children.indexOf(this._windowLayer);
            if (index < 0) {
                this.addChild(this._minimapSprite);
            } else {
                this.addChildAt(this._minimapSprite, index);
            }
        }
    };

    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        _Scene_Map_callMenu.apply(this, arguments);
        if (this._minimapSprite) this._minimapSprite.hide();
    };

    const _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
    Scene_Map.prototype.launchBattle = function() {
        _Scene_Map_launchBattle.apply(this, arguments);
        if (this._minimapSprite) this._minimapSprite.hide();
    };

})();
