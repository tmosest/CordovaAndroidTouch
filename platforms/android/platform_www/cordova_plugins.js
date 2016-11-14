cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-android-fingerprint-auth.FingerprintAuth",
        "file": "plugins/cordova-plugin-android-fingerprint-auth/www/FingerprintAuth.js",
        "pluginId": "cordova-plugin-android-fingerprint-auth",
        "clobbers": [
            "FingerprintAuth"
        ]
    },
    {
        "id": "cordova-plugin-secure-storage.SecureStorage",
        "file": "plugins/cordova-plugin-secure-storage/www/securestorage.js",
        "pluginId": "cordova-plugin-secure-storage",
        "clobbers": [
            "SecureStorage"
        ]
    },
    {
        "id": "cordova-plugin-secure-storage.sjcl_ss",
        "file": "plugins/cordova-plugin-secure-storage/www/sjcl_ss.js",
        "pluginId": "cordova-plugin-secure-storage",
        "runs": true
    },
    {
        "id": "cordova-plugin-root-detection.RootDetection",
        "file": "plugins/cordova-plugin-root-detection/www/rootdetection.js",
        "pluginId": "cordova-plugin-root-detection",
        "clobbers": [
            "rootdetection"
        ]
    },
    {
        "id": "cordova-plugin-jailbreak-detection.JailbreakDetection",
        "file": "plugins/cordova-plugin-jailbreak-detection/www/jailbreakdetection.js",
        "pluginId": "cordova-plugin-jailbreak-detection",
        "clobbers": [
            "jailbreakdetection"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.0",
    "cordova-plugin-android-fingerprint-auth": "0.3.1",
    "cordova-plugin-secure-storage": "2.6.1",
    "cordova-plugin-root-detection": "0.1.1",
    "cordova-plugin-jailbreak-detection": "0.1.0"
};
// BOTTOM OF METADATA
});