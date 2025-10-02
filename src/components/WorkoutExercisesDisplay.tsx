import styled from "styled-components";

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
  exercises: string[];
  editMode: boolean;
}

const WorkoutExercisesDisplay = ({ exercises, editMode }: WorkoutExercisesDisplayProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Exercise</th>
          {editMode && <th>Remove</th>}
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise, index) => (
          <tr key={index}>
            <td>
              {exercise}
            </td>
            
            {editMode &&
            <td>
              <button>&times;</button>
            </td>
            }
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default WorkoutExercisesDisplay;