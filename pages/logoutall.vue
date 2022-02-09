<template>
  <fragment>
    <div
      class="mt-4 flex items-center justify-center flex-col space-y-4 rounded-lg p-4 space-y-2 overflow-hidden"
    >
      <h2>Sessions</h2>
    </div>
    <div
      class="mt-4 flex items-center justify-center flex-col space-y-4 rounded-lg p-4 space-y-2 overflow-hidden"
    >
      <form
        @submit="logOutAllFn"
        class="w-2/6 flex justify-center flex-col space-y-4 bg-white rounded-lg p-4 space-y-2 overflow-hidden"
      >
        <input
          class="p-2 rounded border border-solid"
          type="text"
          placeholder="Username"
          v-model="username"
        />
        <input
          class="p-2 rounded border border-solid"
          type="password"
          placeholder="Password"
          v-model="password"
        />

        <input
          class="cursor-pointer p-2 rounded border border-solid"
          type="submit"
          value="Log Out All"
        />
      </form>
    </div>
  </fragment>
</template>

<script lang="ts">
import { getUserToken, getUserObj } from "./../utils";

export default {
  name: "LogOutAllPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    logOutAllFn: async function (e: any) {
      e.preventDefault();
      try {
        const data = await this.$axios.$post(
          "http://localhost:4000/api/users/logout/all",
          {
            username: this.username,
            password: this.password,
          },
          {
            headers: {
              Authorization: `Bearer ${getUserToken()}`,
            },
          }
        );
        if (!data.error) {
          this.$router.push("/login");
        }
      } catch (error) {}
    },
  },
};
</script>
