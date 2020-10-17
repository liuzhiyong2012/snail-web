export default {
/*** 
 * atime 入参： 正常时间 或时间戳
 * 作用： 根据当前时间，转为 多久前
 * 
*/
  timeAgo: function(atime) {
    var byTime = [
      365 * 24 * 60 * 60 * 1000,
      24 * 60 * 60 * 1000,
      60 * 60 * 1000,
      60 * 1000,
      1000,
    ];
    var unit = ["years", "days", "hours", "minutes", "seconds"];
    // var ct = new Date().getTime() - new Date(atime).getTime();
    var ct = new Date().getTime() - new Date(atime).getTime() - 8*60*60*1000;
    if (ct < 0) {
      // return "瞎糊闹！";
      return '';
    }

    var sb = [];
    for (var i = 0; i < byTime.length; i++) {
      if (ct < byTime[i]) {
        continue;
      }
      var temp = Math.floor(ct / byTime[i]);
      ct = ct % byTime[i];
      if (temp > 0) {
        sb.push(temp + unit[i]);
      }

      /*一下控制最多输出几个时间单位：
		一个时间单位如：N分钟前
		两个时间单位如：M分钟N秒前
		三个时间单位如：M年N分钟X秒前
	    以此类推
	    */
      if (sb.length >= 1) {
        break;
      }
    }
    return sb.join("") + " " + "ago";
  },
};
