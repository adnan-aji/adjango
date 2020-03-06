$(document).ready(function () {
    $('form').submit(function () {
        //$('button').attr('disabled', true).text('Please wait ...');
    });
    //Get the checkboxes and disable them
    var boxes = $('input[type=checkbox]').attr('disabled', true);

    //Get the preview image and set the onload event handler
    var cpreview = $('#cardpreview').load(function () {
        setPreview();
        $('#confirmCardUploadImageid').show();
        ias.setOptions({
            x1: 0,
            y1: 0,
            x2: $(this).width(),
            y2: $(this).height(),
            show: true
        });
    });

    //Set the 4 coordinates for the cropping
    var setPreview = function (x, y, w, h) {
        $('#cX').val(x || 0);
        $('#cY').val(y || 0);
        $('#cWidth').val(w || cpreview[0].naturalWidth);
        $('#cHeight').val(h || cpreview[0].naturalHeight);
    };

    //Initialize the image area select plugin
    var ias = cpreview.imgAreaSelect({
        handles: true,
        instance: true,
        parent: 'body',
        onSelectEnd: function (s, e) {
            var scale = cpreview[0].naturalWidth / cpreview.width();
            var _f = Math.floor;
            setPreview(_f(scale * e.x1), _f(scale * e.y1), _f(scale * e.width), _f(scale * e.height));
        }
    });

    //Check one of the checkboxes
    var setBox = function (filter) {
        boxes.attr('checked', false)
            .filter(filter).attr({ 'checked': true, 'disabled': false });
    };

    //Initial state of X, Y, Width and Height is 0 0 1 1
    setPreview(0, 0, 1, 1);

    //Flickr

    //What happens if the URL changes?
    $('#cUrl').change(function () {
        setBox('#cIsUrl');
        cpreview.attr('src', this.value);
    });

    //What happens if the File changes?
    $('#cFile').change(function (evt) {
        var f = evt.target.files[0];
        var reader = new FileReader();

        if (!f.type.match('image.*')) {
            alert("The selected file does not appear to be an image.");
            return;
        }

        setBox('#cIsFile');
        reader.onload = function (e) { cpreview.attr('src', e.target.result); };
        reader.readAsDataURL(f);
        $('#submitImageCardDelivering').attr('disabled', false);
    });

    //What happens if any checkbox is checked ?!
    boxes.change(function () {
        setBox(this);
        $('#' + this.id.substr(2)).change();
    });

    //Form button enable / disable
});

