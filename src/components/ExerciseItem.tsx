import type { Exercise } from "../pages/ExercisePage";

type ExerciseItemProps = {
  exercise: Exercise;
}

const ExerciseItem = ({ exercise }: ExerciseItemProps) => {
  return (
    <div>
      {exercise.id}
    </div>
  );
};

export default ExerciseItem;