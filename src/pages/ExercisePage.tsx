import ExerciseList from "../components/ExerciseList";
import { useWorkout } from "../contexts/WorkoutContext";

const ExercisePage = () => {
  const { addNewExercise } = useWorkout();

  return (
    <div>
      <h1>Exercises</h1>
      <button onClick={addNewExercise}>Add new exercise</button>
      <ExerciseList />
    </div>
  );
};

export default ExercisePage;
