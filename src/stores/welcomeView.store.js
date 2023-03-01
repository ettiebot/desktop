import { reactive } from "vue";

export default reactive({
  state: "loading",
  authToken: null,
  language: "",
  useTranslate: true,
  useHistory: true,
});
