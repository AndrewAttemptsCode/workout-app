import type { Exercise } from "../pages/ExercisePage";

type ExerciseSetsProps = {
  exercise: Exercise;
  updateSetField: (exerciseId: string, setId: string, field: "reps" | "weight", value: number) => void;
}

const ExerciseSets = ({ exercise, updateSetField }: ExerciseSetsProps) => {
  return (
    <div>
      {exercise.sets.map((set) => (
        <input
          key={set.id}
          type="number" 
          name="reps"
          min={0}
          value={set.reps}
          onChange={(e) => updateSetField(exercise.id, set.id, "reps", e.target.valueAsNumber)} 
        />
      ))} reps

      {exercise.sets.map((set) => (
        <input
          key={set.id}
          type="number" 
          name="weight"
          min={0}
          value={set.weight}
          onChange={(e) => updateSetField(exercise.id, set.id, "weight", e.target.valueAsNumber)} 
        />
      ))} kg
    </div>
  );
};

export default ExerciseSets;