<!--
Written by Daiana Arantes
April 2019
Revision History
-->
function daValidate_daAddForm(){
    var form = $("#daAddForm");


    form.validate({
        rules: {
            daAddBusinessName: {
                required: true,
                rangelength: [2,20]

            },
            daAddReviewerEmail:{
                required: true,
                emailcheck: true
            },
            daAddReviewDate: {
                required: true
            },
            daAddFoodQuality: {
                required: true,
                min: 0,
                max: 5
            },
            daAddValue: {
                required: true,
                min: 0,
                max: 5
            },
            daAddService: {
                required: true,
                min: 0,
                max: 5
            }


        },
        messages: {
            daAddBusinessName: {
                required: "You must enter name",
                rangelength: "Length must be 2-20 characters long"
            },
            daAddReviewerEmail:{
                required: "You must enter an email",
                emailcheck: "Please enter a valid email address."
            },
            daAddReviewDate: {
                required: "Review date is required"
            },
            daAddFoodQuality: {
                required: "You must enter a rating",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            daAddValue: {
                required: "You must enter a rating",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            daAddService: {
                required: "You must enter a rating",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            }
        }
    });


    return form.valid();
}



function daValidate_daEditForm(){
    var form = $("#daEditForm");


    form.validate({
        rules: {
            daEditBusinessName: {
                required: true,
                rangelength: [2,20]
            },
            daEditReviewerEmail:{
                required: true,
                emailcheck: true
            },
            daEditReviewDate: {
                required: true
            },
            daEditFoodQuality: {
                required: true,
                min: 0,
                max: 5
            },
            daEditValue: {
                required: true,
                min: 0,
                max: 5
            },
            daEditService: {
                required: true,
                min: 0,
                max: 5
            }
        },
        messages: {
            daEditBusinessName: {
                required: "You must enter name",
                rangelength: "Length must be 2-20 characters long"
            },
            daEditReviewerEmail:{
                required: "You must enter an email",
                emailcheck: "Please enter a valid email address."
            },
            daEditReviewDate: {
                required: "Review date is required"
            },
            daEditFoodQuality: {
                required: "You must enter a rating",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            daEditValue: {
                required: "You must enter a rating",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            daEditService: {
                required: "You must enter a rating",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            }
        }
    });

    return form.valid();
}


// Email check custom validation
jQuery.validator.addMethod("emailcheck",
    function(value, element){
        var regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        return this.optional(element) || regex.test(value);
    },
    "Custom email checker");

