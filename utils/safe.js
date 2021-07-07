export function safeTop(){
	let top 
	try {
	  const res = wx.getSystemInfoSync()
	  top = res.safeArea.top 
	
	} catch (e) {
	  // Do something when catch error
	}
	return top
}

export function safeAreaH(){
	let safeAreaH
	try {
	  const res = wx.getSystemInfoSync()
	  safeAreaH = res.safeArea.height 
	
	} catch (e) {
	  // Do something when catch error
	}
	return safeAreaH
}

export function safeBottom(){
	let bottom
	try {
	  const res = wx.getSystemInfoSync()
	  bottom = res.screenHeight -  res.safeArea.bottom 
	
	} catch (e) {
	  // Do something when catch error
	}
	return bottom
}
