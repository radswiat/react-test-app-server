import moment from 'moment';

export default function timestamp(string) {
  return `[${moment().format('DD/MMM/YYYY:HH:MM:ss')}] ${string}`;
}
