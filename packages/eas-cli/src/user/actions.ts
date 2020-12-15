import log from '../log';
import { promptAsync } from '../prompts';
import { Actor, getUserAsync, loginAsync } from './User';

export async function showLoginPromptAsync(): Promise<void> {
  const { username, password } = await promptAsync([
    {
      type: 'text',
      name: 'username',
      message: 'Email or username',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password',
    },
  ]);
  await loginAsync({
    username,
    password,
  });
}

export async function ensureLoggedInAsync(): Promise<Actor> {
  let user: Actor | undefined;
  try {
    user = await getUserAsync();
  } catch (_) {}
  if (!user) {
    log.warn('An Expo user account is required to proceed.');
    log.newLine();
    log('Log in to EAS');
    await showLoginPromptAsync(); // TODO: login or register
    user = await getUserAsync();
    if (!user) {
      // just to satisfy ts
      throw new Error('Failed to access user data');
    }
  }

  return user;
}

export function ensureActorHasUsername(user: Actor): string {
  if (user.__typename === 'User') {
    return user.username;
  }
  throw new Error('This action is not supported for robot users.');
}
