// AutoNamePopup.js Ver.5.1.0
// MIT License (C) 2021 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:ja
* @target MV MZ
* @plugindesc  顔画像と連動して名前を表示できます。
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/
* @help 
* [設定方法]
* 【インデックス】
* [0][1][2][3]
* [4][5][6][7]
* 顔画像の左上を0とし、下段右寄りになるほど大きくなります。
*
* ※表情差分が存在する場合
* 例えば同じキャラの喜怒驚泣の表情が連続で並んでいるとします。
* [喜][怒][驚][泣]
* その中で一番若いインデックスを指定します。
*
* 【表情数】
* 例えば同じキャラの表情が4つ並んでいるとします。
* [喜][怒][驚][泣]
* この場合、「4」が設定値になります。
*
*  0：パラメータ［キャラクターの表情数］を参照
* -1：パラメータ［アクターの表情数］を参照
*
* 【動作モード】
* 「外部プラグインと連携（MV）」
* MVで名前ウィンドウを表示させるプラグインを使いたい時に選びます。
* YEP_MessageCoreの場合、テンプレートを"\n<%1>"とすることで
* 自動で名前ウィンドウを表示してくれるようになります。
*
* 【テンプレート】
* 名前のテンプレートです。
* 例えば、"\>\c[14]%1\c[0]"とした場合、
* 全ての名前が
* \>\c[14]名前\c[0]
* と入力した時と同じ状態になります。
* 文字色を変更したり、制御文字を使用した外部プラグインとの連携に使ったり
* することができます。
*
* 【オプション文字列】
* セリフの直前に必ず付与される文字列です。
* 例えば、オプション文字列を"\}"とした場合、
* 常に小声で話すキャラクターを作れます。
* 主に制御文字を使用した外部プラグインとの連携に使う為の機能です。
* MPP_MessageSEの場合、オプション文字列に"\se[n]"と入力すると、
* そのキャラクターが喋るたびにSEが再生されるようになります。
*
* [プラグインコマンド（MV)]
* setNameKeys 名前 ファイル名 インデックス 表情数 オプション文字列
* 【表情数】
*  0または未入力：パラメータ［キャラクターの表情数］を参照
* -1：パラメータ［アクターの表情数］を参照
*
* [メモ]
* アクターのメモ欄に記述します。
* パラメータ［アクターを解析する］有効時に使用可能です。
* 手動で設定したい箇所のみメモで制御します。
*
* <popupName:名前>
* 「文章の表示」で表示する名前を指定します。
* 未入力だと"\n[アクターID]"になります。
*
* <faceIndex:インデックス>
* 顔画像のインデックスを指定します。
* 未入力だとデータベースで選択した顔のインデックスになります。
*
* <facialExpressions:表情数>
* アクター個別で表情数を指定します。
* パラメータ［アクターの表情数］より優先されます。
*
* <optionString:文字列>
* オプション文字列を設定できます。
*
* [その他]
* 【制御文字】
* \EI
* 2行目以降にインデントを付与します。
*
* 【除外リスト】
* 初期値はトリアコンタン氏のMessageAlignCenter.jsの制御文字に対応しています。
*
* 【名前を非表示にする】
* 名前欄またはメッセージ冒頭に_（アンダーバー）を入力すると設定を無視して名前を
* 非表示にできます。
*
* 【違う名前を表示する（MZのみ）】
* 文章の表示の名前欄に直接入力します。
* テンプレートが適用されます。
*
* [仕様]
* パラメータとアクターの顔画像が被った場合、パラメータの設定が優先されます。
* さらにプラグインコマンドで設定した場合はそれが最優先になります。
* プラグインコマンド > パラメータ > アクター
* プラグインコマンドで名前を設定するとセーブデータの容量が増すので注意が
* 必要です。
* PluginCommonBaseに対応していますが無くても使えます。
*
* [更新履歴]
* 2021/09/03：Ver.1.0.0　公開。
* 2021/09/05：Ver.1.1.0　インデント有効時の行頭の瞬間表示に対応。プラグインコマンドを追加。
* 2021/09/07：Ver.1.1.1　メモでアクターの顔画像のインデックスを直接指定できる機能を追加。
* 2021/09/14：Ver.1.1.2　プラグインコマンドやパラメータでアクターの表情差分を参照する機能を追加。
* 2021/10/24：Ver.2.0.0　設定項目を追加。文字サイズ変更によるインデントのズレを修正。
* 2021/11/03：Ver.2.0.1　設定項目を追加。空欄にインデントを付与してしまう不具合を修正。
* 2021/11/28：Ver.2.0.2　名前未設定の顔グラを使用した際フリーズする不具合を修正。
* 2021/12/06：Ver.3.0.0　名前入力欄に入力したとき、自動で共通文字列を適用する機能を追加。
* 2021/12/30：Ver.4.0.0　コードの見直し。顔差分のインデックスを追加。インデント改善。
* 2021/12/31：Ver.4.0.1　インデントのバグ修正。
* 2022/01/06：Ver.4.0.2　軽微な修正。
* 2022/10/31：Ver.5.0.0　リニューアル。下位バージョンとの互換性はありません。
* 2022/12/10：Ver.5.0.1　競合対策。
* 2023/03/21：Ver.5.1.0　特定の制御文字が含まれているときはインデントを行わない機能を追加。
*
*
* @command setNameKeys
* @desc 顔画像と名前の関連付けを設定します。
*
* @arg name
* @text 名前
* @desc 表示させる名前。
* 制御文字が使用できます。
* @default
* @type string
*
* @arg faceName
* @text ファイル名
* @desc [0][1][2][3]
* [4][5][6][7]
* @default
* @type file
* @dir image/faces
*
* @arg faceIndex
* @text インデックス
* @desc [0][1][2][3]
* [4][5][6][7]
* @default 0
* @type number
*
* @arg facialExpressions
* @text 表情数
* @desc 0：パラメータ［キャラクターの表情数］を参照
* -1：パラメータ［アクターの表情数］を参照
* @default 0
* @type number
* @min -1
*
* @arg optionString
* @text オプション文字列
* @desc セリフ直前に付与する文字列。
* 主に制御文字など。
* @default
* @type string
*
* @param mode
* @text 動作モード
* @desc 名前ウィンドウを追加するプラグインと組み合わせるなら「外部プラグインと連携（MV）」を選択。
* @default 0
* @type select
* @option 標準
* @value 0
* @option ウィンドウ内に表示（MZ）
* @value 1
* @option 外部プラグインと連携（MV）
* @value 2
*
* @param startNewLine
* @text 改行
* @desc ウィンドウ内に名前を表示する際、改行してからメッセージを表示します。
* @default true
* @type boolean
*
* @param autoIndent
* @text 自動インデント
* @desc ウィンドウ内に名前を表示する際、自動で名前以外の文字列を右に全角1文字ぶんずらします。
* @default true
* @type boolean
*
* @param exclusionList
* @text 除外リスト
* @desc このリストに含まれる制御文字がメッセージ内にある場合、インデントを行いません。
* @default ["ac", "ar"]
* @type string[]
*
* @param analyzeActors
* @text アクターを解析する
* @desc データベースの入力情報を解析して顔画像と名前を設定します。
* @default true
* @type boolean
*
* @param actorFacialExpressions
* @text アクターの表情数
* @desc アクター共通の表情数を入力します。
* @default 1
* @min 1
* @type number
*
* @param characterFacialExpressions
* @text キャラクターの表情数
* @desc アクター以外共通の表情数を入力します。
* @default 1
* @min 1
* @type number
*
* @param template
* @text テンプレート
* @desc この形式で名前が表示されます。
* %1はキャラ名。
* @default \>\c[14]%1\c[0]
* @type string
*
* @param nameKeys
* @text 名前キー
* @desc キャラクターの顔と名前の関連付け。
* @default 
* @type struct<key>[]
* 
*/

/*:
* @target MV MZ
* @plugindesc The name is automatically displayed in the window according to the face image.
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/
* @help Ver.5.1.0
* [Setting Method]
* 【Index】
* [0][1][2][3]
* [4][5][6][7]
* The upper left of the face image is 0, and the lower right is larger.
*
* ※When facial expression difference exists
* For example, let's say that the same character's facial expressions of
* Joy, Anger, Surprise, and Tears are lined up in a row.
* [Jo][An][Su][Te]
* Specifies the lowest index among them.
*
* 【Number of Facial Expressions】
* For example, let's say there are 4 facial expressions of the same character.
* [Jo][An][Su][Te]
* In this case, "4" is the setting value.
*
*  0：Refer to the parameter [Facial Expressions of Character]
* -1：Refer to the parameter [Facial Expressions of Actor]
*
* 【Operating Mode】
* "Link with External plugin (MV)"
* Select when you want to use a plugin that displays the name window in MV.
* In the case of YEP_MessageCore, setting [Template] to "\n<%1>" will
* automatically display the name window.
*
* 【Template】
* Name template.
* For example, if you enter "\>\c[24]%1\c[0]",
* all names will be in the same state as when you enter
* \>\c[14]name\c[0].
* You can change the text color or use it to work with external plugins
* using control characters.
*
* 【Option String】
* It is a string that is always given just before the serif.
* For example, if you set [Option String] to "\}",
* you can create a character that always whispers.
* This function is primarily used to work with external plugins
* that use control characters.
* For MPP_MessageSE, if you enter "\se[n]" in [Option String],
* SE will be played every time the character speaks.
*
* [Plugin Command (MV)]
* setNameKeys Name Filename Index NumberofFacialExpressions OptionString
* 【Number of Facial Expressions】
*  0 or not entered：Refer to the parameter [Facial Expressions of Characters]
* -1：Refer to the parameter [Facial Expressions of Actors]
*
* [Note]
* Write it in the actor's note field.
* Available when the parameter [Analyze actors] is enabled.
* Only the parts that you want to set manually are controlled by note.
*
* <popupName:Name>
* Specify the name to be displayed in [Show Text].
* If not entered, it will be "\n[Actor ID]".
*
* <faceIndex:Number>
* Specifies the face image index.
* If not entered, it will be the index of the selected face in the database.
*
* <facialExpressions:Number>
* Specify the number of facial expressions for each actor.
* It has priority over the parameter [Expressions of Actors].
*
* <optionString:String>
* An option string can be set.
*
* [Others]
* 【Control Character】
* \EI
* Indent the second and subsequent lines.
*
* 【Exclusion List】
* The initial value corresponds to the control characters of
* Triacontane's MessageAlignCenter.js.
*
* 【Hide Name】
* You can ignore the setting and hide the name by entering an _ (underscore)
* at the beginning of the name field or text.
*
* 【Show different name (MZ only)】
* Enter directly in the name field of [Show Text].
* [Template] is applied.
*
* [Specification]
* If the parameter and the actor's face image overlap,
* the parameter setting takes precedence.
* Furthermore, if you set it with a plugin command,
* it will have the highest priority.
* Plugin Command > Parameter > Actor
* Please note that setting the name with the plugin command
* will increase the size of the save data.
* It supports PluginCommonBase, but can be used without it.
*
* @command setNameKeys
* @desc Set association between face image and name.
*
* @arg name
* @text Name
* @desc Name to display.
* Control characters are allowed.
* @default
* @type string
*
* @arg faceName
* @text Filename
* @desc [0][1][2][3]
* [4][5][6][7]
* @default
* @type file
* @dir image/faces
*
* @arg faceIndex
* @text Index
* @desc [0][1][2][3]
* [4][5][6][7]
* @default 0
* @type number
*
* @arg facialExpressions
* @text Facial Expressions
* @desc 0：Refer to the parameter [Facial Expressions of Charactors]
* -1：Refer to the parameter [Facial Expressions of Actors]
* @default 0
* @type number
* @min -1
*
* @arg optionString
* @text Option String
* @desc Character string added just before serif.
* Mostly control characters.
* @default
* @type string
*
* @param mode
* @text Operating Mode
* @desc If you want to combine it with a plugin that adds a name window, select "Link with external plugin (MV)".
* @default 0
* @type select
* @option Standard
* @value 0
* @option Show in Window (MZ)
* @value 1
* @option Link with external plugin (MV)
* @value 2
*
* @param startNewLine
* @text Start New Line
* @desc When displaying the name in the window, display the message after a line break.
* @default true
* @type boolean
*
* @param autoIndent
* @text Auto Indent
* @desc When displaying the name in the window, the character strings other than the name are automatically shifted to the right by one double-byte character.
* @default true
* @type boolean
*
* @param exclusionList
* @text Exclusion List
* @desc Text will not be indented if it contains control characters from this list.
* @default ["ac", "ar"]
* @type string[]
*
* @param analyzeActors
* @text Analyze Actors
* @desc Analyze the database input information and set the face image and name.
* @default true
* @type boolean
*
* @param actorFacialExpressions
* @text Facial Expressions of Actors
* @desc Enter the number of facial expressions common to all actors.
* @default 1
* @min 1
* @type number
*
* @param characterFacialExpressions
* @text Facial Expressions of Characters
* @desc Enter the number of facial expressions common other than actors.
* @default 1
* @min 1
* @type number
*
* @param template
* @text Template
* @desc Names are displayed in this format.
* %1 is the character name.
* @default \>\c[14]%1\c[0]
* @type string
*
* @param nameKeys
* @text Name Keys
* @desc A character's face-name association.
* @default 
* @type struct<key>[]
* 
*/

/*~struct~key:ja
*
* @param name
* @text 名前
* @desc 表示する名前。
* 制御文字が使用できます。
* @default
* @type string
*
* @param faceName
* @text ファイル名
* @desc [0][1][2][3]
* [4][5][6][7]
* @default
* @type file
* @dir image/faces
*
* @param faceIndex
* @text インデックス
* @desc [0][1][2][3]
* [4][5][6][7]
* @default 0
* @type number
*
* @param facialExpressions
* @text 表情数
* @desc 0：パラメータ［キャラクターの表情数］を参照
* -1：パラメータ［アクターの表情数］を参照
* @default 0
* @type number
* @min -1
*
* @param optionString
* @text オプション文字列
* @desc セリフ直前に付与する文字列。
* @default
* @type string
*
*/

/*~struct~key:
*
* @param name
* @text Name
* @desc Name to display.
* Control characters are allowed.
* @default
* @type string
*
* @param faceName
* @text Filename
* @desc [0][1][2][3]
* [4][5][6][7]
* @default
* @type file
* @dir image/faces
*
* @param faceIndex
* @text Index
* @desc [0][1][2][3]
* [4][5][6][7]
* @default 0
* @type number
*
* @param facialExpressions
* @text Facial Expressions
* @desc 0：Refer to parameter [Facial Expressions of Characters]
* -1：Refer to parameter [Facial Expressions of Actors]
* @default 0
* @type number
* @min -1
*
* @param optionString
* @text Option String
* @desc The string to add just before the serif.
* @default
* @type string
*
*/

'use strict';
{
	const useMZ = Utils.RPGMAKER_NAME === "MZ";
	//プラグイン名取得
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	const hasPluginCommonBase = typeof PluginManagerEx === "function";
	
	//プラグインパラメータ取得
	const parameters = PluginManager.parameters(pluginName);
	const paramKeys = parameters['nameKeys'] && JSON.parse(parameters['nameKeys']).map(JSON.parse);
	for (const param of paramKeys) {
		for (const prop in param) {
			if (!isNaN(param[prop])) param[prop] = Number(param[prop])
		}
	}
	let template = parameters['template'] || "%1";
	const actorFacialExpressions = Number(parameters['actorFacialExpressions']);
	const characterFacialExpressions = Number(parameters['characterFacialExpressions']);
	const mode = Number(parameters['mode']);
	const autoIndent = parameters['autoIndent'] === "true" && mode !== 2;
	const exclusionList = JSON.parse(parameters['exclusionList'] || "[]").map(cc => new RegExp(String.raw`\x1b${cc.toUpperCase()}`, "i"));
	const startNewLine = parameters['startNewLine'] === "true";
	const analyzeActors = parameters['analyzeActors'] === "true";
	const inTheWindow = mode > 0 || !useMZ;

	if ((useMZ ? mode === 1 : mode <  2) && startNewLine) {
		template += "\n";
	}

	const nameKeys = {};

	const setNameKeys = function($data) {
		for (const character of $data) {
			if (character === null) continue;
			let charName = "";
			let expressions = 0;
			const faceName = character.faceName;
			let faceIndex = Number(character.faceIndex);
			let optionString = "";

			if ($data === $dataActors) {
				charName = character.meta["popupName"] || "\\N[" + character.id + "]";
				expressions = character.meta["facialExpressions"] ? Number(character.meta["facialExpressions"]) : -1;
				if (character.meta["faceIndex"]) faceIndex = Number(character.meta["faceIndex"]);
				if (character.meta["optionString"]) optionString = character.meta["optionString"];
			} else {
				charName = character.name;
				expressions = Number(character.facialExpressions);
				optionString = character.optionString || "";
			}

			if (expressions <= 0) {
				expressions = expressions === -1 ? actorFacialExpressions : characterFacialExpressions;
			}

			for (let i = 0; i < expressions; i++) {
				const key = [faceName, faceIndex + i];
				nameKeys[key] = {
					"name": charName,
					"optionString": optionString,
					"expressionIndex": i,
					"expressions": expressions
				}
			}
		}
	};

	//-----------------------------------------------------------------------------
	// PluginManager

	if (useMZ && hasPluginCommonBase) {
		PluginManagerEx.registerCommand(document.currentScript, "setNameKeys", function (args) {
			$gameSystem.setNameKeys(args);
		});
	} else if (useMZ) {
		PluginManager.registerCommand(pluginName, "setNameKeys", function (args) {
			args.faceIndex = Number(args.faceIndex);
			args.facialExpressions = Number(args.facialExpressions);
			$gameSystem.setNameKeys(args);
		});
	}

	//-----------------------------------------------------------------------------
	// Game_System

	Game_System.prototype.setNameKeys = function(args) {
		const charName = args.name;
		let expressions = args.facialExpressions;
		const optionString = args.optionString || "";
		if (expressions <= 0) {
			expressions = expressions === -1 ? actorFacialExpressions : characterFacialExpressions;
		}
		const faceName = args.faceName;
		const faceIndex = args.faceIndex;
		if (!this._nameKeys) this._nameKeys = {};

		for (let i = 0; i < expressions; i++) {
			const key = [faceName, faceIndex + i];
			this._nameKeys[key] = {
				"name": charName,
				"optionString": optionString,
				"expressionIndex": i,
				"expressions": expressions
			}
		}
	};

	const propSet = new Set(["expressionIndex", "expressions"]);
	Game_System.prototype.getNameKeyParam = function(key, prop) {
		let value = 0;
		if (this._nameKeys && this._nameKeys[key]) {
			value = this._nameKeys[key][prop] || 0;
		} else if (nameKeys[key]) {
			value = nameKeys[key][prop] || 0;
		}
		if (!value && !propSet.has(prop)) {
			value = ""
		}
		return value;
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter

	const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
	Game_Interpreter.prototype.command101 = function() {
		const params = this.currentCommand().parameters;
		const defaultName = params[4];
		const nextParams = this._list[this._index+1].parameters;
		const rawNextParam = nextParams[0];
		const _underbar = nextParams[0].charAt(0) === "_";
		const noName = defaultName === "_" || _underbar;
		params[4] = params[4] || "";
		if (noName) {
			params[4] =  "";
			if (_underbar) {
				nextParams[0] = nextParams[0].slice(1);
			}
 		} else {
 			const key = [params[0], params[1]];
 			const characterName = defaultName || $gameSystem.getNameKeyParam(key, "name");
			const optionString = /*defaultName ? "" : */$gameSystem.getNameKeyParam(key, "optionString");
 			if (characterName) {
 				params[4] = template.format(characterName);
				nextParams[0] = optionString + nextParams[0];
	 			if (inTheWindow) {
	 				nextParams[0] = params[4] + nextParams[0];
	 				params[4] = "";
	 				$gameMessage.setIndent(autoIndent);
	 			}
 			}
		}
		const result = _Game_Interpreter_command101.call(this, params);
		params[4] = defaultName
		nextParams[0] = rawNextParam;
		return result;
	};

	const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.apply(this, arguments);
		if (command === "setNameKeys") {
			this[command](args);
		}
	};

	Game_Interpreter.prototype.setNameKeys = function(args) {
		const argsObj = {
			"name": args[0],
			"faceName": args[1],
			"faceIndex": Number(args[2] || 0),
			"facialExpressions": Number(args[3] || 0),
			"optionString": args[4]
		}
		$gameSystem.setNameKeys(argsObj);
	};

	//-----------------------------------------------------------------------------
	// Game_Message

	const _Game_Message_clear = Game_Message.prototype.clear;
	Game_Message.prototype.clear = function() {
		_Game_Message_clear.call(this);
		this._indent = false;
	};

	Game_Message.prototype.indent = function() {
		return this._indent;
	};

	Game_Message.prototype.setIndent = function(value) {
		this._indent = value;
	};

	//-----------------------------------------------------------------------------
	// Window_Base
	const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
	Window_Base.prototype.convertEscapeCharacters = function(text) {
		text = _Window_Base_convertEscapeCharacters.call(this, text);
		text = text.replace(/\x1bEI/gi, (_, p1) =>{
			$gameMessage.setIndent(autoIndent);
			return "";
		});
		if (exclusionList.find(cc => text.match(cc))) {
			$gameMessage.setIndent(false);
		};
		return text;
	};

	//-----------------------------------------------------------------------------
	// Window_Message

	let enableIndent = false;
	const _Window_Message_processNewLine = Window_Message.prototype.processNewLine;
	Window_Message.prototype.processNewLine = function(textState) {
		_Window_Message_processNewLine.call(this, textState);
		if ($gameMessage.indent()) {
			const width = useMZ ? $gameSystem.mainFontSize() : this.standardFontSize();
			textState.x += (textState.rtl ? -width : width);
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_Boot

	const _Scene_Boot_isReady  = Scene_Boot.prototype.isReady;
	Scene_Boot.prototype.isReady = function() {
		if (_Scene_Boot_isReady.call(this)) {
			if (analyzeActors) {
				setNameKeys($dataActors);
			}
			setNameKeys(paramKeys);
		}
		return _Scene_Boot_isReady.call(this);
	};
	
}