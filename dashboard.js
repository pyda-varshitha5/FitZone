const members = {

    GYM101: {

        name:"Rahul",

        trainer:"John Smith",

        progress:"75%",

        diet:[
            "Breakfast - Oats & Eggs",
            "Lunch - Chicken & Rice",
            "Dinner - Salad & Soup"
        ],

        goal:"Weight Loss",

        bmi:"Normal"

    },

    GYM102: {

        name:"Priya",

        trainer:"David Lee",

        progress:"85%",

        diet:[
            "Breakfast - Fruits & Milk",
            "Lunch - Paneer & Rice",
            "Dinner - Salad"
        ],

        goal:"Muscle Gain",

        bmi:"Underweight"

    }

};

/* Sidebar Sections */

function showSection(sectionId){

    let sections =
    document.querySelectorAll(".section");

    sections.forEach(section => {

        section.classList.remove("active");

    });

    document
    .getElementById(sectionId)
    .classList.add("active");
}

/* Search Progress */

function searchProgress(){

    let gymId =
    document.getElementById("progressId").value;

    let result =
    document.getElementById("progressResult");

    if(members[gymId]){

        result.innerHTML =

        `
        <td>

<span onclick="viewMember('${member.id}')"
style="cursor:pointer;color:#c77dff;">

${member.name}

</span>

</td>

        <p>Progress :
        ${members[gymId].progress}</p>

        <p>Goal :
        ${members[gymId].goal}</p>
        `;

    }

    else{

        result.innerHTML =
        "Member Not Found";

    }

}

/* Search Diet */

function searchDiet(){

    let gymId =
    document.getElementById("dietId").value;

    let result =
    document.getElementById("dietResult");

    if(members[gymId]){

        result.innerHTML =

        `
        <h2>${members[gymId].name}</h2>

        <ul>

        <li>${members[gymId].diet[0]}</li>

        <li>${members[gymId].diet[1]}</li>

        <li>${members[gymId].diet[2]}</li>

        </ul>
        `;

    }

    else{

        result.innerHTML =
        "Member Not Found";

    }

}

/* Search Trainer */

function searchTrainer(){

    let gymId =
    document.getElementById("trainerId").value;

    let result =
    document.getElementById("trainerResult");

    if(members[gymId]){

        result.innerHTML =

        `
        <h2>${members[gymId].name}</h2>

        <p>Assigned Trainer :
        ${members[gymId].trainer}</p>
        `;

    }

    else{

        result.innerHTML =
        "Member Not Found";

    }

}

/* Logout */

function logout(){

    window.location.href =
    "login.html";
}

/* Theme Toggle */

function toggleTheme(){

    document.body
    .classList.toggle("light-theme");

}

/* Clock */

function updateClock(){

    let now = new Date();

    let time =
    now.toLocaleTimeString();

    document
    .getElementById("clock")
    .innerHTML = time;

}

setInterval(updateClock,1000);

/* Counter Animation */

let count = 0;

let counter =
setInterval(() => {

    count++;

    document
    .getElementById("memberCount")
    .innerHTML = count;

    if(count == 320){

        clearInterval(counter);

    }

},10);

/* Add Member */

function addMember(event){

    event.preventDefault();

    let name =
    document.getElementById("memberName").value;

    let id =
    document.getElementById("memberId").value;

    let age =
    document.getElementById("memberAge").value;

    let trainer =
    document.getElementById("memberTrainer").value;

    let plan =
    document.getElementById("memberPlan").value;

    if(name === "" || id === ""){

        alert("Please fill all details");

        return;

    }

    let member = {

        name,
        id,
        age,
        trainer,
        plan

    };

    let members =
    JSON.parse(localStorage.getItem("members"))
    || [];

    members.push(member);

    localStorage.setItem(
        "members",
        JSON.stringify(members)
    );

    displayMembers();

    showToast();

    document
    .querySelector(".register-form")
    .reset();

}

/* Display Members */

function displayMembers(){

    let members =
    JSON.parse(localStorage.getItem("members"))
    || [];

    let table =
    document.getElementById("memberTable");

    table.innerHTML = "";
    if(members.length === 0){

table.innerHTML =

`
<tr>
<td colspan="5">

No Members Registered

</td>
</tr>
`;

return;

}

    members.forEach(member => {

        table.innerHTML +=

        `
        <tr>

        <td>${member.id}</td>

        <td>${member.name}</td>

        <td>${member.trainer}</td>

       <td>Active</td>

<td>

<button onclick="editMember('${member.id}')">

Edit

</button>

<button onclick="deleteMember('${member.id}')">

Delete

</button>

</td>

        </tr>
        `;

    });

}

/* Toast */

function showToast(){

    let toast =
    document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },3000);

}

/* Load Members */

displayMembers();

/* Delete Member */

function deleteMember(id){

    let members =
    JSON.parse(localStorage.getItem("members"))
    || [];

    members =
    members.filter(member =>
        member.id !== id
    );

    localStorage.setItem(
        "members",
        JSON.stringify(members)
    );

    displayMembers();

}

/* View Member */

function viewMember(id){

    let members =
    JSON.parse(localStorage.getItem("members"))
    || [];

    let member =
    members.find(member =>
        member.id === id
    );

    document
    .getElementById("modalData")
    .innerHTML =

    `
    <p><strong>Name:</strong>
    ${member.name}</p>

    <p><strong>Gym ID:</strong>
    ${member.id}</p>

    <p><strong>Age:</strong>
    ${member.age}</p>

    <p><strong>Trainer:</strong>
    ${member.trainer}</p>

    <p><strong>Plan:</strong>
    ${member.plan}</p>
    `;

    document
    .getElementById("memberModal")
    .style.display = "flex";

}

/* Close Modal */

function closeModal(){

    document
    .getElementById("memberModal")
    .style.display = "none";

}

/* Edit Member */

function editMember(id){

    let members =
    JSON.parse(localStorage.getItem("members"))
    || [];

    let member =
    members.find(member =>
        member.id === id
    );

    let newName =
    prompt("Edit Name",member.name);

    let newTrainer =
    prompt("Edit Trainer",member.trainer);

    let newPlan =
    prompt("Edit Membership Plan",member.plan);

    member.name = newName;
    member.trainer = newTrainer;
    member.plan = newPlan;

    localStorage.setItem(
        "members",
        JSON.stringify(members)
    );

    displayMembers();

}

/* Live Search */

function searchMembers(){

    let input =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    let rows =
    document.querySelectorAll("table tr");

    rows.forEach((row,index) => {

        if(index === 0) return;

        let text =
        row.innerText.toLowerCase();

        row.style.display =
        text.includes(input)
        ? ""
        : "none";

    });

}

/* Export PDF */

function exportPDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let members =
    JSON.parse(localStorage.getItem("members"))
    || [];

    doc.setFontSize(20);

    doc.text(
        "FitZone Members Report",
        20,
        20
    );

    let y = 40;

    members.forEach(member => {

        doc.text(

        `
        ID: ${member.id}

        Name: ${member.name}

        Trainer: ${member.trainer}

        Plan: ${member.plan}
        `,

        20,
        y

        );

        y += 30;

    });

    doc.save("FitZoneMembers.pdf");

}