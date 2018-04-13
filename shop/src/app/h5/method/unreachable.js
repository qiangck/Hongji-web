/**
 * Created by shuai on 2017/3/28.
 */
import moment from 'moment';
export function unreachable() {
    var startTime = moment('2017-04-21 13:30:00','YYYY-MM-DD HH:mm:ss');
    var endTime = moment('2017-04-22 21:00:00','YYYY-MM-DD HH:mm:ss');
    var now = moment();
    if (now.isBetween(startTime, endTime)) {
        window.location.href = 'https://linyipay.365ime.com/unreachable/index.html';
        return false;
    }
}