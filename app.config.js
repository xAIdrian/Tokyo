import 'dotenv/config';
import appBuildNumbers from './app.json';

export default {
    "expo": {
        "name": "Outbrand",
        "slug": "OutPost",
        "version": process.env.EXPO_PUBLIC_PROJECT_VERSION || "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/tent.png",
        "userInterfaceStyle": "light",
        "splash": {
            "image": "./assets/images/splash.png",
            "resizeMode": "cover",
            "backgroundColor": "#F2E9D3"
        },
        "assetBundlePatterns": ["**/*"],
        "ios": {
            "supportsTablet": true,
            "bundleIdentifier": "com.outpost.app",
            "bitcode": false,
            "buildNumber": appBuildNumbers.expo.ios.buildNumber,
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./assets/images/tent.png",
            },
            "package": "com.outpost.app",
        },
        "web": {
            "favicon": "./assets/images/tent.png"
        },
        extra: {
            "eas": {
                "projectId": "bcc26948-2941-4e7d-a3ee-26d14b6d7fff"
            },
            apiKey: process.env.EXPO_PUBLIC_API_KEY,
            authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
            databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
            projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
            storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
            messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
            appId: process.env.EXPO_PUBLIC_APP_ID,
            aipiUrl: process.env.EXPO_PUBLIC_AIPI_URL,
          }
    }
}
