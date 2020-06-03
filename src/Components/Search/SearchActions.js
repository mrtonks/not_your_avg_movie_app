import DATA from '../../Data/Data.json';

function getMovies(query) {
  return fetch('https://api.themoviedb.org/3/search/movie?api_key=' + DATA["api-key"] + '&language=' + DATA.language + '&query=' + query)
    .then(handleErrors)
    .then(res => res.json());
}

// function fakeGetMovies() {
//   return new Promise(resolve => {
//     // Resolve after a timeout so we can see the loading indicator
//     setTimeout(
//       () =>
//         resolve({
//           movies: [
//             {
//               id: 0,
//               name: "Narnia"
//             },
//             {
//               id: 1,
//               name: "Harry Potter"
//             },
//             {
//               id: 2,
//               name: "Lord of the Rings"
//             }
//           ]
//         }),
//       1000
//     );
//   });
// }

export function fetchMovies(query='') {
  return dispatch => {
    dispatch(fetchMoviesBegin());
    return getMovies(query)
      .then(json => {
        dispatch(fetchMoviesSuccess(json.results));
        return json.results;
      })
      .catch(error => dispatch(fetchMoviesFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_MOVIES_BEGIN   = 'FETCH_MOVIES_BEGIN';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const fetchMoviesBegin = () => ({
    type: FETCH_MOVIES_BEGIN
  });

  export const fetchMoviesSuccess = movies => ({
    type: FETCH_MOVIES_SUCCESS,
    payload: { movies }
  });

  export const fetchMoviesFailure = error => ({
    type: FETCH_MOVIES_FAILURE,
    payload: { error }
  });