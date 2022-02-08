<template>
  <fragment>
    <div
      class="w-100 flex flex-col space-y-4 rounded-lg p-4 space-y-2 overflow-hidden"
    >
      <p v-if="user.username && user.role">
        <span
          ><i>username:</i>
          <span class="p-1 rounded bg-blue-500 text-white">{{
            user.username
          }}</span></span
        >
        <span
          ><i>role:</i>
          <span class="p-1 rounded bg-blue-500 text-white">{{
            user.role
          }}</span></span
        >
        <span
          ><i>deposit:</i>
          <span class="p-1 rounded bg-blue-500 text-white">{{
            user.deposit
          }}</span></span
        >
      </p>
    </div>
    <div
      class="w-100 flex flex-col space-y-4 rounded-lg p-4 space-y-2 overflow-hidden"
    >
      <h2 class="mb-1 text-xl font-bold">Products</h2>
      <div class="flex flex-wrap">
        <div
          v-for="product in products"
          :key="product.id"
          class="flex m-2 w-50"
        >
          <a class="bg-white drop-shadow p-4 rounded w-50">
            <img
              src="https://tailwindcss.com/img/card-top.jpg"
              width="200"
              height="200"
              class="w-50 mb-3"
            />
            <p>
              <span class="text-gray-500">Product Name:</span>
              <b>{{ product.productName }}</b>
            </p>
            <p>
              <span class="text-gray-500">Cost:</span> USD
              <b>{{ product.cost }}</b>
            </p>
            <p class="pb-3">
              <span class="text-gray-500">Amount Available:</span>
              <b>{{ product.amountAvailable }}</b>
            </p>
            <p v-if="user.role == 'seller'">
              <button
                class="rounded border p-1"
                @click="() => deleteFn(product)"
              >
                Delete
              </button>
            </p>

            <p v-if="user.role == 'buyer'">
              <button
                class="px-1.5 border rounded bg-green p-1"
                @click="() => buyFn(product)"
              >
                Buy
              </button>
              <input
                class="border rounded p-1"
                type="number"
                v-model="amountOfProducts"
              />
            </p>
          </a>
        </div>
      </div>
    </div>
  </fragment>
</template>
<script>
import { getUserToken, getUserObj } from "./../utils";

export default {
  data() {
    return {
      products: [],
      user: {},
      amountOfProducts: 1,
    };
  },
  async created() {
    const token = getUserToken();
    const user = getUserObj();
    if (!token || !user.username || !user.role) {
      this.$router.push("/login");
      return;
    }
    const data = await this.$axios.$get("http://localhost:4000/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const _data = await this.$axios.$get("http://localhost:4000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.products = data?.products;
    if (_data) {
      console.log(_data);
      this.user = _data;
      localStorage.setItem("user", JSON.stringify(_data));
    } else {
      window.localStorage.clear();
      this.$router.push("/login");
    }
  },
  methods: {
    buyFn: async function (product, amountOfProducts) {
      const data = await this.$axios.$post(
        "http://localhost:4000/api/buy",
        {
          productId: +product.id,
          amountOfProducts: +this.amountOfProducts,
        },
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );
      if (!data.error) {
        alert("Item successfully bought.");
        window.location.reload();
      } else {
        window.alert(data.msg);
      }
    },
    deleteFn: async function (product) {
      if (window.confirm("Do you want to delete this product?")) {
        const data = await this.$axios.$delete(
          "http://localhost:4000/api/products/" + product.id,
          {
            headers: {
              Authorization: `Bearer ${getUserToken()}`,
            },
          }
        );
        if (!data.error) {
          alert("Item successfully deleted.");
          window.location.reload();
        } else {
          window.alert(data.msg);
        }
      }
    },
  },
};
</script>
