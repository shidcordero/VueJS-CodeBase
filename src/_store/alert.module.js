import 'bootstrap';
import bootbox from 'bootbox';

const actions = {
    default({ },  message, title = "Info", size = "medium", confirmText = "Ok") {
        bootbox.alert({
            title,
            message,
            size,
            buttons: {
                ok: {
                    label: confirmText,
                    className: "btn-success"
                }
            }
        });
    },
    error({ }, message) {
        bootbox.alert({
            title: "Error",
            message,
            size: "medium",
            buttons: {
                ok: {
                    label: "Ok",
                    className: "btn-success"
                }
            }
        });
    },
    confirmation({ }, message, title = "Confirm", size = "medium", confirmText = "Yes", canceltext = "No") {
        const deffered = $.Deferred();

        bootbox.confirm({
            title,
            message,
            size,
            buttons: {
                confirm: {
                    label: confirmText,
                    className: "btn-success"
                },
                cancel: {
                    label: canceltext,
                    className: "btn-danger"
                }
            },
            callback: (result) => {
                if (result) {
                    deffered.resolve(result);
                } else {
                    deffered.reject(result);
                }
            }
        });

        return deffered.promise();
    }
};

export const alert = {
    namespaced: true,
    actions
};
