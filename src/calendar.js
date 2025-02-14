import moment from 'moment';
import React, { Component } from 'react';
import cx from 'classnames';
import range from 'lodash/range';
import chunk from 'lodash/chunk';

const Day = ({ i, w, d, className, ...props }) => {
  const prevMonth = w === 0 && i > 7;
  const nextMonth = w >= 4 && i <= 14;
  const cls = cx({
    'prev-month': prevMonth,
    'next-month': nextMonth,
    'current-day': !prevMonth && !nextMonth && i === d
  });

  return <td className={cls} {...props}>{i}</td>;
};

export default class Calendar extends Component {
  selectDate = (i, w) => {
    const prevMonth = w === 0 && i > 7;
    const nextMonth = w >= 4 && i <= 14;
    const m = this.props.moment;

    if (prevMonth) m.subtract(1, 'month');
    if (nextMonth) m.add(1, 'month');

    m.date(i);

    this.props.onChange(m);
  };

  prevMonth = e => {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(1, 'month'));
  };

  nextMonth = e => {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, 'month'));
  };

  render() {
    const m = this.props.moment;
    const d = m.date();
    const d1 = m.clone().subtract(1, 'month').endOf('month').date();
    let d2 = m.clone().date(1).day();
    const d3 = m.clone().endOf('month').date();
    
    // get short names for weekdays in current locale, example:
    //   ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var weeks = moment.weekdaysShort();
    
    // check if week starts with Monday
    if (moment.localeData().firstDayOfWeek() == 1) {
      // swap sunday with monday (weekday names)
      weeks.push(weeks.shift());
      if (d2 == 0)
      d2 = 7; // convert to ISO day of the week (1..7)
      var days = [].concat(
        range(d1-d2+2, d1+1),
        range(1, d3+1),
        range(1, 42-d3-d2+2)
        );
    } else {
      var days = [].concat(
        range(d1-d2+1, d1+1),
        range(1, d3+1),
        range(1, 42-d3-d2+1)
        );
      }
        
    

    return (
      <div className={cx('m-calendar', this.props.className)}>
        <div className="toolbar">
          <button type="button" className="prev-month" onClick={this.prevMonth}>
            <i className={this.props.prevMonthIcon} />
          </button>
          <span className="current-date">{m.format('MMMM YYYY')}</span>
          <button type="button" className="next-month" onClick={this.nextMonth}>
            <i className={this.props.nextMonthIcon} />
          </button>
        </div>

        <table>
          <thead>
            <tr>
              {weeks.map((w, i) => <td key={i}>{w}</td>)}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, w) =>
              <tr key={w}>
                {row.map(i =>
                  <Day
                    key={i}
                    i={i}
                    d={d}
                    w={w}
                    onClick={() => this.selectDate(i, w)}
                  />
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
