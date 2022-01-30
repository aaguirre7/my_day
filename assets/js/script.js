// create the timeblocks in HTML dynamictly 
$(document).ready(function(){
    for (var i = 9; i <= 17; i ++){
        if (i <= 11){
            var t1 = i + ":00 "
            $('.container').append(`<div class="row time-block" data-time="${i}">
                    <div class="col-sm col-md-2 hour">
                            <p>${t1}AM</p>
                    </div>
                    <div class="col-sm co;-md-8 d-flex description">
                        <textarea></textarea>
                    </div><div class="col-sm con-md-2 saveBtn">
                            <i class="far fa-save fa-2x"></i>
                        </div></>
                </div>`);
        }
        else if(i == 12){
                var t2 = i +":00 "
                $('.container').append(`<div class="row time-block" data-time="${i}">
                    <div class="col-sm col-md-2 hour">
                            <p>${t2}PM</p>
                    </div>
                    <div class="col-sm co;-md-8 d-flex description">
                        <textarea></textarea>
                    </div><div class="col-sm con-md-2 saveBtn">
                            <i class="far fa-save fa-2x"></i>
                        </div></>
                </div>`);
            }
        else{
            var t3 = (i - 12)+":00 ";
            $('.container').append(`<div class="row time-block" data-time="${i}">
                    <div class="col-sm col-md-2 hour">
                            <p>${t3}PM</p>
                    </div>
                    <div class="col-sm co;-md-8 d-flex description">
                        <textarea></textarea>
                    </div><div class="col-sm con-md-2 saveBtn">
                            <i class="far fa-save fa-2x"></i>
                        </div></>
                </div>`);
            }
        }
    let timeTrackObject ={};
// Checks for loca storage, if missing creates an array.
        if (localStorage.getItem('timeTrackObject')){
            timeTrackObject = JSON.parse(localStorage.getItem('timeTrackObject'));
        }
        else{
            timeTrackObject = {
                '9': { time: "9", value: ""},
                '10':{ time: "10", value: ""},
                '11':{ time: "11", value: ""},
                '12':{ time: "12", value: ""},
                '13':{ time: "13", value: ""},
                '14':{ time: "14", value: ""},
                '15':{ time: "15", value: ""},
                '16':{ time: "16", value: ""},
                '17':{ time: "17", value: ""}
            }; 
        }
// Load data from created timeblocks
    $(".time-block").each(function(){
        $(this).find(".description textarea").val(timeTrackObject[$(this).attr("Data-time")].vale);

    });
// SHows today's date
    let dateString = moment().format('dddd') + ", " +moment().format("MMM Do YY");
        $("#currentDay").html(dateString.substring(0, dateString.length - 5) + "th");
// changes color according to time of the day
    const m = moment();
    $.each($(".time-block"), function(index,value){
        let dateHour = $(value).attr("data-time");
        if (Number(dateHour)=== m.hour()){
            $(this).find("textarea").addClass('present');
        }else if(Number(dateHour)< m.hour()){
            $(this).find("textarea").addClass('past');
        }else {
            $(this).find("textarea").addClass("future");
        }
    });
//saves to local storage day's activity
    $("body").on('click',".saveBtn", function(e){
    //Gets varialbles containing DATA
        var hour = $(this).closest(".time-block").attr("data-time");
        var textValue = $(this).closest(".time-block").find("description textarea").val();
        timeTrackObject[hour].value = textValue;
    //sends collected data to Local storage
        localStorage.setItem('timeTrackObject', JSON.stringify(timeTrackObject));
    });
// clear all button
    $("body").on('click', "#clearData", function(e){
        localStorage.setItem('timeTrackObject', "");
        $(".time-block").each(function(){
            $(this).find(".description textarea").val('');
        });
    });
})