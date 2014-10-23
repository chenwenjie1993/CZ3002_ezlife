// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('login', ['ionic'])

	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	})

	.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('signin', {
				url: "/sign-in",
				templateUrl: "sign-in.html",
				controller: 'SignInCtrl'
			})
			.state('forgotpassword', {
				url: "/forgot-password",
				templateUrl: "forgot-password.html"
			})

		$urlRouterProvider.otherwise("/sign-in");

	})

	.controller('SignInCtrl', function ($scope) {

		$scope.signIn = function (user) {
			console.log('Sign-In', user);
			localStorage.setItem("user", user);
			window.location.replace("index.html");
		};

	})



