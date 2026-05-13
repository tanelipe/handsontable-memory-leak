import type { HotRendererProps } from '@handsontable/react-wrapper';
import styles from './score-renderer.module.scss';

export function ScoreRenderer({ value }: HotRendererProps) {
  const score = Number(value ?? 0);
  const clampedScore = Math.max(0, Math.min(score, 100));

  return (
    <div className={styles.scoreCell}>
      <span className={styles.scoreValue}>{score}</span>
      <div className={styles.scoreTrack} aria-hidden="true">
        <div className={styles.scoreFill} style={{ width: `${clampedScore}%` }} />
      </div>
    </div>
  );
}
