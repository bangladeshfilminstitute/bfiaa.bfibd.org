const mammoth = require("mammoth");

mammoth.extractRawText({path: "F:\\ABIR PC - 19 2 2023\\Document Drive - 10 4 2025\\Documents\\Alumni Association BFI\\2022-23 Alumni Committe\\BFIAA Committee Members - 2022.docx"})
    .then(function(result){
        var text = result.value; 
        console.log(text);
    })
    .catch(function(err){
        console.error("Error reading file:", err);
    });
