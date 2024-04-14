$("#gh-user-data").html(
    `<div id="loader">
        <img src="assets/css/loader.gif" alt="loading..." />
    </div>`);

    $.when(                                                     //this is a promise when we have got a response from github api, THEN run a function and display it in #gh-user-data div
    $.getJSON(`https://api.github.com/users/${username}`),     //this will get the username of the github user
    $.getJSON(`https://api.github.com/users/${username}/repos`) //this will list the depository for individual users

    ).then (
        function(firstResponse, secondResponse) {                   //I have two requests so I need to specify two responses
            var userData = firstResponse[0];                        //when we have two calls, the when method packs the response into the array and each response is the first element of an array
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData)); //this function is written above
            $("#gh-repo-data").html(repoInformationHTML(repoData)); //this function needs to be written

        }, function(errorResponse) {                               // error function has to be written in case of error message
            if (errorResponse.status === 404) {                    //Not found error  
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`); //if this is a different error we want to see that in the conso

            }
        }
    )

}