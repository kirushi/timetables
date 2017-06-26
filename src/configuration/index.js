export const TOKEN_ACCESSOR = 'timetables_token';

// API
export const ROOT_URL = 'http://api.greymans.com:3000/api/v1';
// export const ROOT_URL = 'https://calm-fjord-28769.herokuapp.com/api/v1';
export const GET_TOKEN = `${ROOT_URL}/token`;
export const ALL_SESSIONS_URL = `${ROOT_URL}/sessions`;
export const POST_SESSION_URL = `${ROOT_URL}/sessions`;
export const DELETE_SESSION_URL = `${ROOT_URL}/sessions`;
export const ALL_MEMBERS_URL = `${ROOT_URL}/members`;
export const ALL_TRAINERS_URL = `${ROOT_URL}/trainers`;
export const ALL_USERS_URL = `${ROOT_URL}/users`;
export const DELETE_USER_URL = `${ROOT_URL}/users`;
export const POST_TRAINER_URL = `${ROOT_URL}/trainers`;
export const POST_MEMBER_URL = `${ROOT_URL}/members`;

// Access right actions
export const MANAGE = "MANAGE";
export const CREATE = "CREATE";
export const INDEX = "INDEX";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";

export const USERS = "Users";
export const SESSIONS = "Sessions";

export const ACCESS_RIGHTS = {
  "Admin": {
    "Users": [MANAGE],
    "Sessions": [MANAGE]
  },
  "Trainer": {
    "Sessions": [MANAGE]
  },
  "Member": {}
}
