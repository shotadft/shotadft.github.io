var CONST_ITEM_MAX = 15;
$(function () {
	/*ExecuteSearch Async*/
	function ExecuteSearchAsyncTask() {
		return new Promise((resolve) => {
			setTimeout(() => {
				ExecuteSearch();
				resolve();
			}, 200);
		});
	}

	const items = [1, 2, 3, 4, 5];
	async function processItems(f = '') {
		if (f === 'searchItemTask') {
			await ExecuteSearchAsyncTask();
		}
	}

	/*Events*/
	for (let i = 1; i <= CONST_ITEM_MAX; i++) {
		CreateInputForm(item);
	}

	$("#mainform").submit(function () {
		$("#result").html(`${GetItemString()}${GetMoneyString()}\n`);
		return false;
	});

	$("#searchform").submit(function () {
		processItems('searchItemTask');
		return false;
	});

	$("#insertlist").click(function () {
		var id = $("#search_result").val();
		if (id) AddToList(id);
	});

	$("#converter").submit(function () {
		var m = parseInt($("#input_cnv").val(), parseInt($("[name=intype]:checked").val(), 10));
		if (isNaN(m)) { $("#output_cnv").val("error"); }
		$("#output_cnv").val(ConvertByteToString(m, 4));
		return false;
	});
});

function CreateInputForm(no) {
	let ret = ('00' + no).slice(-2);
	$("#itemlist").append(`<label for=\"item${ret}\">道具${ret}<select id=\"item${ret}\"></select></label><br>`);
	$("#item" + ret).append('<option value=\"0\">なし</option>');
	for (var i = 0; i < itemset.length; i++) {
		var gname = 'list' + ret + 'group' + i;
		$("#item" + ret).append(`<optgroup label=\"${itemset[i].groupname}\" id=\"${gname}\"></optgroup>`);
		for (var j = 0; j < itemset[i].items.length; j++) {
			$("#" + gname).append(`<option value=\"${itemset[i].items[j].id}\">${itemset[i].items[j].name}</option>`);
		}
	}
}
function GetMoneyString() {
	var m = parseInt($("#money").val(), 10);
	if (isNaN(m)) { return "所持金の変換に失敗"; }
	return ConvertByteToString(m, 4);
}

function GetItemString() {
	var temp = "";
	for (var i = 1; i <= CONST_ITEM_MAX; i++) {
		var m = parseInt($("#item" + i).val(), 10);
		if (isNaN(m)) { temp += `道具${i}の変換に失敗`; }
		else { temp += ConvertByteToString(m, 2); }
	}
	return temp;
}

function ConvertByteToString(input, size) {
	var temp = "";
	for (var i = 0; i < size; i++) {
		temp = temp + charset[(input >> (i * 8)) & 0xFF];
	}
	return temp;
}

function SearchNextUnselected() {
	for (var i = 1; i <= CONST_ITEM_MAX; i++) {
		if ($("#item" + i).val() == 0) {
			return i;
		}
	}
	return -1;
}

function ExecuteSearch() {
	$("#search_result").html("");
	var needle = $("#search").val();
	for (var i = 0; i < itemset.length; i++) {
		for (var j = 0; j < itemset[i].items.length; j++) {
			if (itemset[i].items[j].name.indexOf(needle) != -1) {
				$("#search_result").append(`<option value=\"${itemset[i].items[j].id}\" id=\"sr${itemset[i].items[j].id}\">${itemset[i].items[j].name}</option>`);
				$("#sr" + itemset[i].items[j].id).dblclick((function (id) { return function () { AddToList(id); } })(itemset[i].items[j].id));
			}
		}
	}
	return false;
}

function AddToList(id) {
	var nextspace = SearchNextUnselected();
	if (nextspace != -1) {
		$("#item" + nextspace).val(id);
	}
}
