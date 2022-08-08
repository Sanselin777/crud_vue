<template>
  <b-row>
    <b-col md="5">
      <h1>
        <b>CRUD USERS</b>
      </h1>
    </b-col>
    <b-col md="2" class="text-center">
      <b-button variant="success" @click="$emit('add-user')">
        <b-icon icon="plus-circle"></b-icon> Add User
      </b-button>
    </b-col>
    <b-col md="2" class="text-center">
      <b-form-input
        class="mr-sm-2"
        @keyup="search"
        v-model="searchUser"
        placeholder="Search"
      ></b-form-input>
    </b-col>
    <b-col offset-md="1" md="2" class="text-right">
      <b-button variant="primary" @click="$router.push({ name: 'home' })">
        <b-icon icon="wifi-off"></b-icon> Log out
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      searchUser: "",
    };
  },
  methods: {
    ...mapMutations(["M_SEARCH_USER"]),
    search() {
      this.M_SEARCH_USER(this.searchUser);
    },
  },
};
</script>

<style>
</style>