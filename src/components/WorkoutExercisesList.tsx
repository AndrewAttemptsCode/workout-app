import styled from "styled-components";
import { useWorkout } from "../contexts/WorkoutContext";

const Table = styled.table`
  width: 100%;
  table-layout: auto;
  border-collapse: separate;
  border-spacing: 0.5rem;

  th:first-of-type {
    text-align: left;
  }

  td {
    height: 2rem;
  }

  td button {
    width: 50%;
    text-align: center;
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