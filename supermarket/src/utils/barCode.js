//生成13为条码
export function createBarCode(val){
    var str='69';
    for(var i=0;i<10;i++){
        str+=Math.floor(Math.random()*10);

    }
   return str;
}
// var str=createBarCode();
// console.log(str);



