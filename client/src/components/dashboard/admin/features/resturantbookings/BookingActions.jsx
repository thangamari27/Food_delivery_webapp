import { Eye, Check, CheckCircle, Ban } from "lucide-react";

function BookingActions({ content, booking, onAction, onViewDetails, compact = false, styles }) {
  const canConfirm = booking.status === 'pending';
  const canComplete = booking.status === 'confirmed';
  const canCancel = (booking.status === 'pending' || booking.status === 'confirmed') && booking.canCancel;
  const isReadOnly = booking.status === 'completed' || booking.status === 'cancelled';

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(booking);
          }}
          className={styles.buttons.ghost}
          title={content.tooltips.view_details}
        >
          <Eye className="w-4 h-4" />
        </button>
        {canConfirm && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction(booking.id, 'confirm');
            }}
            className={`${styles.icon_colors.orange} p-1`}
            title={content.tooltips.confirm}
          >
            <Check className="w-4 h-4" />
          </button>
        )}
        {canComplete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction(booking.id, 'complete');
            }}
            className={styles.icon_colors.check_circle + ' p-1'}
            title={content.tooltips.complete}
          >
            <CheckCircle className="w-4 h-4" />
          </button>
        )}
        {canCancel && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction(booking.id, 'cancel');
            }}
            className={styles.icon_colors.x_circle + ' p-1'}
            title={content.tooltips.cancel}
          >
            <Ban className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {canConfirm && (
        <button
          onClick={() => onAction(booking.id, 'confirm')}
          className={styles.buttons.success}
        >
          <Check className="w-4 h-4" />
          {content.button_labels.confirm_booking}
        </button>
      )}
      {canComplete && (
        <button
          onClick={() => onAction(booking.id, 'complete')}
          className={styles.buttons.success}
        >
          <CheckCircle className="w-4 h-4" />
          {content.button_labels.mark_completed}
        </button>
      )}
      {canCancel && (
        <button
          onClick={() => onAction(booking.id, 'cancel')}
          className={styles.buttons.danger}
        >
          <Ban className="w-4 h-4" />
          {content.button_labels.cancel_booking}
        </button>
      )}
      {isReadOnly && (
        <div className={styles.text.body.muted + ' italic'}>
          {content.button_labels.no_actions}
        </div>
      )}
    </div>
  )
}

export default BookingActions