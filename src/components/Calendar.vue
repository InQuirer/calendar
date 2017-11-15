<template>
	<div id="calendar">
		<h1 class="timeStamp" title="current datestamp" @click="reset">{{ today.toDateString().replace(' ', ', ') }}</h1>
		<div id="controls">
			<button class="monthDown" @click="monthDown"><</button>
			<button class="monthUp" @click="monthUp">></button>
		</div><br>
		<!--h1 title="current datestamp">daysInCurrentMonth: {{ daysInCurrentMonth }}</h1>
		<h1 title="current datestamp">currentMonth: {{ months[currentMonth] }}</h1>
		<h1 title="current datestamp">firstDayOfMonth: {{ days[firstDayOfMonth] }}</h1-->
		<div class="tile header" v-for="day in days">{{ day.toUpperCase().substr(0, 3) }}</div>
		<div class="tile"
		v-for="day in calendar"
		:class="[{ currentMonth: day.month == currentMonth }, { today: day.today }]">{{ day.date}}<br>{{ months[day.month].toUpperCase().substr(0, 3) }}</div>
	</div>
</template>

<script>
export default {
	name: 'Calendar',
	data() {
		return {
			date: null,
			calendar: [],
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
			this.generateCalendar();
		},
		monthUp() {
			this.date = new Date(this.currentYear, this.currentMonth + 1, 1);
			this.generateCalendar();
		},
		monthDown() {
			this.date = new Date(this.currentYear, this.currentMonth - 1, 1);
			this.generateCalendar();
		},
		addDay(year, month, date) {
			this.calendar.push({
				date: date,
				month: month,
				today: month == this.today.getMonth() && year == this.today.getFullYear()&& date == this.today.getDate(),
				tasks: []
			});
		},
		generateCalendar() {
			let pre = this.firstDayOfMonth;
			let post = 7 - this.lastDayOfMonth;
			let daysInPreviousMonth = new Date(this.currentYear, this.currentMonth, -1).getDate() + 1;
			this.calendar = [];
			for(let date = daysInPreviousMonth - pre; date <= daysInPreviousMonth; date++) {
				this.addDay(this.currentYear, (this.currentMonth + 11) % 12, date);
			}
			for(let date = 1; date <= this.daysInCurrentMonth; date++) {
				this.addDay(this.currentYear, this.currentMonth, date);
			}
			post += (this.calendar.length <= 35) ? 7 : 0;
			for(let date = 1; date < post; date++) {
				this.addDay(this.currentYear, (this.currentMonth + 1) % 12, date);
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
	font-weight: normal;
}
a {
	color: #42b983;
}
.tile {
	background-color: grey;
	display: inline-block;
	width: 13%;
	height: auto;
	border: 2px inset cornflowerblue;
	padding: 1em 0px;
	margin: 1px;
	transition: .1s
}
.header {
	background-color: cornsilk;
	height: auto;
	padding: 2px 0px;
}
.monthUp {
	float: right;
}
.monthDown {
	float: left;
}
.currentMonth {
	background-color: aliceblue;
	cursor: pointer;
}
.currentMonth:hover, .header:hover {
	border-style: outset;
	background-color: darkseagreen;
}
.timeStamp {
	cursor: pointer;
	border: 1px solid;
	width: fit-content;
	background-color: cornsilk;
	margin: auto auto -20px;
}
.today {
	background-color: cornsilk;
}
#calendar {
	width: 53em;
	margin: auto;
	text-align: center;
}
#controls {
	margin-bottom: 2em;
}
</style>
