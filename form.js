const buttonCheckboxMapping = {
    age18checkbox: {
        labelId: "age18checkboxlabel",
        label: "Age 18+",
        checked: false
    },
    age45checkbox: {
        labelId: "age45checkboxlabel",
        label: "Age 45+",
        checked: false
    },
    covishieldcheckbox: {
        labelId: "covishieldcheckboxlabel",
        label: "Covishield",
        checked: false
    },
    covaxincheckbox: {
        labelId: "covaxincheckboxlabel",
        label: "Covaxin",
        checked: false
    },
    sputnikcheckbox: {
        labelId: "sputnikcheckboxlabel",
        label: "Sputnik V",
        checked: false
    },
    freecheckbox: {
        labelId: "freecheckboxlabel",
        label: "Free",
        checked: false
    },
    paidcheckbox: {
        labelId: "paidcheckboxlabel",
        label: "Paid",
        checked: false
    }
}


let mobilenumber = 9730369846;
let state_name = "Maharashtra";
let district_name = "Kolhapur";
let pincode = 416121;
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
let skipdays = 0;

if (isNaN(parseInt(skipdays))) {
    skipdays = 0;
} else {
    skipdays = parseInt(skipdays);
}

let center_prefs = [];
for (let i = 0; i < center_prefs_dirty.length; i++) {
    let t = center_prefs_dirty[i].trim();
    if (t !== "") {
        center_prefs.push(t);
    }
}
if (center_prefs.length === 0) {
    center_prefs = [""];
}

let checked_buttons = [];

const setCheckedButtons = (selected_button_checkbox) => {
    checked_buttons = [];
    for (let i = 0; i < selected_button_checkbox.length; i++) {
        if (buttonCheckboxMapping[selected_button_checkbox[i]]) {
            buttonCheckboxMapping[selected_button_checkbox[i]].checked = true;
            checked_buttons.push(buttonCheckboxMapping[selected_button_checkbox[i]].label)
        }
    }
}

try {
    selected_button_checkbox = JSON.parse(selected_button_checkbox)
    setCheckedButtons(selected_button_checkbox)
} catch (error) {
    console.log('There was an error setting the filter checkboxes')
}

let booking_lower_lim = 1;
booking_lower_lim = parseInt(minavailability);
if (isNaN(booking_lower_lim)) {
    booking_lower_lim = 1;
}

refresh_interval = parseInt(autorefreshinterval);
if (isNaN(refresh_interval)) refresh_interval = 15;

const createInput = (id, style, type, value, className) => {
    let retel = document.createElement("input");
    retel.id = id;
    retel.type = type;
    retel.style = style;
    retel.value = value;
    retel.className = className
    return retel;
}

const createLabel = (id, forid, labelText, style, className = "form-label") => {
    let retel = document.createElement("label");
    retel.id = id;
    retel.setAttribute("for", forid);
    retel.appendChild(document.createTextNode(labelText));
    retel.style = style;
    retel.className = className
    return retel;
}

const createWarningText = (warningtext, style) => {
    let retel = document.createElement('div');
    retel.className = "form-text"
    retel.appendChild(document.createTextNode(warningtext));
    retel.style = style;
    return retel;
}

const createSelectInput = (id, style, value) => {
    let retel = document.createElement("select");
    retel.style = style;
    retel.id = id;
    retel.value = value;
    retel.className = 'form-select';
    return retel;
}

const createSelectOptions = (id, text, value, selected) => {
    let retel = document.createElement("option");
    retel.id = id;
    retel.value = value;
    retel.appendChild(document.createTextNode(text));
    if (selected) retel.selected = true;
    return retel;
}


const wrapInDivWithClassName = (children, className) => {
    let divWrapper = document.createElement('div')
    divWrapper.className = className;
    for (var i = 0; i < children.length; i++) divWrapper.appendChild(children[i])
    return divWrapper;
}

const bindSubmitButtonToSaveInfo = () => {
    let submitbtn = document.getElementById("data-submit");
    submitbtn.addEventListener("click", () => {
        mobilenumber = document.getElementById("data-mob").value;
        state_name = document.getElementById("data-state").value;
        district_name = document.getElementById("data-district").value;
        keeptryingcontinuously = document.getElementById("continuousretry").checked;
        enableAutoRefresh = document.getElementById("enableautorefresh").checked;
        enableautoconfirm = document.getElementById("enableautoconfirm").checked;
        let searchPreftext = document.getElementById("searchpref").value;
        pincode = document.getElementById("pincodeinput").value;
        timeslotind = document.getElementById("timeslotinput").value;
        center_prefs_string = document.getElementById("centerprefinput").value;
        minavailability = document.getElementById("minavailabilityinput").value;
        autorefreshinterval = document.getElementById("autorefreshintervalinput").value;
        skipdays = document.getElementById("skipdaysinput").value;
        selected_button_checkbox = []
        for (const key in buttonCheckboxMapping) {
            let button_checkbox = document.getElementById(key);
            buttonCheckboxMapping[key].checked = button_checkbox.checked;
            if (button_checkbox.checked) {
                selected_button_checkbox.push(key)
            }
        }
        window.localStorage.setItem("mobile", mobilenumber);
        window.localStorage.setItem("state", state_name);
        window.localStorage.setItem("district", district_name);
        window.localStorage.setItem("keeptryingcontinuously", keeptryingcontinuously);
        window.localStorage.setItem("autorefresh", enableAutoRefresh);
        window.localStorage.setItem("searchpref", searchPreftext);
        window.localStorage.setItem("pincode", pincode);
        window.localStorage.setItem("timeslot", timeslotind);
        window.localStorage.setItem("centerprefs", center_prefs_string);
        window.localStorage.setItem("minavailability", minavailability);
        window.localStorage.setItem("autoconfirm", enableautoconfirm);
        window.localStorage.setItem("selectedbuttoncheckboxes", JSON.stringify(selected_button_checkbox))
        window.localStorage.setItem("autorefreshinterval", autorefreshinterval);
        window.localStorage.setItem("skipdays", skipdays);
        window.location.reload();
    })
}

const createModal = () => {
    let wrapperDiv = document.createElement("div");
    wrapperDiv.className = "modal fade";
    wrapperDiv.id = 'form-modal'
    let modal = `
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          
          <div clsss="row">
            <div class="col">
              <h5 class="modal-title">Autofill Input Form</h5>
              <span style="font-size: xx-small;">BY USING THIS CHROME EXTENSION TO BOOK VACCINE SLOTS YOU AGREE TO THE <a href="https://github.com/sushrut111/cowin-automation-extn/wiki/Terms-of-use" target="_blank">TERMS OF SERVICE MENTIONED ON THIS PAGE (Click to view)</a></span>
            </div>
            
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body" id="form-modal-body">
        </div>
        <div><button type=""button id="gouravbutton"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="data-submit" data-bs-dismiss="modal">Save changes</button>
        </div>
      </div>
    </div>
    `
    wrapperDiv.innerHTML = modal;

    document.body.appendChild(wrapperDiv);
}

bindSubmitButtonToSaveInfo();