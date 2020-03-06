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

function convertToDate(data) {
   // alert(1);
    // The 6th+ positions contain the number of milliseconds in Universal Coordinated Time between the specified date and midnight January 1, 1970.
    if (data != null) {
        var dtStart = new Date(parseInt(data.substr(6)));
        // Format using moment.js.
        var dtStartWrapper = moment(dtStart);
        return dtStartWrapper.format("YYYY-MM-DD");
    }
    else
        return "";
}

var tables = [];

moment.locale('ar');

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
            success: function (JsonResult, status, xhr) {

                if (JsonResult.success==1) {
                    NotifyMessage("تم تغيير كلمة المرور", "نجاح", "success", true);
                    $('#modal-container5').modal('hide');
                }
                else {
                    NotifyMessage("كلمة المرور الحالية غير مطابقة", "خطأ", "error", true);
                }

            },
            error: function () {
                NotifyMessage("خطا في تغيير كلمة المرور", "خطأ", "error", true);
            }
        });
    }
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
                               'اليوم': [moment(), moment()],
                               'البارحة': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                               'الاسبوع الماضي': [moment().subtract(6, 'days'), moment()],
                               'آخر 30 يوم ': [moment().subtract(29, 'days'), moment()],
                               'هذا الشهر': [moment().startOf('month'), moment().endOf('month')],
                               'الشهر الماضي': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                           },
                           startDate: moment().subtract(29, 'days'),
                           endDate: moment()
                       },
                       function (start, end) {
                           
                           $('#RangeDate').val(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
                           $('#RangeDate').trigger('input');
                           $('#RangeDate').trigger('change');
                       }
                   );
}

$(document).ready(function () {

   
    $(function () {
        //var date = new Date();
        //date.setDate(date.getDate()-60);

        datetimepicker1();
        daterangepicker();
    });


    $("tbody").on("click", "tr", function (e) {
        datetimepicker1();
    });
 
  


  
    for (var i = 0; i < tables.length; i++) {
   

        $('#' + tables[i]["tableId"]).DataTable({
            "searching": tables[i]["seraching"],
            "ordering": tables[i]["ordering"],
            "pagingType": tables[i]["pagingType"],
            "processing": tables[i]["processing"],
            "serverSide": tables[i]["serverSide"],
           
            "language": {
                "decimal": "",
                "emptyTable": "لا يوجد بيانات متاحة للعرض",
                "info": "إظهار _START_ حتى _END_ من _TOTAL_ سجل",
                "infoEmpty": " إظهار 0 سجل",
                "infoFiltered": "(filtered from _MAX_ total entries)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "إظهار _MENU_ سجل",
                "loadingRecords": "تحميل...",
                "processing": "معالجة...",
                "search": "بحث: ",
                "zeroRecords": "لا يوجد سجلات",
                "paginate": {
                    "first": "الأول",
                    "last": "الأخير",
                    "next": "التالي",
                    "previous": "السابق"
                },
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
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


function compareTwoDates(date1, date2) {
    if ((new Date(date1).getTime() > new Date(date2).getTime())) {
        return false;
    }
    else {
        return true;
    }
}

var buildFilter = function () {

    //field = $(this).find('.FilterValue').attr("data");
    //op = $(this).find('.FilterOperation').val();
    //data = $(this).find('.FilterValue').val();
    var result = { "field": 1, "op": 1, "data": 1 };
    return result;

}
