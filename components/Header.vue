<template>
  <header class="flex items-center py-1 px-4 md:px-6 min-h-15 bg-white shadow">
    <div
      class="logo-cnt flex items-center inline-flex py-2 px-0.5 -m-0.5 leading-none rounded focus-visible:ring-2 ring-offset-2 transition-all outline-none"
    >
      <h1 class="text-xl font-bold p-4">Vending Machine</h1>
    </div>
    <nav
      class="hidden md:flex flex-1 items-center md:mx-6 lg:mx-16 md:space-x-1 lg:space-x-4 xl:space-x-6"
    >
      <a
        href="/"
        class="py-2 px-2 lg:px-4 hover:bg-linen rounded focus-visible:ring-2 ring-offset-2 transition-all outline-none"
      >
        Products
      </a>
      <a
        href="/deposit"
        class="py-2 px-2 lg:px-4 hover:bg-linen rounded focus-visible:ring-2 ring-offset-2 transition-all outline-none"
        v-if="user.role == 'buyer'"
      >
        Deposit
      </a>
      <a
        href="#!"
        class="py-2 px-2 lg:px-4 hover:bg-linen rounded focus-visible:ring-2 ring-offset-2 transition-all outline-none"
        @click="resetFn"
        v-if="user.role == 'buyer'"
      >
        Reset
      </a>
      <a
        href="/addproduct"
        class="py-2 px-2 lg:px-4 hover:bg-linen rounded focus-visible:ring-2 ring-offset-2 transition-all outline-none"
        v-if="user.role == 'seller'"
      >
        Add Products
      </a>
    </nav>
    <div>
      <button v-if="user.username && user.role && token" @click="logoutFn">
        Log Out
      </button>
    </div>
  </header>
</template>
<script lang="ts">
import Vue from "vue";
import { getUserToken, getUserObj } from "./../utils";

export default Vue.extend({
  data() {
    return {
      token: null,
      user: {},
    };
  },
  watch: {
    $route(to, from) {
      const token = getUserToken();
      this.token = token;
      this.user = getUserObj();
    },
  },
  async created() {
    const token = getUserToken();
    this.token = token;
    this.user = getUserObj();
  },
  methods: {
    resetFn: async function () {
      const data = this.$axios.$post(
        "http://localhost:4000/api/reset",
        {},
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      if (!data.error) {
        window?.location?.reload();
      }
    },
    logoutFn: async function () {
      const data = await this.$axios.$post(
        "http://localhost:4000/api/users/logout",
        {
          id: this.user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      if (!data.error) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        this.token = null;
        this.user = {};
        this.$router.push("/login");
      } else {
        alert(data.error);
      }
    },
  },
});
</script>
