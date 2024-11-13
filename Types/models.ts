export interface IExercise {
  name: string;
  description: string;
  muscle: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMuscle {
  name: string;
  scientificName: string;
}

export interface ISet {
  weight: number;
  reps: number;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  // accessLevel: number;
}

export interface IWorkout {
  name: string;
  duration: number; // duration in minutes
  date: Date;
  createdBy: string;
}

export interface IWorkoutExercise {
  workout: string;
  exercise: string;
  sets: ISet[];
}
