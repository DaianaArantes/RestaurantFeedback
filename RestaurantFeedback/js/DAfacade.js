<!--
Written by Daiana Arantes
April 2019
Revision History
-->
function DAupdateTypesDropdown() {

    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if (row['name'] === 'Others'){
                htmlCode += "<option value=" + row['name'] + " selected>" + row['name'] + "</option>";
            }else{
                htmlCode += "<option value=" + row['name'] + ">" + row['name'] + "</option>";
            }
        }
        var select = $("#daAddBusinessType");
        select = select.html(htmlCode);

        select.selectmenu("refresh");
    }
    type.DAselectAll(options, callback);
}

function DAaddFeedback(){
    // Step 1: Test validation
    if (daValidate_daAddForm())
    {
        console.info("Validation is successful");
        var options;
        var businessName = $("#daAddBusinessName").val();
        var typeId = $("#daAddBusinessType").prop("selectedIndex");
        var reviewerEmail = $("#daAddReviewerEmail").val();
        var reviewerComments = $("#daAddReviewerComments").val();
        var reviewDate = $("#daAddReviewDate").val();
        var hasRating = $("#daAddRatings").prop("checked");

        if (hasRating){

            var rating1 = $("#daAddFoodQuality").val();
            var rating2 = $("#daAddService").val();
            var rating3 = $("#daAddValue").val();
            options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3];
        }else{
            options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, "", "", ""];
        }

        alert("New Feedback Added");

        function callback()
        {
            console.info("Record inserted successfully");
        }
        review.DAinsert(options, callback);
    }
    else
    {
        console.error("Validation failed");
    }
}

function DAgetReviews(){
    var options = [];

    function callback(tx, results)
    {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++)
        {
            var row = results.rows[i];
            var overallRating = 0;
            if (row['hasRating'] === 'true'){
                overallRating = (parseInt(row['rating1']) + parseInt(row['rating2']) + + parseInt(row['rating3'])) * 100/15;
            }
            htmlCode += "<li data-icon=\"carat-r\">" +
                "<a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h2>Business Name: " + row['businessName'] + "</h2>" +
                "<p>Reviewer Email: " + row['reviewerEmail'] + "</p>" +
                "<p>Comments: " + row['reviewerComments'] + "</p>" +
                "<p>Overall Rating: " + overallRating.toFixed(0) +"%"+ "</p>" +
                "</a>" +
                "</li>";
        }

        var lv = $("#daFeedbackList");
        lv = lv.html(htmlCode);

        lv.listview("refresh");

        function clickHandler()
        {
            localStorage.setItem("id", $(this).attr("data-row-id") );

            $(location).prop('href', '#daEditFeedbackPage');
        }
        $("#daFeedbackList a").on("click", clickHandler);
    }

    review.DAselectAll(options, callback);
}

function DAshowCurrentReview (){

    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];

        $("#daEditBusinessName").val(row['businessName']);
        $("#daEditBusinessType").prop('selectedIndex', row['typeId']);

        $("#daEditReviewerEmail").val(row['reviewerEmail']);
        $("#daEditReviewerComments").val(row['reviewerComments']);
        $("#daEditReviewDate").val(row['reviewDate']);
        var select = $("#daEditBusinessType");
        select.selectmenu("refresh");

        if (row['hasRating'] === 'true'){
            $("#daEditRatings").prop("checked", true);
            var checkboxTrue = $("#daEditRatings");
            checkboxTrue.checkboxradio("refresh");
            $("#daEditRating").show();
            $("#daEditFoodQuality").val(row['rating1']);
            $("#daEditService").val(row['rating2']);
            $("#daEditValue").val(row['rating3']);

            daEditOverallRating();
        }else
        {
            $("#daEditRatings").prop("checked", false);
            $("#daEditRating").hide();
            var checkboxFalse = $("#daEditRatings");
            checkboxFalse.checkboxradio("refresh");
        }
    }
    review.DAselect(options, callback);
}

function DAupdateFeedback(){

    if (daValidate_daEditForm()) {
        console.info("Validation is successful");

        var businessName = $("#daEditBusinessName").val();
        var typeId = $("#daEditBusinessType").prop("selectedIndex");
        var reviewerEmail = $("#daEditReviewerEmail").val();
        var reviewerComments = $("#daEditReviewerComments").val();
        var reviewDate = $("#daEditReviewDate").val();
        var hasRating = $("#daEditRatings").prop("checked");
        var id= localStorage.getItem("id");
        var options = [];
        if (hasRating) {

            var rating1 = $("#daEditFoodQuality").val();
            var rating2 = $("#daEditService").val();
            var rating3 = $("#daEditValue").val();
            options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3, id];
        } else {
            options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, "", "", "", id];
        }

        function callback() {
            console.info("Record updated successfully");
            $(location).prop('href', "#daViewFeedbackPage");
        }

        alert("Feedback Updated successfully");
    }else{
        console.error("Validation failed");
    }
    review.DAupdate(options, callback);
}

function DAdeleteFeedback(){
    var id= localStorage.getItem("id");
    var options = [id];

    function callback() {
        console.info("Record deleted successfully");
        $(location).prop('href', "#daViewFeedbackPage");
    }
    alert("Feedback Deleted successfully");
    review.DAdelete(options, callback);
}

function DAclearDatabase() {
    var result = confirm("Do you really want to clear the database?");
    if (result)
    {
        try
        {
            DB.DADropTables();
            alert("Database cleared!");
        }
        catch (e)
        {
            alert(e);
        }
    }
}