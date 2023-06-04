import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlgorithmHistoryStore = defineStore("algorithmHistory", () => {
  const viewedPostIDs = ref([]);
  return { viewedPostIDs };
});
