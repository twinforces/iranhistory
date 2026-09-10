/** Route pending. Same chrome as the first-paint boot so a slow chunk is not a dead page. */
export function RailPending() {
  return (
    <div className="rail-pending" role="status" aria-live="polite">
      <div className="rail-pending-inner">
        <p className="kicker">Train Ride to War</p>
        <p className="rail-pending-title">Loading the rail</p>
        <p className="rail-pending-copy">The briefing is still coming down the wire.</p>
      </div>
    </div>
  );
}
