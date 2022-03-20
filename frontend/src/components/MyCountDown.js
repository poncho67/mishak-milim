import Countdown from 'react-countdown';

const Completionist = () => <span style="color: #ff0000">זמנך עבר!</span>;

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return <span>{minutes}:{seconds}</span>;
  }
};

export const MyCountDown = () => {
  return <div><Countdown date={Date.now() + 120000} renderer={renderer} zeroPadDays='2'/></div>;
}

export default MyCountDown;