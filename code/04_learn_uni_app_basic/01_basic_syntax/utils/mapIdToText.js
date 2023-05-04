function levelIdToText(levelId) {
	if (levelId === 3) {
		return "三级甲等";
	} else if (levelId === 2) {
		return "二级甲等";
	} else if (levelId === 1) {
		return "一级甲等";
	}
}

function roleIdToText(roleId) {
	let roleName = "";
	switch (roleId) {
		case 6:
			roleName = "院长";
			break;
		case 7:
			roleName = "副院长";
			break;
		case 8:
			roleName = "主任";
			break;
		case 9:
			roleName = "副主任";
			break;
		case 10:
			roleName = "副主治医生";
			break;
		case 11:
			roleName = "主治医生";
			break;
		case 12:
			roleName = "医生";
			break;
		default:
			roleName = "";
			break;
	}

	return roleName;
}

function regStateToText(state) {
	let text = "";

	switch (state) {
		case 0:
			text = "已取消";
			break;
		case 1:
			text = "挂号成功";
			break;
		case 2:
			text = "已取号";
			break;
		case 3:
			text = "已完成";
			break;
		case 4:
			text = "停诊";
			break;
		case 5:
			text = "爽约";
			break;
		case 6:
			text = "退款中";
			break;
		default:
			text = "";
			break;
	}

	return text;
}

export {
	levelIdToText,
	roleIdToText,
	regStateToText,
};