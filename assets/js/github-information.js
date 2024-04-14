//2.
//this is based on the developers API documentation https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28 
// user is an object and has many attributes, this can be found on the example response of https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28
//@<a href="${user.html_url} is a link to users public profile on github and opens in a new window
//in github.html we have "oninput" meaning when user starts to write the username the function below will run
function userInformationHTML(user) {
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

//3.
//if there are no repos then I want to get message displayed
//if repos are there we will get an array and we want to iterate through it. Map function works like for 
//each and will run against the repo array and pushes the results into the new array
////the <li> element will list the items with the link and name of repo
 //the above is only array in a parameter, therefore we need to return it on the screen via html. 
 //We use join method on that array which returns it as a string and return everything in a new line

 function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}

//1.
//this is the first function we wrote, we use jquery to select the id in github.html gh-username and gh-user-data
//if there is no username, then I will see the message on the page Please enter github username
//otherwise as I type I see the loading image and immediately the request to the github api webpage is sent

    function fetchGitHubInformation(event) {
        $("#gh-user-data").html(""); //empty html space at the beginning of the writing, so that no repos apear
        $("#gh-repo-data").html(""); 

        var username = $("#gh-username").val();
        if (!username) {
            $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
            return;
        }
    
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

    $(document).ready(fetchGitHubInformation); // this will fully load the function where the octocat is ready and repos should be visible