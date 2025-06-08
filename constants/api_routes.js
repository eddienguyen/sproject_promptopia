import CONFIG from "@web.config";

const commonRoute = (routeName = "", withBasePath = false) => {
  return withBasePath ? CONFIG.NEXT_PUBLIC_API_URL + routeName : routeName;
};

const API_ROUTES = {
  PROMPT: {
    create: (queries = "", withBasePath = false) => {
      return commonRoute(`/api/prompt/new${queries}`, withBasePath);
    },
    edit: (promptID = "", queries = "", withBasePath = false) => {
      return commonRoute(`/api/prompt/${promptID}${queries}`, withBasePath);
    },
    getOne: (promptID = "", queries = "", withBasePath = false) => {
      return commonRoute(`/api/prompt/${promptID}${queries}`, withBasePath);
    },
    getAll: (queries = "", withBasePath = false) => {
      return commonRoute(`/api/prompt${queries}`, withBasePath);
    },
    delete: (promptID = "", queries = "", withBasePath = false) => {
      return commonRoute(`/api/prompt/${promptID}${queries}`, withBasePath);
    },
  },
  USERS: {
    posts: (userID = "", queries = "", withBasePath = false) => {
      return commonRoute(`/api/users/${userID}/posts`, withBasePath);
    },
    info: (userID = "", queries = "", withBasePath = false) => {
      return commonRoute(`/api/users/${userID}`, withBasePath);
    },
  },
};

export default API_ROUTES;
