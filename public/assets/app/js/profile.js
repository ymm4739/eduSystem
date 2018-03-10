/**
 * Created by youyouzh on 2018/1/5.
 */

// toast global option
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

$('#form-update_profile-submit').on('click', function() {
    var form_data = $('#form-update_profile').serialize();

    var form_validate = $('#form-update_profile').closest('form');
    form_validate.validate({
        rules: {
            avatar: {
                required: true,
                url: true
            },
            company: {
                required: true
            }
        },
        messages: {
            avatar: {
                required: '请输入头像地址！',
                url: '请输入正确的url地址'
            },
            company: {
                required: '请输入公司名称！'
            }
        }
    });

    if (!form_validate.valid()) {
        return false;
    }

    form_data += '&id=' + $('#u-user').attr('data-user_id');
    $.post('update_profile', form_data, function(ret){
        if (ret.code !== 0) {
            toastr.error("修改个人信息失败: " + ret.message, "修改失败");
            return false;
        }
        location.reload();
        toastr.success("您已经成功更新了您的个人资料", "更新成功");
    });
});

$('#form-modify_password-submit').on('click', function() {
    var form_data = $('#form-modify_password').serialize();

    var form_validate = $('#form-modify_password').closest('form');

    form_validate.validate({
        rules: {
            old_password: {
                required: true
            },
            new_password: {
                required: true,
                minlength: 6
            },
            confirm_password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            old_password: {
                required: '请输入原始密码！'
            },
            new_password: {
                required: '请输入新密码！',
                minlength: '密码长度最少为6位'
            },
            confirm_password: {
                required: '请输入重复密码',
                minlength: '密码长度最少为6位'
            }
        }
    });

    if (!form_validate.valid()) {
        return false;
    }

    form_data += '&id=' + $('#u-user').attr('data-user_id');
    $.post('modify_password', form_data, function(ret) {
        if (ret.code !== 0) {
            toastr.error("修改密码失败: " + ret.message, "修改失败");
            return false;
        }
        if (ret.data.redirect) {
            location.href = ret.data.redirect;
        }
        toastr.success("您已经成功修改密码", "修改成功");
    })
});