//模拟数据

//用户信息&&好友申请
export const usersData = [
	{
		name: '测试1号',
		icon: '/static/test/1.jpg',
		des:  '到处都是陶瓷器、铜器、锡器，还有好多书画卷轴拥挤地插在大缸里，主人好不容易带我们找到沙发，沙发也是埋在古物堆中，经过一番整理，我们才得以落座。', //个人描述
		register: new Date().getTime() - 1000*60*60*24*90,	//注册时间
		mail: '4571179010@qq.com', //邮箱
		status: 2, //0是好友，1不是好友，2申请中
	},
	{
		name: '测试2号',
		icon: '/static/test/2.jpg',
		des:  '到处都是陶瓷器、铜器、锡器，还有好多书画卷轴拥挤地插在大缸里，主人好不容易带我们找到沙发，沙发也是埋在古物堆中，经过一番整理，我们才得以落座。', //个人描述
		register: new Date().getTime() - 1000*60*60*24*60,	//注册时间
		mail: '2461779711@qq.com', //邮箱
		status: 2, //0是好友，1不是好友，2申请中
	},
	{
		name: '测试3号',
		icon: '/static/test/3.jpg',
		des:  '到处都是陶瓷器、铜器、锡器，还有好多书画卷轴拥挤地插在大缸里，主人好不容易带我们找到沙发，沙发也是埋在古物堆中，经过一番整理，我们才得以落座。', //个人描述
		register: new Date().getTime() - 1000*60*60*24*360,	//注册时间
		mail: '578439812@qq.com', //邮箱
		status: 2, //0是好友，1不是好友，2申请中
	},
	{
		name: '测试4号',
		icon: '/static/test/4.jpg',
		des:  '到处都是陶瓷器、铜器、锡器，还有好多书画卷轴拥挤地插在大缸里，主人好不容易带我们找到沙发，沙发也是埋在古物堆中，经过一番整理，我们才得以落座。', //个人描述
		register: new Date().getTime() - 1000*60*60*24*90,	//注册时间
		mail: '1257459813@qq.com', //邮箱
		status: 2, //0是好友，1不是好友，2申请中
	},
	{
		name: '测试5号',
		icon: '/static/test/1.jpg',
		des:  '到处都是陶瓷器、铜器、锡器，还有好多书画卷轴拥挤地插在大缸里，主人好不容易带我们找到沙发，沙发也是埋在古物堆中，经过一番整理，我们才得以落座。', //个人描述
		register: new Date().getTime() - 1000*60*60*24*90,	//注册时间
		mail: '2461179814@qq.com', //邮箱
		status: 2, //0是好友，1不是好友，2申请中
	},
]

//好友信息
export const friendData = [
	{
		name: '测试1号',
		fid: 'test1',
		icon: '/static/test/1.jpg',
		content: '这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话',
		time: new Date().getTime() - 1000*60*60*24,
		status: 0
	},
	{
		name: '测试2号',
		fid: 'test2',
		icon: '/static/test/2.jpg',
		content: 'asdasdasdasdasfasgagasgasgs',
		time: new Date().getTime() - 1000*60*60*24*2,
		status: 0
	},
	{
		name: '测试3号',
		fid: 'test3',
		icon: '/static/test/3.jpg',
		content: '这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话',
		time: new Date().getTime() - 1000*60*60*24*3,
		status: 0
	},
	{
		name: '测试4号',
		fid: 'test4',
		icon: '/static/test/1.jpg',
		content: '这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试5号',
		fid: 'test5',
		icon: '/static/test/2.jpg',
		content: 'asdasdasdasdasfasgagasgasgs',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试6号',
		fid: 'test6',
		icon: '/static/test/3.jpg',
		content: '这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试7号',
		fid: 'test7',
		icon: '/static/test/1.jpg',
		content: '这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试8号',
		fid: 'test8',
		icon: '/static/test/2.jpg',
		content: 'asdasdasdasdasfasgagasgasgs',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试9号',
		fid: 'test9',
		icon: '/static/test/3.jpg',
		content: '这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试10号',
		fid: 'test10',
		icon: '/static/test/1.jpg',
		content: '这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试11号',
		fid: 'test11',
		icon: '/static/test/2.jpg',
		content: 'asdasdasdasdasfasgagasgasgs',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试12号',
		fid: 'test12',
		icon: '/static/test/3.jpg',
		content: '这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试13号',
		fid: 'test13',
		icon: '/static/test/1.jpg',
		content: '这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试14号',
		fid: 'test14',
		icon: '/static/test/2.jpg',
		content: 'asdasdasdasdasfasgagasgasgs',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试15号',
		fid: 'test15',
		icon: '/static/test/3.jpg',
		content: '这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试16号',
		fid: 'test16',
		icon: '/static/test/1.jpg',
		content: '这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试17号',
		fid: 'test17',
		icon: '/static/test/2.jpg',
		content: 'asdasdasdasdasfasgagasgasgs',
		time: new Date().getTime(),
		status: 0
	},
	{
		name: '测试18号',
		fid: 'test18',
		icon: '/static/test/3.jpg',
		content: '这是一段测试的话，这是一段测试的话这是一段测试的话这是一段测试的话',
		time: new Date().getTime(),
		status: 0
	},
]

//chat 
export const chatData = [
	{
		id: 'a',	//用户ID
		imgUrl: '/static/test/1.jpg',
		message: {
			name: '天安门广场',
			address: '北京市东城区东长安街',
			latitude: '39.90374',
			longitude: '116.397827'	
		},
		type: 4,	//消息类型 0文本 1图片 2音频 3视频 4地图定位
		time: new Date().getTime() - 1000*60*6,
		tip: 1
	},
	{
		id: 'b',	//用户ID
		imgUrl: '/static/test/2.jpg',
		message: {
			name: '故宫博物院',
			address: '北京市东城区景山前街4号',
			latitude: '39.917990069',
			longitude: '116.397026905'	
		},
		type: 4,	//消息类型 0文本 1图片 2音频 3视频 4地图定位
		time: new Date().getTime() - 1000*60*36,
		tip: 1
	},
	{
		id: 'a',	//用户ID
		imgUrl: '/static/test/1.jpg',
		message: {
			voice: '',
			time: 60
		},
		type: 2,	//消息类型 0文本 1图片 2音频 3视频 4地图定位
		time: new Date().getTime() - 1000*60*56,
		tip: 1
	},
	{
		id: 'b',	//用户ID
		imgUrl: '/static/test/2.jpg',
		message: {
			voice: '',
			time: 10
		},
		type: 2,	//消息类型 0文本 1图片 2音频 3视频 4地图定位
		time: new Date().getTime() - 1000*60*17,
		tip: 1
	},
	{
		id: 'a',	//用户ID
		imgUrl: '/static/test/1.jpg',
		message: '这是一段测试的内容,这是一段测试的内容,这是一段测试的内容，这是一段测试的内容',
		type: 0,	//消息类型 0文本 1图片 2音频 3视频 4地图定位
		time: new Date().getTime() - 1000*60*46,
		tip: 1
	},
	{
		id: 'a',
		imgUrl: '/static/test/1.jpg',
		message: '这是一段测试的内容',
		type: 0,
		time: new Date().getTime() - 1000*60*16,
		tip: 1
	},
	{
		id: 'b',
		imgUrl: '/static/test/2.jpg',
		message: '这是一段测试的内容,dasdasasgag这是一段测试的内容,这是一段测试的内容，这是一段测试的内容',
		type: 0,
		time: new Date().getTime() - 1000*60*22,
		tip: 1
	},
	{
		id: 'a',
		imgUrl: '/static/test/1.jpg',
		message: '/static/test/3.jpg',
		type: 1,
		time: new Date().getTime() - 1000*60*60*24,
		tip: 1
	},
	{
		id: 'b',
		imgUrl: '/static/test/2.jpg',
		message: '/static/test/4.jpg',
		type: 1,
		time: new Date().getTime() - 1000*60*32,
		tip: 1
	},
]

//表情
export const emoji = [
	['😀','😞','😍','😳','😎','😭','☺️','🤐'],
	['😴','😢','😓','😡','😜','😄','😲','🙁'],
	['😦','😱','😵','🤓','😇','🤢','😷','😬'],
	['🤣','😂','😅','😆','😉','😋','😘','😙'],
	['😐','😑','😶','🙄','😏','🤑','😨','🤧'],
	['💀','😰','😳','🤕','🤠','🤥','😈','👿'],
	['💪','👈','👉','☝','👆','🖕','👇','✌'],
	['🤞','✊','🤘','🤙','🖐','👌','👍','👎'],
	['🙈','🙉','🙊','💥','💦','💨','🐵','🐶'],
	['🐎','🐷','🐄','🐏','🐪','🐘','🐭','🐰'],
	['🦇','🐼','🦃','🐔','🐤','🐧','🐢','🐸'],
	['🐲','🐍','🐳','🐟','🐙','🌹','🥀','🌴'],
	['🌍','🌑','🌒','🌓','🌔','🌕','🌖','🌗'],
	['🌘','🌙','🌚','☀️','☁️','⛅','⛈','🌥',],
	['🌦','🌩','☂️','🍇','🍈','🍉','🍋','🍌'],
	['🍍','🍎','🍏','🍐','🍑','🍒','🍓','🍆'],
	['☠️','🛀','🛌','💌','💣','🕳','📿','💎'],
	['🚣','🏎','🏍','⛰']
]

//群成员信息
export const chatDetail = [
	{
		name: '测试1号',
		icon: '/static/test/1.jpg'
	},
	{
		name: '测试2号',
		icon: '/static/test/2.jpg'
	},
	{
			name: '测试1号',
			icon: '/static/test/1.jpg'
	},
	{
		name: '测试2号',
		icon: '/static/test/2.jpg'
	},
]