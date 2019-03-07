let Identifier = {};
Identifier.account = (() => {
    class Account {
        constructor() {
            this.userPool = new AmazonCognitoIdentity.CognitoUserPool({ 
                UserPoolId : config.poolId,
                ClientId : config.clientId
            });

        }

        loadLoginHtml() {
            $("#content").empty();
            $('#content').append($('.login').html());
        }

        loadSignUpHtml() {
            $("#content").empty();
            $('#content').append($('.signup').html());
        }

        unloadHtml() {
            $("#content").empty();
        }

        signUp() {
            let email = document.signup[0]["enter-email"].value;
            let password = document.signup[0]["enter-psw"].value;
            let attributeList = [];
            attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(
                {
                    Name:"email",
                    Value: email
                }
            ));
            
            this.userPool.signUp(email, password, attributeList, null, function(err, result){
                if (err) {
                    console.log(err);
                    $('#result-signup').text(err.message);
                    return;
                }
                let cognitoUser = result.user;
                $('#result-signup').text(`User successfully created !! Username is : ${cognitoUser.getUsername()}`);
            });
            
        }

        signIn() {
            let self = this;
            let authenticationData = {
                Username : document.login[0]["email"].value,
                Password : document.login[0]["psw"].value,
            };
                  
            let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
                          
            var userData = {
                Username : authenticationData.Username,
                Pool : self.userPool
            };
                var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
                cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    Identifier.details.token = result.idToken.jwtToken;
                    self.unloadHtml();
                    Identifier.details.loadHtml();
                },
                onFailure: function(err) {
                    $('#result-signin').text(err.message);
                },
           })        
        }
    }
   
    return new Account();

})();

$(document).ready(function() {
    if(!Identifier.details.hasToken) {
        Identifier.account.loadLoginHtml();
    }
    else{
        Identifier.details.loadHtml();
    }    
});
 