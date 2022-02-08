<template>
  <div
    class="mt-4 flex items-center justify-center flex-col space-y-4 rounded-lg p-4 space-y-2 overflow-hidden"
  >
    <form
      @submit="loginFn"
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
      />
    </form>
    <p>
      You don't have an account?
      <a class="underline" href="/register">Register here</a>
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginFn: async function (e: any) {
      e.preventDefault();
      const data = await this.$axios.$post(
        "http://localhost:4000/api/users/login",
        {
          username: this.username,
          password: this.password,
        }
      );
      if (!data.error) {
        localStorage.setItem("token", data.token);
        window.localStorage.setItem("user", JSON.stringify(data.user));
        this.$router.push("/");
      } else {
        alert(data.msg);
      }
    },
  },
};
</script>
