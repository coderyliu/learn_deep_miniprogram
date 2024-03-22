// 首页卡片list
export const homeCardList = [
  {
    title: "门诊预约",
    subtitle: "知名优质医院",
    imgPath: "../../static/images/home_appointment.png",
    url: "/pages/appointment/index",
    backgroundColor: "ff7759",
  },
  {
    title: "我的预约",
    subtitle: "我的预约列表",
    imgPath: "../../static/images/home-register.png",
    url: "/pages/register/index",
    backgroundColor: "#1ec0d8",
  },
];

// home首页右侧常用部门
export const commonDepList = [
  {
    id: 1,
    name: "神经内科",
    imgPath: "../../static/images/shenjing.png",
  },
  {
    id: 2,
    name: "消化内科",
    imgPath: "../../static/images/xiaohua.png",
  },
  {
    id: 3,
    name: "眼科",
    imgPath: "../../static/images/yanke.png",
  },
  {
    id: 4,
    name: "内科",
    imgPath: "../../static/images/xiaohuaneike.png",
  },
  {
    id: 5,
    name: "神经外科",
    imgPath: "../../static/images/shenjing.png",
  },
  {
    id: 6,
    name: "妇科",
    imgPath: "../../static/images/fuke.png",
  },
  {
    id: 7,
    name: "产科",
    imgPath: "../../static/images/chanke.png",
  },
  {
    id: 8,
    name: "儿科",
    imgPath: "../../static/images/erke.png",
  },
];

// 医院详情页nav bar
export const hosNavBarList = [
  {
    name: "科室列表",
    value: "dep",
  },
  {
    name: "医院详情",
    value: "detail",
  },
  {
    name: "预约须知",
    value: "know",
  },
  {
    name: "停诊信息",
    value: "notice",
  },
  {
    name: "意见反馈",
    value: "feedback",
  },
];

// 个人中心系统功能field
export const systemFieldList = [
  {
    title: "关于我们",
    value: "about",
    imgPath: "../../static/images/about.png",
  },
  {
    title: "意见反馈",
    value: "feedback",
    imgPath: "../../static/images/feedback.png",
  },
  {
    title: "账号管理",
    value: "account",
    imgPath: "../../static/images/account.png",
  },
  {
    title: "隐私权限",
    value: "private",
    imgPath: "../../static/images/private.png",
  },
  {
    title: "服务协议",
    value: "service",
    imgPath: "../../static/images/service.png",
  },
];

// 个人中心用户功能field
export const userFieldList = [
  {
    title: "待就诊",
    value: "wait",
    imgPath: "../../static/images/schedule.png",
  },
  {
    title: "已完成",
    value: "finish",
    imgPath: "../../static/images/finish.png",
  },
  {
    title: "已取消",
    value: "cancel",
    imgPath: "../../static/images/cancel.png",
  },
];

// 挂号订单页顶部导航栏
export const registerNavBarList = [
  {
    name: "全部",
    value: "all",
  },
  {
    name: "已取消",
    value: 0,
  },
  {
    name: "挂号成功",
    value: 1,
  },
  {
    name: "已取号",
    value: 2,
  },
  {
    name: "已完成",
    value: 3,
  },
  {
    name: "停诊",
    value: 4,
  },
  {
    name: "爽约",
    value: 5,
  },
  {
    name: "退款中",
    value: 6,
  },
];

// 交易记录顶部导航栏
export const rechargeNavBarList = [
  {
    name: "充值订单",
    value: "pay",
  },
  {
    name: "挂号订单",
    value: "reg",
  },
];
