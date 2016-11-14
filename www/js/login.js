/*
  Test file to test for login stuff.
*/
/*
var ss = new SecureStorage(
    function () { console.log('Success')},
    function (error) { console.log('Error ' + error); },
    'hello_app');
*/

//Test to see if the user already has keys
/*
ss.keys(
    function (keys) { console.log('Got keys ' + keys.join(', ')); },
    function (error) { console.log('Error, ' + error); }
);
*/

//cordova.exec(success, fail, 'SecureStorage', nativeMethodName, args);

//'get'

/*cordova.exec(
  function (value) { console.log('Success, got ' + value); },
  function (error) { console.log('Error ' + error); },
  'SecureStorage',
  'get', ['hello_app', 'fa']);
*/

var submit = document.getElementById("submit");

submit.onclick = function() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  //alert("username: " + username + " password: " + password);
  if(username == "test" && password == "test") {
    FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);
  } else {
    alert("Incorrect username and password.");
  }
};

var logout = document.getElementById("logout");

logout.onclick = function() {
  var LogoutForm = document.getElementById("logoutForm");
  LogoutForm.style.display = "none";
  var LoginForm = document.getElementById("loginForm");
  LoginForm.style.display = "block";
};

/**
 * @return {
 *      isAvailable:boolean,
 *      isHardwareDetected:boolean,
 *      hasEnrolledFingerprints:boolean
 *   }
 */
function isAvailableSuccess(result) {
    console.log("FingerprintAuth available: " + JSON.stringify(result));
    if (result.isAvailable) {
        FingerprintAuth.show({
                    clientId: "myAppName",
                    clientSecret: "a_very_secret_encryption_key"
                }, successCallback, errorCallback);
    }
}

function isAvailableError(message) {
    console.log("isAvailableError(): " + message);
}

/**
 * @return {withFingerprint:base64EncodedString, withPassword:boolean}
 */
function successCallback(result) {
    console.log("successCallback(): " + JSON.stringify(result));
    if (result.withFingerprint) {
        console.log("Successfully authenticated using a fingerprint");
        hideLoginForm();
        showLogoutFormWithMsg("Successfully authenticated using a fingerprint");
    } else if (result.withPassword) {
        console.log("Authenticated with backup password");
        hideLoginForm();
        showLogoutFormWithMsg("Authenticated with backup password");
    }
}

function errorCallback(error) {
    console.log(error); // "Fingerprint authentication not available"
}

function hideLoginForm() {
  var LoginForm = document.getElementById("loginForm");
  loginForm.style.display = "none";
}

function showLogoutFormWithMsg(msg) {
  var LogoutForm = document.getElementById("logoutForm");
  LogoutForm.style.display = "block";
  document.getElementById("loginType").innerHTML = msg;
}
