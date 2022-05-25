// Function for searching by course
window.addEventListener("load", () => {
    const secReq = {
        method: 'GET'
    }

    let data = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/getcourses";

    fetch(url, secReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.map((item) => {
            data += `
            <option value="${item.name}">${item.name}</option>
            `
            const newMe = document.querySelector(".letcourse");
            newMe.innerHTML = data;
        })
    })
    .catch(error => console.log('error', error));
})

// funtion to show courses for interest
function courses2() {
    const courReq = {
        method: 'GET'
    };

    let courData = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/getcourses";
    fetch(url, courReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        localStorage.setItem("getCourse", JSON.stringify(result));
        // const courseNew = localStorage.getItem("getCourse");
        // const secCourse = JSON.parse(courseNew);
        result.map((item)=> {
            courData += `
            <option value="${item.name}">${item.name}</option>
            `
        })
        const theCourse = document.querySelector(".letcourse2");
        theCourse.innerHTML = courData;
    })
    .catch(error => console.log('error', error));
}
courses2();

//Function for getting courses
function getCourses() {
    const getRequest = {
        method: 'GET'
    };

    let dataItem = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/getcourses";
    fetch(url, getRequest)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        localStorage.setItem("getCourse", JSON.stringify(result));
        // const courseNew = localStorage.getItem("getCourse");
        // const secCourse = JSON.parse(courseNew);
        result.map((item)=> {
            dataItem += `
            <option value="${item.name}">${item.name}</option>
            `
        })
        const theCourse = document.querySelector(".course");
        theCourse.innerHTML = dataItem;
    })
    .catch(error => console.log('error', error));
}

getCourses();



// function get the course and update it
function getCourseDisplay() {
    const getDisplay = {
        method: 'GET'
    };

    let createData = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/getcourses";
    fetch(url, getDisplay)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.map((item) => {
            createData += `
              <div class="search-card">
                <h3>${item.name}</h3>
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6"> 
                       <p>Course Fee: </p>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <p>₦${item.course_fee}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6"> 
                       <p>Part Payment: </p>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <p>₦${item.part_payment}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6"> 
                       <p>Initial Payment: </p>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <p>₦${item.fee_to_pay}</p>
                    </div>
                </div>
                <center>
                   <button class="upd-btn" onclick="openCourseModal(${item.id})">Update course</button>
                   <button class="del-btn del" onclick="deleteCourse(${item.id})">Close Cohort</button>
                </center>
              </div>
            `
            const theDisplay = document.querySelector(".scroll-object")
            theDisplay.innerHTML = createData;
        })
    })
    .catch(error => console.log('error', error));
}
getCourseDisplay();

// function to get advisory
function getAdvisory() {
    const adReq = {
        method: 'GET'
    };

    let adData = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/get_advisory";
    fetch(url, adReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.map((item) => {
            adData += `
             <tr>
               <td>${item.name}</td>
               <td>${item.email}</td>
               <td>${item.phone_number}</td>
               <td>${item.course_interested_in}</td>
               <td><button class="upd-btn" onclick="openAdModal(${item.id})">View me</button></td>
             </tr>
            `
            const myTable = document.querySelector(".table-id");
            myTable.innerHTML = adData;
        })
    })
    .catch(error => console.log('error', error));
}
getAdvisory();

// function to open update modal for course info
let idCourse;
function openCourseModal(courseId) {
    const getModal = document.getElementById("my-modal");
    getModal.style.display = "block";
    idCourse = courseId;
    console.log(idCourse);
}

function closeModal3() {
    const getModal = document.getElementById("my-modal");
    getModal.style.display = "none";
}

// function to update course by passing course id
function updateTheCourse(event) {
    event.preventDefault();

    const upName = document.querySelector(".courseUpName").value;
    const upFee = document.querySelector(".courseUpFee").value;
    const upPart = document.querySelector(".courseUpPart").value;
    const upPercent = document.querySelector(".courseUpPercent").value;

    if (upName === "" || upFee === "" || upPart === "" || upPercent === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required',
            confirmButtonColor: '#25067C'
        });
    }

    else {
        const courseUpdate = localStorage.getItem("adminLogin");
        const courseUp = JSON.parse(courseUpdate);
        const courseUpToken = courseUp.token;

        const result = parseFloat(upPercent) / 100.0;
        console.log(result);

        const tokCourse = new Headers();
        tokCourse.append("Authorization", `Bearer ${courseUpToken}`);

        const tokForm = new FormData();
        tokForm.append("course_name", upName);
        tokForm.append("course_fee", upFee);
        tokForm.append("course_partpayment", upPart);
        tokForm.append("percentages", result);
        tokForm.append("id", idCourse);

        const updateCourse = {
            method: 'POST',
            headers: tokCourse,
            body: tokForm
        };

        const buttonDisplay = document.querySelector(".button_cryst");
        buttonDisplay.innerHTML = "updating....";

        const url = "https://pluralcode.academy/pluralcode_payments/api/admin/update_courses";

        fetch(url, updateCourse)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })
            }
            setTimeout(()=> {
                location.reload();
            }, 5000);
        })
        .catch(error => console.log('error', error));
    }
}

// function to delete course
function deleteCourse(delId) {
    const deleteGet = localStorage.getItem("adminLogin");
    const delGet = JSON.parse(deleteGet);
    const delTok = delGet.token;

    const delHead = new Headers();
    delHead.append("Authorization", `Bearer ${delTok}`);

    let removeCourse = document.querySelector(".del");
    removeCourse.innerHTML = "Deleting item";

    const delReq = {
        method: 'GET',
        headers: delHead
    };

    const url = `https://pluralcode.academy/pluralcode_payments/api/admin/delete_course/` + `${delId}`;
    fetch(url, delReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.status === "success") {
            Swal.fire({
                icon: 'success',
                text:  `${result.message}`,
                confirmButtonColor: '#25067C'
            })
        }
        setTimeout(()=> {
            location.reload();
        }, 5000);
    })
    .catch(error => console.log('error', error));
}

// Function to display hidden Input Field
const myForm = document.getElementById("payForm");
function showText(event) {
    if (event.currentTarget.value === "Part_Payment") {
        myForm.style.display = "block";
    }else if (event.currentTarget.value === "full-payment") {
        myForm.style.display = "block";
    }
    

    const myCourse = document.querySelector(".course").value;
    const myPay = document.querySelector(".payChoice").value;
    console.log(myCourse, myPay);
    const viewForm = new FormData();
    viewForm.append("course", myCourse);
    viewForm.append("payment_plan", myPay);

    const view = {
        method: 'POST',
        body: viewForm
    };

    let note = document.querySelector(".note");
    let Btn = document.querySelector(".Btn_Text");

    const url = "https://pluralcode.academy/pluralcode_payments/api/getcourses_fees";
    fetch(url, view)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.part_payment) {
          note.innerHTML = `Total tuition: ₦` + `${result.part_payment.slice(0, -3)}K, Amount due today: ${result.fee_to_pay.slice(0, -3)}K. Kindly note that the final installment of your tuition will be due exactly 4 weeks from the start of your program.`;
          Btn.innerHTML = `Pay ₦` + `${result.part_payment.slice(0, -3)}K`+ ` Now`;
        }else {
           note.textContent = `kindly note that the full payment for this course is ₦` + `${result.course_fee.slice(0, -3)}K`;
           Btn.innerHTML = `Pay ₦` + `${result.course_fee.slice(0, -3)}K` + ` Now`;
        }
    })
    .catch(error => console.log('error', error));
    
}

// Function to display the other form for highest level of education
const myOther = document.getElementById("otherForm");
function showOtherForm(event) {
    if (event.currentTarget.value === "Other") {
        myOther.style.display = "block";
    }
    else {
        myOther.style.display = "none";
    }
}

let myAmount;

// Function for Either Full Payment Or Partial Payment
function getEitherPayment(event) {
    event.preventDefault();
    const Fname = document.querySelector(".Fname").value;
    const Lname = document.querySelector(".Lname").value;
    const email = document.querySelector(".email").value;
    const mode = document.querySelector(".mode").value;
    const phoneNum = document.querySelector(".phone").value;
    const address = document.querySelector(".address").value;
    const state = document.querySelector(".state").value;
    const academic = document.querySelector(".Academic").value;
    const course = document.querySelector(".course").value;
    const payChoice = document.querySelector(".payChoice").value;
    const payMethod = document.querySelector(".payMethod").value;
    const check = document.querySelector(".check");


    if(Fname === "" || Lname === "" || email === "" || mode === "" || phoneNum === "" || address === "" || state === "" || academic === "" || course === "" || payChoice === "" ||  payMethod === "") {
        Swal.fire({
            icon: 'info',
            text:'Please Enter all Fields',
            confirmButtonColor: '#25067C'
        });
    }
   else if(!check.checked) {
        Swal.fire({
            icon: 'info',
            text:'Must Agree to Students Policy',
            confirmButtonColor: '#25067C'
        });
    }
    // else if (payChoice === "part-payment"){
    //     const note = document.querySelector(".note");
    //     const getTheItem = localStorage.getItem("getCourse");
    //     const secgetTheItem = JSON.parse(getTheItem);
        
    //     secgetTheItem.map((item) => {
    //         note.innerHTML = `kindly note that the part payment for this course is ₦` + `${item.part_payment}`;
    //     })
    // }
    // else if (inputAmount) {
    //     const partialData = new FormData();
    //     partialData.append("first_name", Fname);
    //     partialData.append("last_name", Lname);
    //     partialData.append("email", email);
    //     partialData.append("mode_of_learning", mode);
    //     partialData.append("course_of_interest", course);
    //     partialData.append("type", "enrollment");
    //     partialData.append("mode_of_payment", payMethod);

    //     const partialRequest = {
    //         method:'POST',
    //         body: partialData
    //     };

    //     const url = "https://pluralcode.academy/pluralcode_payments/api/payments";
    //     fetch(url, partialRequest)
    //     .then(response => response.json())
    //     .then(result => {
    //         console.log(result)
    //         localStorage.setItem("dataItems", JSON.stringify(result));
    //         const getTheData = localStorage.getItem("dataItems");
    //         const theItem = JSON.parse(getTheData);
    //         if(theItem.payment_mode === "card") {
    //             window.location.href = "card.html";
    //         }else {
    //             window.location.href = "Bank_Transfer.html";
    //         }
    //     })
    //     .catch(error => console.log('error', error));

    // }
    else {
        const partialData = new FormData();
        partialData.append("first_name", Fname);
        partialData.append("last_name", Lname);
        partialData.append("email", email);
        partialData.append("mode_of_learning", mode);
        partialData.append("course_of_interest", course);
        partialData.append("type", "enrollment");
        partialData.append("level_of_education", academic);
        partialData.append("payment_choice", payChoice);
        partialData.append("state_of_residence", state);
        partialData.append("phone_number", phoneNum);
        partialData.append("address", address);
        partialData.append("mode_of_payment", payMethod);

        const fullRequest = {
            method: 'POST',
            body: partialData
        };

        const url = "https://pluralcode.academy/pluralcode_payments/api/payments";
        fetch(url, fullRequest)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("dataItems", JSON.stringify(result));
            const getTheData = localStorage.getItem("dataItems");
            const theData = JSON.parse(getTheData);
            if(theData.payment_mode === "card") {
                window.location.href = "card.html";
            }else {
                window.location.href = "Bank_Transfer.html";
            }
        })
        .catch(error => console.log('error', error));
    }
}


function ChangePrice() {
    const Pay_k = document.querySelector(".pay_k");
    const newVar = localStorage.getItem("dataItems");
    const anotherVar = JSON.parse(newVar);
    const myVar = anotherVar.amount_to_pay.toString();
    const myNewVar = myVar.slice(0, -3);
    Pay_k.innerHTML = myNewVar + "K";
}

ChangePrice();

function CourseName() {
    const courseName = document.querySelector(".theCourse");
    const courseVar = localStorage.getItem("dataItems");
    const courseSecVar = JSON.parse(courseVar);
    const myCourseName = courseSecVar.course_name;
    courseName.innerHTML = myCourseName + ":";
}

CourseName();


function CoursePrice() {
    const courseFee = document.querySelector(".theCourseFee");
    const courseFeeVar = localStorage.getItem("dataItems");
    const courseFeeSecVar = JSON.parse(courseFeeVar);
    const myCourseFee = courseFeeSecVar.course_fee;
    const sliceCourseFee = myCourseFee.slice(0, -3);
    courseFee.innerHTML = sliceCourseFee + "K";
}

CoursePrice();

function BankAcctName() {
    const bankAccountName = document.querySelector(".bankAcctName");
    const bankAccountNameVar = localStorage.getItem("dataItems");
    const bankAccountNameSecVar = JSON.parse(bankAccountNameVar);
    const myBankAccountName = bankAccountNameSecVar.bank_account_name;
    bankAccountName.innerHTML = myBankAccountName;
}

BankAcctName();

function BankAcctNumber() {
    const bankAccountNum = document.querySelector(".bankAcctNum");
    const bankAccountNumVar = localStorage.getItem("dataItems");
    const bankAccountNumSecVar = JSON.parse(bankAccountNumVar);
    const myBankAccountNum = bankAccountNumSecVar.bank_account_number;
    bankAccountNum.innerHTML = myBankAccountNum;
}

BankAcctNumber();

function BankName() {
    const bankName = document.querySelector(".bankName");
    const bankNameVar = localStorage.getItem("dataItems");
    const bankNameSecVar = JSON.parse(bankNameVar);
    const myBankName = bankNameSecVar.bank_name;
    bankName.innerHTML = myBankName;
}

BankName();
// Function to access paysatck through Card button
function getPayStack() {
    const getLink = localStorage.getItem("dataItems");
    const getTheLink = JSON.parse(getLink);
    const theLink = getTheLink.payment_link;
    window.location.href = `${theLink}`;
}

// Function to access paysatck through Bank button
function payBank() {
    const getLink = localStorage.getItem("dataItems");
    const getTheLink = JSON.parse(getLink);
    const theLink = getTheLink.payment_link;
    
    window.location.href = `${theLink}`;
}

// Payment Page to balance payment
function balancePay(event) {
    event.preventDefault();
    const email = document.querySelector(".email").value;
    const amount = document.querySelector(".amount").value;
    const myCourse = document.querySelector(".course").value;
    const payMethod = document.querySelector(".payMethod").value;

    console.log(email);


    if(email === "" || amount === "") {

        Swal.fire({
            icon: 'info',
            text:'Please Enter all Fields',
            confirmButtonColor: '#25067C'
        });
    }
    else{
        const partialData = new FormData();
        partialData.append("email", email);
        partialData.append("course_to_payfor", myCourse);
        partialData.append("type", "payment_form");
        partialData.append("inputed_amount_to_pay", amount);
        partialData.append("mode_of_payment", payMethod);

        const partialRequest = {
            method:'POST',
            body: partialData
        };

        const url = "https://pluralcode.academy/pluralcode_payments/api/payments";
        fetch(url, partialRequest)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "failed") {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })
            }else {
                localStorage.setItem("dataItems", JSON.stringify(result));
                const getTheData = localStorage.getItem("dataItems");
                const theItem = JSON.parse(getTheData);
                if(theItem.payment_mode === "card") {
                    
                    window.location.href = "card.html";
                }else {
                    window.location.href = "Bank_Transfer.html";
                }
            }
        })
        .catch(error => console.log('error', error));

    }
}


// Function for interest Form
function interestForm(event) {
    event.preventDefault();
    const Fname = document.querySelector(".Fname").value;
    const Lname = document.querySelector(".Lname").value;
    const email = document.querySelector(".email").value;
    const mode = document.querySelector(".mode").value;
    const phoneNum = document.querySelector(".phone").value;
    const address = document.querySelector(".address").value;
    const state = document.querySelector(".state").value;
    const academic = document.querySelector(".Academic").value;
    const course = document.querySelector(".course").value;
    const payMethod = document.querySelector(".payMethod").value;


    if(Fname === "" || Lname === "" || email === "" || phoneNum === "" || address === "" || state === "" || academic === "" || mode === "" || course === ""  ||  payMethod === "") {
        Swal.fire({
            icon: 'info',
            text:'Please Enter all Fields',
            confirmButtonColor: '#25067C'
        });
    }
    else {
        const partialData = new FormData();
        partialData.append("first_name", Fname);
        partialData.append("last_name", Lname);
        partialData.append("email", email);
        partialData.append("mode_of_learning", mode);
        partialData.append("course_of_interest", course);
        partialData.append("type", "interestform");
        partialData.append("level_of_education", academic);
        partialData.append("state_of_residence", state);
        partialData.append("phone_number", phoneNum);
        partialData.append("address", address);
        partialData.append("mode_of_payment", payMethod);

        const partialRequest = {
            method:'POST',
            body: partialData
        };

        const url = "https://pluralcode.academy/pluralcode_payments/api/payments";
        fetch(url, partialRequest)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.status === "failed") {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })
            } else {
                localStorage.setItem("dataItems", JSON.stringify(result));
                const getTheData = localStorage.getItem("dataItems");
                const theItem = JSON.parse(getTheData);
                if(theItem.payment_mode === "card") {
                    window.location.href = "card.html";
                }else {
                    window.location.href = "Bank_Transfer.html";
                }
            }
        })
        .catch(error => console.log('error', error));
    }
}

function myModal() {
    const mymodal = document.getElementById("my-modal");

    mymodal.style.display = "block";
}

function closeModal() {
    const mymodal = document.getElementById("my-modal");

    mymodal.style.display = "none";
}


function outsideClick(event) {
    const mymodal = document.getElementById("my-modal");
    if(event.target == mymodal) {
        mymodal.style.display = "none";
    }
}

// function for admin login
function adminLog(event) {
    event.preventDefault();
    const getEmail = document.getElementById("email").value;
    const getPass = document.getElementById("password").value;

    if (getEmail === "" || getPass === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#25067C'
        })
    }

    else {
        const adminData = new FormData();
        adminData.append("email", getEmail);
        adminData.append("password", getPass);

        const loginBtn = document.querySelector(".adminBtn");
        loginBtn.innerHTML = "Retriving Details...";

        const adminRequest = {
            method: 'POST',
            body: adminData
        };

        const url = "https://pluralcode.academy/pluralcode_payments/api/admin_login";

        fetch(url, adminRequest)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.hasOwnProperty("email")) {
                localStorage.setItem("adminLogin", JSON.stringify(result));
                window.location.href = "dashboard.html";
            }else {
                Swal.fire({
                    icon: 'warning',
                    text: 'login unsuccessful',
                    confirmButtonColor: '#25067C'
                })
            }
        })
        .catch(error => console.log('error', error));
    }
}



// function to display enrolled students
function getEnrolled() {
    const getToken = localStorage.getItem("adminLogin");
    const theToken = JSON.parse(getToken);
    const token = theToken.token;

    const inter = document.querySelector(".dash");
    const adv = document.querySelector(".secondTable");
    const enr = document.querySelector(".firstTable");
    const t2 = document.querySelector(".tableThird");
    t2.style.display = "none";
    adv.style.display = "none";
    enr.style.display = "block";
    inter.innerHTML = "Enrolled Students";
    const tTwo = document.querySelector(".t2");
    tTwo.style.display = "none";
    const tOne = document.querySelector(".t1");
    tOne.style.display = "block";

    const getHeader = new Headers();
    getHeader.append("Authorization", `Bearer ${token}`);

    const enrolledRequest = {
        method: 'GET',
        headers: getHeader
    };

    let dataItem = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/enrolled_students";
    
    fetch(url, enrolledRequest)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.map((item) => {
            if (item.payment_status === "complete") {
                dataItem += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td><button class="upd-btn" onclick="viewEnrolled(${item.id})">View me</button></td>
                    <td><button disabled class=${item.payment_status}>${item.payment_status}</button></td>
                </tr>
               `
            }
            else {
                dataItem += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td><button class="upd-btn" onclick="viewEnrolled(${item.id})">View me</button></td>
                    <td><button class=${item.payment_status} onclick="changeStatus(${item.id})">${item.payment_status}</button></td>
                </tr>
               `
            }
            const tableInfo = document.querySelector(".tableData");
            tableInfo.innerHTML = dataItem;
        })
    })
    .catch(error => console.log('error', error));
}

// function to view enrolled
function viewEnrolled(enId) {
    const viewLogin = localStorage.getItem("adminLogin");
    const view = JSON.parse(viewLogin);
    const view2 = view.token;

    const myModal = document.getElementById("my-modal2");
    myModal.style.display = "block";

    const viewHead = new Headers();
    viewHead.append("Authorization", `Bearer ${view2}`);

    const viewReq = {
        method: 'GET',
        headers: viewHead
    };

    viewData = [];

    const url = `https://pluralcode.academy/pluralcode_payments/api/admin/enrolled_students?id=` + `${enId}`;
    fetch(url, viewReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const info = document.querySelector(".modal-body2");
        if (result.length === 0) {
            info.innerHTML = "No Records found";
        }
        else {
            result.map((item) => {
                viewData += `
                 <div class="row">
                   <div class="col-sm-12 col-md-6 col-lg-6">
                     <p>Amount Paid:</p>
                   </div>
                   <div class="col-sm-12 col-md-6 col-lg-6">
                     <p>${item.amount_paid}</p>
                   </div>
                   <div class="col-sm-12 col-md-6 col-lg-6">
                     <p>Mode of Payment:</p>
                   </div>
                   <div class="col-sm-12 col-md-6 col-lg-6">
                     <p>${item.mode_of_payment}</p>
                   </div>
                   <div class="col-sm-12 col-md-6 col-lg-6">
                     <p>Date:</p>
                   </div>
                   <div class="col-sm-12 col-md-6 col-lg-6">
                     <p>${item.date}</p>
                   </div>
                   <div class="col-sm-12 col-md-6 col-lg-6">
                     <p>Time:</p>
                   </div>
                   <div class="col-sm-12 col-md-6 col-lg-6">
                     <p>${item.time}</p>
                   </div>
                   <div class="col-sm-12 col-md-6 col-lg-6">
                     <p>Reference:</p>
                   </div>
                   <div class="col-sm-12 col-md-6 col-lg-6">
                     <p>${item.reference}</p>
                   </div>
                 </div>
                `
                info.innerHTML = viewData;
            })
        }
    })
    .catch(error => console.log('error', error));
}


function closeModal4() {
    const getModal = document.getElementById("my-modal2");
    getModal.style.display = "none";
}


// function to display interested student
function getInterest() {
    const getToken = localStorage.getItem("adminLogin");
    const theToken = JSON.parse(getToken);
    const token = theToken.token;

    const inter = document.querySelector(".dash");
    inter.innerHTML = "Interested Prospects";

    const fTable = document.querySelector(".firstTable");
    fTable.style.display = "none";
    const sTable = document.querySelector(".secondTable");
    sTable.style.display = "none";
    const t2 = document.querySelector(".tableThird");
    t2.style.display = "block";
    const tTwo = document.querySelector(".t2");
    tTwo.style.display = "block";
    const tOne = document.querySelector(".t1");
    tOne.style.display = "none";

    const getHeader = new Headers();
    getHeader.append("Authorization", `Bearer ${token}`);

    const enrolledRequest = {
        method: 'GET',
        headers: getHeader
    };

    let dataItem = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/interested_students";
    
    fetch(url, enrolledRequest)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.map((item) => {
            dataItem += `
                 <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.amount_paid}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                 </tr>
            `
            const tableInfo = document.querySelector(".tableInterest");
            tableInfo.innerHTML = dataItem;
        })
    })
    .catch(error => console.log('error', error));
}

// Function to search by Name
function searchName(event) {
    event.preventDefault();

    const nameSearch = document.querySelector(".nsearch").value;
    if (nameSearch === "") {
        Swal.fire({
            icon: 'info',
            text: 'please enter a search value!',
            confirmButtonColor: '#25067C'
        })
    }

    else {
        const myToken = localStorage.getItem("adminLogin");
        const theToken = JSON.parse(myToken);
        const token = theToken.token;

        const nameHeader = new Headers();
        nameHeader.append("Authorization", `Bearer ${token}`);

        const nameRequest = {
            method: 'GET',
            headers: nameHeader
        };

        let nameData = [];

        const url = `https://pluralcode.academy/pluralcode_payments/api/admin/enrolled_students?name=` + `${nameSearch}`;
        fetch(url, nameRequest)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            const tableInfo = document.querySelector(".tableData");
            if (result.length === 0) {
                tableInfo.innerHTML = `
                  <h2 class="text-center">No Records found on this name</h2>
                `
            }
            else {
                result.map((item) => {
                    nameData += `
                        <tr>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.phone_number}</td>
                        <td>${item.mode_of_learning}</td>
                        <td>${item.course_of_interest}</td>
                        <td>${item.mode_of_payment}</td>
                        <td>${item.date}</td>
                        <td>${item.time}</td>
                        <td>${item.address}</td>
                        <td>${item.state_of_residence}</td>
                        <td>${item.level_of_education}</td>
                        <td>${item.payment_status}</td>
                    </tr>
                    `
                    tableInfo.innerHTML = nameData;
                })
            }
        })
        .catch(error => console.log('error', error));
    }
}

// Function to search by Name
function searchName2(event) {
    event.preventDefault();

    const nameSearch = document.querySelector(".nsearch2").value;
    if (nameSearch === "") {
        Swal.fire({
            icon: 'info',
            text: 'please enter a search value!',
            confirmButtonColor: '#25067C'
        })
    }

    else {
        const myToken = localStorage.getItem("adminLogin");
        const theToken = JSON.parse(myToken);
        const token = theToken.token;

        const nameHeader = new Headers();
        nameHeader.append("Authorization", `Bearer ${token}`);

        const nameRequest = {
            method: 'GET',
            headers: nameHeader
        };

        let nameData = [];

        const url = `https://pluralcode.academy/pluralcode_payments/api/admin/enrolled_students?name=` + `${nameSearch}`;
        fetch(url, nameRequest)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            const tableInfo = document.querySelector(".tableInterest");
            if (result.length === 0) {
                tableInfo.innerHTML = `
                  <h2 class="text-center">No Records found on this name</h2>
                `
            }
            else {
                result.map((item) => {
                    nameData += `
                        <tr>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.phone_number}</td>
                        <td>${item.mode_of_learning}</td>
                        <td>${item.course_of_interest}</td>
                        <td>${item.mode_of_payment}</td>
                        <td>${item.date}</td>
                        <td>${item.time}</td>
                        <td>${item.address}</td>
                        <td>${item.state_of_residence}</td>
                        <td>${item.level_of_education}</td>
                        <td>${item.payment_status}</td>
                    </tr>
                    `
                    tableInfo.innerHTML = nameData;
                })
            }
        })
        .catch(error => console.log('error', error));
    }
}




// Function to get course 
function getTypeCourse(event) {
    const courseName = event.currentTarget.value;
    const dataTok = localStorage.getItem("adminLogin");
    const theData = JSON.parse(dataTok);
    const tokenData = theData.token;

    const dataHeader = new Headers();
    dataHeader.append("Authorization", `Bearer ${tokenData}`);

    const dataReq = {
        method: 'GET',
        headers: dataHeader
    };

    let courseData = [];

    const url = `https://pluralcode.academy/pluralcode_payments/api/admin/enrolled_students?course=` + `${courseName}`;

    fetch(url, dataReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const tableInfo = document.querySelector(".tableData");
        if (result.length === 0) {
            tableInfo.innerHTML = `
               <h2 class="text-center">No Records found on this course</h2>
            `
        }
        else {
            result.map((item) => {
                courseData += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td>${item.payment_status}</td>
                </tr>
                `
                tableInfo.innerHTML = courseData;
            })
        }
    })
    .catch(error => console.log('error', error));
}

// Function to get course 
function getTypeCourse2(event) {
    const courseName = event.currentTarget.value;
    const dataTok = localStorage.getItem("adminLogin");
    const theData = JSON.parse(dataTok);
    const tokenData = theData.token;

    const dataHeader = new Headers();
    dataHeader.append("Authorization", `Bearer ${tokenData}`);

    const dataReq = {
        method: 'GET',
        headers: dataHeader
    };

    let courseData = [];

    const url = `https://pluralcode.academy/pluralcode_payments/api/admin/enrolled_students?course=` + `${courseName}`;

    fetch(url, dataReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const tableInfo = document.querySelector(".tableInterest");
        if (result.length === 0) {
            tableInfo.innerHTML = `
               <h2 class="text-center">No Records found on this course</h2>
            `
        }
        else {
            result.map((item) => {
                courseData += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td>${item.payment_status}</td>
                </tr>
                `
                tableInfo.innerHTML = courseData;
            })
        }
    })
    .catch(error => console.log('error', error));
}

// function to search by date
function searchDate(event) {
    const dateTok = localStorage.getItem("adminLogin");
    const dk = JSON.parse(dateTok);
    const dateToken = dk.token;

    const myInput = event.target.value;

    const dateHeader = new Headers();
    dateHeader.append("Authorization", `Bearer ${dateToken}`);

    const dateReq = {
        method: 'GET',
        headers: dateHeader
    };

    let dateData = [];

    const url = `https://pluralcode.academy/pluralcode_payments/api/admin/enrolled_students?date_search=` + `${myInput}`;

    fetch(url, dateReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const tableInfo = document.querySelector(".tableData");
        if (result.length === 0) {
            tableInfo.innerHTML = `
               <h2 class="text-center">No Records found on this date</h2>
            `
        }
        else {
            result.map((item) => {
                dateData += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td>${item.payment_status}</td>
                </tr>
                `
                tableInfo.innerHTML = dateData;
    
            })
        }
    })
    .catch(error => console.log('error', error));
}

// function to search by date
function searchDate2(event) {
    const dateTok = localStorage.getItem("adminLogin");
    const dk = JSON.parse(dateTok);
    const dateToken = dk.token;

    const myInput = event.target.value;

    const dateHeader = new Headers();
    dateHeader.append("Authorization", `Bearer ${dateToken}`);

    const dateReq = {
        method: 'GET',
        headers: dateHeader
    };

    let dateData = [];

    const url = `https://pluralcode.academy/pluralcode_payments/api/admin/enrolled_students?date_search=` + `${myInput}`;

    fetch(url, dateReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const tableInfo = document.querySelector(".tableInterest");
        if (result.length === 0) {
            tableInfo.innerHTML = `
               <h2 class="text-center">No Records found on this date</h2>
            `
        }
        else {
            result.map((item) => {
                dateData += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td>${item.payment_status}</td>
                </tr>
                `
                tableInfo.innerHTML = dateData;
    
            })
        }
    })
    .catch(error => console.log('error', error));
}

// function to redirect to admin update page
function upDateDash() {
    window.location.href = "companyDash.html";
}

// function to update admin records and set new one
function upDateRecord(event) {
    event.preventDefault()

    const adminEmail = document.querySelector(".aemail").value;
    const adminPass = document.querySelector(".apass").value;
    const bankName = document.querySelector(".abank").value;
    const accountName = document.querySelector(".abankNa").value;
    const accountNumber = document.querySelector(".adbankN").value;

    if (adminEmail === "" || adminPass === "" || bankName === "" || accountName === "" || accountNumber === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required',
            confirmButtonColor: '#25067C'
        });
    }
    else {
        const updateLog = localStorage.getItem("adminLogin");
        const logValue = JSON.parse(updateLog);
        const upTok = logValue.token;

        const upHead = new Headers();
        upHead.append("Authorization", `Bearer ${upTok}`);

        const upForm = new FormData();
        upForm.append("email", adminEmail);
        upForm.append("password", adminPass);
        upForm.append("bank_name", bankName);
        upForm.append("bank_account_name", accountName);
        upForm.append("bank_account_number", accountNumber);

        const upReq = {
            method: 'POST',
            headers: upHead,
            body: upForm
        };

        const url = "https://pluralcode.academy/pluralcode_payments/api/admin/update_admin";
        fetch(url, upReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.message === "success") {
                Swal.fire({
                    icon: 'success',
                    text: 'Records updated successfully!',
                    confirmButtonColor: '#25067C'
                })
            }
            setTimeout(()=> {
                location.reload();
            }, 5000);
        })
        .catch(error => console.log('error', error));
    }
}

// function to open create course page
function openCreate() {
    window.location.href="create.html";
}

// Function to create course
function createCourse(event) {
    event.preventDefault();

    const cName = document.querySelector(".courseName").value;
    const cFee = document.querySelector(".courseFee").value;
    const cPart = document.querySelector(".coursePart").value;
    const cPercent = document.querySelector(".coursePercent").value;

    if (cName === "" || cFee === "" || cPart === "" || cPercent === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#25067C'
        })
    }

    else {
            
        const courseLog = localStorage.getItem("adminLogin");
        const log = JSON.parse(courseLog);
        const logTok = log.token;

        const result = parseFloat(cPercent) / 100.0;
        const getBtn = document.querySelector(".getBtn");
        getBtn.innerHTML = "creating course...";

        const logHead = new Headers();
        logHead.append("Authorization", `Bearer ${logTok}`);

        const courseForm = new FormData();
        courseForm.append("course_name", cName);
        courseForm.append("course_fee", cFee);
        courseForm.append("course_partpayment", cPart);
        courseForm.append("percentages", result);

        const courseReq = {
            method: 'POST',
            headers: logHead,
            body: courseForm
        }

        const url = "https://pluralcode.academy/pluralcode_payments/api/admin/create_courses";

        fetch(url, courseReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })
            }

            setTimeout(()=> {
                location.reload();
            }, 5000);
        })
        .catch(error => console.log('error', error));
    }

}

// function to open advisory page
function openAdvisory() {
    window.location.href = "advisory.html";
}



// function to open modal and save advisor id
function openAdModal(adId) {
    const admodal = document.querySelector("#my-modal");
    admodal.style.display = "block";

    const openAdReq = {
        method: 'GET'
    };

    let stuData = [];
    
    const url = `https://pluralcode.academy/pluralcode_payments/api/get_advisory_details?id=` + `${adId}`;
    fetch(url, openAdReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        stuData += `
            <div class="row">
              <div class="col-lg-6">
                <p>Name:</p>
              </div>
              <div class="col-lg-6">
                <p>${result.name}</p>
              </div>
              <div class="col-lg-6">
                <p>Phone:</p>
              </div>
              <div class="col-lg-6">
                <p>${result.phone_number}</p>
              </div>
              <div class="col-lg-6">
                <p>Email:</p>
              </div>
              <div class="col-lg-6">
                <p>${result.email}</p>
              </div>
              <div class="col-lg-6">
                <p>Course interested:</p>
              </div>
              <div class="col-lg-6">
                <p>${result.course_interested_in}</p>
              </div>
              <div class="col-lg-6">
                <p>Location:</p>
              </div>
              <div class="col-lg-6">
                <p>${result.location}</p>
              </div>
              <div class="col-lg-6">
                <p>Reason for Decline:</p>
              </div>
              <div class="col-lg-6">
                <p>${result.reason_for_not_workingout}</p>
              </div>
              <div class="col-lg-6">
                <p>Taken any course before:</p>
              </div>
              <div class="col-lg-6">
                <p>${result.taken_any_course_before}</p>
              </div>
              <div class="col-lg-6">
                <p>Mode of learning:</p>
              </div>
              <div class="col-lg-6">
                <p>${result.mode_of_learning}</p>
              </div>
              <div class="col-lg-6">
                <p>Current job:</p>
              </div>
              <div class="col-lg-6">
                <p>${result.current_job}</p>
              </div>
              <div class="col-lg-6">
                <p>Reason for learning:</p>
              </div>
              <div class="col-lg-6">
                <p>${result.reason_for_learning}</p>
              </div>
              <div class="col-lg-6">
                <p>Schedule:</p>
              </div>
              <div class="col-lg-6">
                <p>${result.schedule}</p>
              </div>
            `
            const myBody = document.querySelector(".modal-body");
            myBody.innerHTML = stuData;
    })
    .catch(error => console.log('error', error));
}

// function to show advisory table and hide student table

function showAdvisory() {
    let fTable = document.querySelector(".firstTable");
    fTable.style.display = "none";

    let sTable = document.querySelector(".secondTable");
    sTable.style.display = "block";

    const adDash = document.querySelector(".dash");
    adDash.innerHTML = "Advisory Session";

    const t2 = document.querySelector(".tableThird");
    t2.style.display = "none";
}

// function logout
function logAdminOut(event) {
    event.preventDefault();

    const logDet = localStorage.getItem("adminLogin");
    const delLog = JSON.parse(logDet);
    const delTok = delLog.token;

    const delHeader = new Headers();
    delHeader.append("Authorization", `Bearer ${delTok}`)

    const logReq = {
        method: 'GET',
        headers: delHeader
    };

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/logout";
    fetch(url, logReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)

        if (result.message === "success") {
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#25067C'
            })
        }
        setTimeout(()=> {
            window.location.href = "adminLogin.html";
        }, 5000);
    })
    .catch(error => console.log('error', error));
}
