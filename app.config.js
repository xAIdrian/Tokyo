import 'dotenv/config';
export default {
    "expo": {
        "name": "OutPost",
        "slug": "OutPost",
        "version": process.env.PROJECT_VERSION || "1.0.0",
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
            "bundleIdentifier": "com.outpost.app"
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./assets/images/tent.png",
            }
        },
        "web": {
            "favicon": "./assets/images/tent.png"
        },
        extra: {
            "eas": {
                "projectId": "bcc26948-2941-4e7d-a3ee-26d14b6d7fff"
            },
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            databaseURL: process.env.DATABASE_URL,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
          }
    }
}
