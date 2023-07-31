//=============================================================================
// MPP_MiniMap_Op2.js
//=============================================================================
// Copyright (c) 2019 - 2022 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc You will be able to call up the screen to check the map.
 * @author Mokusei Penguin
 * @url
 * 
 * @base MPP_MiniMap
 * @orderAfter MPP_MiniMap
 * 
 * @help [version 3.2.0]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ Plugin command
 *  〇 MV / MZ
 *  
 *  〇 CallMenuMap  / callMenuMap
 *   - Call the menu map screen.
 * 
 * ▼ Map notes
 *  〇 <MenuMap:name>
 *   - Specifies the file name of the minimap image for this map.
 *   - Put the image files in img/pictures.
 * 
 * ▼ Menu map operation method
 *  〇 Move cursor
 *   For pads or keyboards : Arrow keys / Accelerate with shift key
 *   For mouse or touch operation : Move to the touched position
 * 
 *  〇 Scroll map
 *   For pads or keyboards : Arrow keys
 *   For mouse or touch operation : Move while touching
 *  
 *  〇 Map scaling
 *   For pads or keyboards : Page up & down
 *   For mouse : Wheel operation or upper left button
 *   For touch operation : Upper left button
 *   ※ Button display is a function of MZ.
 *  
 *  〇 Point to the pin
 *   For pads or keyboards : Enter key
 *   For mouse or touch operation : After touching, release without moving
 * 
 * ▼ Display name
 *  - The name of the character on which the cursor is placed is displayed.
 *  - Some control characters can be used in the name. (\V,\N,\P,\G,\C,\\)
 *  - For events, if the name is blank '', the default name 'EV???'
 *    (? Is a number), or if it starts with '#', it will not be displayed.
 *
 * ▼ Pin pointing
 *  - If you point to a pin on the menu map screen, the pin will also
 *    be displayed on the minimap.
 *  - Pins are erased as the player approaches.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command callMenuMap
 *      @desc 
 * 
 * 
 *  @param Display Position
 *      @desc 
 *      @type struct<DisplayPosition>
 *      @default {"X":"32","Y":"32","Width":"752","Height":"560","Opacity":"255","Zoom":"-1","Frame Image":""}
 *
 *  @param Menu Command Text
 *      @desc Hide if empty
 *      @default Map
 *
 *  @param Marker Size
 *      @desc Point type and arrow type sizes
 * (Same as MPP_MiniMap.js / Applies only to menu screen)
 *      @type number
 *          @min 1
 *          @max 999
 *      @default 6
 *
 *  @param Cursor
 *      @desc 
 *      @type struct<Cursor>
 *      @default {"Image Name":"","Width":"10","Animation Rate":"30"}
 *
 *  @param Min Zoom
 *      @desc It will not be less than the full display.
 *      @type number
 *          @min 0
 *          @max 10000
 *      @default 0
 *
 *  @param Max Zoom
 *      @desc 
 *      @type number
 *          @min 10
 *          @max 10000
 *      @default 800
 *
 *  @param Place Pin Enabled?
 *      @desc Enable / disable the function that allows you to set a pin with the enter key
 *      @type boolean
 *      @default true
 *
 *  @param Pin Image
 *      @desc Automatically generated if not set
 *      @type file
 *          @require 1
 *          @dir img/pictures/
 *      @default 
 *      @parent Place Pin Enabled?
 *
 *  @param Pin Color Index
 *      @desc Color when automatically generated
 * See img/system/Window.png for specific colors
 *      @type number
 *          @min 0
 *          @max 31
 *      @default 0
 *      @parent Place Pin Enabled?
 *
 *  @param Name Window Position
 *      @desc 
 *      @type select
 *          @option None
 *          @value None
 *          @option Top of screen
 *          @value Top of screen
 *          @option Top of marker
 *          @value Top of marker
 *          @option Bottom of screen
 *          @value Bottom of screen
 *      @default Top of marker
 * 
 *  @param Player Name
 *      @desc 
 *      @default \p[1]
 *      @parent Name Window Position
 * 
 *  @param Vehicle Names
 *      @desc 
 *      @type struct<Vehicle>
 *      @default {"boat":"Boat","ship":"Ship","airship":"Airship"}
 *      @parent Name Window Position
 * 
 *  @param Name Window Parameters
 *      @desc 
 *      @type struct<NameWindow>
 *      @default {"Window Skin":"Window","Background Type":"Normal","Oy":"0","Padding":"8","Font Size":"20"}
 *      @parent Name Window Position
 * 
 */

/*~struct~DisplayPosition:
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
 *      @default 752
 *
 *  @param Height
 *      @desc
 *      @type number
 *          @min 1
 *          @max 999999
 *      @default 560
 *
 *  @param Opacity
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 255
 *      @default 255
 *
 *  @param Zoom
 *      @desc -1:The entire display,
 * 0:Do not change the value of <MinimapZoom:n> in the map memo
 *      @type number
 *          @min -1
 *          @max 10000
 *      @default -1
 *
 *  @param Frame Image
 *      @desc 
 *      @type file
 *          @require 1
 *          @dir img/pictures
 *      @default 
 *
 */

/*~struct~Cursor:
 *  @param Image Name
 *      @desc 
 *      @type file
 *          @require 1
 *          @dir img/pictures
 *      @default 
 *
 *  @param Width
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 999
 *      @default 10
 *
 *  @param Animation Rate
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 999
 *      @default 30
 *
 */

/*~struct~Vehicle:
 *  @param boat
 *      @desc 
 *      @default Boat
 *
 *  @param ship
 *      @desc 
 *      @default Ship
 *
 *  @param airship
 *      @desc 
 *      @default Airship
 *
 */

/*~struct~NameWindow:
 *  @param Window Skin
 *      @desc 
 *      @type file
 *          @require 1
 *          @dir img/system/
 *      @default Window
 * 
 *  @param Background Type
 *      @desc 
 *      @type select
 *          @option Normal
 *          @value Normal
 *          @option No frame
 *          @value No frame
 *          @option Dim
 *          @value Dim
 *          @option Transparent
 *          @value Transparent
 *      @default Normal
 * 
 *  @param Oy
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default 0
 * 
 *  @param Padding
 *      @desc 
 *      @type number
 *          @min 4
 *          @max 64
 *      @default 8
 * 
 *  @param Font Size
 *      @desc 
 *      @type number
 *          @min 8
 *          @max 999
 *      @default 20
 *
 */

/*:ja
 * @target MV MZ
 * @plugindesc マップを確認する画面を呼び出せるようになります。
 * @author 木星ペンギン
 * @url
 * 
 * @base MPP_MiniMap
 * @orderAfter MPP_MiniMap
 * 
 * @help [version 3.2.0]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ プラグインコマンド
 *  〇 MV / MZ
 *  
 *  〇 CallMenuMap  / メニューマップ呼び出し
 *   - メニューマップ画面を呼び出します。
 * 
 * ▼ マップのメモ
 *  〇 <MenuMap:name>
 *   - このマップのミニマップ画像のファイル名を指定します。
 *   - 画像ファイルは img/pictures に入れてください。
 * 
 * ▼ メニューマップ操作方法
 *  〇 カーソル移動
 *   パッドまたはキーボードの場合 : 方向キー / シフトキーと同時押しで加速
 *   マウスまたはタッチ操作の場合 : タッチした位置に移動
 * 
 *  〇 マップのスクロール
 *   パッドまたはキーボードの場合 : 方向キー
 *   マウスまたはタッチ操作の場合 : タッチしたまま移動
 *  
 *  〇 マップの拡大縮小
 *   パッドまたはキーボードの場合 : ページアップ&ダウン
 *   マウスの場合 : ホイール操作または左上の左右ボタン(MZでUI表示中のみ)
 *   タッチ操作の場合 : 左上の左右ボタン(MZでUI表示中のみ)
 *  
 *  〇 ピンを指す
 *   パッドまたはキーボードの場合 : 決定キー
 *   マウスまたはタッチ操作の場合 : タッチした後移動せずに離す
 * 
 * ▼ 名前の表示
 *  - カーソルを合わせたキャラクターの名前が表示されます。
 *  - 名前には一部の制御文字が使用可能です。(\V,\N,\P,\G,\C,\\)
 *  - イベントの場合、名前が空白''、デフォルト名の'EV???'(?は数字)、
 *    '#'で始まる場合は表示されません。
 *
 * ▼ ピン
 *  - メニューマップ画面でピンを指すと、ミニマップ上にもピンが表示されます。
 *  - ピンはプレイヤーが近づくと消去されます。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command callMenuMap
 *      @text メニューマップ呼び出し
 *      @desc 
 * 
 * 
 *  @param Display Position
 *      @text 表示位置
 *      @desc 
 *      @type struct<DisplayPosition>
 *      @default {"X":"32","Y":"32","Width":"752","Height":"560","Opacity":"255","Zoom":"-1","Frame Image":""}
 *
 *  @param Menu Command Text
 *      @text メニューコマンド名
 *      @desc 空の場合、非表示
 *      @default マップ
 *
 *  @param Marker Size
 *      @text マーカーサイズ
 *      @desc 点タイプと矢印タイプのサイズ
 * (MPP_MiniMap.js と同じ / メニュー画面のみ適用)
 *      @type number
 *          @min 1
 *          @max 999
 *      @default 6
 *
 *  @param Cursor
 *      @text カーソル
 *      @desc 
 *      @type struct<Cursor>
 *      @default {"Image Name":"","Width":"10","Animation Rate":"30"}
 *
 *  @param Min Zoom
 *      @text 拡大率最小値
 *      @desc 全体表示以下にはなりません。
 *      @type number
 *          @min 0
 *          @max 10000
 *      @default 0
 *
 *  @param Max Zoom
 *      @text 拡大率最大値
 *      @desc 
 *      @type number
 *          @min 10
 *          @max 10000
 *      @default 800
 *
 *  @param Place Pin Enabled?
 *      @text ピン立て有無
 *      @desc 決定キーでピンを立てることができる機能の有効/無効
 *      @type boolean
 *      @default true
 *
 *  @param Pin Image
 *      @text ピン画像ファイル名
 *      @desc 未設定の場合は自動生成
 *      @type file
 *          @require 1
 *          @dir img/pictures/
 *      @default 
 *      @parent Place Pin Enabled?
 *
 *  @param Pin Color Index
 *      @text ピン色番号
 *      @desc 自動生成する際の色
 * 具体的な色は img/system/Window.png を参照
 *      @type number
 *          @min 0
 *          @max 31
 *      @default 0
 *      @parent Place Pin Enabled?
 *
 *  @param Name Window Position
 *      @text 名前ウィンドウ位置
 *      @desc 
 *      @type select
 *          @option 表示しない
 *          @value None
 *          @option 画面上部
 *          @value Top of screen
 *          @option マーカー上
 *          @value Top of marker
 *          @option 画面下部
 *          @value Bottom of screen
 *      @default Top of marker
 * 
 *  @param Player Name
 *      @text プレイヤー名前
 *      @desc 
 *      @default \p[1]
 *      @parent Name Window Position
 * 
 *  @param Vehicle Names
 *      @text 乗り物名前
 *      @desc 
 *      @type struct<Vehicle>
 *      @default {"boat":"小型船","ship":"大型船","airship":"飛行船"}
 *      @parent Name Window Position
 * 
 *  @param Name Window Parameters
 *      @text 名前ウィンドウ設定
 *      @desc 
 *      @type struct<NameWindow>
 *      @default {"Window Skin":"Window","Background Type":"Normal","Oy":"0","Padding":"8","Font Size":"20"}
 *      @parent Name Window Position
 * 
 */

/*~struct~DisplayPosition:ja
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
 *      @default 752
 *
 *  @param Height
 *      @text 高さ
 *      @desc
 *      @type number
 *          @min 1
 *          @max 999999
 *      @default 560
 *
 *  @param Opacity
 *      @text 不透明度
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 255
 *      @default 255
 *
 *  @param Zoom
 *      @text 拡大率
 *      @desc -1:全体表示,
 * 0:マップメモの<MinimapZoom:n>の値、または変更しない
 *      @type number
 *          @min -1
 *          @max 10000
 *      @default -1
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

/*~struct~Cursor:ja
 *  @param Image Name
 *      @text 画像ファイル名
 *      @desc 
 *      @type file
 *          @require 1
 *          @dir img/pictures
 *      @default 
 *
 *  @param Width
 *      @text 幅
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 999
 *      @default 10
 *
 *  @param Animation Rate
 *      @text アニメーション速度
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 999
 *      @default 30
 *
 */

/*~struct~Vehicle:ja
 *  @param boat
 *      @text 小型船
 *      @desc 
 *      @default 小型船
 *
 *  @param ship
 *      @text 大型船
 *      @desc 
 *      @default 大型船
 *
 *  @param airship
 *      @text 飛行船
 *      @desc 
 *      @default 飛行船
 *
 */

/*~struct~NameWindow:ja
 *  @param Window Skin
 *      @text ウィンドウスキン
 *      @desc 
 *      @type file
 *          @require 1
 *          @dir img/system/
 *      @default Window
 * 
 *  @param Background Type
 *      @text 背景タイプ
 *      @desc 
 *      @type select
 *          @option 通常
 *          @value Normal
 *          @option フレームなし
 *          @value No frame
 *          @option 暗くする
 *          @value Dim
 *          @option 透明
 *          @value Transparent
 *      @default Normal
 * 
 *  @param Oy
 *      @text Y軸補正値
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default 0
 * 
 *  @param Padding
 *      @text 余白
 *      @desc 
 *      @type number
 *          @min 4
 *          @max 64
 *      @default 8
 * 
 *  @param Font Size
 *      @text 文字サイズ
 *      @desc 
 *      @type number
 *          @min 8
 *          @max 999
 *      @default 20
 *
 */

(() => {
    'use strict';

    const pluginName = 'MPP_MiniMap_Op2';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const reviverParse = (key, value) => {
        try {
            return JSON.parse(value, reviverParse);
        } catch (e) {
            return value;
        }
    };
    const param_DisplayPosition = JSON.parse(parameters['Display Position'] || '{}', reviverParse);
    const param_MenuCommandText = parameters['Menu Command Text'];
    const param_MarkerSize = Number(parameters['Marker Size'] || 6);
    const param_Cursor = JSON.parse(parameters['Cursor'] || '{}', reviverParse);
    const param_MinZoom = Number(parameters['Min Zoom'] || 0);
    const param_MaxZoom = Number(parameters['Max Zoom'] || 800);
    const param_PlacePinEnabled = parameters['Place Pin Enabled?'] === 'true';
    const param_PinImage = parameters['Pin Image'];
    const param_PinColorIndex = Number(parameters['Pin Color Index'] || 0);
    const param_NameWindowPosition = parameters['Name Window Position'] || 'None';
    const param_PlayerName = parameters['Player Name'] || '';
    const param_VehicleNames = JSON.parse(parameters['Vehicle Names'] || '{}');
    const param_WindowParameters = JSON.parse(parameters['Name Window Parameters'] || '{}', reviverParse);
    
    // JsExtensions alternative
    const MathExt = (() => {
        // Number.prototype.clamp と違い、下限優先
        const clamp = (x, min, max) => Math.max(Math.min(x, max), min);
        const mod = (x, n) => ((x % n) + n) % n;
        return { clamp, mod };
    })();

    //-------------------------------------------------------------------------
    // Game_MinimapMarker

    const _MinimapImage_minZoom = MinimapImage.minZoom;
    MinimapImage.minZoom = function() {
        const result = _MinimapImage_minZoom.call(this);
        if (Game_Minimap.selecting) {
            return Math.max(result, param_MinZoom);
        } else {
            return result;
        }
    };
    
    //-------------------------------------------------------------------------
    // Game_MinimapMarker

    Game_MinimapMarker.prototype.name = function() {
        const subject = this.subject();
        return subject ? subject.menuMapName() : '';
    };
    
    Game_MinimapMarker.prototype.isOverlap = function(x, y) {
        if (!this.isVisible()) {
            return false;
        }
        const sx = Math.abs(x - this.realX);
        const sy = Math.abs(y - this.realY);
        if (this._type === 'C') {
            return Math.hypot(sx, sy) <= this._radius;
        } else {
            return (
                sx * $gameMap.minimap.xRate() <= 12 &&
                sy * $gameMap.minimap.yRate() <= 12
            );
        }
    };
    
    Game_MinimapMarker.prototype.minimapRealX = function() {
        return $gameMap.minimap.adjustRealX(this.realX + 0.5);
    };
    
    Game_MinimapMarker.prototype.minimapRealY = function() {
        return $gameMap.minimap.adjustRealY(this.realY + 0.5);
    };
    
    //-------------------------------------------------------------------------
    // Game_MiniMap

    Game_Minimap.selecting = false;

    const _Game_Minimap_initialize = Game_Minimap.prototype.initialize;
    Game_Minimap.prototype.initialize = function() {
        _Game_Minimap_initialize.call(this);
        this._pinMarker = new Game_MinimapMarker();
        this._pinMarker.setMarker(`!${param_PinColorIndex}h`);
        this._centerX = 0;
        this._centerY = 0;
    };

    Game_Minimap.prototype.targetZoom = function() {
        return this._targetZoom;
    };
    
    Game_Minimap.prototype.startMenuMap = function() {
        Game_Minimap.selecting = true;
        this._lastZoom = this._targetZoom;
        this.zoomTo(this.paramsZoom());
        this.clearCenter();
    };
    
    Game_Minimap.prototype.endMenuMap = function() {
        Game_Minimap.selecting = false;
        this.zoomTo(this._lastZoom);
    };
    
    Game_Minimap.prototype.clearCenter = function() {
        this.setCenter(
            $gamePlayer._realX + 0.5,
            $gamePlayer._realY + 0.5
        );
    };
    
    Game_Minimap.prototype.setCenter = function(x, y) {
        this._centerX = MathExt.mod(x, $gameMap.width());
        this._centerY = MathExt.mod(y, $gameMap.height());
    };
    
    const _Game_Minimap_params = Game_Minimap.prototype.params;
    Game_Minimap.prototype.params = function() {
        return Game_Minimap.selecting
            ? param_DisplayPosition
            : _Game_Minimap_params.call(this);
    };
    
    Game_Minimap.prototype.pinMarker = function() {
        return this._pinMarker;
    };
    
    const _Game_Minimap_isLoopHorizontal = Game_Minimap.prototype.isLoopHorizontal;
    Game_Minimap.prototype.isLoopHorizontal = function() {
        return (
            !Game_Minimap.selecting &&
            _Game_Minimap_isLoopHorizontal.call(this)
        );
    };
    
    const _Game_Minimap_isLoopVertical = Game_Minimap.prototype.isLoopVertical;
    Game_Minimap.prototype.isLoopVertical = function() {
        return (
            !Game_Minimap.selecting &&
            _Game_Minimap_isLoopVertical.call(this)
        );
    };
    
    Game_Minimap.prototype.adjustRealX = function(x) {
        return this.adjustX(x) * this.xRate();
    };
    
    Game_Minimap.prototype.adjustRealY = function(y) {
        return this.adjustY(y) * this.yRate();
    };
    
    const _Game_Minimap_centerX = Game_Minimap.prototype.centerX;
    Game_Minimap.prototype.centerX = function() {
        return Game_Minimap.selecting
            ? this._centerX
            : _Game_Minimap_centerX.call(this);
    };

    const _Game_Minimap_centerY = Game_Minimap.prototype.centerY;
    Game_Minimap.prototype.centerY = function() {
        return Game_Minimap.selecting
            ? this._centerY
            : _Game_Minimap_centerY.call(this);
    };

    //-------------------------------------------------------------------------
    // Game_Map

    Game_Map.prototype.menuMapImageName = function() {
        return $dataMap.meta.MenuMap || this.minimapImageName();
    };
    
    const _Game_Map_setupStartingMapEvent = Game_Map.prototype.setupStartingMapEvent;
    Game_Map.prototype.setupStartingMapEvent = function() {
        const result = _Game_Map_setupStartingMapEvent.apply(this, arguments);
        if (result) {
            $gamePlayer.checkPinMarker();
        }
        return result;
    };
    
    const _Game_Map_allMinimapMarkers = Game_Map.prototype.allMinimapMarkers;
    Game_Map.prototype.allMinimapMarkers = function() {
        return [
            ..._Game_Map_allMinimapMarkers.call(this),
            this._minimap.pinMarker()
        ];
    };
    
    Game_Map.prototype.minimapMarkersXy = function(x, y) {
        return this.allMinimapMarkers()
            .filter(m => m.isOverlap(x, y))
            .reverse();
    };
    
    //-------------------------------------------------------------------------
    // Game_Player

    Game_Player.prototype.menuMapName = function() {
        return param_PlayerName;
    };

    const _Game_Player_increaseSteps = Game_Player.prototype.increaseSteps;
    Game_Player.prototype.increaseSteps = function() {
        _Game_Player_increaseSteps.apply(this, arguments);
        this.checkPinMarker();
    };
    
    Game_Player.prototype.checkPinMarker = function() {
        const marker = $gameMap.minimap.pinMarker();
        if (marker.isVisible() &&
            Math.abs(this.deltaXFrom(marker.realX)) < 2 &&
            Math.abs(this.deltaYFrom(marker.realY)) < 2
        ) {
            marker.clearPos();
        }
    };
    
    //-------------------------------------------------------------------------
    // Game_Vehicle

    Game_Vehicle.prototype.menuMapName = function() {
        return param_VehicleNames[this._type] || '';
    };

    //-------------------------------------------------------------------------
    // Game_Event

    Game_Event.prototype.menuMapName = function() {
        const name = this.event().name;
        return /^EV\d|^#/.test(name) ? '' : name;
    };

    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _mzCommands = {
        CallMenuMap: { name:'callMenuMap', keys:[] }
    };
    Object.assign(_mzCommands, {
        'メニューマップ呼び出し': _mzCommands.CallMenuMap
    });

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        const mzCommand = _mzCommands[command];
        if (mzCommand) {
            const args2 = Object.assign(
                {},
                ...mzCommand.keys.map((k, i) => ({ [k]: args[i] }))
            );
            PluginManager.callCommand(this, pluginName, mzCommand.name, args2);
        }
    };

    //-------------------------------------------------------------------------
    // PluginManager
    
    PluginManager.registerCommand(pluginName, 'callMenuMap', args => {
        if ($gameMap.isShowMinimap()) {
            SceneManager.push(Scene_MenuMap);
        }
    });

    //-----------------------------------------------------------------------------
    // Sprite_MinimapMarker

    Sprite_MinimapMarker._pinAnimeCount = 0;

    const _Sprite_MinimapMarker_markerSize = Sprite_MinimapMarker.markerSize;
    Sprite_MinimapMarker.markerSize = function() {
        return Game_Minimap.selecting
            ? param_MarkerSize
            : _Sprite_MinimapMarker_markerSize.call(this);
    };

    const _Sprite_MinimapMarker_paintMarker = Sprite_MinimapMarker.prototype.paintMarker;
    Sprite_MinimapMarker.prototype.paintMarker = function(x, y, marker) {
        if (marker.type() === '!') {
            const rx = x + this._padding;
            const ry = y + this._padding;
            if (param_PinImage) {
                this.paintImage(rx, ry, param_PinImage);
            } else {
                this.paintPin(rx, ry, marker.color());
            }
        } else {
            _Sprite_MinimapMarker_paintMarker.call(this, x, y, marker);
        }
    };

    Sprite_MinimapMarker.prototype.paintImage = function(x, y, imageName) {
        const source = ImageManager.loadPicture(imageName);
        if (source.isReady()) {
            const { width, height } = source;
            const dx = x - width / 2;
            const dy = y - height / 2;
            this.bitmap.blt(source, 0, 0, width, height, dx, dy);
        }
    };

    Sprite_MinimapMarker.prototype.paintPin = function(x, y, color) {
        const r1 = Sprite_MinimapMarker.markerSize() + 2;
        const angle = 90 * (Sprite_MinimapMarker._pinAnimeCount % 24) / 24;
        const context = this.bitmap.context;
        context.save();
        context.translate(x, y);
        context.rotate(angle * Math.PI / 180);
        const r2 = Math.hypot(r1, r1);
        const grad = context.createRadialGradient(0, 0, r1, 0, 0, r2);
        grad.addColorStop(0, color + '00');
        grad.addColorStop(1, color);
        context.lineWidth = 2;
        context.strokeStyle = grad;
        const r3 = r1 - 1;
        context.strokeRect(-r3, -r3, r3 * 2, r3 * 2);
        context.restore();
        this.bitmap.baseTexture.update();
    };

    //-----------------------------------------------------------------------------
    // Sprite_MiniMap

    const _Sprite_MiniMap_update = Sprite_MiniMap.prototype.update;
    Sprite_MiniMap.prototype.update = function() {
        _Sprite_MiniMap_update.call(this);
        Sprite_MinimapMarker._pinAnimeCount++;
    };

    //-----------------------------------------------------------------------------
    // Sprite_ScrollableMiniMap

    function Sprite_ScrollableMiniMap() {
        this.initialize.apply(this, arguments);
    }
    
    Sprite_ScrollableMiniMap.prototype = Object.create(Sprite_MiniMap.prototype);
    Sprite_ScrollableMiniMap.prototype.constructor = Sprite_ScrollableMiniMap;

    Sprite_ScrollableMiniMap.prototype.initialize = function() {
        Sprite_MiniMap.prototype.initialize.call(this);
        this._arrowAnimeCount = 0;
        this.clearScrollStatus();
        this.createArrowSprites();
    };

    Sprite_ScrollableMiniMap.prototype.clearScrollStatus = function() {
        this._scrollTargetX = 0;
        this._scrollTargetY = 0;
        this._scrollDuration = 0;
        this._scrollAccelX = 0;
        this._scrollAccelY = 0;
        this._scrollTouching = false;
        this._scrollLastTouchX = 0;
        this._scrollLastTouchY = 0;
    };
    
    Sprite_ScrollableMiniMap.prototype.createArrowSprites = function() {
        this._arrowSprites = [];
        for (let i = 0; i < 4; i++) {
            const sprite = new Sprite();
            sprite.bitmap = this.createScrollArrowBitmap(i);
            sprite.opacity = 192;
            sprite.anchor.set(0.5);
            sprite.visible = false;
            this._arrowSprites.push(sprite);
            this.addChild(sprite);
        }
    };

    Sprite_ScrollableMiniMap.prototype.createScrollArrowBitmap = function(d) {
        const { Width:width, Height:height } = param_DisplayPosition;
        const minSize = Math.min(width, height);
        const bw = d === 0 || d === 3 ? minSize / 3 : minSize / 12;
        const bh = d === 1 || d === 2 ? minSize / 3 : minSize / 12;
        const bitmap = new Bitmap(bw, bh);
        const context = bitmap.context;
        if (d === 0) {
            context.moveTo(bw / 2, bh - 8);
            context.lineTo(8, 8);
            context.lineTo(bw - 8, 8);
        } else if (d === 1) {
            context.moveTo(8, bh / 2);
            context.lineTo(bw - 8, 8);
            context.lineTo(bw - 8, bh - 8);
        } else if (d === 2) {
            context.moveTo(bw - 8, bh / 2);
            context.lineTo(8, bh - 8);
            context.lineTo(8, 8);
        } else {
            context.moveTo(bw / 2, 8);
            context.lineTo(bw - 8, bh - 8);
            context.lineTo(8, bh - 8);
        }
        context.closePath();
        context.save();
        context.shadowColor = 'black';
        context.shadowOffsetX = 1.5;
        context.shadowOffsetY = 1.5;
        context.shadowBlur = 4;
        context.fillStyle = 'white';
        context.fill();
        context.restore();
        return bitmap;
    };

    Sprite_ScrollableMiniMap.prototype.scrollTo = function(x, y) {
        $gameMap.minimap.setCenter(x, y);
    };
    
    Sprite_ScrollableMiniMap.prototype.scrollBy = function(x, y) {
        const rect = $gameMap.minimap.displayRect();
        this.scrollTo(
            rect.x + rect.width / 2 + x,
            rect.y + rect.height / 2 + y
        );
    };
    
    Sprite_ScrollableMiniMap.prototype.smoothScrollTo = function(x, y) {
        this._scrollTargetX = MathExt.clamp(x, 0, $gameMap.width());
        this._scrollTargetY = MathExt.clamp(y, 0, $gameMap.height());
        this._scrollDuration = 8;
    };
    
    Sprite_ScrollableMiniMap.prototype.setScrollAccel = function(x, y) {
        this._scrollAccelX = x;
        this._scrollAccelY = y;
    };
    
    Sprite_ScrollableMiniMap.prototype.update = function() {
        Sprite_MiniMap.prototype.update.call(this);
        this._arrowAnimeCount = (this._arrowAnimeCount + 1) % 96;
        this.processTouchScroll();
        this.updateSmoothScroll();
        this.updateScrollAccel();
    };

    Sprite_ScrollableMiniMap.prototype.processTouchScroll = function() {
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            this.onTouchScrollStart();
        }
        if (this._scrollTouching) {
            if (TouchInput.isReleased()) {
                this.onTouchScrollEnd();
            } else if (TouchInput.isMoved()) {
                this.onTouchScroll();
            }
        }
    };
    
    Sprite_ScrollableMiniMap.prototype.isTouchedInsideFrame = function() {
        const backSprite = this._backSprite;
        const rect = new Rectangle(0, 0, backSprite.width, backSprite.height);
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = backSprite.worldTransform.applyInverse(touchPos);
        return rect.contains(localPos.x, localPos.y);
    };
    
    Sprite_ScrollableMiniMap.prototype.onTouchScrollStart = function() {
        this._scrollTouching = true;
        this._scrollLastTouchX = TouchInput.x;
        this._scrollLastTouchY = TouchInput.y;
        this.setScrollAccel(0, 0);
    };
    
    Sprite_ScrollableMiniMap.prototype.onTouchScroll = function() {
        const accelX = this._scrollLastTouchX - TouchInput.x;
        const accelY = this._scrollLastTouchY - TouchInput.y;
        const realAccelX = accelX / $gameMap.minimap.xRate();
        const realAccelY = accelY / $gameMap.minimap.yRate();
        this.setScrollAccel(realAccelX, realAccelY);
        this._scrollLastTouchX = TouchInput.x;
        this._scrollLastTouchY = TouchInput.y;
    };
    
    Sprite_ScrollableMiniMap.prototype.onTouchScrollEnd = function() {
        this._scrollTouching = false;
    };
    
    Sprite_ScrollableMiniMap.prototype.updateSmoothScroll = function() {
        if (this._scrollDuration > 0) {
            const d = this._scrollDuration--;
            const centerX = $gameMap.minimap.centerX();
            const centerY = $gameMap.minimap.centerY();
            const moveX = centerX + (this._scrollTargetX - centerX) / d;
            const moveY = centerY + (this._scrollTargetY - centerY) / d;
            this.scrollTo(moveX, moveY);
        }
    };
    
    Sprite_ScrollableMiniMap.prototype.updateScrollAccel = function() {
        if (this._scrollAccelX !== 0 || this._scrollAccelY !== 0) {
            this.scrollBy(this._scrollAccelX, this._scrollAccelY);
            this._scrollAccelX *= 0.92;
            this._scrollAccelY *= 0.92;
            if (Math.abs(this._scrollAccelX) < 1) {
                this._scrollAccelX = 0;
            }
            if (Math.abs(this._scrollAccelY) < 1) {
                this._scrollAccelY = 0;
            }
        }
    };
    
    Sprite_ScrollableMiniMap.prototype.updateTransform = function() {
        this.updateArrows();
        Sprite_MiniMap.prototype.updateTransform.call(this);
    };
    
    Sprite_ScrollableMiniMap.prototype.updateArrows = function() {
        if (MinimapImage.isReady()) {
            const [s0, s1, s2, s3] = this._arrowSprites;
            const rect = $gameMap.minimap.displayRect();
            const xRate = $gameMap.minimap.xRate();
            const yRate = $gameMap.minimap.yRate();
            const width = Math.min(rect.width, $gameMap.width()) * xRate;
            const height = Math.min(rect.height, $gameMap.height()) * yRate;
            const opacity = 192 - Math.abs(this._arrowAnimeCount - 48) * 2;
            s0.x = width / 2;
            s0.y = height;
            s0.opacity = opacity;
            s0.visible = rect.y + rect.height < $gameMap.height();
            s1.x = 0;
            s1.y = height / 2;
            s1.opacity = opacity;
            s1.visible = rect.x > 0;
            s2.x = width;
            s2.y = height / 2;
            s2.opacity = opacity;
            s2.visible = rect.x + rect.width < $gameMap.width();
            s3.x = width / 2;
            s3.y = 0;
            s3.opacity = opacity;
            s3.visible = rect.y > 0;
        } else {
            this._arrowSprites.forEach(sprite => sprite.visible = false);
        }
    };
    
    
    //-----------------------------------------------------------------------------
    // Sprite_SelectableMiniMap

    function Sprite_SelectableMiniMap() {
        this.initialize.apply(this, arguments);
    }
    
    Sprite_SelectableMiniMap.prototype = Object.create(Sprite_ScrollableMiniMap.prototype);
    Sprite_SelectableMiniMap.prototype.constructor = Sprite_SelectableMiniMap;

    Sprite_SelectableMiniMap.prototype.initialize = function() {
        Sprite_ScrollableMiniMap.prototype.initialize.call(this);
        this._active = true;
        this._handlers = {};
        this._touching = false;
        this.clearCursorStatus();
        this.createCursorSprite();
    };

    Sprite_ScrollableMiniMap.prototype.clearCursorStatus = function() {
        this._cursorCount = 0;
        this._cursorPattern = 0;
        this._cursorWidth = param_Cursor['Width'] || 10;
        this._cursorX = $gamePlayer._realX;
        this._cursorY = $gamePlayer._realY;
    };
    
    Sprite_SelectableMiniMap.prototype.createCursorSprite = function() {
        this._cursorSprite = new Sprite();
        this._cursorSprite.bitmap = this.createCursorBitmap();
        this._cursorSprite.anchor.set(0.5);
        this._cursorSprite.width = this._cursorWidth;
        this.addChild(this._cursorSprite);
        this.updateCursorFrame();
    };

    Sprite_SelectableMiniMap.prototype.createCursorBitmap = function() {
        if (param_Cursor['Image Name']) {
            return ImageManager.loadPicture(param_Cursor['Image Name']);
        } else {
            this._cursorWidth = param_MarkerSize + 16;
            const realSize = this._cursorWidth;
            const bitmap = new Bitmap(realSize * 2, realSize);
            const context = bitmap.context;
            const x = realSize / 2;
            const y = realSize / 2;
            const r = (param_MarkerSize + 12) / 2;
            this.drawContextRect(context, x, y, r + 1, '#008844');
            this.drawContextRect(context, x + realSize, y, r, '#008844');
            this.drawContextRect(context, x, y, r, '#FFFFFF');
            this.drawContextRect(context, x + realSize, y, r - 1, '#FFFFFF');
            bitmap.baseTexture.update();
            return bitmap;
        }
    };

    Sprite_SelectableMiniMap.prototype.drawContextRect = function(context, x, y, r, color) {
        const r2 = Math.hypot(r, r);
        const grad = context.createRadialGradient(x, y, r + 1, x, y, r2);
        grad.addColorStop(0, color + '00');
        grad.addColorStop(1, color);
        context.lineWidth = 4;
        context.strokeStyle = grad;
        const r3 = r - 1;
        context.strokeRect(x - r3, y - r3, r3 * 2, r3 * 2);
    };

    Sprite_SelectableMiniMap.prototype.activate = function() {
        this._active = true;
    };
    
    Sprite_SelectableMiniMap.prototype.deactivate = function() {
        this._active = false;
    };
    
    Sprite_ScrollableMiniMap.prototype.cursorPos = function() {
        return new Point(
            Math.round(this._cursorX),
            Math.round(this._cursorY)
        );
    };

    Sprite_SelectableMiniMap.prototype.setHandler = function(symbol, method) {
        this._handlers[symbol] = method;
    };
    
    Sprite_SelectableMiniMap.prototype.isHandled = function(symbol) {
        return !!this._handlers[symbol];
    };
    
    Sprite_SelectableMiniMap.prototype.callHandler = function(symbol) {
        if (this.isHandled(symbol)) {
            this._handlers[symbol]();
        }
    };
    
    Sprite_SelectableMiniMap.prototype.isOpenAndActive = function() {
        return this.visible && this._active;
    };
    
    Sprite_SelectableMiniMap.prototype.setNameWindow = function(nameWindow) {
        this._nameWindow = nameWindow;
        this.updateNameWindow();
    };
    
    Sprite_SelectableMiniMap.prototype.update = function() {
        this.processCursorMove();
        this.processHandling();
        this.processTouch();
        this.processWheel();
        Sprite_ScrollableMiniMap.prototype.update.call(this);
        this.updateCursorAnimation();
    };

    Sprite_SelectableMiniMap.prototype.processCursorMove = function() {
        if (this.isOpenAndActive()) {
            const lastX = this._cursorX;
            const lastY = this._cursorY;
            if (Input.isPressed('down')) {
                const d = this.yMoveDistance();
                this._cursorY = Math.min(lastY + d, $gameMap.height() - 1);
            }
            if (Input.isPressed('up')) {
                const d = this.yMoveDistance();
                this._cursorY = Math.max(lastY - d, 0);
            }
            if (Input.isPressed('right')) {
                const d = this.xMoveDistance();
                this._cursorX = Math.min(lastX + d, $gameMap.width() - 1);
            }
            if (Input.isPressed('left')) {
                const d = this.xMoveDistance();
                this._cursorX = Math.max(lastX - d, 0);
            }
            if (lastX !== this._cursorX || lastY !== this._cursorY) {
                this.smoothScrollTo(this._cursorX + 0.5, this._cursorY + 0.5);
                this.updateNameWindow();
            }
        }
    };
    
    Sprite_SelectableMiniMap.prototype.xMoveDistance = function() {
        return 4 / $gameMap.minimap.xRate() * this.dashRate();
    };
    
    Sprite_SelectableMiniMap.prototype.yMoveDistance = function() {
        return 4 / $gameMap.minimap.yRate() * this.dashRate();
    };

    Sprite_SelectableMiniMap.prototype.dashRate = function() {
        return Input.isPressed('shift') ? 2.5 : 1;
    };
    
    Sprite_SelectableMiniMap.prototype.processHandling = function() {
        if (this.isOpenAndActive()) {
            if (this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
                return this.processPagedown();
            }
            if (this.isHandled('pageup') && Input.isTriggered('pageup')) {
                return this.processPageup();
            }
            if (this.isOkEnabled() && this.isOkTriggered()) {
                return this.processOk();
            }
            if (this.isCancelEnabled() && this.isCancelTriggered()) {
                return this.processCancel();
            }
        }
    };
    
    Sprite_SelectableMiniMap.prototype.processTouch = function() {
        if (this.isOpenAndActive()) {
            if (TouchInput.isHovered && TouchInput.isHovered()) {
                this.onTouchSelect(false);
            } else if (TouchInput.isTriggered()) {
                this.onTouchSelect(true);
            }
            if (this._touching && TouchInput.isReleased()) {
                this.onTouchOk();
                this._touching = false;
            } else if (TouchInput.isCancelled()) {
                this.onTouchCancel();
            }
        } else {
            this._touching = false;
        }
    };
    
    Sprite_SelectableMiniMap.prototype.onTouchSelect = function(trigger) {
        if (this.isTouchedInsideFrame()) {
            const pos = this.hitPos();
            if (trigger) this._touching = true;
            if (this._cursorX !== pos.x || this._cursorY !== pos.y) {
                this._cursorX = pos.x;
                this._cursorY = pos.y;
                this.updateNameWindow();
                if (trigger) SoundManager.playCursor();
            }
        }
    };
    
    Sprite_SelectableMiniMap.prototype.hitPos = function() {
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = this._backSprite.worldTransform.applyInverse(touchPos);
        const rect = $gameMap.minimap.displayRect();
        return new Point(
            localPos.x / MinimapImage.tileWidth() + rect.x - 0.5,
            localPos.y / MinimapImage.tileHeight() + rect.y - 0.5
        );
    };
    
    Sprite_SelectableMiniMap.prototype.onTouchOk = function() {
        if (this.isOkEnabled()) {
            this.processOk();
        }
    };
    
    Sprite_SelectableMiniMap.prototype.onTouchCancel = function() {
        if (this.isCancelEnabled()) {
            this.processCancel();
        }
    };
    
    Sprite_SelectableMiniMap.prototype.processWheel = function() {
        if (this.isOpenAndActive() && this.isTouchedInsideFrame()) {
            const threshold = 20;
            if (TouchInput.wheelY >= threshold) {
                this.processPagedown();
            }
            if (TouchInput.wheelY <= -threshold) {
                this.processPageup();
            }
        }
    };

    Sprite_SelectableMiniMap.prototype.onTouchScroll = function() {
        Sprite_ScrollableMiniMap.prototype.onTouchScroll.call(this);
        this._touching = false;
    };
    
    Sprite_SelectableMiniMap.prototype.updateCursorAnimation = function() {
        const rate = param_Cursor['Animation Rate'] || 30;
        this._cursorCount++;
        if (this._cursorCount >= rate) {
            this._cursorCount = 0;
            const width = this._cursorWidth;
            const max = Math.floor(this._cursorSprite.bitmap.width / width);
            this._cursorPattern = (this._cursorPattern + 1) % max;
        }
        this.updateCursorFrame();
    };
    
    Sprite_SelectableMiniMap.prototype.updateCursorFrame = function() {
        const width = this._cursorWidth;
        const height = this._cursorSprite.bitmap.height;
        const x = this._cursorPattern * width;
        this._cursorSprite.setFrame(x, 0, width, height);
    };
    
    Sprite_SelectableMiniMap.prototype.isOkEnabled = function() {
        return this.isHandled('ok');
    };
    
    Sprite_SelectableMiniMap.prototype.isCancelEnabled = function() {
        return this.isHandled('cancel');
    };
    
    Sprite_SelectableMiniMap.prototype.isOkTriggered = function() {
        return Input.isTriggered('ok');
    };
    
    Sprite_SelectableMiniMap.prototype.isCancelTriggered = function() {
        return Input.isRepeated('cancel');
    };
    
    Sprite_SelectableMiniMap.prototype.processOk = function() {
        if (param_PlacePinEnabled) {
            SoundManager.playOk();
            this.updateInputData();
            this.callOkHandler();
        }
    };
    
    Sprite_SelectableMiniMap.prototype.callOkHandler = function() {
        this.callHandler('ok');
    };
    
    Sprite_SelectableMiniMap.prototype.processCancel = function() {
        SoundManager.playCancel();
        this.updateInputData();
        this.deactivate();
        this.callCancelHandler();
    };
    
    Sprite_SelectableMiniMap.prototype.callCancelHandler = function() {
        this.callHandler('cancel');
    };
    
    Sprite_SelectableMiniMap.prototype.processPageup = function() {
        this.updateInputData();
        this.callHandler('pageup');
    };
    
    Sprite_SelectableMiniMap.prototype.processPagedown = function() {
        this.updateInputData();
        this.callHandler('pagedown');
    };
    
    Sprite_SelectableMiniMap.prototype.updateInputData = function() {
        Input.update();
        TouchInput.update();
        this.clearScrollStatus();
    };
    
    Sprite_SelectableMiniMap.prototype.updateNameWindow = function() {
        if (this._nameWindow) {
            const pos = this.cursorPos();
            const markers = $gameMap.minimapMarkersXy(pos.x, pos.y);
            const pinMarker = $gameMap.minimap.pinMarker();
            const hitMarker = markers.find(m => m !== pinMarker);
            this._nameWindow.setMarker(hitMarker);
        }
    };
    
    Sprite_SelectableMiniMap.prototype.updateTransform = function() {
        this.updateCursorPosition();
        Sprite_ScrollableMiniMap.prototype.updateTransform.call(this);
    };

    Sprite_SelectableMiniMap.prototype.updateCursorPosition = function() {
        const rect = $gameMap.minimap.displayRect();
        const cx = this._cursorX + 0.5;
        const cy = this._cursorY + 0.5;
        this._cursorSprite.x = $gameMap.minimap.adjustRealX(cx);
        this._cursorSprite.y = $gameMap.minimap.adjustRealY(cy);
        this._cursorSprite.visible = rect.contains(cx, cy);
    };
    
    //-----------------------------------------------------------------------------
    // Window_MinimapName

    function Window_MinimapName() {
        this.initialize.apply(this, arguments);
    }

    Window_MinimapName.prototype = Object.create(Window_Base.prototype);
    Window_MinimapName.prototype.constructor = Window_MinimapName;

    Window_MinimapName.prototype.initialize = function() {
        if (Utils.RPGMAKER_NAME === 'MV') {
            Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
            this.frameVisible = true;
        } else {
            Window_Base.prototype.initialize.call(this, new Rectangle());
        }
        if (param_NameWindowPosition === 'Top of marker') {
            this.openness = 0;
        }
        this._marker = null;
        this._name = '';
        this._minimapSprite = null;
        this.updateBackground();
        this.updatePosition();
    };

    if (Utils.RPGMAKER_NAME === 'MV') {

        Window_MinimapName.prototype.updateTransform = function() {
            this._updateFrame();
            Window_Base.prototype.updateTransform.call(this);
        };

        Window_MinimapName.prototype._updateFrame = function() {
            this._windowFrameSprite.visible = this.frameVisible;
        };

    }

    Window_MinimapName.prototype.standardPadding = function() {
        return param_WindowParameters['Padding'] || 8;
    };
    
    Window_MinimapName.prototype.loadWindowskin = function() {
        const skinName = param_WindowParameters['Window Skin'] || 'Window';
        this.windowskin = ImageManager.loadSystem(skinName);
    };

    Window_MinimapName.prototype.updatePadding = function() {
        this.padding = this.standardPadding();
    };
    
    Window_MinimapName.prototype.lineHeight = function() {
        return (param_WindowParameters['Font Size'] || 20) + 2;
    };

    Window_MinimapName.prototype.resetFontSettings = function() {
        Window_Base.prototype.resetFontSettings.call(this);
        this.contents.fontSize = param_WindowParameters['Font Size'] || 20;
    };

    Window_MinimapName.prototype.setMinimapSprite = function(minimapSprite) {
        this._minimapSprite = minimapSprite;
    };

    Window_MinimapName.prototype.setMarker = function(marker) {
        this._marker = marker;
        const name = marker ? marker.name() : '';
        if (this._name !== name) {
            this._name = name;
            if (name) {
                this.start();
            } else if (param_NameWindowPosition === 'Top of marker') {
                this.close();
            } else {
                this.contents.clear();
            }
        }
    };

    Window_MinimapName.prototype.start = function() {
        this.updatePlacement();
        this.updateBackground();
        this.createContents();
        this.refresh();
        this.open();
    };

    Window_MinimapName.prototype.refresh = function() {
        const width = this.textWidthEx(this._name);
        const x = (this.width - width) / 2 - this.padding;
        this.drawTextEx(this._name, x, 0, width);
    };

    Window_MinimapName.prototype.textWidthEx = function(text) {
        return Utils.RPGMAKER_NAME === 'MV'
            ? this.drawTextEx(text, 0, this.contents.height)
            : this.textSizeEx(text).width;
    };

    Window_MinimapName.prototype.calcTextHeight = function() {
        return this.lineHeight();
    };

    Window_MinimapName.prototype.updatePlacement = function() {
        this.width = this.windowWidth();
        this.height = this.windowHeight();
    };

    Window_MinimapName.prototype.windowWidth = function() {
        if (param_NameWindowPosition === 'Top of marker') {
            return this.textWidthEx(this._name) + (4 + this.padding) * 2;
        } else {
            return Graphics.boxWidth;
        }
    };

    Window_MinimapName.prototype.windowHeight = function() {
        return this.lineHeight() + this.standardPadding() * 2
    };
    
    Window_MinimapName.prototype.updateBackground = function() {
        switch (param_WindowParameters['Background Type']) {
            case 'No frame':
                this.frameVisible = false;
                break;
            case 'Dim':
                this.setBackgroundType(1);
                break;
            case 'Transparent':
                this.setBackgroundType(2);
                break;
            default:
                this.setBackgroundType(0);
                break;
        }
    };
    
    Window_MinimapName.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.updatePosition();
    };
    
    Window_MinimapName.prototype.updatePosition = function() {
        const baseX = (Graphics.width - Graphics.boxWidth) / 2;
        const baseY = (Graphics.height - Graphics.boxHeight) / 2;
        const oy = param_WindowParameters['Oy'] || 0;
        switch (param_NameWindowPosition) {
            case 'Bottom of screen':
                this.x = baseX;
                this.y = baseY + Graphics.boxHeight - this.height + oy;
                break;
            case 'Top of marker':
                if (this._marker && this._minimapSprite) {
                    this.updatePositionWhenTop(oy);
                }
                break;
            default:
                this.x = baseX;
                this.y = baseY + this.buttonAreaHeight() + oy;
                break;
        }
    };

    Window_MinimapName.prototype.updatePositionWhenTop = function(oy) {
        const { x:minmapX, y:minimapY } = this._minimapSprite;
        const { X:mx, Y:my, Height:mh, Width:mw } = $gameMap.minimap.params();
        const markerX = this._marker.minimapRealX();
        const markerY = this._marker.minimapRealY();
        const x = Math.floor(minmapX + markerX - this.width / 2);
        const y = Math.floor(minimapY + markerY - this.height + oy);
        this.x = MathExt.clamp(x, mx, mx + mw - this.width);
        this.y = MathExt.clamp(y, my, my + mh - this.height);
    };
    
    Window_MinimapName.prototype.buttonAreaHeight = function() {
        return Utils.RPGMAKER_NAME === 'MV' || !ConfigManager.touchUI ? 0 : 52;
    };
    
    //-------------------------------------------------------------------------
    // Window_MenuCommand

    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _Window_MenuCommand_addOriginalCommands.apply(this, arguments);
        if (param_MenuCommandText) {
            const enabled = $gameMap.isShowMinimap();
            this.addCommand(param_MenuCommandText, 'menuMap', enabled);
        }
    };

    //-------------------------------------------------------------------------
    // Scene_MenuMap

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.apply(this, arguments);
        this._commandWindow.setHandler('menuMap', this.commandMenuMap.bind(this));
    };
    
    Scene_Menu.prototype.commandMenuMap = function() {
        SceneManager.push(Scene_MenuMap);
    };
    
    //-------------------------------------------------------------------------
    // Scene_MenuMap

    function Scene_MenuMap() {
        this.initialize.apply(this, arguments);
    }
    
    Scene_MenuMap.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_MenuMap.prototype.constructor = Scene_MenuMap;
    
    Scene_MenuMap.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };
    
    Scene_MenuMap.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createMinimapSprite();
        this.createNameWindow();
    };
    
    Scene_MenuMap.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        MinimapImage.refresh();
    };
    
    Scene_MenuMap.prototype.createMinimapSprite = function() {
        MinimapImage.destroy();
        MinimapImage.onLoad($gameMap.menuMapImageName());
        $gameMap.minimap.startMenuMap();
        this._minimapSprite = new Sprite_SelectableMiniMap();
        this._minimapSprite.setHandler('ok', this.onMinimapOk.bind(this));
        this._minimapSprite.setHandler('cancel', this.popScene.bind(this));
        this._minimapSprite.setHandler('pageup', this.zoomUp.bind(this));
        this._minimapSprite.setHandler('pagedown', this.zoomDown.bind(this));
        const index = this.children.indexOf(this._windowLayer);
        this.addChildAt(this._minimapSprite, index);
    };

    Scene_MenuMap.prototype.createNameWindow = function() {
        if (param_NameWindowPosition !== 'None') {
            this._nameWindow = new Window_MinimapName();
            this._nameWindow.setMinimapSprite(this._minimapSprite);
            this._minimapSprite.setNameWindow(this._nameWindow);
            this.addChild(this._nameWindow);
        }
    };

    Scene_MenuMap.prototype.needsPageButtons = function() {
        return this.zoomList().length > 1;
    };
    
    Scene_MenuMap.prototype.createPageButtons = function() {
        Scene_MenuBase.prototype.createPageButtons.call(this);
        this._pageupButton.setClickHandler(this.zoomUp.bind(this));
        this._pagedownButton.setClickHandler(this.zoomDown.bind(this));
    };
    
    Scene_MenuMap.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        $gameMap.minimap.update();
    };
    
    Scene_MenuMap.prototype.terminate = function() {
        Scene_MenuBase.prototype.terminate.call(this);
        $gameMap.minimap.endMenuMap();
    };
    
    Scene_MenuMap.prototype.onMinimapOk = function() {
        const pinMarker = $gameMap.minimap.pinMarker();
        const pos = this._minimapSprite.cursorPos();
        const markers = $gameMap.minimapMarkersXy(pos.x, pos.y);
        if (markers.includes(pinMarker)) {
            return pinMarker.clearPos();
        }
        const posMarker = markers.find(m => !m.isPlayer());
        if (!posMarker) {
            return pinMarker.setPosition(pos.x, pos.y);
        }
        const subject = posMarker.subject();
        if (subject) {
            return pinMarker.setSubject(subject);
        }
        pinMarker.setPosition(posMarker.realX, posMarker.realY);
    };
    
    Scene_MenuMap.prototype.zoomUp = function() {
        const zoom = $gameMap.minimap.targetZoom();
        const list = this.zoomList();
        const index = list.findIndex(z => zoom >= z);
        if (index > 0) {
            $gameMap.minimap.smoothZoomTo(list[index - 1]);
        }
    };
    
    Scene_MenuMap.prototype.zoomDown = function() {
        const zoom = $gameMap.minimap.targetZoom();
        const list = this.zoomList();
        const index = list.findIndex(z => zoom >= z);
        if (index < list.length - 1) {
            $gameMap.minimap.smoothZoomTo(list[index + 1]);
        }
    };
    
    Scene_MenuMap.prototype.zoomList = function() {
        const minZoom = MinimapImage.minZoom();
        const result = [];
        for (let zoom = param_MaxZoom; zoom > minZoom * 1.75; zoom /= 1.75) {
            result.push(zoom);
        }
        result.push(minZoom);
        return result;
    };
    
})();
