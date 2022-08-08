import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    S_USERS: [
      {
        id: 1,
        name: "Juan",
        lastname: "Perez",
        email: "new_user@gmail.com",
        password: "123456",
        birthdate: "2000-01-01",
        dni: "12345678",
        gender_id: 1,
        age: 22,
        status_id: 1,
      },
      {
        id: 2,
        name: "Daniel",
        lastname: "Vilches",
        email: "new_user1@gmail.com",
        password: "123456",
        birthdate: "1988-01-01",
        dni: "12345678",
        gender_id: 1,
        age: 34,
        status_id: 1,
      },
      {
        id: 3,
        name: "Ricardo",
        lastname: "Molina",
        email: "new_user2@gmail.com",
        password: "123456",
        birthdate: "2020-01-01",
        dni: "12345678",
        gender_id: 1,
        age: 2,
        status_id: 1,
      },
      {
        id: 4,
        name: "Domenica",
        lastname: "Perez",
        email: "new_user3@gmail.com",
        password: "123456",
        birthdate: "1970-01-01",
        dni: "12345678",
        gender_id: 2,
        age: 52,
        status_id: 2,
      },
      {
        id: 5,
        name: "Maria",
        lastname: "Rodriguez",
        email: "new_user4@gmail.com",
        password: "123456",
        birthdate: "1980-01-01",
        dni: "12345678",
        gender_id: 2,
        age: 42,
        status_id: 1,
      },
      {
        id: 6,
        name: "Lupe",
        lastname: "Barra",
        email: "new_user5@gmail.com",
        password: "123456",
        birthdate: "2010-01-01",
        dni: "12345678",
        gender_id: 2,
        age: 12,
        status_id: 1,
      },
      {
        id: 7,
        name: "Javier",
        lastname: "Reyes",
        email: "new_user6@gmail.com",
        password: "123456",
        birthdate: "2005-01-01",
        dni: "12345678",
        gender_id: 1,
        age: 17,
        status_id: 1,
      },
      {
        id: 8,
        name: "Alice",
        lastname: "Orellana",
        email: "new_user1@gmail.com",
        password: "123456",
        birthdate: "2015-01-01",
        dni: "12345678",
        gender_id: 2,
        age: 7,
        status_id: 1,
      },
    ],
    S_GENDERS: [
      {
        id: 1,
        description: "Male",
      },
      {
        id: 2,
        description: "Female",
      },
    ],
    S_STATUSES: [
      {
        id: 1,
        description: "Active",
      },
      {
        id: 2,
        description: "Inactive",
      },
    ],
    S_SHOW_OVERLAY: true,
    S_SEARCH_USER: "",
  },
  getters: {
    G_USERS(state) {
      //FIND GENDER DESCRIPTION AND STATUS DESCRIPTION
      const users = state.S_USERS.map((user) => {
        state.S_GENDERS.forEach((gender) => {
          if (gender.id === user.gender_id) {
            user.gender_description = gender.description;
          }
        });
        state.S_STATUSES.forEach((status) => {
          if (status.id === user.status_id) {
            user.status_description = status.description;
          }
        });
        return user;
      });
      //SEARCH USER
      const searchUser = users.filter((user) => {
        return (user.name + " " + user.lastname)
          .toLowerCase()
          .includes(state.S_SEARCH_USER.toLowerCase());
      });
      return searchUser;
    },
    G_COUNT_MALE(state) {
      //counte gender male
      return state.S_USERS.filter(({ gender_id }) => gender_id === 1).length;
    },
    G_COUNT_FEMALE(state) {
      //counte gender male
      return state.S_USERS.filter(({ gender_id }) => gender_id === 2).length;
    },
    G_COUNT_AGE_0_12(state) {
      return state.S_USERS.filter(({ age }) => age <= 12).length;
    },
    G_COUNT_AGE_12_18(state) {
      return state.S_USERS.filter(({ age }) => 12 < age && age <= 18).length;
    },
    G_COUNT_AGE_18_60(state) {
      return state.S_USERS.filter(({ age }) => 18 < age && age <= 60).length;
    },
    G_COUNT_AGE_60_(state) {
      return state.S_USERS.filter(({ age }) => age > 60).length;
    },
  },
  mutations: {
    M_INSERT_USER(state, user) {
      state.S_USERS.push(user);
    },
    M_UPDATE_USER(state, user) {
      console.log({ user });
      state.S_USERS.forEach((item, index) => {
        if (item.id === user.id) {
          Vue.set(state.S_USERS, index, user);
        }
      });
    },
    M_DELETE_USER(state, index) {
      state.S_USERS.splice(index, 1);
    },
    M_SHOW_OVERLAY(state, value) {
      state.S_SHOW_OVERLAY = value;
    },
    M_SEARCH_USER(state, value) {
      state.S_SEARCH_USER = value;
    },
  },
  actions: {},
  modules: {},
});
