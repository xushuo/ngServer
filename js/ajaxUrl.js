	//生产    
//	var ajaxUrl="http://crm.fclassroom.com/jike/";
    //测试
 // 	var ajaxUrl="http://172.17.35.92:8080/jike-crm-webapp/";  
     var ajaxUrl="http://localhost:8080/jike-crm-webapp/";
//    var ajaxUrl="http://192.168.31.124:8080/jike-crm-webapp/";

	var $ajax=function(type,url,data,succF,errF){
		$.ajax({
			type:type,
			contentType: "application/json; charset=utf-8",
			url:ajaxUrl+url,
			data:JSON.stringify(data),
			dataType:'json',
			success:function(jo){
				if(jo.state=='success'){
					succF(jo)
				}else if(jo.state=='unLogin'){
					pub.Alt(jo.message,false);
					$('.confirm').click(function(){
						window.location.href='login.html';
					})
				}else{
					errF(jo)
				}
				
			},
			error:function(){
//				alert('服务器忙');
			}
		});
	}