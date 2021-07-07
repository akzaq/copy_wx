export function formatDate( time ){
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const fortyEightHours = 24 * 60 * 60 * 1000 * 2;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = `${year}-${month}-${day}`; 
  const todayTime = new Date(today).getTime();
  const yesterdayTime = new Date(todayTime - twentyFourHours).getTime();
  const lastYesterdayTime = new Date(todayTime - fortyEightHours).getTime();

  let hours = new Date(time).getHours()
  let min = new Date(time).getMinutes()
  if(String(hours).length===1){
    hours = '0'+hours
  }

  if(String(min).length===1){
    min = '0'+min
  }

  let formatTime = hours + ':' + min

  if( time >= todayTime ){
      
      return '今天 ' +  formatTime
  }
  else if( time < todayTime && yesterdayTime <= time ){
    
    return '昨天 ' + formatTime
  }
  else if( time < yesterdayTime && lastYesterdayTime <= time ){
    
    return '前天 ' + formatTime
  }
  else{
      return new Date(time).toLocaleDateString().replace(/\//g,'-')
  }
}

//调用
// let a = formatDate(new Date().getTime()

// console.log(a)