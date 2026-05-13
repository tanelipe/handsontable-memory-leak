import type { HotRendererProps } from '@handsontable/react-wrapper';
import styles from './city-renderer.module.scss';

export function CityRenderer({ value }: HotRendererProps) {
  return (
    <div className={styles.cityCell}>
      <span className={styles.cityMarker} />
      <span>{String(value ?? '')}</span>
    </div>
  );
}
