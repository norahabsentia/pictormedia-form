$(document).ready(function() {

const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const authToken = 'your_auth_token';


    $("#random").click(function() {
      //$("#demo").html("Hello, World!");
      console.log("aa");
      $.get("/random", function(data, status){
        console.log(data);
        if(data.length > 0){
          var client = data[0];
          $('#name').val(client.name); 
          $('#month').val(client.month); 
          $('#total_charges').val(client.total_charges); 
          $('#recent_pmt_amt').val(client.recent_pmt_amt); 
          $('#overall_balance').val(client.overall_balance); 
          $('#min_payment').val(client.min_payment); 
          $('#points_earned_month').val(client.points_earned_month); 
          $('#total_points_earned').val(client.total_points_earned); 
          $('#food').val(client.expense_distribution.food); 
          $('#entertainment').val(client.expense_distribution.entertainment); 
          $('#automobile').val(client.expense_distribution.automobile); 
          $('#healthcare').val(client.expense_distribution.healthcare); 
          $('#merchandise').val(client.expense_distribution.merchandise);

          var due_date = client.due_date.year+"-"+client.due_date.month+"-"+client.due_date.date ;

          $('#due_date').val(due_date);
          var recent_pmt_date = client.recent_pmt_date.year+"-"+client.recent_pmt_date.month+"-"+client.recent_pmt_date.date ;

          $('#recent_pmt_date').val(recent_pmt_date);
 
          //alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);
          
        }
      });
    });
    
    $("#sendEmail").click(function() {
  
      var text = $("#videolink").text();
      var link = $("#videolink").attr("href");
      if(text){
  
        console.log("11");
        $.post("/sendEmail",{"from":"<contact@mail.pictorpvs.com>","to":$('#email').val(),"subject":"Hello your PV is here","text":"Check your Personalised Video "+link},function(data, status){

           alert("Sent");

        });
     
      }

    });


    $("#sendSMS").click(function() {

   
      var text = $("#videolink").text();
      var link = $("#videolink").attr("href");
      if(text){

        console.log("11");

        /*$.post("https://api.twilio.com/2010-04-01/Accounts/ACefc93f82c6e3de2acc2220a081578fc2/Messages.json",{client:client},function(data, status){
        //alert("Data: " + data + "\nStatus: " + status);
        $("#videolink").text(data);
        $("#videolink").attr("href","http://35.200.136.182:8080/?id="+data);
        jQuery("#videolink")[0].click();//.trigger( "click" );

      });*/
        $.post("/sendSms",{"from_number":"+14233800174","to_number":"+91"+$('#number').val(),"message":link},function(data, status){

           alert("Sent");

        });


      }


    });

    $("#submit").click(function() {

      console.log("11");

      var client = {};

      client.name = $('#name').val();
      client.month = $('#month').val();
      client.total_charges = $('#total_charges').val();
      client.recent_pmt_amt = $('#recent_pmt_amt').val();
      client.overall_balance = $('#overall_balance').val();
      client.min_payment = $('#min_payment').val();
      client.points_earned_month = $('#points_earned_month').val();
      client.total_points_earned = $('#total_points_earned').val();
      client.expense_distribution = {};
      client.expense_distribution.food = $('#food').val();
      client.expense_distribution.entertainment = $('#entertainment').val();
      client.expense_distribution.automobile = $('#automobile').val();
      client.expense_distribution.healthcare = $('#healthcare').val();
      client.expense_distribution.merchandise = $('#merchandise').val();

      var string = $('#due_date').val().split("-");
      client.due_date = {};
      client.due_date.year = string[0];
      client.due_date.month = string[1];
      client.due_date.date = string[2];

      var string = $('#recent_pmt_date').val().split("-");
      client.recent_pmt_date = {};
      client.recent_pmt_date.year = string[0];
      client.recent_pmt_date.month = string[1];
      client.recent_pmt_date.date = string[2];


      $.post("/client",{client:client},function(data, status){
        //alert("Data: " + data + "\nStatus: " + status);
        $("#videolink").text(data);
        $("#videolink").attr("href","http://35.200.136.182:8080/?id="+data);
        jQuery("#videolink")[0].click();//.trigger( "click" );
        
      });      

    
      console.log(client);
 
    });
});
