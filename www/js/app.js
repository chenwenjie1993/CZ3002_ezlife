// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ezlife', ['ionic'])

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
			if (!localStorage.getItem("user")) {
				window.location.replace("login.html");
			}
			else {

			}
		});
	})

	.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('home', {
				url: "/home",
				templateUrl: "home.html",
				controller: 'homeCtrl'
			})
			.state('doctor', {
				url: "/doctor",
				templateUrl: "doctor.html",
				controller: 'doctorCtrl'
			})
			.state('view-doctor', {
				url: "/view-doctor",
				templateUrl: "view-doctor.html",
			})
			.state('health', {
				url: "/health",
				templateUrl: "health.html",
				controller: 'healthCtrl'
			})
			.state('reminder', {
				url: "/reminder",
				templateUrl: "reminder.html",
				controller: 'reminderCtrl'
			})
			.state('appointment', {
				url: "/appointment",
				templateUrl: "appointment.html",
				controller: 'appointmentCtrl'
			})
			.state('setting', {
				url: "/setting",
				templateUrl: "setting.html",
				controller: 'settingCtrl'
			})
			.state('about', {
				url: "/about",
				templateUrl: "about.html",
				controller: 'aboutCtrl'
			})
			.state('tomorrow', {
				url: "/tomorrow",
				templateUrl: "tomorrow.html",
				controller: 'tomorrowCtrl'
			})
			.state('today', {
				url: "/today",
				templateUrl: "today.html",
				controller: 'todayCtrl'
			})
			.state('search', {
				url: "/search",
				templateUrl: "search.html",
				controller: 'searchCtrl'
			});

		$urlRouterProvider.otherwise("/home");

	})

	.controller('homeCtrl', function ($scope, $state, $rootScope) {
		console.log('homeCtrl');
		$scope.go = function (state) {
			$state.go(state);
		}
		$scope.logout = function() {
			localStorage.removeItem("user");
			window.location.replace("login.html");
		}
		$scope.weather = function () {
			return "24-30°C";
		}

		if (!$rootScope.reminders) {
			var reminders = [
				{title: "Sell share BABA at $90", date: "2014/10/01", time: "12:10", location:"Home"},
				{title: "Go swimming with Derek", date: "2014/10/02", time: "16:10", location:"SRC"},
				{title: "Have dinner with Ann", date: "2014/10/01", time: "21:10", location:"Can2"},
				{title: "Regular medicine", date: "2014/10/02", time: "22:10", location:"Home"}
			];
			$rootScope.reminders = reminders;
			$rootScope.reminders.sort(function (a, b) {
				if ((a.date+a.time) >= (b.date+b.time)) {
					return 1;
				}
				else {
					return -1;
				}
			})
//			alert(JSON.stringify($rootScope.reminders));
		}

		if (!$rootScope.appointments) {
			var appointments = [
				{title: "Medical Check", date: "2014/10/01", time: "12:10", location:"NUH"},
				{title: "Medical Consultation", date: "2014/10/02", time: "16:10", location:"NUH"},
				{title: "Health Consultation", date: "2014/10/01", time: "21:10", location:"Home"}
			];
			$rootScope.appointments = appointments;
			$rootScope.appointments.sort(function (a, b) {
				if ((a.date+a.time) >= (b.date+b.time)) {
					return 1;
				}
				else {
					return -1;
				}
			})
		}

		if (!$rootScope.doctorEmails) {
			var doctors = [
				{email: "chen0819@e.ntu.edu.sg", name: "Chen Wenjie", office:"NTU"},
				{email: "chen0729@e.ntu.edu.sg", name: "Xiao Qianru", office:"NTU"},
				{email: "chen0739@e.ntu.edu.sg", name: "Zeng Ye", office:"NTU"},
				{email: "chen0749@e.ntu.edu.sg", name: "Li Pengfei", office:"NTU"},
				{email: "chen0859@e.ntu.edu.sg", name: "Gong Wenchen", office:"NTU"},
				{email: "che0869@e.ntu.edu.sg", name: "Li Yifei", office:"NTU"},
				{email: "chen0889@e.ntu.edu.sg", name: "Shen Zhiqi", office:"NTU"},
				{email: "chen0879@e.ntu.edu.sg", name: "Chai Wenzhang", office:"NTU"}
			];
			$rootScope.doctors = doctors;
		}





//		alert(new Date(Date.parse("2014/01/01 14:10")));

	})

	.controller('todayCtrl', function ($state, $scope) {
		$scope.weather = function () {
			return "24-30°C";
		}
	})

	.controller('tomorrowCtrl', function ($state, $scope) {
		$scope.weather = function () {
			return "22-32°C";
		}
	})

	.controller('doctorCtrl', function ($state) {
		console.log('doctorCtrl');
	})

	.controller('healthCtrl', function ($state) {
		console.log('healthCtrl');
	})

	.controller('reminderCtrl', function ($state, $rootScope, $scope, $ionicModal) {
		console.log('reminderCtrl');
		$scope.showDelete = false;
		$scope.onItemDelete = function(item) {
			$rootScope.reminders.splice($rootScope.reminders.indexOf(item), 1);
		};

		$ionicModal.fromTemplateUrl('new-reminder.html', function(modal) {
			$scope.newReminderModal = modal;
		}, {
			scope: $scope
		});

		$ionicModal.fromTemplateUrl('edit-reminder.html', function(modal) {
			$scope.editReminderModal = modal;
		}, {
			scope: $scope
		});

		$scope.createReminder = function(reminder) {
			if (!reminder) {
				return;
			}
			$rootScope.reminders.push({
				title: reminder.title,
				date: reminder.date,
				time: reminder.time,
				location: reminder.location
			});

			$rootScope.reminders.sort(function (a, b) {
				if ((a.date+a.time) >= (b.date+b.time)) {
					return 1;
				}
				else {
					return -1;
				}
			});
			$scope.newReminderModal.hide();
			reminder.title = "";
			reminder.date = "";
			reminder.time = "";
			reminder.location = "";
		};

		$scope.showNewModal = function() {
			$scope.newReminderModal.show();
		};

		$scope.closeNewModal = function() {
			$scope.newReminderModal.hide();
		};

		$scope.showEditModal = function(selected) {
//			alert(typeof(selected));
//			var reminder = $scope.reminders[selected];
			$scope.editReminder = $scope.reminders[selected];
			$scope.editIndex = selected;
			$scope.editReminderModal.show();
		};

		$scope.closeEditModal = function() {
			var index = $scope.editIndex;
			$scope.editReminderModal.hide();
			$scope.reminders[index] = $scope.editReminder;
			$rootScope.reminders.sort(function (a, b) {
				if ((a.date+a.time) >= (b.date+b.time)) {
					return 1;
				}
				else {
					return -1;
				}
			})
		};



	})

	.controller('appointmentCtrl', function ($state, $scope, $rootScope, $ionicModal) {
		console.log('appointmentCtrl');
		$scope.showDelete = false;
		$scope.onItemDelete = function(item) {
			$rootScope.appointments.splice($rootScope.appointments.indexOf(item), 1);
		};

		$ionicModal.fromTemplateUrl('new-appointment.html', function(modal) {
			$scope.newAppointmentModal = modal;
		}, {
			scope: $scope
		});

		$scope.createAppointment = function(appointment) {
			if (!appointment) {
				return;
			};
			$rootScope.appointments.push({
				title: appointment.title,
				date: appointment.date,
				time: appointment.time,
				location: appointment.location
			});

			$rootScope.appointments.sort(function (a, b) {
				if ((a.date+a.time) >= (b.date+b.time)) {
					return 1;
				}
				else {
					return -1;
				}
			});
			$scope.newAppointmentModal.hide();
			appointment.title = "";
			appointment.date = "";
			appointment.time = "";
			appointment.location = "";
		};

		$scope.showNewModal = function() {
			$scope.newAppointmentModal.show();
		};

		$scope.closeNewModal = function() {
			$scope.newAppointmentModal.hide();
		};

//		$scope.showEditModal = function(selected) {
////			alert(typeof(selected));
////			var reminder = $scope.reminders[selected];
//			$scope.editReminder = $scope.reminders[selected];
//			$scope.editIndex = selected;
//			$scope.editReminderModal.show();
//		};

//		$scope.closeEditModal = function() {
//			var index = $scope.editIndex;
//			$scope.editReminderModal.hide();
//			$scope.reminders[index] = $scope.editReminder;
//			$rootScope.reminders.sort(function (a, b) {
//				if ((a.date+a.time) >= (b.date+b.time)) {
//					return 1;
//				}
//				else {
//					return -1;
//				}
//			})
//		};
	})

	.controller('settingCtrl', function ($state, $scope) {
		console.log('settingCtrl');
		$scope.go = function () {
			$state.go('about');
		}
	})

	.controller('aboutCtrl', function ($state, $scope) {
		console.log('aboutCtrl');
		$scope.password = "";
//		$scope.password = function () {
//			return $scope.pd;
//		}
		$scope.getPassword = function () {

			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for( var i=0; i < 10; i++ )
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			$scope.password = text;

		}
	})

	.controller('searchCtrl', function ($state, $scope) {
		console.log('searchCtrl');
		$scope.go = function () {
			$state.go('view-doctor');
		}
	})

