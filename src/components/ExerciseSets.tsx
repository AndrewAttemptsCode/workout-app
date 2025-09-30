import styled from "styled-components";
import { useWorkout, type Exercise } from "../contexts/WorkoutContext";

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0.5rem;

  td input {
    width: 100%;
  }

  td span {
    display: block;
    width: 100%;
  }

  td {
    text-align: center;
  }

  td button {
    width: 50%;
  }
`;

type ExerciseSetsProps = {
  exercise: Exercise;
  editMode: boolean;
}

const ExerciseSets = ({ exercise, editMode }: ExerciseSetsProps) => {
  const { updateSetField, removeSet } = useWorkout();

  return (
    <Table>
      <thead>
        <tr>
          <th>Reps</th>
          <th>Weight (kg)</th>
          <th>Rest (secs)</th>
          {editMode && <th>Remove</th>}
        </tr>
      </thead>
      <tbody>
        {exercise.sets.map((set) => (
          <tr key={set.id}>
            <td>
              {editMode ? (
                <input
                type="number" 
                name="reps"
                id={`reps-${set.id}`}
                min={0}
                value={set.reps}
                onChange={(e) => updateSetField(exercise.id, set.id, "reps", e.target.valueAsNumber)} 
              />
              ) : (
                <span>{set.reps}</span>
              )}
            </td>
              
            <td>
              {editMode ? (
                <input
                  type="number" 
                  name="weight"
                  id={`weight-${set.id}`}
                  min={0}
                  value={set.weight}
                  onChange={(e) => updateSetField(exercise.id, set.id, "weight", e.target.valueAsNumber)} 
                />
              ) : (
                <span>{set.weight}</span>
              )}
            </td>
      
            <td>
              {editMode ? (
                <input
                  type="number"
                  name="rest"
                  id={`rest-${set.id}`}
                  min={0}
                  value={set.rest}
                  onChange={(e) => updateSetField(exercise.id, set.id, "rest", e.target.valueAsNumber)}
                />
              ) : (
                <span>{set.rest}</span>
              )}
            </td>

            {editMode && 
              <td>
                <button disabled={exercise.sets.length <= 1} onClick={() => removeSet(exercise.id, set.id)}>&times;</button>
              </td>
            }
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ExerciseSets;