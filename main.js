// assigning variable
const button = document.getElementById('c_submit');
const name = document.getElementById('c_name');
const c_num = document.getElementById('c_num');
const f_card_num = document.getElementById('card_num')
const f_c_name = document.getElementById('name');
const b_c_cvv = document.getElementById('cvv');
const exp = document.getElementById('exp');
const exp_month = document.getElementById('c_exp_month');
const exp_year = document.getElementById('c_exp_year');
const cvv = document.getElementById('c_cvv');
const default_c_num = f_card_num.innerText;
const default_c_name = f_c_name.innerText;
const default_exp = exp.innerText;
const default_cvv = b_c_cvv.innerText
const err_month = document.getElementById('err_exp');
const err_num = document.getElementById('err_num');
const err_name = document.getElementById('err_name');
const err_cvv = document.getElementById('err_cvv');
const thank_you = document.getElementById('contain');
const form = document.getElementsByTagName('form')[0];
// disable default behavior
button.addEventListener('click', (e) => {
    e.preventDefault();
    let name_data = name.value;
    let num_data = c_num.value;
    let month_data = exp_month.value;
    let year_data = exp_year.value;
    let cvv_data = cvv.value;
    console.log({name_data, num_data, month_data, year_data, cvv_data});
    if (name_data === '' && num_data === '' && month_data === '' && year_data === '' && cvv_data === '') {
        name.style.border = '1px solid hsl(0, 100%, 66%)';
        c_num.style.border = '1px solid hsl(0, 100%, 66%)';
        exp_month.style.border = '1px solid hsl(0, 100%, 66%)';
        exp_year.style.border = '1px solid hsl(0, 100%, 66%)';
        cvv.style.border = '1px solid hsl(0, 100%, 66%)';
        err_name.style.visibility = 'visible';
        err_month.style.visibility = 'visible';
        err_num.style.visibility = 'visible';
        err_cvv.style.visibility = 'visible';
    } else if (name_data === '') {
        name.style.border = '1px solid hsl(0, 100%, 66%)';
        err_name.style.visibility = 'visible';
    } else if (num_data === '') {
        c_num.style.border = '1px solid hsl(0, 100%, 66%)';
        err_num.style.visibility = 'visible';
    } else if (month_data === '' || year_data === '') {
        exp_month.style.border = '1px solid hsl(0, 100%, 66%)';
        exp_year.style.border = '1px solid hsl(0, 100%, 66%)';
        err_month.style.visibility = 'visible';
    } else if (cvv_data === '' && cvv_data.length < 4) {
        cvv.style.border = '1px solid blue';
        err_cvv.style.visibility = 'visible';
        err_cvv.innerText = 'Invalid CVV';
    }
    else if(name_data !== '' && (num_data !== '' && num_data.length===19) && (month_data !== '' && month_data.length===2) && (year_data !== '' && year_data.length===2) && (cvv_data !== '' && cvv_data.length===3)){
        form.style.display = 'none';
        thank_you.style.display = 'flex';
    }
    else {
        name.style.border = '1px solid #ccc';
        c_num.style.border = '1px solid #ccc';
        exp_month.style.border = '1px solid #ccc';
        exp_year.style.border = '1px solid #ccc';
        cvv.style.border = '1px solid #ccc';
        err_name.style.visibility = 'hidden';
        err_month.style.visibility = 'hidden';
        err_num.style.visibility = 'hidden';
        err_cvv.style.visibility = 'hidden';
        thank_you.style.display='none';
    }
})


// only numbers function
function onlyNumberKey(e) {
    // Only ASCII character in that range allowed
    let ASCIICode = (e.which) ? e.which : e.keyCode
    if (ASCIICode===13 || ASCIICode === 9 || ASCIICode === 8 || (ASCIICode >= 48 && ASCIICode <= 57) || (ASCIICode >= 96 && ASCIICode <= 105))
        return true;
    return false;
}

c_num.onkeydown = onlyNumberKey;
exp_month.onkeydown = onlyNumberKey;
exp_year.onkeydown = onlyNumberKey;
cvv.onkeydown = onlyNumberKey;

//change name on card
name.oninput = function () {
    if (name.value.length > 0) {
        f_c_name.innerText = name.value;
        name.style.border = '1px solid #ccc';
        err_name.style.visibility = 'hidden';
    } else {
        f_c_name.innerText = default_c_name;
        name.style.border = '1px solid red';
        err_name.style.visibility = 'visible';
    }
}

// adding num to card and formatting input val
c_num.oninput = function () {
    let val = this.value.split(" ").join("");
    if (val.length > 0) {
        val = val.match(new RegExp('.{1,4}', 'g')).join(" ");
    }
    window.f_c_num = this.value = val;
    if (f_c_num.length > 0 && f_c_num.length < 19) {
        err_num.style.visibility = 'visible';
        c_num.style.border = '1px solid red';
        f_card_num.innerText = f_c_num;
    } else if (f_c_num.length === 0) {
        f_card_num.innerText = default_c_num;
    } else {
        f_card_num.innerText = f_c_num;
        err_num.style.visibility = 'hidden';
        c_num.style.border = '1px solid #ccc';

    }
}


// adding month card
exp_month.oninput = function () {
    if (exp_month.value > 0 && exp_month.value < 13) {
        err_month.style.visibility = 'hidden';
        window.new_month = exp.innerText = exp_month.value;
        exp_month.style.border = '1px solid #ccc';
    } else {
        exp.innerText = default_exp;
        err_month.style.visibility = 'visible';
        err_month.innerText = 'Invalid Expire Date';
        exp_month.style.border = '1px solid red';
    }
}
// adding year
exp_year.oninput = function () {
    let year = new Date().getYear() - 100;
    if (exp_year.value < year || exp_year.value > year + 5) {
        err_month.innerText = 'Invalid Year';
        err_month.style.visibility = 'visible';
        exp_year.style.border = '1px solid red';
    } else {
        err_month.style.visibility = 'hidden';
        exp_year.style.border = '1px solid #ccc';
        window.new_year = exp.innerText = new_month + ' / ' + exp_year.value;

    }
}
//adding cvv to card
cvv.oninput = function () {
    if (cvv.value.length > 0 && cvv.value.length < 4) {
        b_c_cvv.innerText = cvv.value;
        cvv.style.border = '1px solid #ccc';
        err_cvv.style.visibility = 'hidden';
    } else {
        b_c_cvv.innerText = default_cvv;
        cvv.style.border = '1px solid red';
        err_cvv.style.visibility = 'visible';
    }
}