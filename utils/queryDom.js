export function queryDom(name) {
	//移动端是异步
	return new Promise((resolve, reject) => {
		// const query = uni.createSelectorQuery().in(this);
		const query = uni.createSelectorQuery();
		query.select(name).boundingClientRect(data => {
			// console.log("得到布局位置信息" + JSON.stringify(data));
			// console.log(name+"的高度" + data.height);
			resolve(data.height);
		}).exec();
	});
}



