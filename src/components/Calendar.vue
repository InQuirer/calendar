<template>
	<div class="calendar">
		<div class="controls">
			<div class="left">
				{{ months[currentMonth] }} {{ currentYear }}
				<button @click="event.show = !event.show">Add Event</button>
				<div class="overflow" v-show="event.show">
					<input type="date" v-model="event.date">
					<input type="time" v-model="event.time">
					<input type="text" placeholder="title" v-model="event.title">
					<textarea type="text" placeholder="description (optional)" v-model="event.description"></textarea>
					<button @click="addEvent">Add Event</button>
				</div>
				<input
				type="text"
				class="search"
				placeholder="Search events here ..."
				list="suggestions"
				v-model="key"
				@keyup.enter="search">
				<button @click="search">Go</button>
				<datalist id="suggestions">
					<option v-for="event in events">{{ event.date + ' ' + event.time + ' ' + event.title}}</option>
				</datalist>
			</div>
			<div class="right">
				<button class="monthDown" @click="monthDown"><</button>
				<button class="timeStamp" title="current datestamp" @click="reset">{{ today.toDateString().replace(' ', ', ') }}</button>
				<button class="monthUp" @click="monthUp">></button>
			</div>
		</div>
		<div class="tile header" v-for="day in days">{{ day.toUpperCase().substr(0, 3) }}</div>
		<div class="tile"
		v-for="day in calendar"
		:class="[{ currentMonth: day.month == currentMonth }, { today: day.today }]">
			<div class="watermark">
				<span>{{ day.date }}</span><br>
			</div>
			<div class="event" v-for="event in day.events">
				<span>{{ event.time }}</span>
				<span>{{ event.title }}</span>
			</div>
		</div>
	</div>
</template>
<script src="./Calendar.js"></script>
<style src="./Calendar.css" scoped></style>