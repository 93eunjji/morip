var pageNickname = $('#pageNickname').val();  //들어온 페이지의 주인
var pageEmail = $('#pageEmail').val();

/*팔로우 버튼 클릭*/
$('.follower').click(function(){
	$.ajax({
		type: 'post',
		url: '/morip/myblog/followClick',
		data: {'email' : 'ka28@naver.com'},
		dataType: 'json',
		success: function(data){
			$('#modal_followtable tr:gt(0)').remove();
			$.each(data.list, function(index, items){
				$('<tr/>').append($('<td/>', {
					id : 'modal_userImg'
					}).append($('<img>', {
						src : '../image/myblog/paris.jpg',
						id : 'modal_userImg'
				}))
				).append($('<td/>', {
					id : 'modal_userName',
					text : items.nickname
				})).append($('<td/>', {
					id : 'modal_userFollow'
					}).append($('<button/>', {
						class : 'btn btn-outline-dark',
						id : 'followClickBtn',
						text : '팔로잉'
					}))
				).appendTo($('#modal_followtable'));
			});
		}
	});
	$('#followModal').modal();
	$('.modal-title').text("팔로우");
});

/*팔로잉 버튼 클릭*/
$('.following').click(function(){
	$.ajax({
		type: 'post',
		url: '/morip/myblog/followingClick',
		data: {'follow_email' : 'ka28@naver.com'},
		dataType: 'json',
		success: function(data){
			//alert(JSON.stringify(data));
			$('#modal_followingtable tr:gt(0)').remove();
			$.each(data.list, function(index, items){
				$('<tr/>').append($('<td/>', {
					id : 'modal_userImg'
					}).append($('<img>', {
						src : '../image/myblog/cake.png',
						id : 'modal_userImg'
				}))
				).append($('<td/>', {
					id : 'modal_userName',
					text : items.nickname
				})).append($('<td/>', {
					id : 'modal_userFollow'
					}).append($('<button/>', {
						class : 'btn btn-outline-dark',
						id : 'followingClickBtn',
						text : '팔로잉'
					}))
				).appendTo($('#modal_followingtable'));
			});
		}
	});
	$('#followingModal').modal();
	$('.modal-title').text("팔로잉");
});

//팔로우 버튼 클릭
$('#followBtn').click(function(){
	if($('#followCheck').val() == 'uncheck'){
		$.ajax({
			type: 'post',
			url: '/morip/myblog/follow',
			data: {'follow_email' : 'ka28@naver.com'},
			success: function(){
				$('#followBtn').attr('class', 'btn btn-outline-dark');
				$('#followBtn').text('팔로잉');
				$('#followCheck').val('check');
				location.reload();
			},
			error: function(err){
				console.log(err);
			}

		});
	}else if($('#followCheck').val() == 'check'){
		$.ajax({
			type: 'post',
			url: '/morip/myblog/unfollow',
			data: {'follow_email' : 'ka28@naver.com'},
			success: function(){
				$('#followBtn').attr('class', 'btn btn-outline-primary');
				$('#followBtn').text('팔로우');
				$('#followCheck').val('uncheck');
				location.reload();
			},
			error: function(err){
				console.log(err);
			}

		});
	}
});
/*
function likeClick(seq){
	if($('#likeCheck'+seq).val()=='unlike'){ // likeCheck가 unlike일때
		$.ajax({
			type: 'post',
			url: '/morip/myblog/like',
			data: {'seq' : seq},
			success: function(){
				$('.like'+seq).html('<i class="fas fa-heart" style="color:red;"></i>');
				$('#likeCheck'+seq).val('like');
				location.reload();
			},
			error: function(){
				console.log(err);
			}
		});
	} else { // likeCheck가 like일때
		$.ajax({
			type: 'post',
			url: '/morip/myblog/unlike',
			data: {'seq' : seq},
			success: function(){
				$('.like'+seq).html('<i class="far fa-heart"></i>');
				$('#likeCheck'+seq).val('unlike');
				location.reload();
			},
			error: function(err){
				console.log(err);
			}
		});
	}
	
}

/*회원정보 수정*/
$('#modifyMemberBtn').click(function(){
	location.href="/morip/member/memberModifyForm";
});

/*작성 버튼 클릭 시  OptionModal 창 띄워주기*/
$('#writeOptionBtn').click(function(){
	//$('#writeOptionModal').modal();
	location.href="/morip/myblog/writeBlog1";
});
/*글 작성 모달에서 에세이 버튼 클릭시 */
$('#writeBlogImg').click(function(){
	location.href="/morip/myblog/writeBlog1";
});
/*글 작성 모달에서 여행기 버튼 클릭시 */
$('#travelsWriteImg').click(function(){
	location.href="/morip/myblog/travlesWrite1";
});

//날짜 형식 변환
Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";
    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = this;
    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear(); // 년 (4자리)
            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
            case "dd": return d.getDate().zf(2); // 일 (2자리)
            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
            case "mm": return d.getMinutes().zf(2); // 분 (2자리)
            case "ss": return d.getSeconds().zf(2); // 초 (2자리
            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
            default: return $1;
        }
    });
};
String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

/*무한스크롤*/
//페이지 로딩 되자마자 1pg 뜨기
$(document).ready(function(){
	loadBoardCount();
	likeCount();
	loadingPage();
	if($('#pageNickname').val()==$('#nickname').val()){  //마이 페이지로 들어왔을 경우
		$('#writeOptionBtn').show();
		$('#modifyMemberBtn').show();
	} else {
		$('#writeOptionBtn').hide();
		$('#modifyMemberBtn').hide();
	}
	$('.userMenu').css("z-index","90");
});
//변수 선언
	var $window = $(this);
	var scrollTop = $window.scrollTop();
	var windowHeight = $window.height();
	var documentHeight = $(document).height();
	var height=1500;
	var pg = $('#pg').val();
	var count = $('#count').val();
	var list = "";
	var loading = false;    //중복실행여부 확인 변수
    var page = 1;   //불러올 페이지
	
    $(window).scroll(function(){
    console.log("documentHeight:" + documentHeight + " | scrollTop:" + scrollTop + " | windowHeight: " + windowHeight );
        if($(window).scrollTop()+200>=$(document).height() - $(window).height())
        {
            if(!loading)    //실행 가능 상태라면?
            {
                loading = true; //실행 불가능 상태로 변경
                loadingPage(); 
            }
        }
    });  

        function loadingPage(){
    	$.ajax({
					type: 'post',
					url: '/morip/myblog/infinityScroll',
					data: 'pg='+pg+'&email='+pageEmail,
					dataType: 'json',
					success: function(data){
						pg++;
						count++;			
						var tempNumber= 0;
						if(data.list!=null){   //데이터가 존재할 때
						$.each(data.list, function(index, items){
							let startdate= new Date(items.startdate).format('yyyy-MM-dd'); 
							let enddate = new Date(items.enddate).format('yyyy-MM-dd');  
							let seq = items.blogboardtable_seq;
							//처음 시작을 여는 div
							if(tempNumber%3==0){
							
								height+=350;
								$('.content').css('height',height+'px');
								list += '<div class="myblogList" id="myblogList" data-aos="fade-up" data-aos-duration="3000">';
							}
							list+='<div id="myblog_feed" class="hvr-grow-shadow" onclick="viewEnter('+seq+')">';
							list+='<div class="myblog_img">';
							list+='<img class="listImg" src="../storage/'+items.mainimage+'"></div>';
            				list+='<div class="myblog_info"><div class="myblog_subject">'+items.subject+'</div>';
            				list+='<div class="myblog_content">'+items.content+'</div>';
            				list+='<div class="myblog_userFunction"><div class="like'+seq+'" style="cursor:pointer;"onclick="likeClick('+seq+')"><i class="far fa-heart"></i></div>';
            				list+='<div class="likeCount'+seq+'"></div><div class="myblog_travleDay">';
            				list+= startdate +'~'+ enddate+'</div></div></div></div>';
            				list+='<input type="hidden" id="likeCheck'+seq+'" value="unlike">';
            				//닫아주는 div
							if(tempNumber%3==2){
							console.log(tempNumber);
								list+='</div>';
							}
							tempNumber++;
						});
						$('.myBlog_wrapper').append(list);
						$('#pg').val(pg);
						list='';
						loading = false;
						}
						likeCheck();
					}   //success
				});   //AJAX
    }
    
    function likeCheck(){ // 인피니티스크롤 작동후에 좋아요를 체크하여 실행해주는 함수
		$.ajax({
			type: 'post',
			url: '/morip/myblog/likeCheck',
			dataType: 'json',
			success: function(data){
				if(data.list != ''){
					$.each(data.list, function(index, items){
						if(items.seq != ''){
							$('.like'+items.board_seq).html('<i class="fas fa-heart" style="color:red;"></i>');
							$('#likeCheck'+items.board_seq).val('like');
						}else{
							$('.like'+items.board_seq).html('<i class="far fa-heart"></i>');
							$('#likeCheck'+items.board_seq).val('unlike');
						}
					});
				}
			},
			error: function(err){
				console.log(err);
			}
		});
	}
    
    //뷰 페이지 진입
   	function viewEnter(seq){
   		location.href="view?seq="+seq;
   	}
   	
   	function loadBoardCount(){
   	console.log("보드개수 카운팅");
   	$.ajax({
         type: 'post',
         url: '/morip/myblog/boardSize',
         data: 'email='+pageEmail,
         dataType: 'json',
         success: function(data){
            $('#blogboardtableDiv').text(data.size);
         },
         error: function(err){
           console.log(err);
         }
       });
   	}
   	
   	function likeCount(){
   	//좋아요 숫자
	      $.ajax({
	        type: 'post',
	        url: '/morip/myblog/likeListSize',
	        dataType: 'json',
	        success: function(data){
	        	$.each(data.list, function(index, items){
	          		$('.likeCount'+items.blogboardtable_seq).html('&nbsp;&nbsp;&nbsp;'+items.likecount);
	        	});
	        },
	        error: function(err){
	          console.log(err);
	        }
	      });	
   	}
