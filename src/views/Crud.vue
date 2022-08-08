<template>
  <b-overlay :show="S_SHOW_OVERLAY" rounded="sm">
    <template #overlay>
      <div class="text-center">
        <b-icon icon="stopwatch" font-scale="5" animation="cylon"></b-icon>
        <p class="h3">Please wait...</p>
      </div>
    </template>
    <b-container class="my-3 h-container">
      <CrudNav @add-user="openModalAddEdit({}, false)" />

      <template v-if="!S_SHOW_OVERLAY">
        <b-table-simple class="my-3" striped responsive>
          <b-thead>
            <b-tr>
              <b-th>#</b-th>
              <b-th>User</b-th>
              <b-th>DOB</b-th>
              <b-th>Gender</b-th>
              <b-th>Age</b-th>
              <b-th>Email</b-th>
              <b-th>Dni</b-th>
              <b-th>Status</b-th>
              <b-th>Actions</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(user, index) in G_USERS" :key="index">
              <b-td>{{ index + 1 }}</b-td>
              <b-td>{{ user.name }} {{ user.lastname }}</b-td>
              <b-td>{{ user.birthdate }}</b-td>
              <b-td>{{ user.gender_description }}</b-td>
              <b-td>{{ user.age }}</b-td>
              <b-td>{{ user.email }}</b-td>
              <b-td>{{ user.dni }}</b-td>
              <b-td>{{ user.status_description }}</b-td>
              <b-td>
                <b-button
                  @click="openModalAddEdit(user, true)"
                  size="sm"
                  variant="info"
                >
                  <b-icon icon="eye"></b-icon>
                </b-button>
                <b-button
                  @click="openModalAddEdit(user, false)"
                  size="sm"
                  variant="warning"
                  class="mx-2"
                >
                  <b-icon icon="pencil-square"></b-icon>
                </b-button>
                <b-button
                  @click="deleteUser(user, index)"
                  size="sm"
                  variant="danger"
                >
                  <b-icon icon="trash"></b-icon> </b-button
              ></b-td>
            </b-tr>
          </b-tbody>
          <b-tfoot>
            <b-tr>
              <b-td colspan="9" variant="secondary" class="text-right">
                Total Users: <b>{{ G_USERS.length }}</b>
              </b-td>
            </b-tr>
          </b-tfoot>
        </b-table-simple>

        <!-- CHARTS -->
        <b-button
          variant="primary"
          @click="showGenders = !showGenders"
          class="mt-5"
        >
          <b-icon icon="arrow-return-left"></b-icon> {{ buttonTitle }}</b-button
        >

        <BarChart
          v-show="showGenders"
          :labelsChart="['Male', 'Female']"
          :dataChart="[G_COUNT_MALE, G_COUNT_FEMALE]"
          :backgroundColorChart="['#2d64d9', '#db61c0']"
        />
        <BarChart
          v-show="!showGenders"
          :labelsChart="['0-12', '12-18', '18-60', '60-']"
          :dataChart="[
            G_COUNT_AGE_0_12,
            G_COUNT_AGE_12_18,
            G_COUNT_AGE_18_60,
            G_COUNT_AGE_60_,
          ]"
          :backgroundColorChart="['#db61c0', '#2d64d9', '#6fe88b', '#171717']"
        />

        <ModalAddEditUsers
          v-if="openModal"
          :user="selectedUser"
          :onlyView="onlyView"
          @hidden="openModal = false"
        />
      </template>
    </b-container>
  </b-overlay>
</template>

<script>
import ModalAddEditUsers from "./ModalAddEditUsers.vue";
import CrudNav from "./CrudNav.vue";
import BarChart from "./BarChart.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "Crud",
  components: {
    ModalAddEditUsers,
    BarChart,
    CrudNav,
  },
  mounted() {
    console.log(this.G_COUNT_AGE_12_18);
    setTimeout(() => {
      this.M_SHOW_OVERLAY(false);
    }, 2000);
  },
  data() {
    return {
      openModal: false,
      selectedUser: {},
      showGenders: true,
      onlyView: false,
    };
  },
  computed: {
    ...mapState(["S_USERS", "S_STATUSES", "S_GENDERS", "S_SHOW_OVERLAY"]),
    ...mapGetters([
      "G_USERS",
      "G_COUNT_MALE",
      "G_COUNT_FEMALE",
      "G_COUNT_AGE_0_12",
      "G_COUNT_AGE_12_18",
      "G_COUNT_AGE_18_60",
      "G_COUNT_AGE_60_",
    ]),
    buttonTitle() {
      return this.showGenders ? "Ages" : "Genders";
    },
  },
  methods: {
    ...mapMutations(["M_DELETE_USER", "M_SHOW_OVERLAY"]),
    openModalAddEdit(user, onlyView) {
      this.onlyView = onlyView;
      this.selectedUser = user;
      this.openModal = true;
    },
    closeModalAddEdit() {
      this.openModal = false;
    },
    async deleteUser(user, index) {
      try {
        const confirm = await this.$bvModal.msgBoxConfirm(
          `Please confirm that you want to delete the user  ${user.name} ${user.lastname}`,
          {
            title: "Please Confirm",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        );
        if (confirm) {
          this.M_DELETE_USER(index);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.text-right {
  text-align: right;
}
.h-container {
  min-height: 100vh;
}
</style>
