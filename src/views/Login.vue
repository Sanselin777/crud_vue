<template>
  <div class="p-content">
    <div class="top-brand d-flex justify-content-start align-items-center">
      <h2 class="mb-0 ml-3 brand-text text-nowrap">MY SYSTEM</h2>
    </div>
    <div class="p-content-left">
      <img
        src="@/assets/images/login.svg"
        alt="Fonde del login"
        class="img-fluid"
      />
    </div>
    <div class="p-content-right">
      <div class="m-content-auth">
        <h2 class="m-auth-title text-custom">WELCOME TO MY SYSTEM!</h2>
        <p class="m-auth-descript text-custom">Please log in to your account</p>
        <ValidationObserver v-slot="{ invalid }" ref="form">
          <form id="login" method="POST" @submit.prevent="doLogin">
            <ValidationProvider
              name="Email"
              rules="required|email"
              v-slot="{ errors }"
            >
              <b-form-group
                label="Email"
                label-for="email"
                label-align="left"
                class="text-custom"
              >
                <b-form-input
                  class="m-form-input"
                  id="email"
                  type="text"
                  v-model.trim="user.email"
                  placeholder="user@smartroosterbureau.us"
                />
                <span v-if="invalidEmail" class="text-danger"
                  >Invalid Email</span
                >
                <span class="text-danger">{{ errors[0] }}</span>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              name="Password"
              rules="required"
              v-slot="{ errors }"
            >
              <b-form-group
                label="Password"
                label-for="password"
                label-align="left"
                class="text-custom"
              >
                <b-input-group>
                  <template #append>
                    <span
                      class="
                        d-flex
                        justify-content-center
                        align-items-center
                        px-3
                        text-custom
                        eye-content
                        h-100
                      "
                      @click="toggleInputTypeHandle"
                    >
                      <b-icon-eye v-if="toggleInputType == 'password'" />
                      <b-icon-eye-slash v-else />
                    </span>
                  </template>
                  <b-form-input
                    class="m-form-input"
                    id="password"
                    :type="toggleInputType"
                    v-model="user.password"
                    placeholder="············"
                  />
                </b-input-group>
                <span v-if="invalidPassword" class="text-danger"
                  >Invalid Password</span
                >
                <span class="text-danger">{{ errors[0] }}</span>
              </b-form-group>
            </ValidationProvider>

            <b-button
              block
              variant="primary"
              class="a-btn-submit mt-3"
              type="submit"
              tabindex="4"
              :disabled="invalid"
            >
              Log in
            </b-button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Login",

  mounted() {},
  data() {
    return {
      rememberMe: false,
      user: {
        email: "",
        password: "",
      },
      toggleInputType: "password",
      invalidEmail: false,
      invalidPassword: false,
    };
  },
  mounted() {},
  computed: {
    ...mapState(["S_USERS"]),
  },
  methods: {
    toggleInputTypeHandle() {
      this.toggleInputType =
        this.toggleInputType === "password" ? "text" : "password";
    },
    doLogin() {
      this.validEmail();
      if (!this.invalidEmail) {
        this.validPassword();
        if (!this.invalidPassword) {
          this.$router.push({
            name: "crud",
          });
        }
      }
    },
    validEmail() {
      const email = this.S_USERS.some((user) => {
        return user.email === this.user.email;
      });

      if (!email) {
        this.invalidEmail = true;
      }
    },
    validPassword() {
      const password = this.S_USERS.find((user) => {
        return user.email === this.user.email;
      })?.password;
      if (password !== this.user.password) {
        this.invalidPassword = true;
      }
    },
    cleanErrors() {
      this.invalidEmail = false;
      this.invalidPassword = false;
    },
  },
  watch: {
    "user.email"() {
      this.cleanErrors();
    },
    "user.password"() {
      this.cleanErrors();
    },
  },
};
</script>

<style>
:root {
  --sidebar-width: 30vw;
}
.p-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  max-height: 100vh;
  font-family: "Montserrat", Helvetica, Arial, serif;
}
.p-content-left {
  padding: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw - var(--sidebar-width));
}
.p-content-right {
  background-color: #283046;
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 4rem;
  width: var(--sidebar-width);
}

.top-brand {
  position: absolute;
  top: 2rem;
  left: 2rem;
  color: #7367f0;
}

.m-content-auth {
  width: 100%;
}

.p-content-brand {
  max-width: 100%;
  width: 82%;
}

.m-auth-title,
.m-auth-descript {
  color: #d0d2d6;
  text-align: start;
}
.m-auth-title {
  font-size: 24px;
}

.form-group label,
.a-label {
  font-size: 0.857rem;
}

.form-group input {
  color: #d0d2d6;
}

.m-form-input {
  background-color: transparent !important;
  border: 1px solid #404656;
  border-radius: 0.25rem;
}

.m-form-input[id="password"] {
  border-right: none;
}

.m-form-input:focus {
  color: #d0d2d6;
  border-color: #7367f0;
  box-shadow: inherit !important;
}
.eye-content {
  border: 1px solid #404656;
  border-radius: 0 0.25rem 0.25rem 0;
  border-left: none;
  cursor: pointer;
}
.input-group:focus-within .input-group-append .eye-content {
  border-color: #7367f0;
}

.a-btn-submit {
  border-color: #7367f0 !important;
  background-color: #7367f0 !important;
  color: #fff !important;
}
.a-btn-submit:not(:disabled):not(.disabled):active:focus {
  box-shadow: none !important;
}
.a-btn-submit:hover:not(.disabled):not(:disabled) {
  box-shadow: 0 8px 25px -8px #7367f0;
  cursor: pointer;
}
.text-custom {
  color: #d0d2d6;
}
.brand-text {
  line-height: 1;
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 700;
}
.box-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  outline: 1px solid #7367f0;
  border: 2px solid #283046;
}
.box-check-target {
  cursor: pointer;
}
.box-check:checked + .box-check-target .box-dot {
  background-color: #7367f0;
}

@media screen and (max-width: 90em) {
  .p-content-right {
    width: 40vw;
    padding: 3rem;
  }
  .m-content-auth {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 62em) {
  .top-brand {
    left: 50%;
    transform: translateX(-50%);
  }
  .p-content-left {
    display: none;
  }
  .p-content-right {
    width: 100%;
    padding: 2rem 15%;
  }
}

@media screen and (max-width: 40em) {
  .p-content-right {
    padding: 2rem;
  }
}
</style>
