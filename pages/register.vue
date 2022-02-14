<template>
  <div
    class="mt-4 flex items-center justify-center flex-col space-y-4 rounded-lg p-4 space-y-2 overflow-hidden"
  >
    <form
      @submit="registerFn"
      class="w-2/6 flex justify-center flex-col space-y-4 bg-white rounded-lg p-4 space-y-2 overflow-hidden"
    >
      <input
        class="p-2 rounded border border-solid"
        type="text"
        name="username"
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
        class="p-2 rounded border border-solid"
        type="password"
        placeholder="Re-type Password"
        v-model="retypePassword"
      />
      <input
        class="p-2 rounded border border-solid"
        type="number"
        placeholder="Deposit"
        v-model="deposit"
        v-if="selected === 'buyer'"
      />
      <div>
        <label for="cars">Choose a role:</label>

        <select v-model="selected" options="options">
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>

      <input
        class="cursor-pointer p-2 rounded border border-solid"
        type="submit"
      />
    </form>
    <p>Already have an account? <a class="underline" href="/login">Login</a></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "RegisterPage",
  data() {
    return {
      username: "",
      password: "",
      retypePassword: "",
      deposit: "",
      selected: "buyer",
    };
  },
  methods: {
    registerFn: async function (e: any) {
      try {
        e.preventDefault();
        if (this.password !== this.retypePassword)
          alert("Passwords does not match.");
        const data = await this.$axios.$post(
          "http://localhost:4000/api/users",
          {
            username: this.username,
            password: this.password,
            deposit: +this.deposit,
            role: this.selected,
          }
        );

        if (!data.error) {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("user", JSON.stringify(data.user));
          this.$router.push("/");
        }
      } catch (error) {
        alert(error);
      }
    },
  },
});
</script>
