window.onload = function() {
    // Buttons
    var quickAddBtn = document.getElementById("QuickAdd");
    var AddBtn = document.getElementById("Add");
    var cancelBtn = document.getElementById("Cancel");
    var quickAddFormDiv = document.querySelector('.quickaddForm');
    // document.getElementsByClassName('quickaddForm')[0]

    // Form Fields
    var name = document.getElementById("name");
    var phone = document.getElementById("phone");
    var dob = document.getElementById("dob");
    var password = document.getElementById("password");

    // Address Book Display
    var addBookDiv = document.querySelector(".addbook");

    // Create Storage Array
    var addressBook = [];

    // Event Listeners 
    quickAddBtn.addEventListener("click", function() {
        quickAddFormDiv.style.display = "block";
    })

    cancelBtn.addEventListener("click", function() {
        quickAddFormDiv.style.display = "none";
    });

    AddBtn.addEventListener("click", addToBook);

    addBookDiv.addEventListener("click", removeEntry);

    function jsonStructure(name, phone, dob, password) {
        this.name = name;
        this.phone = phone;
        this.dob = dob;
        this.password = password;
    }

    // form validator to ensure no empty strings are submitted using conditional operators
    function addToBook() {
        var isNull = name.value != '' && phone.value != '' && dob.value != '' && password.value != '';
        if (isNull) {
            // Add the contents to the form to the array & local storage
            var obj = new jsonStructure(name.value, phone.value, dob.value, password.value);
            addressBook.push(obj);
            localStorage['addbook'] = JSON.stringify(addressBook);
            // Hide the form panel
            quickAddFormDiv.style.display = "none";
            // Clear the form
            clearForm();
            // Updating & displaying all records in the addressBook
            showAddressBook();
        }
    }

    function removeEntry(e) {
        if(e.target.classList.contains("delbutton")) {
            var remID = e.target.getAttribute("data-id");
            // Remove the JSON entry from the array with the index num = remID;
            addressBook.splice(remID, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAddressBook();
        }
    }

    function clearForm() {
        var frm = document.querySelectorAll(".formFields");
        for (var i in frm) {
            frm[i].value = '';
        }
    }

    function showAddressBook() {
        // Check if the key addBook exists in localStorage or else create it
        // if it exists, load contents from the localStorage and loop > display it on the page.
        if(localStorage['addbook'] === undefined) {
            localStorage['addbook'] = "[]";
        } else {
            addressBook = JSON.parse(localStorage['addbook']);
            addBookDiv.innerHTML = '';
            for (var n in addressBook) {
                var str = '<div class="entry">';
                    str += '<div class="name"><p>' + addressBook[n].name + '</p></div>';
                    str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
                    str += '<div class="dob"><p>' + addressBook[n].dob + '</p></div>';
                    str += '<div class="password"><p>' + addressBook[n].password + '</p></div>';
                    str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
                    str += '</div>';
                    addBookDiv.innerHTML += str;
            }
        }
    }

    showAddressBook();

}