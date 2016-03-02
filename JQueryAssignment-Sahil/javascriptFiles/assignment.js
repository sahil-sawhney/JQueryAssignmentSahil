function createTableHeader(){
			$("#allRecordTable").html("<tr><th>Id.</th><th>Name</th><th>E-Mail</th></tr>")
		}

		function clearViewByIdFields(){
			$("#getStudentId").val("")
			$("#getStudentName").val("")
			$("#getStudentEmail").val("")
		}

		function getResultFieldsetSlideUp(){
			$("#slidingFieldset").slideUp();
		}

		function getResultFieldsetSlideDown(){
			$("#slidingFieldset").slideDown();
		}

		function postResultTableSlideUp(){
			$("#slidingTable").slideUp();
		}

		function postResultTableSlideDown(){
			$("#slidingTable").slideDown();
		}

		function clearInputSave(){
			$("#inputIdSave").val("");
			$("#inputNameSave").val("");
			$("#inputEmailSave").val("");
		}

		function clearResponseButtonBackground(){
			$("#saveJson").css("background","#0077fd")
			$("#getJson").css("background","#0077fd")
			$("#postJson").css("background","#0077fd")
		}

		function clearImageButtonBackground(){
			$("#corrosalBtn1").css("background","#32CD32")
			$("#corrosalBtn2").css("background","#32CD32")
			$("#corrosalBtn3").css("background","#32CD32")
			$("#corrosalBtn4").css("background","#32CD32")
		}

		function imageTransitionFadeInFadeOut(currentButton,imgSrc){
			clearImageButtonBackground()
			clearResponseButtonBackground()
			$(currentButton).css("background","#347C17")
			$("#corrosalImage").fadeOut("fast",function(){
				$("#corrosalImage").attr("src",imgSrc);
				$("#corrosalImage").fadeIn("fast")
			})
		}

		function imageTransitionSlideUpSlideDown(currentButton,imgSrc){
			clearImageButtonBackground()
			clearResponseButtonBackground()
			$(currentButton).css("background","#347C17")
			$("#corrosalImage").slideUp(function(){
				$("#corrosalImage").attr("src",imgSrc);
				$("#corrosalImage").attr("title","")
			});	
			$("#corrosalImage").slideDown();
		}

		$(function(){

			$("#corrosalBtn1").click(function(){
				imageTransitionFadeInFadeOut("#corrosalBtn1","images/scalaFullLogo.png")				
			})

			$("#corrosalBtn2").click(function(){
				imageTransitionSlideUpSlideDown("#corrosalBtn2","images/playFullLogo.png")
			})

			$("#corrosalBtn3").click(function(){
				imageTransitionFadeInFadeOut("#corrosalBtn3","images/akkaFullLogo.png")
			})

			$("#corrosalBtn4").click(function(){
				imageTransitionSlideUpSlideDown("#corrosalBtn4","images/MongoDB-Logo.svg.png")		
			})

			$("#saveJson").click(function(){
				getResultFieldsetSlideUp()
				clearViewByIdFields()
				postResultTableSlideUp()
				clearResponseButtonBackground()
				clearImageButtonBackground()
				$("#saveJson").css("background","#0000CD")

				var saveTempId=$("#inputIdSave").val();
				var saveName=$("#inputNameSave").val();
				var saveEmail=$("#inputEmailSave").val();
				var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
     

				if(saveTempId=="" || isNaN(saveTempId)){
					alert("please enter a valid number in Id.")
					clearResponseButtonBackground()
					return;
				}
				else if(saveName==""){
					alert("please enter a name")
					clearResponseButtonBackground()
					return;
				}
				else if(saveEmail=="" || !(pattern.test(saveEmail))){
					alert("please enter a valid email id")
					clearResponseButtonBackground()
					return;
				}
				else{
					var saveId=parseInt(saveTempId)

					var data={"id":saveId,"name":saveName,"email":saveEmail};
					$.ajax({
						url: "http://localhost:9000/student/save", type: "POST", data: JSON.stringify(data), contentType: "application/json", dataType: "json", success: function(data, status){
                 											alert("New Details Successfully Saved")
              											}
            		});
                	
					clearResponseButtonBackground()
					clearInputSave()
				}
			})

			$("#getJson").click(function(){
				postResultTableSlideUp()
				clearInputSave()
				clearResponseButtonBackground()
				clearImageButtonBackground()
				$("#getJson").css("background","#0000CD")
				var inpId=$("#getStudentId").val()
				if(inpId=="" || isNaN(inpId)){
					clearViewByIdFields()
					alert("please enter a valid integer to view details")
					clearResponseButtonBackground();
					return;
				}
				var tempUrl="http://localhost:9000/student/";
				var finalTemp=tempUrl+inpId
				$.get(finalTemp , function(data, status){
					if(data.id==-1){
						clearViewByIdFields()
						alert("record with id "+inpId+" not found")
						getResultFieldsetSlideUp()
						clearResponseButtonBackground()
						return;
					}
					$("#getStudentName").val(data.name)
					$("#getStudentEmail").val(data.email)
					getResultFieldsetSlideDown()
            	});
			})

			$("#postJson").click(function(){
				getResultFieldsetSlideUp()
				clearInputSave()
				clearViewByIdFields()
				clearResponseButtonBackground()
				clearImageButtonBackground()
				$("#postJson").css("background","#0000CD")
				$("#allRecordTable").html("")
				createTableHeader()
				$.post("http://localhost:9000/student/all", function(data, status){
           			for (var i = 0; i < data.length; i++) {
           				$("#allRecordTable").append("<tr><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].email+"</td></tr>")
           			}
           		}, postResultTableSlideDown());	
    			

			});		
		})
