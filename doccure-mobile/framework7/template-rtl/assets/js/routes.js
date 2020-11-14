var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
    on: {
        pageInit: function (e, page) {
        },
        pageAfterOut: function (e, page) {
          // page has left the view
        },
      }
    },
  {
    path: '/search-doctor/',
    url: './pages/search-doctor.html',
    name: 'search-doctor',
    on: {
        pageInit: function (e, page) {
            // Checkbox Changed
            $$('input[type=radio]').click(function () {
               $$('input[type=radio]:not(:checked)').parent().parent().removeClass("menuitemshow");
               $$('input[type=radio]:checked').parent().parent().addClass("menuitemshow");
            });    
            $$('input[type=checkbox]').change(function(){
                if($$(this).is("input[type=checkbox]:checked")) {
                    $$(this).parent().parent().addClass("menuitemshow");
                } else {
                    $$(this).parent().parent().removeClass("menuitemshow");
                }
            });
            var calendarModal = app.calendar.create({
              inputEl: '#search-calendar-modal',
              openIn: 'customModal',
              header: true,
              footer: true,
          });
        },
        pageAfterOut: function (e, page) {
          // page has left the view
        },
      }
  },
  {
    path: '/appointments/',
    url: './pages/appointments.html',
    name: 'appointments',
  },
  {
    path: '/my-patients/',
    url: './pages/patients-list.html',
    name: 'my-patients',
  },
  {
    path: '/schedule-timings/',
    url: './pages/doctor-schedule-timings.html',
    name: 'schedule-timings',
    on: {
        pageInit: function (e, page) {
          // Checkbox Changed
          $$('input[type=checkbox]').change(function(){
              if($$(this).is("input[type=checkbox]:checked")) {
                  $$(this).parent().closest('.item-content').addClass("menuitemshow");
              } else {
                  $$(this).parent().closest('.item-content').removeClass("menuitemshow");
              }
          });
        },
        pageAfterOut: function (e, page) {
          // page has left the view
        },
      }
  },
  {
      path: '/invoices/',
      url: './pages/invoices.html',
      name: 'invoices',
  },
  {
      path: '/profile-settings/',
      url: './pages/profile-settings.html',
      name: 'profile-settings',
      on: {
        pageInit: function (e, page) {

          // Date Picker
          var calendarModal = app.calendar.create({
            inputEl: '#first-calendar-modal',
            openIn: 'customModal',
            header: true,
            footer: true,
          });
          var calendarModal = app.calendar.create({
            inputEl: '#from-calendar-modal',
            openIn: 'customModal',
            header: true,
            footer: true,
          });
          var calendarModal1 = app.calendar.create({
            inputEl: '#to-calendar-modal',
            openIn: 'customModal',
            header: true,
            footer: true,
          });

          // Multiple images preview in browser
          // var url = window.URL || window.webkitURL; // alternate use
          function readImage(file) {
              var reader = new FileReader();
              var image  = new Image();

              reader.readAsDataURL(file);  
              reader.onload = function(_file) {
              image.src = _file.target.result; // url.createObjectURL(file);
              image.onload = function() {
                  var w = this.width,
                      h = this.height,
                      t = file.type, // ext only: // file.type.split('/')[1],
                      n = file.name,
                      s = ~~(file.size/1024) +'KB';
                  //$('#uploadPreview').append('<img src="' + this.src + '">');
                  $$("#uploadPreview").append("<span>"+'<img src="' + this.src + '">'+'</span>');
              };

              image.onerror= function() {
                  alert('Invalid file type: '+ file.type);
              };      
            };

          }
          $$("#choose").change(function (e) {
              if(this.disabled) {
                return alert('File upload not supported!');
              }

            var F = this.files;
              if (F && F[0]) {
                for (var i = 0; i < F.length; i++) {
                    readImage(F[i]);
                }
              }
          });

          //Clear Input Item list
          function clearfunction() {
            $$('.form-group span.close-icon').on('click', function() {
              $$(this).parent().parent().hide();
            });
          }

          //Append Input Values Service
          $$('.append-btn').on('click', function() {
              const services = $$('#Services').val();
              if (services.length) {
                $$('#profileCard').append('<li><div class="form-group">' + services + '<span class="close-icon"></span></div></li>');
                $$('#data')[0].reset()
              }
              clearfunction();
          });
          $$('.append-btn1').on('click', function() {
              const specialization = $$('#Specialization').val();
              if (specialization.length) {
                $$('#profileCard1').append('<li><div class="form-group">' + specialization + '<span class="close-icon"></span></div></li>');
                $$('#data1')[0].reset()
              }
              clearfunction();
          });

          //Click trash remove div
          function f1() {
            $$('ul li span.trash-icon').on('click', function() {
              $$(this).parent().parent().hide();
            });
          }

          //Append div education
          var education_details = $$('.education-experience form').html();
          $$('.education-experience span.add-btn').on('click', function() {
            $$(".education-experience form").append(education_details);
            f1();
          });

          //Append div work experince
          var work_details = $$('.work-experience form').html();
          $$('.work-experience span.add-btn').on('click', function() {
            $$(".work-experience form").append(work_details);
            f1();
          });

          //Append div Awards
          var awards_details = $$('.awards-experience form').html();
          $$('.awards-experience span.add-btn').on('click', function() {
            $$(".awards-experience form").append(awards_details);
            f1();
          });

          //Append div Membership
          var membership_details = $$('.membership-experience form').html();
          $$('.membership-experience span.add-btn').on('click', function() {
            $$(".membership-experience form").append(membership_details);
            f1();
          });

          //Append div Registration
          var registration_details = $$('.registration-col form').html();
          $$('.registration-col span.add-btn').on('click', function() {
            $$(".registration-col form").append(registration_details);
            f1();
          });
        },
        pageAfterOut: function (e, page) {
          // page has left the view
        },
      }
  },
  {
      path: '/patient-profile-settings/',
      url: './pages/patient-profile-settings.html',
      name: 'patient-profile-settings',
      on: {
        pageInit: function (e, page) {
          var calendarModal = app.calendar.create({
            inputEl: '#from-calendar-modal',
            openIn: 'customModal',
            header: true,
            footer: true,
          });
        },
        pageAfterOut: function (e, page) {
          // page has left the view
        },
      }
  },
  {
      path: '/patients-list/',
      url: './pages/patients-list.html',
      name: 'patients-list',
  },
  {
      path: '/patient-profile/',
      url: './pages/patient-profile.html',
      name: 'patient-profile',
  },
  {
      path: '/social-media/',
      url: './pages/social-media.html',
      name: 'social-media',
  },
  {
      path: '/doctor-dashboard/',
      url: './pages/doctor-dashboard.html',
      name: 'doctor-dashboard',
  },
  {
      path: '/doctor-profile/',
      url: './pages/doctor-profile.html',
      name: 'doctor-profile',
      on: {
        pageInit: function (e, page) {
          // Photo Browser for Location list
          var myPhotoBrowserDark = app.photoBrowser.create({
              photos : [
                  'assets/img/features/feature-01.jpg',
                  'assets/img/features/feature-02.jpg',
                  'assets/img/features/feature-03.jpg',
                  'assets/img/features/feature-04.jpg',
              ],
              theme: 'dark'
          });
          $$('.pb-standalone-dark').on('click', function () {
              myPhotoBrowserDark.open();
          });
        },
        pageAfterOut: function (e, page) {
          // page has left the view
        },
      }
  },
  {
      path: '/patient-date-time/',
      url: './pages/patient-date-time.html',
      name: 'patient-date-time',
  },
  {
      path: '/pages/',
      url: './pages/pages.html',
      name: 'pages',
  },
  {
    path: '/login/',
    url: './pages/login.html',
    name: 'login',
  },
  {
    path: '/favourites/',
    url: './pages/favourites.html',
    name: 'favourites',
  },

  {
    path: '/register/',
    url: './pages/register.html',
    name:'register',
  },
  {
      path: '/forgot-password/',
      url: './pages/forgot-password.html',
      name: 'forgot-password',
  },
  {
      path: '/change-password/',
      url: './pages/change-password.html',
      name: 'change-password',
  },
  {
      path: '/search-doctor/',
      url: './pages/search-doctor.html',
      name: 'search-doctor',
  },
  {
      path: '/chat/',
      url: './pages/chat.html',
      name: 'chat',
      on: {
        pageInit: function (e, page) {
        // create searchbar
        var searchbar = app.searchbar.create({
          el: '.searchbar',
          searchContainer: '.list',
          searchIn: '.item-title',
          on: {
            search(sb, query, previousQuery) {
              console.log(query, previousQuery);
            }
          }
        });
        },
        pageAfterOut: function (e, page) {
          // page has left the view
        },
      }
  },
  {
      path: '/chat-view/',
      url: './pages/chat-view.html',
      name: 'chat-view',
  },
  {
      path: '/invoice-view/',
      url: './pages/invoice-view.html',
      name: 'invoice-view',
  },
  {
      path: '/voice-call/',
      url: './pages/voice-call.html',
      name: 'voice-call',
  },
  {
      path: '/video-call/',
      url: './pages/video-call.html',
      name: 'video-call',
  },
  {
      path: '/notifications/',
      url: './pages/notifications.html',
      name: 'notifications',
  },
  {
      path: '/booking-success/',
      url: './pages/booking-success.html',
      name: 'booking-success',
  },
];