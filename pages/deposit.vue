<template>
  <div
    class="mt-4 flex items-center justify-center flex-col space-y-4 rounded-lg p-4 space-y-2 overflow-hidden"
  >
    <form
      @submit="depositFn"
      class="w-2/6 flex justify-center flex-col space-y-4 bg-white rounded-lg p-4 space-y-2 overflow-hidden"
    >
      <input
        class="p-2 rounded border border-solid"
        type="text"
        placeholder="Amount to deposit"
        v-model="deposit"
      />
      <input
        class="cursor-pointer p-2 rounded border border-solid"
        type="submit"
        value="Deposit"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { getUserToken } from "./../utils";

export default {
  name: "DepositPage",
  data() {
    return {
      deposit: "",
    };
  },
  methods: {
    depositFn: async function (e: any) {
      e.preventDefault();
      const data = await this.$axios.$post(
        "http://localhost:4000/api/deposit",
        {
          amount: +this.deposit,
        },
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );
      if (!data.error) {
        alert(data.msg);
        this.$router.push("/");
        // window?.location?.reload();
      } else {
        alert(data.msg);
      }
    },
  },
};
</script>
