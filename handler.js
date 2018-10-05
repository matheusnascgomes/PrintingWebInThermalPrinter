qz.websocket.connect().then(function() {
    console.log("Connected!");
 });

$('#btnAction').click(function(){
    printTest();
    
})

function printTest(){
    var config = qz.configs.create("Tally Dascom DL-210Z",
        { 
            copies: 1,
            interpolation: "nearest-neighbor"
        }
    );

    var data = [{ 
        type: 'image', 
        data: 'assets/img/qrcodereal.png' 
     }];

    qz.print(config, data).then(function() {
        console.log("Sent data to printer");
    }).catch(e =>console.error(e));
}