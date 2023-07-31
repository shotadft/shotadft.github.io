//=============================================================================
 /*:
 * @plugindesc スマホ用UI競合対策  ver 1.0.0 
 * 他のプラグインとスマホ用UIの競合を対策します。
 * @author うろろこ
 *
 * 
 *
 * @param YEP_BattleEngineCore (SV時のみ)
 * @desc Yanfly様の「BattleEngineCore」との競合対策。 (SV時のみ)
 * [ ON ] 1  /  [ OFF ] 0     
 * @default 0
 *
 * @param YEP_EquipCore
 * @desc Yanfly様の「EquipCore」との競合対策。
 * [ ON ] 1  /  [ OFF ] 0     
 * @default 0
 *
 *
 * @help
 * 【対応プラグインとバージョン】
 * YEP_Battle Engine Core　v1.26　Yanfly様　http://yanfly.moe/
 * YEP_EquipCore v1.08　Yanfly様　http://yanfly.moe/
 *
 *
 */

(function(){

    var parameters = PluginManager.parameters('UR65_SmartPhoneUI_RC');

    var using_ybec = parseInt(String(parameters['YEP_BattleEngineCore']), 10) != 0;
    var using_yec = parseInt(String(parameters['YEP_EquipCore']), 10) != 0;

    //=====================================================
    // YEP_BattleEngineCore
    //=====================================================    
    if (using_ybec) {        
        Window_BattleActor.prototype.lineHeight = function() {
            return 36;
        };

        Window_BattleActor.prototype.windowWidth = function() {
            return Graphics.boxWidth - Graphics.boxWidth / 3;
        };

        Window_BattleActor.prototype.windowHeight = function() {
            return 180;
        };

        Window_BattleActor.prototype.initialize = function(x, y) {
            Window_BattleStatus.prototype.initialize.call(this);
            this.x = x;
            this.y = y;
            this.openness = 255;
            this.hide();
        };
    }

    //=====================================================
    // YEP_EquipCore
    //=====================================================
    if (using_yec) {
        Window_EquipCommand.prototype.lineHeight = function() {
            return 72;
        };

        Window_EquipCommand.prototype.maxCols = function() {
            return 2;
        };

        Window_EquipCommand.prototype.numVisibleRows = function() {
            return 2;
        };

        Window_EquipStatus.prototype.lineHeight = function() {
            return 36;
        };

        Window_EquipItem.prototype.lineHeight = function() {
            return 66;
        };

        Window_EquipItem.prototype.maxCols = function() {
            return 1;
        };

        Window_EquipSlot.prototype.lineHeight = function() {
            return 66;
        };

        Window_EquipSlot.prototype.maxCols = function() {
            return 2;
        };
        
        Window_EquipItem.prototype.drawRemoveEquip = function(index) {
            if (!this.isEnabled(null)) return;
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(true);
            var ibw = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawIcon(Yanfly.Icon.RemoveEquip, rect.x + 8, rect.y + this.lineHeight() / 2 - Window_Base._iconHeight / 2);
            var text = Yanfly.Param.EquipRemoveText;
            this.drawText(text, rect.x + ibw + 14, rect.y, rect.width - ibw);
        };

        Scene_Equip.prototype.createSlotWindow = function() {
            var wy = this._commandWindow.y + this._commandWindow.height;
            var ww = Graphics.boxWidth * 3 /5;
            var wh = Graphics.boxHeight - wy;
            this._slotWindow = new Window_EquipSlot(0, wy, ww, wh);
            this._slotWindow.setHelpWindow(this._helpWindow);
            this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
            this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
            this.addWindow(this._slotWindow);
        };

        Scene_Equip.prototype.createItemWindow = function() {
            var wy = this._slotWindow.y;
            var ww = Graphics.boxWidth * 3 / 5;
            var wh = Graphics.boxHeight - wy;
            this._itemWindow = new Window_EquipItem(0, wy, ww, wh);
            this._itemWindow.setHelpWindow(this._helpWindow);
            this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
            this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
            this._slotWindow.setItemWindow(this._itemWindow);
            this.addWindow(this._itemWindow);
            this._itemWindow.hide();
        };

        Window_EquipSlot.prototype.drawItem = function(index) {
            if (!this._actor) return;
            var rect = this.itemRectForText(index);
            this.changeTextColor(this.systemColor());
            this.changePaintOpacity(this.isEnabled(index));

            var default_font_size = this.contents.fontSize;
            this.contents.fontSize = 16;
            this.drawText(this.slotName(index), rect.x - 3, rect.y - 21, 0);
            var item = this._actor.equips()[index];
            if (item) {
                this.contents.fontSize = 20;
                this.drawItemName(item, rect.x - 8, rect.y + 7);
            } else {
                this.drawEmptySlot(rect.x - 8, rect.y + 7);
            }
            this.contents.fontSize = default_font_size;

            this.changePaintOpacity(true);
        };

        Window_EquipSlot.prototype.drawEmptySlot = function(wx, wy, ww) {
            this.changePaintOpacity(false);
            var ibw = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawIcon(Yanfly.Icon.EmptyEquip, wx + 8, wy + this.lineHeight() / 2 - Window_Base._iconHeight / 2);
            var text = Yanfly.Param.EquipEmptyText;
            this.drawText(text, wx + ibw + 14, wy, ww - ibw);
        };

        Window_StatCompare.prototype.drawParamName = function(y, paramId) {
            var x = this.textPadding();
            this.changeTextColor(this.systemColor());

            var default_font_size = this.contents.fontSize;
            this.contents.fontSize = 20;
            this.drawText(TextManager.param(paramId), x, y, this._paramNameWidth);
            this.contents.fontSize = default_font_size;
        };
    }
})();
