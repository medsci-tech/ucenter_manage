Vue.config.delimiters = ["[[", "]]"];
var login = new Vue({
    el: 'body',
    data: {
        phone: '',
        code: '',
        error_msg: ''
    },
    methods: {
        get_code: function(e) {
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!myreg.test(this.phone)) {
                this.error_msg = 'please input right phone number'
            } else {
                $(e.target).attr('disabled', 'disabled');
                $.get('get_code/' + this.phone, {}, function(data) {
                    if (data.error) {
                        login.error_msg = data.msg;
                    }else{
                        $('#phone').attr('readonly','readonly');
                    }
                });
                var i = 61;
                timer();

                function timer() {
                    i--;
                    $(e.target).text('resend after ' + i + 'sec');
                    if (i == 0) {
                        clearTimeout(timer);
                        $(e.target).removeAttr("disabled");
                        $(e.target).text('resend');
                    } else {
                        setTimeout(timer, 1000);
                    }
                }
            }
        },
        login: function() {
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!myreg.test(this.phone)) {
                this.error_msg = 'please input right phone number'
            } else {
                $('#submit_btn').attr('disabled', 'disabled');
                $.get('check_code/' + this.phone + '/' + this.code, {}, function(data) {
                    if (data.error) {
                        login.error_msg = data.msg;
                        $('#submit_btn').attr('disabled', 'disabled');
                    }
                });
            }
        }
    }
});
