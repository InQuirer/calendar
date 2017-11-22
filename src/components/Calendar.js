export default {
	name: 'Calendar',
	data() {
		return {
			date: null,
			event: {
				show: false,
				date: '',
				time: '12:00',
				title: '',
				description: ''
			},
			key: null,
			calendar: [],
			events: [],
			years: {},
			days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
			months: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
		}
	},
	created() {
		this.reset();
	},
	computed: {
		today() {
			return new Date();
		},
		currentYear() {
			return this.date.getFullYear();
		},
		currentMonth() {
			return this.date.getMonth();
		},
		daysInCurrentMonth() {
			return new Date(this.currentYear, this.currentMonth + 1, -1).getDate() + 1;
		},
		firstDayOfMonth() {
			return new Date(this.currentYear, this.currentMonth, 0).getDay();
		},
		lastDayOfMonth() {
			return new Date(this.currentYear, this.currentMonth, this.daysInCurrentMonth).getDay();
		}
	},
	methods: {
		reset() {
			this.date = this.today;
			this.generateCalendar(this.currentYear, this.currentMonth, this.firstDayOfMonth, this.lastDayOfMonth);
		},
		monthUp() {
			this.date = new Date(this.currentYear, this.currentMonth + 1, 1);
			this.generateCalendar(this.currentYear, this.currentMonth, this.firstDayOfMonth, this.lastDayOfMonth);
		},
		monthDown() {
			this.date = new Date(this.currentYear, this.currentMonth - 1, 1);
			this.generateCalendar(this.currentYear, this.currentMonth, this.firstDayOfMonth, this.lastDayOfMonth);
		},
		addDay(year, month, date) {
			this.calendar.push({
				date: date,
				month: month,
				today: month == this.today.getMonth() && year == this.today.getFullYear()&& date == this.today.getDate(),
				events: []
			});
		},
		addEvent() {
			let title = this.event.title.trim();
			let description = this.event.description.trim();
			if(isFinite(this.event.date) || title == '') {
				return;
			}
			let year = parseInt(this.event.date);
			let month = parseInt(this.event.date.slice(5)) - 1;
			let day = parseInt(this.event.date.slice(8));
			this.date = new Date(year, month, day);
			this.generateCalendar(this.currentYear, this.currentMonth, this.firstDayOfMonth, this.lastDayOfMonth);
			this.years[year][month][day + this.firstDayOfMonth].events.push({
				time: this.event.time,
				title: title,
				description: description
			});
			this.events.push({
				date: this.event.date,
				time: this.event.time,
				description: this.event.description,
				title: title
			});
			this.event = {
				show: false,
				date: '',
				time: '12:00',
				title: '',
				description: ''
			};
		},
		generateCalendar(year, month, firstDay, lastDay) {
			if(!this.years.hasOwnProperty(year)) {
				this.years[year] = [];
			}
			if(this.years[year][month]) {
				this.calendar = this.years[year][month];
			} else {
				let daysInPreviousMonth = new Date(year, month, -1).getDate() + 1;
				this.calendar = [];
				for(let date = daysInPreviousMonth - firstDay; date <= daysInPreviousMonth; date++) {
					this.addDay(year, (month + 11) % 12, date);
				}
				for(let date = 1; date <= this.daysInCurrentMonth; date++) {
					this.addDay(year, month, date);
				}
				lastDay = 7 - lastDay;
				lastDay += (this.calendar.length <= 35) ? 7 : 0;
				for(let date = 1; date < lastDay; date++) {
					this.addDay(year, (month + 1) % 12, date);
				}
				this.years[year][month] = this.calendar;
			}
		},
		search() {
			if (this.key) {
				let year = parseInt(this.key.substr(0, 4));
				let month = parseInt(this.key.substr(5, 2));
				if(year && month) {
					this.date = new Date(year, (month + 11) % 12);
					this.generateCalendar(this.currentYear, this.currentMonth, this.firstDayOfMonth, this.lastDayOfMonth);
				}
			}
			this.key = null;
		}
	}
}