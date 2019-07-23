let baseUrl = '';
let iconfontVersion = ['791381_g06igcd721j'];

let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
if (process.env.NODE_ENV == 'development') {
	baseUrl = `http://123.206.120.120:8040`;    
} else if (process.env.NODE_ENV == 'production') {
	baseUrl = `http://123.206.120.120:8040`;
//    baseUrl = 'http://www.52gongzi.com:8040';    
}
let codeUrl = `${baseUrl}/code`;

export {
  baseUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl
}
