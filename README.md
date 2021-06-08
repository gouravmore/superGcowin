# superGcowin
How to use?
- Clone this repo https://github.com/gouravmore/superGcowin
- Edit form.js
- Update these following variables as per your preference
````let mobilenumber = _Your_10dig_mobile_number_
let state_name = "_Your_state";
let district_name = "Your_district";
let pincode = _Your_Pincode_;
let allow_multiple = true;
let searchByDistrictFlag = false;
let keeptryingcontinuously = true
let timeslotind = 1;
let enableAutoRefresh = true;
let enableautoconfirm = true;
let minavailability = 1;
let selected_button_checkbox = ["age18checkbox"];
let center_prefs_string = "";
let center_prefs_dirty = center_prefs_string ? center_prefs_string.split(",") : "";
let autorefreshinterval = 30;
let skipdays = 0;```

- Open browser chrome://extensions/
- Turn the "Developer Mode" on.
- Click on the "Load unpacked" and select this cloned repo
- Now this extension is ready to use
- Go to https://selfregistration.cowin.gov.in/ and enter otp - that will get into _Your_10dig_mobile_number_
- As soon as preferred slot is found, it proceeds for booking.
