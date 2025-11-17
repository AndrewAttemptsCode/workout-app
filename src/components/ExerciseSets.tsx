import styled from "styled-components";
import { useWorkout, type Exercise } from "../contexts/WorkoutContext";

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0.5rem;
  user-select: none;

  th {
    font-size: 13px;
    text-transform: uppercase;
    line-height: 1.1;
  }

  td input,
  td button {
    font-weight: bold;
    color: rgb(var(--primary-color));
    outline: none;
  }

  td input {
    width: 100%;
    background: rgba(var(--gold-accent), 0.6);
    border: 2px solid rgb(var(--gold-accent));

    &:focus {
      box-shadow: 0 0 4px 2px rgb(var(--gold-accent));
    }

    &::placeholder {
      color: rgba(var(--primary-color), 0.6);
    }
  }

  td span {
    display: block;
    width: 100%;
  }

  td {
    text-align: center;
  }

  td button {
    width: 36px;
    height: 30px;
    cursor: pointer;
    background: rgba(var(--red-accent), 0.6);
    border: 2px solid rgb(var(--red-accent));

    &:focus-visible {
      box-shadow: 0 0 4px 2px rgb(var(--red-accent));
    }

    &:hover {
      box-shadow: 0 0 4px 2px rgb(var(--red-accent));
    }

    &:disabled {
      background: rgba(var(--red-accent), 0.4);
      border: 2px solid rgba(var(--red-accent), 0.4);
      box-shadow: none;
    }
    
  }
`;

type ExerciseSetsProps = {
  exercise: Exercise;
  editMode: boolean;
  onRemoveSet: () => void;
}

const ExerciseSets = ({ exercise, editMode, onRemoveSet }: ExerciseSetsProps) => {
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
                value={set.reps ?? ""}
                onChange={(e) => updateSetField(exercise.id, set.id, "reps", Number.isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber)} 
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
                  value={set.weight ?? ""}
                  onChange={(e) => updateSetField(exercise.id, set.id, "weight", Number.isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber)} 
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
                  value={set.rest ?? ""}
                  onChange={(e) => updateSetField(exercise.id, set.id, "rest", Number.isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber)}
                />
              ) : (
                <span>{set.rest}</span>
              )}
            </td>

            {editMode && 
              <td>
                <button
                  disabled={exercise.sets.length <= 1}
                  aria-label="Remove set from exercise"
                  onClick={() => {
                    removeSet(exercise.id, set.id);
                    onRemoveSet();
                  }}
                >
                  &times;
                </button>
              </td>
            }
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ExerciseSets;