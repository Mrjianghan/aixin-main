import { Message } from 'element-ui'
import store from '../store'
import router from '../router/router';
export  default {
    err : (err)=>{
        console.log(err);
        if(String(err).indexOf( ('401')||('403') ) != '-1'  ){
                Message.error('登录已超时，请重新登录!');
            store.dispatch('FedLogOut').then(() => {
                router.push({ path: "/login" });
              })
        }else{
                Message.error('系统未知错误,请反馈给管理员');
        }
    },
	errPara:(err)=>{
		Message.error(err);
	}
	
	
}


