import styles from "./CityRow.module.css";

function CityRow({}) {
  return (
    <tr data-testid="countries-container" className={styles.container}>
      <td> ID </td>
      <td> City Name </td>
      <td> Country Name </td>
      <td> Population </td>
    </tr>
  );
}

export default CityRow;
