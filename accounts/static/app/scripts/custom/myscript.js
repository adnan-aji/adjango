function FillDBNames() {
    var datasource = $('#DataSource').val();
    var dbtypeid = $('#DBTypeId').val();
    var userid = $('#DBUserName').val();
    var password = $('#DBPassword').val();
    var integratedsecurity = $('input[name="IntegratedSecurity"]:checked').length>0;
    $.ajax({
        url: "/Systems/GetDBNames",
        type: "GET",
        dataType: "JSON",
        data: { dataSource: datasource, dbTypeId: dbtypeid, userId: userid, password: password, integratedSecurity: integratedsecurity },
        success: function (dbNames) {
            $("#DBName").html("");
            $("#DBName").append($('<option></option>').val("").html("Choose"));
            $.each(dbNames, function (i, dbName) {
                $("#DBName").append($('<option></option>').val(dbName).html(dbName));
            });
        }
    });
}

function DisableMe(checkboxid, elements) {
    var checkbox = document.getElementById(checkboxid);
    if (checkbox != null) {
        for (var i = 0; i < elements.length; i++)
            if (document.getElementById(elements[i]) != null)
                document.getElementById(elements[i]).disabled = checkbox.checked;
    }
}

function GetConnectionString() {
    var datasource = $('#DataSource').val();
    var dbtypeid = $('#DBTypeId').val();
    var userid = $('#DBUserName').val();
    var password = $('#DBPassword').val(); 
    var integratedsecurity = $('input[name="IntegratedSecurity"]:checked').length > 0;
    var dbname = $('#DBName').val();
    $.ajax({
        url: "/Systems/GetConnectionString",
        type: "GET",
        dataType: "JSON",
        data: { dataSource: datasource, dbTypeId: dbtypeid, userId: userid, password: password, integratedSecurity: integratedsecurity, dbName: dbname },
        success: function (ConnectionString) {
            $("#ConnectionString").val("");
            $("#ConnectionString").val(ConnectionString);
        }
    });
}