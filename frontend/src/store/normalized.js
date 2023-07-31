// const initialState = { entries: {}, isLoading: true };

// const articleReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOAD_ARTICLES:
//       const newState = { ...state, entries: { ...state.entries } };
//       action.articles.forEach(
//         (article) => (newState.entries[article.id] = article)
//       );
//       return newState;
//     case ADD_ARTICLE:
//       return {
//         ...state,
//         entries: { ...state.entries, [action.article.id]: action.article }
//       };
//     default:
//       return state;
//   }
// };
