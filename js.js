const openn = document.querySelector("#open");
const form = document.querySelector("form");
const cansel = document.querySelector("#cansel");
const tbody = document.querySelector("tbody");
const clearbtn = document.querySelector(".clear");

openn.addEventListener("click", () => {
  form.style.zIndex = "5";
});

const close = () => {
  form.style.zIndex = "-1";
};

let students = JSON.parse(localStorage.getItem("key")) || [];
let a;
let usercha = "";
let ozgardi = false;

function addstudent(event) {
  event.preventDefault();
  const ism = event.target[0].value.trim();
  const fam = event.target[1].value.trim();
  const tel = event.target[2].value.trim();

  if (ism === "" || fam === "" || tel === "") {
    showNotification();
    return;
  }

  const obj = {
    ism: ism,
    fam: fam,
    tel: tel,
  };

  if (ozgardi === true) {
    students[usercha] = obj;
    ozgardi = false;
  } else {
    students.push(obj);
  }

  event.target[0].value = "";
  event.target[1].value = "";
  event.target[2].value = "";
  localStorage.setItem("key", JSON.stringify(students));
  close();
  getmapdata();
}

function edit(index) {
  form.style.zIndex = "5";
  loadStudentData(index);
}

function loadStudentData(index) {
  form.style.zIndex = "5";
  a = document.querySelector("form");

  a[0].value = students[index].ism;
  a[1].value = students[index].fam;
  a[2].value = students[index].tel;

  usercha = index;
  ozgardi = true;
}

function deletee(index) {
  students.splice(index, 1);
  getmapdata();
  localStorage.setItem("key", JSON.stringify(students));
}

getmapdata();

function getmapdata() {
  let html = "";

  students.forEach((item, index) => {
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.ism}</td>
        <td>${item.fam}</td>
        <td>${item.tel}</td>
        <td class="action">
          <button onclick="deletee(${index})" class="del">Delete</button>
          <button onclick="edit(${index})" class="edi">Edit</button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
};

clearbtn.addEventListener('click', function(){
  localStorage.clear();
  location.reload();
});


function showNotification() {
    const notification = document.querySelector(".notification");
    notification.style.transform = "translateX(0px)"

    setTimeout(function() {

        notification.style.transform = "translateX(200px)"

    }, 1500);
  }