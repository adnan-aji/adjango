function NotifyMessage(title, text, type, hide)
{
    var pNotify = new PNotify({
        title: title,
        text: text,
        type: type,
        hide: hide,
        styling: 'bootstrap3'
    });
}

var form_submit = function (formname) {

    var form = $('#' + formname);


    if (form) {
        var formdata = form.serialize();
        

        var submit = form.find('input[type=submit]');
        submit.prop('disabled', 'disabled');
        $.ajax({
            method: 'post',
            url: form.attr('action'),
            data: formdata,
            success: function (data) {

                if (data.success == 1) {
                    NotifyMessage("Success Message", "Success", "success", true);
                    $('#modal-container5').modal('hide');
                }
                else {
                    NotifyMessage("Current Password not match", "Success", "success", true);
                }
            },
            error: function () {
                NotifyMessage("Error Message", "Error", "error", true);
            }
        });
    }
}

function convertToDate(data) {

 
    // The 6th+ positions contain the number of milliseconds in Universal Coordinated Time between the specified date and midnight January 1, 1970.
    if (data != null) {
        var dtStart = new Date(parseInt(data.substr(6)));
    // Format using moment.js.
        var dtStartWrapper = moment(dtStart);
        return dtStartWrapper.format("MM-DD-YYYY");
    }
    return "";
        }

var tables = [];

moment.locale('en');

var form_submit = function (data) {
    document.getElementById(data).submit();
}

var bindDatePicker = function () {
    $(".date").datetimepicker({
        format: 'YYYY-MM-DD',
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down"
        }
    }).find('input:first').on("blur", function () {
        // check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
        // update the format if it's yyyy-mm-dd
        var date = parseDate($(this).val());

        if (!isValidDate(date)) {
            //create date based on momentjs (we have that)
            date = moment().format('YYYY-MM-DD');
        }

        $(this).val(date);
    });
}

var isValidDate = function (value, format) {
    format = format || false;
    // lets parse the date to the best of our knowledge
    if (format) {
        value = parseDate(value);
    }

    var timestamp = Date.parse(value);

    return isNaN(timestamp) == false;
}

var parseDate = function (value) {
    var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
    if (m)
        value = m[5] + '-' + ("00" + m[3]).slice(-2) + '-' + ("00" + m[1]).slice(-2);

    return value;
}

var datetimepicker1 = function () {
    $('.datetimepicker1').datetimepicker({
        language: 'ar',
        format: "yyyy-mm-dd",
        weekStart: 6,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
}

var daterangepicker = function () {
    $('.daterangepicker1').daterangepicker(
                       {
                           ranges: {
                               'Today': [moment(), moment()],
                               'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                               'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                               'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                               'This Month': [moment().startOf('month'), moment().endOf('month')],
                               'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                           },
                           startDate: moment().subtract(29, 'days'),
                           endDate: moment()
                       },
                       function (start, end) {

                           $('#referralRangeDate').val(start.format('MM-DD-YYYY') + ' - ' + end.format('MM-DD-YYYY'));
                           $('#referralRangeDate').trigger('input');
                           $('#referralRangeDate').trigger('change');
                       }
                   );
}

$(document).ready(function () {

   
    $(function () {
        
        datetimepicker1();
        daterangepicker();
   

    });
 
  
    for (var i = 0; i < tables.length; i++) {
   

        $('#' + tables[i]["tableId"]).DataTable({
            "searching": tables[i]["seraching"],
            "ordering": tables[i]["ordering"],
            "pagingType": tables[i]["pagingType"],
            "processing": tables[i]["processing"],
            "serverSide": tables[i]["serverSide"],
            "oLanguage": {
                
                //"sLengthMenu": tables[i]["displaymenRecords"],
            },
           
           
            "ajax": {
                "url": $('#' + tables[i]["tableId"]).data('url'),
                "type": "POST",
                "data": {
                    method: "datatables",
                    filters: function () {
                        return buildFilter();
                    }
                }
            },
            "columns": tables[i]["ColumnsData"],
            "columnDefs": tables[i]["columnDefs"]
        });
    }

    $('body').on('click', '.modal-link4', function (e) {
        e.preventDefault();

        $('#modal-container4').load($(this).attr('href'), function () {
            $('#modal-container4').modal('show');
            $('select').css('width', '100%');
            $('select').select2();
            
            datetimepicker1();



        });

    });
    //icheck

    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
    });

});


$('body').on('click', '.modal-link5', function (e) {
    e.preventDefault();


    $('#modal-container5').load($(this).attr('href'), function () {
        $('#modal-container5').modal('show');
        $('select').css('width', '100%');
        $('select').select2();


        $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_flat-green'
        });


        datetimepicker1();


    });

    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
    });



});


$("tbody").on("click", "tr", function (e) {
    datetimepicker1();
});

var buildFilter = function () {

    //field = $(this).find('.FilterValue').attr("data");
    //op = $(this).find('.FilterOperation').val();
    //data = $(this).find('.FilterValue').val();
    var result = { "field": 1, "op": 1, "data": 1 };
    return result;

}

var GetDataPicker = function () {
    $('.date-picker').daterangepicker({
        singleDatePicker: true,
        "showDropdowns": true,

        "timePickerSeconds": true,
        "timePicker": true,
        timePicker24Hour: true,
        "locale": {
            "format": "dd/MM/yyyy",
            "separator": "-"
        }
    });
}
function compareTwoDates(date1, date2) {
    if ((new Date(date1).getTime() > new Date(date2).getTime())) {
        return false;
    }
    else {
        return true;
    }
}


//Global Variables
var GlobalDiagnosis = [];
var GlobalPrimaryHealthCareDiag = [];
var GlobalMedicalProcedure = [];
