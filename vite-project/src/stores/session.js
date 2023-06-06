import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useSessionStore = defineStore("counter", () => {
  const session = ref({});

  return { session };
});
