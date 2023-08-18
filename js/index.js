$(document).ready(()=>{


let inp = $('#inp');
let newName = $('#new');
$('.button').on('click',(btn)=>{
   

    // fuction to check if the url is valid
    var isValidUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

    
    remLoader = ()=>{
        $('.spinnerCon').css("zIndex","-9999999999");
    }


        $('.spinnerCon').css("zIndex","1");
        setTimeout(()=>{

            if(inp.val()==""||inp.val()==null||newName.val()==""||newName.val()==null){
                // if input is no value
                $('#mess').text('Please Enter link');
                remLoader();
            }else if(!isValidUrl.test(inp.val())){
                $('#mess').text('Invalid URL');
                remLoader();
            }
            else if(inp.val().length >= 244){
                 // if the url is too long
                 $('#mess').text('URL is too long. Max: 250');
                 remLoader();
            }else{
                // if valid
                $.ajax({
        
                    method: 'POST',
                    url: './actions/insertURL.php',
                    data: {url: inp.val(),newName:newName.val()},
                    success: (urlRespo)=>{
                        

                        // check if successfully created
                        if(urlRespo.indexOf("localhost") != -1){
                            $('#mess').text(urlRespo).css("color","green");
                            $('#inputCopy').val(urlRespo);
                            $('.modalCopy').css("top","50%");
                        }else{
                            $('#mess').text(urlRespo);
                        }

                        remLoader();
                    }
        
        
                });
            }

        },1500);




});

});
