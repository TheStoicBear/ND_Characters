function display(bool) {
    console.log("Display called with:", bool);
    if (bool) {
        $("body").removeClass("hidden").addClass("flex");
    } else {
        $("body").removeClass("flex").addClass("hidden");
    }
}

const menus = ["#characterCreator", "#characterEditor", "#exitGameMenu", "#deleteCharacterMenu", "#spawnLocation"];

function displayMenu(menu, status) {
    console.log("Displaying menu:", menu, "Status:", status);
    const menuSelector = `#${menu}`;
    if (status) {
        // Show the menu and backdrop
        $(menuSelector).fadeIn("slow").removeClass("hidden").addClass("flex");
        $("#backdrop").fadeIn("slow").removeClass("hidden");
        
        // Hide other menus
        menus.forEach(item => {
            if (item !== menuSelector) {
                $(item).removeClass("flex").addClass("hidden");
            }
        });
    } else {
        // Hide the menu
        $(menuSelector).fadeOut("slow", function() {
            // Check if all menus are hidden
            const anyMenuVisible = menus.some(item => $(item).is(':visible'));
            if (!anyMenuVisible) {
                // Hide the backdrop only if no menus are visible
                $("#backdrop").fadeOut("slow");
            }
        });
    }
}

function createCharacter(firstName, lastName, dateOfBirth, gender, ethnicity, department, id) {
    const job = department && ` (${department})`;
    const charButtonClass = (firstName.length + lastName.length + (job ? job.length : 0)) > 24 ? 
        `bg-blue-900 text-white py-2 px-4 rounded flex-1` : `bg-blue-900 text-white py-2 px-4 rounded flex-1`;

$("#charactersSection").append(`
    <div class="flex mb-2">
        <button id="characterButton${id}" class="text-white py-2 px-4 rounded flex-1 flex justify-between items-center" 
            style="background-color: #0a5efa; box-shadow: 0px 4px 10px rgba(0, 0, 255, 0.6); filter: brightness(1.2);">
            <div class="flex flex-col pr-8"> <!-- Added padding-right here -->
                <span class="font-bold">${firstName} ${lastName}</span>
                <div class="text-sm text-blue-300">${job}</div>
            </div>
            <div class="flex gap-2 items-center">
                <span class="bg-yellow-500 text-white py-1 px-2 rounded-lg flex items-center cursor-pointer" id="characterButtonEdit${id}">
                    <i class="fas fa-edit mr-1"></i>
                </span>
                <span class="bg-red-600 text-white py-1 px-2 rounded-lg flex items-center cursor-pointer" id="characterButtonDelete${id}">
                    <i class="fas fa-trash-alt mr-1"></i>
                </span>
            </div>
        </button>
    </div>
`);


    // Handle click on the character button
    $(`#characterButton${id}`).click(function() {
        displayMenu("spawnLocation", true);
        $.post(`https://${GetParentResourceName()}/setMainCharacter`, JSON.stringify({ id: id }));
    });

    // Handle click on the edit button
    $(`#characterButtonEdit${id}`).click(function(event) {
        event.stopPropagation(); // Prevent event from bubbling up
        displayMenu("characterEditor", true);
        $("#newFirstName").val(firstName);
        $("#newLastName").val(lastName);
        $("#newDateOfBirth").val(dateOfBirth);
        $("#newGender").val(gender);
        $("#newTwtName").val(ethnicity);
        $("#newDepartment").val(department);
        characterEdited = id;
    });

    // Handle click on the delete button
    $(`#characterButtonDelete${id}`).click(function(event) {
        event.stopPropagation(); // Prevent event from bubbling up
        displayMenu("deleteCharacterMenu", true);
        characterDeleting = id;
    });
}


$("#characterCreator").submit(function() {
    $.post(`https://${GetParentResourceName()}/newCharacter`, JSON.stringify({
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        dateOfBirth: $("#dateOfBirth").val(),
        gender: $("#gender").val(),
        ethnicity: $("#twtName").val(),
        department: $("#department").val()
    }));
    displayMenu("characterCreator", false);
    $("#firstName, #lastName, #dateOfBirth, #twtName").val("");
    return false;
});

$("#characterEditor").submit(function() {
    displayMenu("characterEditor", false);
    $.post(`https://${GetParentResourceName()}/editCharacter`, JSON.stringify({
        firstName: $("#newFirstName").val(),
        lastName: $("#newLastName").val(),
        dateOfBirth: $("#newDateOfBirth").val(),
        gender: $("#newGender").val(),
        ethnicity: $("#newTwtName").val(),
        department: $("#newDepartment").val(),
        id: characterEdited
    }));
    return false;
});

$("#deleteCharacterConfirm").click(function() {
    displayMenu("deleteCharacterMenu", false);
    $(`#characterButton${characterDeleting}`).fadeOut("slow", function() {
        $(this).remove();
    });
    $(`#characterButtonEdit${characterDeleting}`).fadeOut("slow", function() {
        $(this).remove();
    });
    $(`#characterButtonDelete${characterDeleting}`).fadeOut("slow", function() {
        $(this).remove();
    });
    $.post(`https://${GetParentResourceName()}/delCharacter`, JSON.stringify({ character: characterDeleting }));
});

$("#newCharacterButton").click(function() {
    displayMenu("characterCreator", true);
});

$("#deleteCharacterCancel").click(function() {
    displayMenu("deleteCharacterMenu", false);
});

$("#cancelCharacterCreation").click(function() {
    displayMenu("characterCreator", false);
});

$("#cancelCharacterEditing").click(function() {
    displayMenu("characterEditor", false);
});

$("#tpCancel").click(function() {
    displayMenu("spawnLocation", false);
    setTimeout(function() {
        $("#spawnMenuContainer").empty();
    }, 550);
});

$("#quitGameButton").click(function() {
    displayMenu("exitGameMenu", true);
});

$("#exitGameCancel").click(function() {
    displayMenu("exitGameMenu", false);
});

$("#exitGameConfirm").click(function() {
    $.post(`https://${GetParentResourceName()}/exitGame`);
});

$(document).on("click", ".spawnButtons", function() {
    const th = $(this);
    $.post(`https://${GetParentResourceName()}/tpToLocation`, JSON.stringify({
        x: th.data("x"),
        y: th.data("y"),
        z: th.data("z"),
        id: th.data("id")
    }));
    displayMenu("spawnLocation", false);
    setTimeout(function() {
        $("#spawnMenuContainer").empty();
    }, 550);
});

$(document).on("click", "#tpDoNot", function() {
    $.post(`https://${GetParentResourceName()}/tpDoNot`, JSON.stringify({ id: $("#tpDoNot").data("id") }));
    displayMenu("spawnLocation", false);
    setTimeout(function() {
        $("#spawnMenuContainer").empty();
    }, 550);
});

window.addEventListener("message", function(event) {
    const item = event.data;

    if (item.type === "ui") {
        if (item.status) {
            $("#serverName").text(item.serverName);
            $("body").css("background-image", `url(${item.background})`);
            $("#playerAmount").text(item.characterAmount);
            display(true);
        } else {
            display(false);
        }
    }

if (item.type === "setSpawns") {
    $("#spawnMenuContainer").empty();
    setTimeout(function() {
        $("#tpDoNot").data("id", item.id);
        JSON.parse(item.spawns).forEach((location) => {
            $("#spawnMenuContainer").append(`
                <button class="spawnButtons text-white py-2 px-4 rounded-lg mb-2" 
                    style="background-color: #0a5efa;" 
                    data-x="${location.coords.x}" data-y="${location.coords.y}" data-z="${location.coords.z}" data-id="${item.id}">
                    ${location.label}
                </button>
            `);
        });
    }, 10);
}



    if (item.type === "firstSpawn") {
        $("#tpDoNot").html(`<i class="fas fa-compass text-white"></i> Do not teleport`);
    }

    if (item.type === "givePerms") {
        console.log("Received job permissions:", item.deptRoles);
        $(".departments").empty();
        const jobs = JSON.parse(item.deptRoles);
        jobs.forEach((job) => {
            console.log("Adding job to dropdown:", job.name, job.label);
            $(".departments").append(`<option value="${job.name}">${job.label}</option>`);
        });
    }

    if (item.type === "aop") {
        $("#aop").text(`AOP: ${item.aop}`);
    }

    if (item.type === "refresh") {
        $("#charactersSection").empty();
        displayMenu("characterCreator", false);
        let characters = JSON.parse(item.characters);
        Object.keys(characters).forEach((id) => {
            const char = characters[id];
            if (char) {
                createCharacter(
                    char.firstname || "",
                    char.lastname || "",
                    char.dob || "",
                    char.gender || "",
                    char.metadata.ethnicity || "",
                    char.jobInfo?.label || char.job || "",
                    char.id || ""
                );
            }
        });
        if (item.characterAmount) {
            $("#playerAmount").text(item.characterAmount);
        }
    }

    if (item.type === "logo" && item.logo) {
        $("#logo").attr("src", item.logo);
    }
});
