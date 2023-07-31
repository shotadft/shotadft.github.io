//=============================================================================
// UTA_GameVersionManager.js
//=============================================================================
/*:
 * @plugindesc This plugin give the game an internal version.
 * The set version is saved in save file at save process.
 * @author T.Akatsuki
 * 
 * @param Game Version
 * @desc Definition of the current game version.(Integer value)
 * @default 100
 * 
 * @param Common Event Id Old Version
 * @desc Set the number of the common event to be executed when 
 * the loaded save data is older than the current game version.
 * @default
 * 
 * @param Common Event Id Future Version
 * @desc Set the number of the common event to be executed when 
 * the loaded save data is newer than current game version.
 * @default
 * 
 * @help # Overview
 * This plugin give the game an internal version.
 * The set version is saved in save file at save process.
 * 
 * Excecuting common event when the version is different 
 * at the timing of save file loading.
 * 
 * If you fix bugs in this game, you can modify that have already benn saved.
 * By using plugin command, player can present the game version during game.
 * You can also use it with user support.
 * 
 * When loading the existing save file before using this plugin, 
 * treat it as data with version "0".
 * 
 * # Plugin Commands
 * UTA_GameVersionManager getGameVersion VariableNo
 *   Get current game version and store it in the Game Variable.
 *   VariableNo: Variable number to store the game version.
 * 
 * UTA_GameVersionManager getLoadGameVersion VariableNo
 *   Get the game version recorded in the saved save data and 
 *   store it in the variable.
 *   "0" is returned if the data has never been saved.
 *   VariableNo: Variable number for storing game version of loaded save data.
 * 
 * # Plugin Info
 * Version     : 1.0.0
 * Last Update : August 26th, 2018
 * Author      : T.Akatsuki
 * Web Page    : https://www.utakata-no-yume.net
 * License     : MIT License
 * (https://www.utakata-no-yume.net/gallery/rpgmv/plugin/license.html)
 * 
 * # Change Log
 * ver 1.0.0 (August 26th, 2018)
 *   First release.
 */
/*:ja
 * @plugindesc ゲームに内部的なバージョンを付与します。
 * セーブデータに記録したバージョンと異なる場合に様々な処理を行う事が出来ます。
 * @author 赤月 智平
 * 
 * @param Game Version
 * @desc 現在のゲームバージョンの定義。整数値。
 * @default 100
 * 
 * @param Common Event Id Old Version
 * @desc ロードしたセーブデータが現在のゲームバージョンより古い場合に
 * 実行するコモンイベントの番号を設定します。
 * @default
 * 
 * @param Common Event Id Future Version
 * @desc ロードしたセーブデータが現在のゲームバージョンより新しい場合に
 * 実行するコモンイベントの番号を設定します。(意図的にセーブデータを移して来た場合等)
 * @default
 * 
 * @help ■概要
 * ゲームに内部的なバージョンを付与します。
 * 設定したバージョンはセーブ時にセーブデータに保存します。
 * 
 * セーブデータをロードしたタイミングでバージョンが異なる場合に
 * 様々な処理を行う事が出来ます。
 * 
 * ゲームのバグ修正を行った場合など、既にセーブされてしまったファイルに対して、
 * 何らかの修正を行いたい場合などに活用できます。
 * 
 * プラグインコマンドを用いる事で、プレイヤーがゲーム中にゲームバージョンを
 * 提示できる為、ユーザーサポート面でも活用できるでしょう。
 * 
 * プラグイン導入前の既存セーブデータをロードした場合、
 * バージョンが「0」のデータが読み込まれたものとして扱います。
 * 
 * ■プラグインパラメーターの詳細説明
 * Game Version
 *   現在のゲームバージョンを小数第2桁までの数値を入れます。
 *   リリース毎に+1するなどして更新するのが良いでしょう。
 * 
 * Common Event Id Old Version
 *   ロードしたセーブデータが現在のゲームバージョンより古い場合に
 *   実行するコモンイベントの番号を設定します。
 *   何も記述しない場合は特に処理を行いません。
 *   コモンイベントはロードが終わってすぐに実行されます。
 * 
 * Common Event Id Future Version
 *   ロードしたセーブデータが現在のゲームバージョンより新しい場合に
 *   実行するコモンイベントの番号を設定します。
 *   通常はあり得ないシナリオですが、意図的に古いゲームファイルに
 *   新しいセーブデータを移してきた場合に該当します。
 *   何も記述しない場合は特に処理を行いません。
 *   コモンイベントはロードが終わってすぐに実行されます。
 * 
 * ■プラグインコマンド
 * UTA_GameVersionManager getGameVersion VariableNo
 *   現在のゲームバージョンを取得して変数に格納します。
 *   VariableNo: ゲームバージョンを格納する変数番号
 * 
 * UTA_GameVersionManager getLoadGameVersion VariableNo
 *   ロードしたセーブデータに記録されたゲームバージョンを取得して変数に格納します。
 *   一度もセーブしていないデータの場合は「0」が返ります。
 *   VariableNo: ロードしたセーブデータのゲームバージョンを格納する変数番号
 * 
 * ■プラグインの情報
 * バージョン : 1.0.0
 * 最終更新日 : 2018.08.26
 * 制作者     : 赤月 智平
 * Webサイト  : https://www.utakata-no-yume.net
 * ライセンス : MIT License
 * (https://www.utakata-no-yume.net/gallery/rpgmv/plugin/license.html)
 * 
 * ■更新履歴
 * ver 1.0.0 (2018.08.26)
 *   初版。過去作成したものを公開用に調整。
 */
//=============================================================================

var utakata = utakata || {};
var $gameUtakata = $gameUtakata || {};
(function(utakata){
    "use strict";
    $gameUtakata._data = $gameUtakata._data || {};
    $gameUtakata._data.GameVersionManager = $gameUtakata._data.GameVersionManager || {};

    /**
     * ロードしたセーブデータに記録されたゲームバージョン値
     * ゲーム起動時にはnull, ロード・セーブ時に現在のバージョンに更新される
     * 数値型で管理される。
     * @type {number}
     */
    $gameUtakata._data.GameVersionManager.saveGameVersion = null;

    utakata.GameVersionManager = (function(){
        var __PLUGIN_NAME__ = "UTA_GameVersionManager";
        var __VERSION__     = "1.0.0";

        GameVersionManager._parameters = {
            "Game Version"                  : null,
            "Common Event Id Old Version"   : null,
            "Common Event Id Future Version": null
        };

        function GameVersionManager(){
            throw new Error("utakata.GameVersionManager is static class.");
        }

        GameVersionManager.initialize = function(){
            this._loadPluginParameters();
        };

        GameVersionManager._loadPluginParameters = function(){
            var _pluginParameters = PluginManager.parameters(this.getPluginName());
            try{
                this._parameters["Game Version"] = ~~(Number(_pluginParameters["Game Version"]));

                var _commonEventIdOldVersion = Number(_pluginParameters["Common Event Id Old Version"]);
                if(_commonEventIdOldVersion !== _commonEventIdOldVersion || _commonEventIdOldVersion <= 0){
                    throw new Error('invalid plugin parameter: "Common Event Id Old Version" is invalid.');
                }
                this._parameters["Common Event Id Old Version"] = _commonEventIdOldVersion;

                var _commonEventIdFutureVersion = Number(_pluginParameters["Common Event Id Future Version"]);
                if(_commonEventIdFutureVersion !== _commonEventIdFutureVersion || _commonEventIdFutureVersion <= 0){
                    throw new Error('invalid plugin parameter: "Common Event Id Future Version" is invalid.');
                }
                this._parameters["Common Event Id Future Version"] = _commonEventIdFutureVersion;
            }catch(e){
                console.error("utakata.GameVersionManager, _loadPluginParameters: invalid plugin parameters.", e.stack, e.message);
                throw e;
            }
        };

        GameVersionManager.getGameVersion = function(){
            return this._parameters["Game Version"];
        };

        GameVersionManager.getLoadGameVersion = function(){
            if(typeof $gameUtakata._data.GameVersionManager.saveGameVersion === typeof 0){
                return $gameUtakata._data.GameVersionManager.saveGameVersion;
            }
            return 0;
        };

        GameVersionManager.updateGameVersion = function(){
            $gameUtakata._data.GameVersionManager.saveGameVersion = this.getGameVersion();
        };

        GameVersionManager.onLoadSaveData = function(){
            var gameVer = this.getGameVersion();
            var loadVer = this.getLoadGameVersion();

            // バージョンが同一である場合は何もしない
            if(gameVer == loadVer){
                return;
            }

            // ロードしたデータのバージョンが現行ゲームバージョンより新しい場合
            // 古いゲームバージョンのものにセーブデータを無理矢理移植してきた場合などが該当
            if(gameVer < loadVer){
                var cmnEvId = this._parameters["Common Event Id Future Version"];
                if(cmnEvId){
                    $gameTemp.reserveCommonEvent(cmnEvId);
                }
            }

            // ロードしたデータのバージョンが現行ゲームバージョンより古い場合
            if(gameVer > loadVer){
                var cmnEvId = this._parameters["Common Event Id Old Version"];
                if(cmnEvId){
                    $gameTemp.reserveCommonEvent(cmnEvId);
                }
            }
        };

        /**
         * UTA_GameVersionManager getGameVersion より実行される
         * 現在のゲームバージョンを変数に格納する
         * @param {string} vIdStr 保存先変数番号
         */
        GameVersionManager.cmd_getGameVersion = function(vIdStr){
            var vId = null;
            try{
                vId = Number(vIdStr);
            }catch(e){
                console.error("GameVersionManager, cmd_getGameVersion: invalid argument.");
                throw e;
            }
            var gameVer = this.getGameVersion();
            $gameVariables.setValue(vId, gameVer);
        };

        /**
         * UTA_GameVersionManager getLoadGameVersion より実行される
         * ロードしたゲームバージョンを変数に格納する
         * @param {string} vIdStr 保存先変数番号
         */
        GameVersionManager.cmd_getLoadGameVersion = function(vIdStr){
            var vId = null;
            try{
                vId = Number(vIdStr);
            }catch(e){
                console.error("GameVersionManager, cmd_getLoadGameVersion: invalid argument.");
                throw e;
            }
            var loadGameVer = this.getLoadGameVersion();
            $gameVariables.setValue(vId, loadGameVer);
        };

        GameVersionManager.getPluginName = function(){ return __PLUGIN_NAME__; };
        GameVersionManager.getPluginVersion = function(){ return __VERSION__; };

        return GameVersionManager;
    })();
    utakata.GameVersionManager.initialize();

    //------------------------------------------------------------------------
    // Game_Interpreter
    //------------------------------------------------------------------------
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args){
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if(command === utakata.GameVersionManager.getPluginName()){
            switch(args[0]){
                case "getGameVersion":
                    utakata.GameVersionManager.cmd_getGameVersion(args[1]);
                    break;
                case "getloadGameVersion":
                    utakata.GameVersionManager.cmd_getLoadGameVersion(args[1]);
                    break;
                default:
                    break;
            }
        }
    };

    //------------------------------------------------------------------------
    // DataManager
    //------------------------------------------------------------------------
    var _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function(){
        var contents = _DataManager_makeSaveContents.call(this);
        utakata.GameVersionManager.updateGameVersion();
        if($gameUtakata){
            contents.utakata = contents.utakata || {};
            contents.utakata._data = contents.utakata._data = contents.utakata._data || {};
            contents.utakata._data.GameVersionManager = $gameUtakata._data.GameVersionManager;
        }
        return contents;
    };

    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents){
        _DataManager_extractSaveContents.call(this, contents);
        if(!("utakata" in contents)){ return; }
        if(!("_data" in contents.utakata)){ return; }
        if("GameVersionManager" in contents.utakata._data){
            $gameUtakata._data.GameVersionManager = contents.utakata._data.GameVersionManager;
        }
    };

    var _DataManager_loadGame = DataManager.loadGame;
    DataManager.loadGame = function(savefileId){
        var ret = _DataManager_loadGame.call(this, savefileId);
        utakata.GameVersionManager.onLoadSaveData();
        return ret;
    };
})(utakata);
