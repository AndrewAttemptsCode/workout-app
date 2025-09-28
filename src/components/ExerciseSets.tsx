import type { Exercise } from "../pages/ExercisePage";

type ExerciseSetsProps = {
  exercise: Exercise;
  updateSetField: (exerciseId: string, setId: string, field: "reps" | "weight" | "rest", value: number) => void;
  removeSet: (exerciseId: string, setId: string) => void;
}

const ExerciseSets = ({ exercise, updateSetField, removeSet }: ExerciseSetsProps) => {
  return (
    <div>
      {exercise.sets.map((set) => (
        <div key={set.id}>
          <input
            type="number" 
            name="reps"
            id={`reps-${set.id}`}
            min={0}
            value={set.reps}
            placeholder="Reps"
            onChange={(e) => updateSetField(exercise.id, set.id, "reps", e.target.valueAsNumber)} 
          />
          <label htmlFor={`reps-${set.id}`}>reps</label>
          
          <input
            type="number" 
            name="weight"
            id={`weight-${set.id}`}
            min={0}
            value={set.weight}
            placeholder="Weight"
            onChange={(e) => updateSetField(exercise.id, set.id, "weight", e.target.valueAsNumber)} 
          />
          <label htmlFor={`weight-${set.id}`}>kg</label>
  
          <input
            type="number"
            name="rest"
            id={`rest-${set.id}`}
            min={0}
            value={set.rest}
            placeholder="Rest"
            onChange={(e) => updateSetField(exercise.id, set.id, "rest", e.target.valueAsNumber)}
          />
          <label htmlFor={`rest-${set.id}`}>secs</label>

        <button disabled={exercise.sets.length <= 1} onClick={() => removeSet(exercise.id, set.id)}>Remove set</button>

        </div>
      ))}
    </div>
  );
};

export default ExerciseSets;