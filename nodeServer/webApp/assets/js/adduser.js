function addUser(){
    var name = $("#firstname").val() + " " +  $("#lastname").val();
    var city = $("#city").val();
    var country = $("#country").val();

    address = $("#address").val() + " " + city + " " + $("#postcode").val() + " " + country;
    extraInfo =  $("#extraInfo").val();
    var http1= new XMLHttpRequest();
    var url1 = 'http://localhost:8080/user/add';
    var params = `user=${name}&email=email@email.com&city=${city}&country=${country}&orderJSON=${extraInfo}&address=${address}&key=123`;
    params = params.replace(" ", "%20")
    console.log(params)
    http1.open('POST', url1, true);
    
    //Send the proper header information along with the request
    http1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http1.onreadystatechange = function() {//Call a function when the state changes.
        if(http1.readyState == 4 && http1.status == 200) {
            alert(http1.responseText);
        }
    }
    http1.send(params)

}