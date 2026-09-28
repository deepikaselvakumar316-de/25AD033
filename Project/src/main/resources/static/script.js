const BASE_URL = "http://localhost:8080";


// ================= NAVIGATION =================

function showPage(pageName) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageName).classList.add("active");

    const titles = {
        dashboard: "Dashboard",
        groups: "Groups",
        members: "Members",
        contributions: "Contributions",
        loans: "Loans",
        repayments: "Repayments"
    };

    document.getElementById("pageTitle").innerText =
        titles[pageName];

    if (pageName === "groups") {
        loadGroups();
    }

    if (pageName === "members") {
        loadMembers();
    }

    if (pageName === "contributions") {
        loadContributions();
    }

    if (pageName === "loans") {
        loadLoans();
    }

    if (pageName === "repayments") {
        loadRepayments();
    }

    if (pageName === "dashboard") {
        loadDashboard();
    }
}


// ================= SIDEBAR =================

function toggleSidebar() {

    document.getElementById("sidebar")
        .classList.toggle("open");
}


// ================= GROUPS =================

async function loadGroups() {

    try {

        const response =
            await fetch(`${BASE_URL}/groups`);

        const data = await response.json();

        const table =
            document.getElementById("groupTable");

        table.innerHTML = "";

        data.forEach(group => {

            table.innerHTML += `

                <tr>

                    <td>${group.id}</td>

                    <td>${group.groupName}</td>

                    <td>${group.groupCode}</td>

                    <td>${group.description || ""}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick='editGroup(${JSON.stringify(group)})'>
                            Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteGroup(${group.id})">
                            Delete
                        </button>

                    </td>

                </tr>
            `;
        });

    } catch (error) {

        console.error(error);

        alert("Unable to load groups");
    }
}


document.getElementById("groupForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const id =
            document.getElementById("groupId").value;

        const data = {

            groupName:
            document.getElementById("groupName").value,

            groupCode:
            document.getElementById("groupCode").value,

            description:
            document.getElementById("groupDescription").value
        };

        try {

            let response;

            if (id) {

                response = await fetch(
                    `${BASE_URL}/groups/${id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(data)
                    }
                );

            } else {

                response = await fetch(
                    `${BASE_URL}/groups`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(data)
                    }
                );
            }

            if (!response.ok) {
                throw new Error("Request failed");
            }

            alert("Group saved successfully!");

            clearGroupForm();

            loadGroups();

        } catch (error) {

            console.error(error);

            alert("Error saving group");
        }
    });


function editGroup(group) {

    document.getElementById("groupId").value =
        group.id;

    document.getElementById("groupName").value =
        group.groupName;

    document.getElementById("groupCode").value =
        group.groupCode;

    document.getElementById("groupDescription").value =
        group.description || "";
}


async function deleteGroup(id) {

    if (!confirm("Delete this group?")) {
        return;
    }

    try {

        const response = await fetch(
            `${BASE_URL}/groups/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        alert("Group deleted!");

        loadGroups();

    } catch (error) {

        console.error(error);

        alert("Error deleting group");
    }
}


function clearGroupForm() {

    document.getElementById("groupForm").reset();

    document.getElementById("groupId").value = "";
}


// ================= MEMBERS =================

async function loadMembers() {

    try {

        const response =
            await fetch(`${BASE_URL}/members`);

        const data =
            await response.json();

        const table =
            document.getElementById("memberTable");

        table.innerHTML = "";

        data.forEach(member => {

            table.innerHTML += `

                <tr>

                    <td>${member.id}</td>

                    <td>${member.name || ""}</td>

                    <td>${member.email || ""}</td>

                    <td>${member.phone || ""}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick='editMember(${JSON.stringify(member)})'>
                            Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteMember(${member.id})">
                            Delete
                        </button>

                    </td>

                </tr>
            `;
        });

    } catch (error) {

        console.error(error);

        alert("Unable to load members");
    }
}


document.getElementById("memberForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const id =
            document.getElementById("memberId").value;

        const data = {

            name:
            document.getElementById("memberName").value,

            email:
            document.getElementById("memberEmail").value,

            phone:
            document.getElementById("memberPhone").value
        };

        try {

            const response = await fetch(

                id
                    ? `${BASE_URL}/members/${id}`
                    : `${BASE_URL}/members`,

                {

                    method: id ? "PUT" : "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );

            if (!response.ok) {
                throw new Error("Request failed");
            }

            alert("Member saved successfully!");

            clearMemberForm();

            loadMembers();

        } catch (error) {

            console.error(error);

            alert("Error saving member");
        }
    });


function editMember(member) {

    document.getElementById("memberId").value =
        member.id;

    document.getElementById("memberName").value =
        member.name || "";

    document.getElementById("memberEmail").value =
        member.email || "";

    document.getElementById("memberPhone").value =
        member.phone || "";
}


async function deleteMember(id) {

    if (!confirm("Delete this member?")) {
        return;
    }

    await fetch(
        `${BASE_URL}/members/${id}`,
        {
            method: "DELETE"
        }
    );

    loadMembers();
}


function clearMemberForm() {

    document.getElementById("memberForm").reset();

    document.getElementById("memberId").value = "";
}


// ================= CONTRIBUTIONS =================

async function loadContributions() {

    try {

        const response =
            await fetch(`${BASE_URL}/contributions`);

        const data =
            await response.json();

        const table =
            document.getElementById("contributionTable");

        table.innerHTML = "";

        data.forEach(item => {

            table.innerHTML += `

                <tr>

                    <td>${item.id}</td>

                    <td>${item.memberId}</td>

                    <td>${item.amount}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick='editContribution(${JSON.stringify(item)})'>
                            Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteContribution(${item.id})">
                            Delete
                        </button>

                    </td>

                </tr>
            `;
        });

    } catch (error) {

        console.error(error);

        alert("Unable to load contributions");
    }
}


document.getElementById("contributionForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const id =
            document.getElementById("contributionId").value;

        const data = {

            memberId:
                Number(document.getElementById(
                    "contributionMemberId"
                ).value),

            amount:
                Number(document.getElementById(
                    "contributionAmount"
                ).value)
        };

        const response = await fetch(

            id
                ? `${BASE_URL}/contributions/${id}`
                : `${BASE_URL}/contributions`,

            {

                method: id ? "PUT" : "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        if (response.ok) {

            alert("Contribution saved!");

            clearContributionForm();

            loadContributions();

        } else {

            alert("Error saving contribution");
        }
    });


function editContribution(item) {

    document.getElementById("contributionId").value =
        item.id;

    document.getElementById("contributionMemberId").value =
        item.memberId;

    document.getElementById("contributionAmount").value =
        item.amount;
}


async function deleteContribution(id) {

    if (!confirm("Delete contribution?")) {
        return;
    }

    await fetch(
        `${BASE_URL}/contributions/${id}`,
        {
            method: "DELETE"
        }
    );

    loadContributions();
}


function clearContributionForm() {

    document.getElementById("contributionForm").reset();

    document.getElementById("contributionId").value = "";
}


// ================= LOANS =================

async function loadLoans() {

    try {

        const response =
            await fetch(`${BASE_URL}/loans`);

        const data =
            await response.json();

        const table =
            document.getElementById("loanTable");

        table.innerHTML = "";

        data.forEach(loan => {

            table.innerHTML += `

                <tr>

                    <td>${loan.id}</td>

                    <td>${loan.memberId}</td>

                    <td>${loan.amount}</td>

                    <td>${loan.interestRate}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick='editLoan(${JSON.stringify(loan)})'>
                            Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteLoan(${loan.id})">
                            Delete
                        </button>

                    </td>

                </tr>
            `;
        });

    } catch (error) {

        console.error(error);

        alert("Unable to load loans");
    }
}


document.getElementById("loanForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const id =
            document.getElementById("loanId").value;

        const data = {

            memberId:
                Number(document.getElementById(
                    "loanMemberId"
                ).value),

            amount:
                Number(document.getElementById(
                    "loanAmount"
                ).value),

            interestRate:
                Number(document.getElementById(
                    "interestRate"
                ).value)
        };

        const response = await fetch(

            id
                ? `${BASE_URL}/loans/${id}`
                : `${BASE_URL}/loans`,

            {

                method: id ? "PUT" : "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        if (response.ok) {

            alert("Loan saved!");

            clearLoanForm();

            loadLoans();

        } else {

            alert("Error saving loan");
        }
    });


function editLoan(loan) {

    document.getElementById("loanId").value =
        loan.id;

    document.getElementById("loanMemberId").value =
        loan.memberId;

    document.getElementById("loanAmount").value =
        loan.amount;

    document.getElementById("interestRate").value =
        loan.interestRate;
}


async function deleteLoan(id) {

    if (!confirm("Delete loan?")) {
        return;
    }

    await fetch(
        `${BASE_URL}/loans/${id}`,
        {
            method: "DELETE"
        }
    );

    loadLoans();
}


function clearLoanForm() {

    document.getElementById("loanForm").reset();

    document.getElementById("loanId").value = "";
}


// ================= REPAYMENTS =================

async function loadRepayments() {

    try {

        const response =
            await fetch(`${BASE_URL}/repayments`);

        const data =
            await response.json();

        const table =
            document.getElementById("repaymentTable");

        table.innerHTML = "";

        data.forEach(item => {

            table.innerHTML += `

                <tr>

                    <td>${item.id}</td>

                    <td>${item.loanId}</td>

                    <td>${item.amount}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick='editRepayment(${JSON.stringify(item)})'>
                            Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteRepayment(${item.id})">
                            Delete
                        </button>

                    </td>

                </tr>
            `;
        });

    } catch (error) {

        console.error(error);

        alert("Unable to load repayments");
    }
}


document.getElementById("repaymentForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const id =
            document.getElementById("repaymentId").value;

        const data = {

            loanId:
                Number(document.getElementById(
                    "repaymentLoanId"
                ).value),

            amount:
                Number(document.getElementById(
                    "repaymentAmount"
                ).value)
        };

        const response = await fetch(

            id
                ? `${BASE_URL}/repayments/${id}`
                : `${BASE_URL}/repayments`,

            {

                method: id ? "PUT" : "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );

        if (response.ok) {

            alert("Repayment saved!");

            clearRepaymentForm();

            loadRepayments();

        } else {

            alert("Error saving repayment");
        }
    });


function editRepayment(item) {

    document.getElementById("repaymentId").value =
        item.id;

    document.getElementById("repaymentLoanId").value =
        item.loanId;

    document.getElementById("repaymentAmount").value =
        item.amount;
}


async function deleteRepayment(id) {

    if (!confirm("Delete repayment?")) {
        return;
    }

    await fetch(
        `${BASE_URL}/repayments/${id}`,
        {
            method: "DELETE"
        }
    );

    loadRepayments();
}


function clearRepaymentForm() {

    document.getElementById("repaymentForm").reset();

    document.getElementById("repaymentId").value = "";
}


// ================= DASHBOARD =================

async function loadDashboard() {

    try {

        const groups =
            await fetch(`${BASE_URL}/groups`)
                .then(response => response.json());

        const members =
            await fetch(`${BASE_URL}/members`)
                .then(response => response.json());

        const contributions =
            await fetch(`${BASE_URL}/contributions`)
                .then(response => response.json());

        const loans =
            await fetch(`${BASE_URL}/loans`)
                .then(response => response.json());


        document.getElementById("groupCount")
            .innerText = groups.length;

        document.getElementById("memberCount")
            .innerText = members.length;

        document.getElementById("contributionCount")
            .innerText = contributions.length;

        document.getElementById("loanCount")
            .innerText = loans.length;

    } catch (error) {

        console.log("Dashboard data unavailable");
    }
}


// ================= START =================

loadDashboard();