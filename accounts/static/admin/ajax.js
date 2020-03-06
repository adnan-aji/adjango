$(window).on('load', function () {
    $.ajax({

        type: 'POST',
        url: '/account/student/create/',
        data: {
            req: 'get_from',
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        },
        success: function (context) {
            fill_table(context, "std_for_table");

        },
        error: function () {
            alert("Holly shitt");
        }

    })
})

function fill_table(context, named_class) {
    let _std_for_table = "";
    let i;


    for (i = 0; i < context.length; i++) {
        _std_for_table += '' +
            '        <tr id="focus_on_' + context[i].pk + '"+>\n' +
            '                        <td>' + context[i].pk + '' +
            '</td>\n' +
            '<td> <a class="accordion-toggle btn btn-success btn-xs fa fa-arrows" id=' + context[i].pk + ' data-toggle="collapse" onclick="View_Detailes(this.id);" data-target="#Student' + context[i].pk + '"></a> </td>\n' +
            '</tr>\n' + '<tr id="std_' + context[i].pk + '">\n' +
            ' </tr>';
    }
    $("." + named_class).html("");
    $(".std_for_table").html(_std_for_table);
}

$(document).ready(function () {
    $('#example').DataTable({
        columnDefs: [{
            targets: [0],
            orderData: [0, 1]
        }, {
            targets: [1],
            orderData: [1, 0]
        }, {
            targets: [3],
            orderData: [3, 0]
        }]
    });
});

let data1 = [
    {
        id: "Female",
        text: '<div >Female</div>',
        html: '<div >Female</div>',
        title: 'enchancement'
    },
    {
        id: "Male",
        text: '<div >Male</div>',
        html: '<div >Male</div>',
        title: 'bug'
    },
];

$("#gender").select2({
    data: data1,
    escapeMarkup: function (markup) {
        return markup;
    },
    templateResult: function (data) {
        return data.html;
    },
    templateSelection: function (data) {
        return data.text;
    }
})

function View_Detailes(s_id) {

    st_id = s_id;
    $.ajax({
        type: 'POST',
        data: {
            req: "get_more_info",
            sel_student: st_id,
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        },
        url: '/account/student/create/',
        error: function () {
            alert("Wrong code for getting more infos");
        },
        success: function (context) {
            let html_std = '                        <td class="col-12 accordion-body " id="Student' + context[0].pk + '">\n' +
                '                            <table class="table col-12">\n' +
                '                                <thead>\n' +
                '                                <th>ID</th>\n' +
                '                                <th>Name</th>\n' +
                '                                <th>Gender</th>\n' +
                '                                <th>Salary</th>\n' +
                '                                </thead>\n' +
                '                                <tbody>\n' +
                '                                <tr>\n' +
                '                                    <td>' + context[0].pk + '</td>\n' +
                '                                    <td>' + context[0].fields.name + '</td>\n' +
                '                                    <td>' + context[0].fields.Gender + '</td>\n' +
                '                                    <td>' + context[0].fields.Salary + '</td>\n' +
                '                                </tr>\n' +
                '                                </tbody>\n' +
                '                            </table>\n' +
                '                        </td>\n';
            alert("D");
            $("#std_" + s_id).html(html_std);
            $("#"+s_id).attr('onclick',"");
           // $("#std_"+s_id).attr('class',$("#std_"+s_id).getAttribute('class').toString()+" collapse");
        }
    })
}

let data;
students = $(document).on('submit', '#std_form', function (e) {
    e.preventDefault();
    let val=parseInt($('#std_id').val());
    $.ajax({
        type: 'POST',
        url: '/account/student/create/',
        data: {
            std_id: parseInt($('#std_id').val()),
            name: $('#std_name').val(),
            Gender: $('#gender').val(),
            salary: $('#std_salary').val().toString(),
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
            req: 'save_to'
        },
        success: function (context) {
            $("#std_form")[0].reset();
            $("#mess").html("<strong>" + "Successfully added" + "</strong>");
            let std_for_table = "";
            let i;
            fill_table(context, "std_for_table");
            $("#myModal").modal('toggle');
            $("#focus_on_"+val).focus();
            alert("#focus_on_"+val);
         },
        error: function () {

            $("#mess").html("<strong>" + "Already there is one with the same ID" + "</strong>");
        }
    })
})
