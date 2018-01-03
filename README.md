This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start mySideMenu sidemenu
```

Then, to run it, cd into `mySideMenu` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

## Reference 

https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/hybrid_samples_build.htm

## Add new plugins

```
ionic cordova pluging add {{new plugin name}}
```


## Remove and add Salesforce plugin

```
ionic cordova plugin remove com.salesforce
ionic cordova plugin add https://github.com/forcedotcom/SalesforceMobileSDK-CordovaPlugin --force
```

## Add platforms
https://developer.salesforce.com/docs/atlas.en-us.noversion.mobile_sdk.meta/mobile_sdk/hybrid_ios.htm

Android
```
ionic cordova platform add android@6.2.3
```
ios
```
ionic cordova platform add ios@4.4.0
```

Before Prepare 

```
npm run build
```

prepare
```
cordova prepare
```

