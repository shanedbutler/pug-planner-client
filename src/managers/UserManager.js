import Avatar from 'boring-avatars';
import { getOption, putOption } from './FetchOptions';
import { getToken } from './AuthManager';

const apiUrl = 'https://localhost:7066';

/**
 * Get fetch user from database by primary key id
 * @param {int} in
 * @returns User object
 */
export const fetchUser = async (id) => {
   const token = await getToken();
   const response = await fetch(`${apiUrl}/api/user/get/${id}`, getOption(token));
   const user = await response.json();
   return user;
};

/**
 * Get fetch all users from database
 * @returns Array of user objects
 */
export const fetchUsers = async () => {
   const token = await getToken();
   const response = await fetch(`${apiUrl}/api/user/getall`, getOption(token));
   if (response.ok) {
      return response.json();
   } else {
      throw new Error('An unknown error occurred while trying to get users.');
   }
};

/**
 * Edit user via PUT
 * @param {UserProfile} userBody
 * @returns GET newly created user object from database
 */
export const editUserFetch = async (userBody) => {
   const token = await getToken();
   const response = await fetch(`${apiUrl}/api/user`, putOption(userBody, token));
   const user = await response.json();
   return user;
};

/**
 * Parses current logged in user from localStorage
 * @returns User object
 */
export const getLocalUser = () => {
   const currentUser = localStorage.getItem('userProfile');
   return JSON.parse(currentUser);
};

/**
 * Returns admin boolean for current logged in user from localStorage
 * @returns Boolean
 */
export const isLocalUserAdmin = () => {
   const currentUser = localStorage.getItem('userProfile');
   const parsedUser = JSON.parse(currentUser);
   return parsedUser.admin;
};

/**
 * React component for current user's Boring Avatar
 * @returns Avatar Component
 */
export const UserAvatar = ({ fullName, scale }) => {
   if (scale == null) {
      scale = 40;
   }
   const originalColor = ['#F88F89', '#EEC276', '#F2E8DF', '#79C3AA', '#DDB8D9'];

   // Alternate colors
   // const altColor = ['#86A69D', '#F2B263', '#F2E8DF', '#F2C6C2', '#F28585'];
   // const altColor2 = ['#F2889B', '#F2E8DF', '#95BFA4', '#F29E38', '#F28444'];

   return <Avatar size={scale} name={fullName} square={false} variant="beam" colors={originalColor} />;
};

/**
 * Gets all users that are on a game roster
 * @param {int} gameId
 * @returns An array of user objects
 */
export const fetchRoster = async (gameId) => {
   const token = await getToken();
   const response = await fetch(`${apiUrl}/api/user/getRoster?gameId=${gameId}`, getOption(token));
   const roster = await response.json();
   return roster;
};
