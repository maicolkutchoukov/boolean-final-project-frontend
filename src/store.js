import { reactive } from 'vue';

export const store = reactive({
  allMusicians: [],
  allRoles: [],
  sponsoredMusicians: [],
  filteredMusicians: [],
  nextPageUrl: null,
  prevPageUrl: null,
  roleFromHome: null,
  selectedRoleHome: null,
});