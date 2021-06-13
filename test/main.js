function minutes_conv(times){
    // hms と トーク時間を分に直す
    // 59分以上の値、59秒以上の値をあたえられたら…?erorrでalertとか
    let time_arr=times.split(":");
    if(time_arr.length==3 && time_arr[0]!=""){
	hou=parseInt(time_arr[0])*60;
	min=parseInt(time_arr[1]); // 空だった時の判定をどうするか
	mins=hou+min;
    }else if(time_arr.length<=1 && time_arr[2]!=""){
	mins=parseFloat(time_arr[2])/60;
    }else{
	if(time_arr.length==3){
	    min=parseInt(time_arr[1]);
	    sec=parseFloat(time_arr[2])/60;
	    mins=min+sec;
	}else{
	    mins=parseInt(time_arr[0]);
	    if(time_arr[1]){
		sec=parseFloat(time_arr[1])/60;
		mins=mins+sec;
	    }
	}
      }
    return parseFloat(mins);
      }
function lishit(ttitle,pvAll,play_Sum,pArv,pbTime){
    // 累計再生数からアプリ内再生数を抽出
    let pTime=minutes_conv(play_Sum);
    let pBack=minutes_conv(pbTime);
    if(12<pBack){
	pBack=12;
    }
    let avr_pb=pArv*pBack;
    let ps_par=pTime*100;
    let pv_app=ps_par/avr_pb+0.5;
    let pv_web=pvAll-(pv_app-0.5)+0.5;
    
    array=[ttitle,pvAll,parseInt(pv_app),parseInt(pv_web),pTime,pBack,pArv];

    return array;
    
}

list={} //グローバル変数の配列として使いたい
const app_pv={
    data(){
	return{
	    title: '',
	    pv: '',
	    pt_h: '',
	    pt_m: '',
	    pt_s: '',
	    pa: '',
	    pb_m: '',
	    pb_s: '',
	    pv_arr: ''
	}
    },
    methods:{
	sent_csv(){
	    let totaltime=this.pt_h+":"+this.pt_m+":"+this.pt_s;
	    let playback=this.pb_m+":"+this.pb_s;
	    console.log("再生時間"+totaltime);
	    console.log("トーク時間"+playback);
    	    this.pv_arr=lishit(this.title,this.pv,totaltime,this.pa,playback);
	    list[this.pv_arr[0]]=[this.pv_arr[1],this.pv_arr[2],this.pv_arr[3],this.pv_arr[4],this.pv_arr[5],this.pv_arr[6]];
	},
	dl_csv(){
	    // listからcsvを生成
	    list_key=Object.keys(this.list)
	    var csv = '\ufeff' + 'トークタイトル,累計再生数,アプリ内再生数(推計),Webでの再生数(推計),累計再生時間,トーク時間,平均再生率\n'
	    for(i=0; i<list_key.length; i++){
		csv += list_key[i]+ ','
		list[list_key[i]].forEach(el => {
		    csv += el + ','
		})
		csv+='\n'
	    }
	    let blob = new Blob([csv], { type: 'text/csv' })
	    let link = document.createElement('a')
	    link.href = window.URL.createObjectURL(blob)
	    link.download = 'result.csv'
	    link.click()
	}
    }
}
const apps=Vue.createApp(app_pv).mount("#app_lv")


// apps.component('user-table',{
//     template : `<tr><td>{{ pv_arr[0] }}</td>
//                  <td>{{  pv_arr[1] }}</td>
//                  <td>{{  pv_arr[2] }}</td>
//                  <td>{{  pv_arr[3] }}</td>
// 		 <td>{{  pv_arr[4] }}</td>
// 		 <td>{{  pv_arr[5] }}</td>
// 		 <td>{{  pv_arr[6] }}</td>
//                  </tr>`,
//     props : ['user']
// });
