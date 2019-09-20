import 'bootstrap';
import bootbox from 'bootbox';
import { userService } from "../_services";
import { constants } from "../_helpers/constants";

const template = "<form id='userform' name='userform' class='form' role='form' autocomplete='off'>" +
                  "<div class='form-group'>" +
                    "<label for='photo'>Photo URL</label>" +
                    "<input type='url' class='form-control' id='photo' name='photo' placeholder='Enter photo url' value='' autocomplete='off' required/>" +
                  "</div>" +
                  "<div class='form-group'>" +
                    "<label for='firstName'>First Name</label>" +
                    "<input type='text' class='form-control' id='firstName' name='firstName' placeholder='Enter firstname' value='' autocomplete='off' required min='5' max='50' />" +
                  "</div>" +
                  "<div class='form-group'>" +
                    "<label for='lastName'>Last Name</label>" +
                    "<input type='text' class='form-control' id='lastName' name='lastName' placeholder='Enter lastname' value='' autocomplete='off' required min='5' max='50' />" +
                  "</div>" +
                "</form>";

const state = {
    all: {}
};

const actions = {
    getAll({ commit }, pagination) {
        commit("getAllRequest");

        userService.getAll(pagination)
            .then(
                users => commit("getAllSuccess", users),
                error => commit("getAllFailure", error)
            );
    },
    createUser({ dispatch, commit }, user) {
        userService.createUser(user)
            .then(
                user => {
                    dispatch("alert/success", constants.USER_CREATED, { root: true });
                },
                error => {
                    dispatch("alert/error", error.toString(), { root: true });
                }
            );
    },
    delete({ dispatch, commit }, id) {
        const deffered = $.Deferred();
        commit("deleteRequest", id);

        dispatch("alert/confirmation", constants.USER_DELETE_CONF, { root: true }).then((res) => {
            userService.delete(id)
                .then(
                    user => {
                        dispatch("alert/default", constants.USER_DELETED, { root: true });
                        deffered.resolve(user);
                    },
                    error => {
                        dispatch("alert/error", error.toString(), { root: true });
                        deffered.reject(error);
                    }
                );
        }, (error) => {
            deffered.reject(error);
        });

        return deffered.promise();
    }, 
    add({ dispatch }) {
        const deffered = $.Deferred();
        bootbox.dialog({
            title: "Add User",
            message: template,
            size: "medium",
            buttons: {
                confirm: {
                    label: "Save",
                    className: "btn-success",
                    callback: function(){
                        var data = $("userform").serialize();
                        console.log(data);
                        deffered.resolve(data);
                    }
                },
                cancel: {
                    label: "Cancel",
                    className: "btn-danger",
                    callback: function(error){
                        deffered.reject(error);
                    }
                }
            }
        });
        
        return deffered.promise();
    }, 
    edit({ dispatch }, user) {
        const deffered = $.Deferred();
        bootbox.dialog({
            title: "Add User",
            message: template,
            size: "medium",
            buttons: {
                confirm: {
                    label: "Save",
                    className: "btn-success",
                    callback: function(){
                        deffered.resolve(data);
                    }
                },
                cancel: {
                    label: "Cancel",
                    className: "btn-danger",
                    callback: function(error){
                        deffered.reject(error);
                    }
                }
            }
        });
        
        return deffered.promise();
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, users) {
        state.all = { items: users };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items.data = state.all.items.data.map(user =>
            user.id === id ? { ...user, deleting: true } : user
        );
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};
