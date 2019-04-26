
// Calculation for Add Review
function daAddOverallRating() {

    var value1 = 0;
    var value2 = 0;
    var value3 = 0;

    if(!isNaN(parseInt($("#daAddFoodQuality").val())) && (parseInt($("#daAddFoodQuality").val()) > 0 && parseInt($("#daAddFoodQuality").val()) <= 5)){
        value1 = parseInt($("#daAddFoodQuality").val());
    }else{
        value1 = 0;
    }

    if(!isNaN(parseInt($("#daAddValue").val())) && (parseInt($("#daAddValue").val()) > 0 && parseInt($("#daAddValue").val()) <= 5)){
        value2 = parseInt($("#daAddValue").val());
    }else{
        value2 = 0;
    }

    if(!isNaN(parseInt($("#daAddService").val())) && (parseInt($("#daAddService").val()) > 0 && parseInt($("#daAddService").val()) <= 5)){
        value3 = parseInt($("#daAddService").val());
    }else{
        value3 = 0;
    }


    var total = (value1 + value2 + + value3) * 100/15;


    $("#daAddOverallRating").val(total.toFixed(0) + "%");

}

// Calculation for Edit Review
function daEditOverallRating() {

    var value1 = 0;
    var value2 = 0;
    var value3 = 0;

    if(!isNaN(parseInt($("#daEditFoodQuality").val())) && (parseInt($("#daEditFoodQuality").val()) > 0 && parseInt($("#daEditFoodQuality").val()) <= 5)){
        value1 = parseInt($("#daEditFoodQuality").val());
    }else{
        value1 = 0;
    }

    if(!isNaN(parseInt($("#daEditValue").val())) && (parseInt($("#daEditValue").val()) > 0 && parseInt($("#daEditValue").val()) <= 5)){
        value2 = parseInt($("#daEditValue").val());
    }else{
        value2 = 0;
    }

    if(!isNaN(parseInt($("#daEditService").val())) && (parseInt($("#daEditService").val()) > 0 && parseInt($("#daEditService").val()) <= 5)){
        value3 = parseInt($("#daEditService").val());
    }else{
        value3 = 0;
    }


    var total = (value1 + value2 + + value3) * 100/15;


    $("#daEditOverallRating").val(total.toFixed(0) + "%");

}

function daBtnSave_click() {
    DAaddFeedback();
}

function daBtnUpdate_click() {
    DAupdateFeedback();
}

function daSettingsBtnClear_click() {
    DAclearDatabase();
}
function daAddFeedbackPage_show() {
    var defaultEmail = localStorage.getItem("DefaultEmail");
    $("#daAddReviewerEmail").val(defaultEmail);
    DAupdateTypesDropdown();
}

function daViewFeedbackPage_show() {
    DAgetReviews();
}

function daEditFeedbackPage_show() {
    DAshowCurrentReview();
}

function daBtnDelete_click() {
    DAdeleteFeedback();
}
function daSettingsBtnSave_click() {
    daInitStorage();
}


function init() {
    $("#daAddFoodQuality").on("keyup", daAddOverallRating);
    $("#daAddValue").on("keyup", daAddOverallRating);
    $("#daAddService").on("keyup", daAddOverallRating);


    $("#daEditFoodQuality").on("keyup", daEditOverallRating);
    $("#daEditValue").on("keyup", daEditOverallRating);
    $("#daEditService").on("keyup", daEditOverallRating);

    $("#daBtnSave").on("click", daBtnSave_click);
    $("#daBtnUpdate").on("click", daBtnUpdate_click);
    $("#daBtnDelete").on("click", daBtnDelete_click);
    $("#daSettingsBtnClear").on("click", daSettingsBtnClear_click);

    $("#daSettingsBtnSave").on("click", daSettingsBtnSave_click);
    $("#daAddFeedbackPage").on("pageshow", daAddFeedbackPage_show);
    $("#daViewFeedbackPage").on("pageshow", daViewFeedbackPage_show);
    $("#daEditFeedbackPage").on("pageshow", daEditFeedbackPage_show);

    $("#daSettingsBtnSave").on("click", daSettingsBtnSave_click);
}

$(document).ready(function (){

    init();
    initDB();

    //Hide or show
    $("#daAddRatings").change(function(){

        var isChecked = $(this).is(':checked');

        if (isChecked){
            $("#daAddRating").show();
        }else{
            $("#daAddRating").hide();
        }
    });

    $("#daEditRatings").change(function(){

        var isChecked = $(this).is(':checked');

        if (isChecked){
            $("#daEditRating").show();
        }else{
            $("#daEditRating").hide();
        }
    });

});

function daInitStorage(){
    localStorage.setItem("DefaultEmail", $("#daSettingsEmail").val());
    alert("Default Reviewer email saved");
}

function initDB() {
    try {
        DB.DACreateDatabase();
        if (db) {
            DB.DACreateTables();
        } else {
            console.error("Error: Cannot create tables: Database does not exist");
        }
    } catch (e) {
        console.error("Error: (Fatal) Error in initDB(). Cannot proceed");
    }
}
