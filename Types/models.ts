export interface IExercise {
  _id: string;
  name: string;
  description: string;
  muscle: IMuscle;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMuscle {
  _id: string;
  name: string;
  scientificName: string;
}

export interface ISet {
  _id: string;
  weight: number;
  reps: number;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  // accessLevel: number;
}

export interface IWorkout {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  createdBy: string;
}

export interface IWorkoutExercise {
  _id: string;
  workout: string;
  exercise: string;
  sets: ISet[];
}

export interface ISExercise {
  name: string;
  description: string;
  muscle: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISMuscle {
  name: string;
  scientificName: string;
}

export interface ISSet {
  weight: number;
  reps: number;
}

export interface ISUser {
  username: string;
  email: string;
  password: string;
  // accessLevel: number;
}

export interface ISWorkout {
  name: string;
  duration: number; // duration in minutes
  date: Date;
  createdBy: string;
}

export interface ISWorkoutExercise {
  workout: string;
  exercise: string;
  sets: ISet[];
}
