<template>
  <div
    class="mt-4 flex items-center justify-center flex-col space-y-4 rounded-lg p-4 space-y-2 overflow-hidden"
  >
    <form
      @submit="addProductFn"
      class="w-2/6 flex justify-center flex-col space-y-4 bg-white rounded-lg p-4 space-y-2 overflow-hidden"
    >
      <input
        class="p-2 rounded border border-solid"
        type="text"
        placeholder="Product name"
        v-model="productName"
      />
      <input
        class="p-2 rounded border border-solid"
        type="text"
        placeholder="Amount available"
        v-model="amountAvailable"
      />
      <!--<input
        class="p-2 rounded border border-solid"
        type="text"
        placeholder="Cost"
        v-model="cost"
      />-->

      <div>
        <label for="cost">Cost:</label>

        <select v-model="cost" options="options">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <input
        class="cursor-pointer p-2 rounded border border-solid"
        type="submit"
        value="Add"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { getUserToken, getUserObj } from "./../utils";

export default {
  name: "AddProductPage",
  data() {
    return {
      productName: "",
      amountAvailable: "",
      cost: "5",
    };
  },
  methods: {
    addProductFn: async function (e: any) {
      e.preventDefault();
      const user = getUserObj();
      if (user?.role === "seller") {
        const data = await this.$axios.$post(
          "http://localhost:4000/api/products",
          {
            productName: this.productName,
            amountAvailable: +this.amountAvailable,
            cost: +this.cost,
            sellerId: +user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${getUserToken()}`,
            },
          }
        );
        if (!data.error) {
          window?.location?.reload();
        }
      } else {
        window.alert("Only sellers can add new product.");
      }
    },
  },
};
</script>
