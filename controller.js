var address = "";
var btnDisConnect = document.getElementById('btn_Disconnect');
var btnConnect = document.getElementById('btn_connect');
var btnpub = document.getElementById('btn_publish');
var btnsub = document.getElementById('btn_subscribe');
var btnUnsub = document.getElementById('btn_unsubscribe');
//for connect
btnConnect.addEventListener('click', function(e) {
    e.preventDefault();
    address = document.getElementById('address').value;
    client = mqtt.connect(address)
    client.on("connect", function() {
        console.log("Successfully connected");
        document.getElementById('status').innerHTML = 'Status: connected';
    })
    client.on("message", function(topic, payload) {
        console.log([topic, payload].join(": "));
        var tr = $("<tr>")
        timestamp = moment().format('MMMM D YYYY , h:mm:ss a');
        $("<td>").text(topic).appendTo($(tr))
        $("<td>").text(payload).appendTo($(tr))
        $("<td>").text(timestamp).appendTo($(tr))
        $("tbody").append($(tr))
    })
});



//for disconnect
btnDisConnect.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('status').innerHTML = 'Status: Disconnected';
    address = " ";
    client.end();

});

//for publish
btnpub.addEventListener('click', function(e) {
    var topicR = document.getElementById('topic_receive').value;
    var payloadd = document.getElementById('payload').value;
    e.preventDefault();
    console.log("publish")
    client.publish(topicR, payloadd)

});
//for subscribe
btnsub.addEventListener('click', function(e) {
    topicG = document.getElementById('topic_give').value;
    e.preventDefault();
    console.log(topicG)
    client.subscribe(topicG)
});
btnUnsub.addEventListener('click', function(e) {
    e.preventDefault();
    topicG = "unsub";
});