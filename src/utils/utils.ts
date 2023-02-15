import { COLORS } from '@nightlight/src/global.styles';

export const getRelativeTimeString = (date: Date) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else if (months > 0) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }
};

export const getStatusColor = (lastActiveTime: Date) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - lastActiveTime.getTime()) / 1000);
  if (seconds < 60) {
    // Green if active in the last minute
    return COLORS.GREEN;
  } else if (seconds < 60 * 60) {
    // Yellow if active in the last hour
    return COLORS.YELLOW;
  } else {
    // Red if active more than an hour ago
    return COLORS.RED;
  }
};
