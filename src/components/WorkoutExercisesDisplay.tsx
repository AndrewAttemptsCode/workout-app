import styled from "styled-components";
import { useWorkout } from "../contexts/WorkoutContext";

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

type WorkoutExercisesDisplayProps = {
  workoutExercises: string[];
  editMode: boolean;
}

const WorkoutExercisesDisplay = ({ workoutExercises, editMode }: WorkoutExercisesDisplayProps) => {
  const { exercises } = useWorkout();

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
              <td><button>&times;</button></td>
              )}
            </tr>
        )})}
      </tbody>
    </Table>
  );
};

export default WorkoutExercisesDisplay;