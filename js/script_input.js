      var entrance = document.getElementById("entrance-cabinet-btn");       
      var registration = document.getElementById("registration-btn");
       
      $('.mini-menu').on('click', function(){
        $('.mini-menu-drop').toggleClass('hidden_cl');
      });

      $('#mini-menu_exit').on('click', hideCabinetSuccess);       

      entrance.addEventListener("click", showCabinetSuccess);             
      registration.addEventListener("click", showCabinetSuccess);             
 
      function inputEmailFill(){
        $('#email_finish-user').val(dataRegistration.email);
        $('#email_finish-patner').val(dataRegistration.email);
      }     

      function showCabinetSuccess(){    
        cabinet_login.style.display = "none";
        cabinet_success.style.display = "flex";
      }

      function hideCabinetSuccess(){
        cabinet_success.style.display = "none"; 
        cabinet_login.style.display = "block"; 
        document.location.reload(); 
      }