function performRequest(request, callback){

    fetch(request)
        .then(
            function(response) {
                if (response.ok) {
                    try{
                        response.json().then(json=> callback(json, response.status,null));
                    }
                    catch(er){
                        console.log("Caught :  " + er );
                    }
                }
                else {
                    response.json().then(err => callback(null, response.status,  err));
                }
            })
        .catch(function (err) {
            //catch any other unexpected error, and set custom code for error = 1
            callback(null, 1, err)
        });
}
module.exports = {
    performRequest
};
