import './styles.css';

const ref = {
  days: document.querySelector('[data-value = days]'),
  hours: document.querySelector('[data-value = hours]'),
  mins: document.querySelector('[data-value = mins]'),
  secs: document.querySelector('[data-value = secs]'),
};

// const endTime = new Date('Jul 23, 2021');

class CountdownTimer {
  constructor({ onTick, targetDate, selector }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = onTick;
  }

  start() {
    setInterval(() => {
      let timeNow = Date.now();
      let deltaTime = this.targetDate.getTime() - timeNow;
      const time = this.accountRemainingTime(deltaTime);
      this.onTick(time);
    }, 1000);
  }

  accountRemainingTime(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    const times = { days, hours, mins, secs };

    return times;
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
  onTick: updateTimerFace,
});

timer.start();

function updateTimerFace({ days, hours, mins, secs }) {
  ref.days.textContent = days;
  ref.hours.textContent = hours;
  ref.mins.textContent = mins;
  ref.secs.textContent = secs;
}
