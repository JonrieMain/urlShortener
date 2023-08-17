$(document).ready(()=>{

// copy

copy = ()=> {

    // Get the text field
    const copyText = $('#inputCopy');

     // Select the text field
  copyText.select();
  // Copy the text inside the text field
  

 if (navigator.clipboard) {
        // Use Clipboard API if available
        navigator.clipboard.writeText(copyText.val())
            .then(() => {
                $('.modalCopy >button').text("Copied");
                setTimeout(() => {
                    $('.modalCopy').css("top", "-70rem");
                }, 3000);
            })
            .catch(error => {
                console.error("Failed to copy text:", error);
            });
    } else {
        // Fallback approach for browsers without Clipboard API
        try {
            document.execCommand('copy');
            $('.modalCopy >button').text("Copied");
            setTimeout(() => {
                $('.modalCopy').css("top", "-70rem");
            }, 3000);
        } catch (error) {
            console.error("Failed to copy text:", error);
        }
    }



  }




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