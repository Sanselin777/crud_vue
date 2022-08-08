<template>
  <b-modal
    ref="modal-add-edit-users"
    @hidden="$emit('hidden')"
    :ok-title="title"
    cancel-title="Cancel"
    :title="`${title} User`"
    size="lg"
    @ok.prevent="onSubmit"
    :hide-footer="onlyView"
  >
    <ValidationObserver ref="form">
      <b-form @submit.prevent="onSubmit">
        <!-- Name/Lastname -->
        <b-row class="my-3">
          <b-col md="6">
            <ValidationProvider
              name="Name"
              v-slot="{ errors }"
              rules="required"
            >
              <b-form-group label="Name:" label-for="name">
                <b-form-input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Enter name"
                  :readonly="updateModal || onlyView"
                ></b-form-input>
                <span class="text-danger">{{ errors[0] }}</span>
              </b-form-group>
            </ValidationProvider>
          </b-col>
          <b-col md="6">
            <ValidationProvider
              name="Lastname"
              v-slot="{ errors }"
              rules="required"
            >
              <b-form-group label="Lastname:" label-for="lastname">
                <b-form-input
                  id="lastname"
                  v-model="form.lastname"
                  type="text"
                  placeholder="Enter lastname"
                  :readonly="updateModal || onlyView"
                ></b-form-input>
                <span class="text-danger">{{ errors[0] }}</span>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>

        <!-- Bithdate / DNI -->
        <b-row class="my-3">
          <b-col md="6">
            <ValidationProvider
              name="Birthdate"
              v-slot="{ errors }"
              rules="required"
            >
              <b-form-group label="Birthdate:" label-for="birthdate">
                <b-form-datepicker
                  id="birthdate"
                  v-model="form.birthdate"
                  placeholder="Enter birthdate"
                  :disabled="onlyView"
                ></b-form-datepicker>
                <span class="text-danger">{{ errors[0] }}</span>
              </b-form-group>
            </ValidationProvider>
          </b-col>
          <b-col md="6">
            <ValidationProvider
              name="DNI"
              v-slot="{ errors }"
              rules="required|digits:8"
            >
              <b-form-group label="DNI:" label-for="dni">
                <b-form-input
                  id="dni"
                  v-model="form.dni"
                  maxlength="8"
                  type="number"
                  placeholder="Enter DNI"
                  :readonly="onlyView"
                ></b-form-input>
                <span class="text-danger">{{ errors[0] }}</span>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>

        <!-- GENDERS /STATUS -->
        <b-row class="my-3">
          <b-col md="6">
            <ValidationProvider
              name="Gender"
              v-slot="{ errors }"
              rules="required"
            >
              <b-form-group label="Gender:" label-for="gender">
                <b-form-select
                  class="form-control"
                  id="gender"
                  v-model="form.gender_id"
                  :options="S_GENDERS"
                  value-field="id"
                  text-field="description"
                  :disabled="onlyView"
                ></b-form-select>
                <span class="text-danger">{{ errors[0] }}</span>
              </b-form-group>
            </ValidationProvider>
          </b-col>
          <b-col md="6">
            <b-form-group label="Status:" label-for="status">
              <b-form-radio-group
                id="status"
                v-model="form.status_id"
                :options="S_STATUSES"
                value-field="id"
                text-field="description"
                :disabled="onlyView"
              ></b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Email/Password -->
        <b-row class="my-3">
          <b-col md="6">
            <ValidationProvider
              name="Email"
              v-slot="{ errors }"
              rules="required|email"
            >
              <b-form-group label="Email:" label-for="email">
                <b-form-input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email"
                  :readonly="updateModal || onlyView"
                ></b-form-input>
                <span class="text-danger">{{ errors[0] }}</span>
                <span v-if="repeatedEmail" class="text-danger"
                  >Repeated email, try another
                </span>
              </b-form-group>
            </ValidationProvider>
          </b-col>
          <b-col md="6">
            <ValidationProvider
              name="Password"
              v-slot="{ errors }"
              rules="required"
            >
              <b-form-group label="Password:" label-for="password">
                <b-form-input
                  id="password"
                  v-model="form.password"
                  type="password"
                  placeholder="Enter password"
                  :readonly="updateModal || onlyView"
                ></b-form-input>
                <span class="text-danger">{{ errors[0] }}</span>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </b-modal>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "ModalAddEditUsers",

  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
    onlyView: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        id: null,
        name: "",
        lastname: "",
        email: "",
        password: "",
        birthdate: "",
        dni: null,
        gender_id: 1,
        status_id: 1,
      },
      repeatedEmail: false,
    };
  },
  mounted() {
    if (this.user?.id) {
      this.form = {
        ...this.user,
      };
    }

    this.toggleModal();
  },
  computed: {
    ...mapState(["S_USERS", "S_STATUSES", "S_GENDERS"]),
    ...mapGetters(["G_USERS"]),

    updateModal() {
      return this.form.id ? true : false;
    },
    title() {
      return this.onlyView ? "View" : this.updateModal ? "Update" : "Create";
    },
  },

  methods: {
    ...mapMutations(["M_INSERT_USER", "M_UPDATE_USER", "M_SHOW_OVERLAY"]),
    toggleModal() {
      this.$refs["modal-add-edit-users"].toggle();
    },
    async onSubmit() {
      const validate = await this.$refs.form.validate();
      if (validate) {
        this.M_SHOW_OVERLAY(true);
        const age = this.calculateAge(this.form.birthdate);
        this.form.age = age;

        //Insert
        if (!this.updateModal) {
          this.insertUser();
        }

        //Update
        if (this.updateModal) {
          this.M_UPDATE_USER(this.form);
        }

        this.toggleModal();
        setTimeout(() => {
          this.M_SHOW_OVERLAY(false);
          this.$emit("hidden");
        }, 1000);
      }
    },
    insertUser() {
      this.validEmail();
      if (this.repeatedEmail) {
        this.M_SHOW_OVERLAY(false);
        return;
      }
      this.form.id = this.G_USERS.length + 1;
      this.M_INSERT_USER(this.form);
    },
    calculateAge(birthdate) {
      const today = new Date();
      const birthDate = new Date(birthdate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    validEmail() {
      const email = this.S_USERS.some((user) => {
        return user.email === this.form.email;
      });

      if (email) {
        this.repeatedEmail = true;
      }
    },
  },
  watch: {
    "form.email"() {
      this.repeatedEmail = false;
    },
  },
};
</script>

<style>
</style>