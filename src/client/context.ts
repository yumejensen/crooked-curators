import { createContext, useContext } from 'react';
import axios from 'axios';

// USER CONTEXT HANDLING

export interface User {
  id?: number;
  username: string;
  loggedIn: boolean;
  // setUser: (user) => void; // I don't really know what void does here, we ball though
  // ^^ void means nothing is returned
}

export interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const user = useContext(UserContext);

  if (user === null) {
    throw new Error(
      'User is not defined. useUserContext must be used within a UserContext'
    );
  }
  return user;
}

export async function fetchUser() {
  const data = await axios.get('/auth/google/user')
  return data
}


// GAME CONTEXT HANDLING

export interface Player {
  username: string;
  finished: boolean;
}
export interface Game {
  stage: string;
  code: string;
  curator: Player | null;
  players: Player[];
}

export interface GameContextType {
  game: Game;
  setGame: React.Dispatch<React.SetStateAction<Game>>;
}

export const GameContext = createContext<GameContextType | null>(null)

export function useGameContext() {
  const game = useContext(GameContext);

  if (game === null) {
    throw new Error('Stage is not defined. useGameContext must be used within a GameContext')
  }
  return game
}