var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', bt.onDeviceReady, false);
        refreshBT.addEventListener('touchstart', bt.refreshDeviceList, false);
        disconnectBT.addEventListener('touchstart', bt.disconnect, false);
        listBT.addEventListener('touchstart', bt.connect, false);
    },
    onError: function(){
    	navigator.notification.alert(data, null, "ERROR", "OK");
    }
};
    

 var bt = {
 	onDeviceReady: function() {
        bt.refreshDeviceList();
    },
 	refreshDeviceList: function() {
        bluetoothSerial.list(bt.onDeviceList, app.onError);
        console.log('refresh')
    },
    onDeviceList: function(devices) {
        var option;

        // remove existing devices
        listBT.innerHTML = "";

        devices.forEach(function(device) {

            var divItem = document.createElement('div'),
                html =  device.name;
            divItem.classList.add("list");
            divItem.classList.add("BTlist");
            divItem.innerHTML = html;    
            divItem.dataset.deviceId = device.id;
            refreshBT = document.getElementById('refreshBT');
            listBT.append(divItem);
        });

        if (devices.length === 0) {

            option = document.createElement('option');
            option.innerHTML = "No Bluetooth Devices";
            listBT.appendChild(option);
        } 

    },
    connect: function(e) {
        var onConnect = function() {
                // subscribe for incoming data
                bluetoothSerial.subscribe('\n', bt.onData, app.onError);
                listBT.style.display = "none";
                refreshBT.style.display = "none";
                $("#searchBT").css("display","none");
                var deviceName = e.target.innerHTML;
                 $("#connectedTo h2").html(deviceName);
                connectedTo.style.display = "block";
                disconnectBT.style.display = "block";
            };

        var deviceId = e.target.dataset.deviceId;
        
        if (!deviceId) { // try the parent
            deviceId = e.target.parentNode.dataset.deviceId;
        }


        bluetoothSerial.connect(deviceId, onConnect, app.onError);
    },
    onData: function(data) { // data received from Arduino
        navigator.notification.alert(data, null, "You received data", "OK");
    },
    disconnect: function(event) {
    	connectedTo.style.display = "none";
        disconnectBT.style.display = "none";
        bluetoothSerial.disconnect(bt.refreshDeviceList, app.onError);
        listBT.style.display = "block";
        refreshBT.style.display = "block";
        $("#searchBT").css("display","block");
    }

 };

 var terminal = {
 	bindEvents: function(){
 		bluetoothSerial.subscribe('\n', bt.onReceived, app.onError);
 		terminalSubmit.addEventListener('touchstart', this.sendData, false);
 	},
 	sendData : function(){
 		var data = terminalInput.value;
 		var success = function() {
 			$(".typing").before('<div class="terminal-sent">'+ data +'</div>');
        };
 		var failure = function() {
 			var message = "Failed writing data to Bluetooth peripheral";
 			navigator.notification.alert(message, null, "SEND ERROR", "OK");
            console.log("Failed writing data to Bluetooth peripheral");
        };
 		bluetoothSerial.write(data, success, failure);
 	},
 	onReceived: function(data){
 		$(".typing").css("opacity","1");
 		setTimeout(function(){
   		$(".typing").css("opacity","0");
   		$(".typing").before('<div class="terminal-received">'+ data +'</div>');
  		}, 1000);
 		
 	}, 

 };

var prbutton = {
	subscribe: function(){
		bluetoothSerial.subscribe('\n', prbutton.onReceived, app.onError);
	},
	sendData : function(data){
 		var success = function()  {
 			$("#console").html('Sent: ' + data);
        };
 		var failure = function() {
 			var message = "<i>Failed writing data</i>";
 			navigator.notification.alert(message, null, "SEND ERROR", "OK");
            console.log("Failed writing data to Bluetooth peripheral");
        };
 		bluetoothSerial.write(data, success, failure);
 	},
 	onReceived: function(data){
 		$("#console").html('Received: ' + data);
 	}
};


