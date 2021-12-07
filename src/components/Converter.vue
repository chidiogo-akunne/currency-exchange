<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">An error has occurred: {{ error }}</div>
  <form @submit.prevent="convert" v-else-if="data">
    <div class="row">
      <div class="column">
        <h6>From:</h6>
        <select v-model="from" aria-label="Base currency">
          <option
            v-for="currency in data"
            :key="currency.symbol"
            :value="currency.symbol"
          >
            {{ currency.name }} ({{ currency.symbol }})
          </option>
        </select>
        <input aria-label="Amount" type="number" v-model="amount" />
      </div>
      <div class="column">
        <h6>To:</h6>
        <select v-model="to" aria-label="Conversion currency">
          <option
            v-for="currency in data"
            :key="currency.symbol"
            :value="currency.symbol"
          >
            {{ currency.name }} ({{ currency.symbol }})
          </option>
        </select>
        <input
          aria-label="Conversion Currency"
          type="number"
          readonly
          v-model="converted"
        />
      </div>
    </div>
    <button :disabled="mutation.isLoading.value">Submit</button>
  </form>
</template>

<script>
import { useQuery, useMutation } from 'vue-query';

const currencyFetcher = async () =>
  await fetch(
    'https://61a0fad86c3b400017e69b41.mockapi.io/currencies',
  ).then((response) => response.json());

const exchangeFetcher = async (data) =>
  await fetch('https://61a0fad86c3b400017e69b41.mockapi.io/exchange', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());

export default {
  name: 'Converter',
  setup() {
    const { isLoading, isError, data, error } = useQuery(
      'currencies',
      currencyFetcher,
    );
    const mutation = useMutation((data) => exchangeFetcher(data));

    return { isLoading, isError, data, error, mutation };
  },
  data() {
    return {
      from: 'USD',
      to: 'EUR',
      amount: 0,
      converted: 0,
    };
  },
  methods: {
    async convert() {
      const data = {
        from: this.from,
        to: this.to,
        amount: Number(this.amount),
      };

      const response = await this.mutation.mutateAsync(data);
      this.converted = response.amount_exchanged;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
form {
  max-width: 450px;
  margin: 100px auto 0;
}
h6 {
  align-self: flex-start;
  margin-bottom: 10px;
}
select {
  width: 180px;
  height: 30px;
  background: linear-gradient(45deg, transparent 50%, #ffffff 50%),
    linear-gradient(135deg, #ffffff 50%, transparent 50%),
    linear-gradient(to right, #0ebeff, #0ebeff);
  background-position: calc(100% - 21px) calc(1em + 2px),
    calc(100% - 16px) calc(1em + 2px), 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
  background-repeat: no-repeat;
  border: thin solid rgb(133, 133, 133);
  border-radius: 0;
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  margin-bottom: 15px;
  padding-left: 5px;
}
input {
  height: 25px;
}
button {
  height: 40px;
  width: 120px;
  background-color: #272de1;
  color: white;
  font-weight: 600;
  margin: 0 auto;
  outline: none;
  border: none;
  border-radius: 10px;
  margin-top: 50px;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
}
.column {
  display: flex;
  flex-direction: column;
}
</style>
