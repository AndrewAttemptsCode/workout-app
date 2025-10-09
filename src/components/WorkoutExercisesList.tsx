import styled from "styled-components";
import { useWorkout } from "../contexts/WorkoutContext";

const Table = styled.table`
  width: 100%;
  table-layout: auto;
  border-collapse: separate;
  border-spacing: 0.5rem;

  th {
    font-size: 13px;
    text-transform: uppercase;
    line-height: 1.1;
  }

  th:first-of-type {
    text-align: left;
  }

  td {
    height: 2rem;
  }

  td button {
    font-weight: bold;
    color: rgb(var(--primary-color));
    outline: none;
    width: 36px;
    height: 30px;
    text-align: center;
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
    }
  }
`;

const ButtonTD = styled.td`
  text-align: center;
`;

type WorkoutExercisesListProps = {
  workoutExercises: string[];
  editMode: boolean;
  workoutId: string;
}

const WorkoutExercisesList = ({ workoutExercises, editMode, workoutId }: WorkoutExercisesListProps) => {
  const { exercises, removeExerciseFromWorkout } = useWorkout();

  return (
    <Table>
      <thead>
        <tr>
          <th>Exercise</th>
          {editMode && <th>Remove</th>}
        </tr>
      </thead>
      <tbody>
        {workoutExercises.map((exerciseId, index) => {
          const exercise = exercises.find((exercise) => exercise.id === exerciseId); 
          
          if (!exercise) return null;

          return (
            <tr key={index}>
              <td>{exercise.title}</td>

              {editMode && (
              <ButtonTD><button onClick={() => removeExerciseFromWorkout(workoutId, index)}>&times;</button></ButtonTD>
              )}
            </tr>
        )})}
      </tbody>
    </Table>
  );
};

export default WorkoutExercisesList;